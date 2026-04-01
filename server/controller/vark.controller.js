const { executeQuery } = require("../Db");



const calculateSeq = (varkType, cpsResult) => {
  if (!varkType || !cpsResult || typeof cpsResult !== 'object') {
    return null;
  }

  // Normalize inputs to lowercase for comparison
  const processing = (cpsResult.processing || '').toLowerCase();
  const pace = (cpsResult.pace || '').toLowerCase();
  const motivation = (cpsResult.motivation || '').toLowerCase();

  const isAnalytical = processing === 'analytical';
  const isIntuitive = processing === 'intuitive';
  const isAccuracy = pace === 'accuracy';
  const isSpeed = pace === 'speed';
  const isTask = motivation === 'task';
  const isReward = motivation === 'reward';

  // Strict valid dimensions check
  if (!['analytical', 'intuitive'].includes(processing) ||
      !['accuracy', 'speed'].includes(pace) ||
      !['task', 'reward'].includes(motivation)) {
    return null;
  }

  let seq = null;

  // VARK: V or A (Visual / Auditory)
  if (['V', 'A'].includes(varkType.toUpperCase())) {
    if (isAnalytical) {
      if (isAccuracy) {
        seq = 'SEQ-A';
      } else if (isSpeed && isTask) {
        seq = 'SEQ-B';
      } else if (isSpeed && isReward) {
        seq = 'SEQ-D';
      }
    } else if (isIntuitive) {
      if (isAccuracy) {
        seq = 'SEQ-C';
      } else if (isSpeed && isTask) {
        seq = 'SEQ-B';
      } else if (isSpeed && isReward) {
        seq = 'SEQ-D';
      }
    }
  } 
  // VARK: R (Read/Write)
  else if (varkType.toUpperCase() === 'R') {
    if (isAnalytical) {
      // Analytical Read/Write: Only Speed+Reward driven users get SEQ-D, all others get SEQ-A
      seq = (isSpeed && isReward) ? 'SEQ-D' : 'SEQ-A';
    } else if (isIntuitive) {
      // Intuitive Read/Write: Only Speed+Reward driven users get SEQ-D, all others get SEQ-C
      seq = (isSpeed && isReward) ? 'SEQ-D' : 'SEQ-C';
    }
  } 
  // VARK: K (Kinesthetic)
  else if (varkType.toUpperCase() === 'K') {
    if (isAnalytical) {
      // Analytical Kinesthetic: Only Speed+Reward driven users get SEQ-D, all others get SEQ-B
      seq = (isSpeed && isReward) ? 'SEQ-D' : 'SEQ-B';
    } else if (isIntuitive) {
      if (isSpeed && isReward) {
        seq = 'SEQ-D';
      } else if (isAccuracy && isReward) {
        seq = 'SEQ-C';
      } else {
        seq = 'SEQ-B';
      }
    }
  }
  
  if (seq) {
    console.log(`Generated Sequence: ${seq} for VARK:${varkType}, Processing:${processing}, Pace:${pace}, Motivation:${motivation}`);
  }

  return seq;
};




const getVarkCspQuestions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type } = req.params;
    const assessmentType = type.toUpperCase();
    let language = req.query.language || "en";

    console.log("Assessment Type:", assessmentType);
    console.log("Requested Language:", language);

    /* ---------- USER PROGRESS ---------- */

    const progressRows = await executeQuery(
      `
      SELECT vark_completed, cps_completed, ai_completed
      FROM user_assessment_progress
      WHERE user_id = ?
      `,
      [userId]
    );

    const progress = progressRows[0] || {};

    console.log("User Progress:", progress);

    /* ---------- FLOW VALIDATION ---------- */

    if (assessmentType === "VARK" && progress.vark_completed) {
      return res.json({ redirect: "/csp-start" });
    }

    if (assessmentType === "CPS" || assessmentType === "CSP") {
      if (!progress.vark_completed) {
        return res.json({ redirect: "/vark" });
      }

      if (progress.cps_completed) {
        return res.json({ redirect: "/ai-start" });
      }
    }

    if (assessmentType === "AI") {
      if (!progress.cps_completed) {
        return res.json({ redirect: "/csp-start" });
      }

      if (progress.ai_completed) {
        return res.json({
          redirect: "/",
          message: "You already completed AI assessment"
        });
      }
    }

    /* ---------- LANGUAGE CHECK ---------- */

    const langExists = await executeQuery(
      `
      SELECT 1
      FROM assessment_questions
      WHERE assessment_type = ?
      AND language = ?
      LIMIT 1
      `,
      [assessmentType, language]
    );

    if (langExists.length === 0) {
      console.warn(
        `Language '${language}' not found for ${assessmentType}, falling back to 'en'`
      );
      language = "en";
    }

    /* ---------- FETCH QUESTIONS ---------- */

    const rows = await executeQuery(
      `
      SELECT question_number, question_text, options
      FROM assessment_questions
      WHERE assessment_type = ?
      AND language = ?
      ORDER BY question_number
      `,
      [assessmentType, language]
    );

    console.log(`Found ${rows.length} questions`);

    /* ---------- FORMAT RESPONSE ---------- */

    const questions = rows.map((row) => {
      let parsedOptions = [];

      try {
        parsedOptions = JSON.parse(row.options);
      } catch (err) {
        console.warn("Invalid JSON in options:", row.options);
      }

      return {
        id: row.question_number,
        question: row.question_text,
        options: parsedOptions.map((opt) => ({
          key: opt.key,
          text: opt.text,
          category: opt.category,
          value: opt.value
        }))
      };
    });

    return res.json({
      languageUsed: language,
      questions
    });

  } catch (err) {
    console.error("Error fetching assessment questions:", err);
    res.status(500).json({ error: err.message });
  }
};



const submitVarkAssessment = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { varkAnswers = [], cpsAnswers = [], aiAnswers = [], language } = req.body;

    console.log("Received Answers:", req.body);

    /** --------------------------------------------------
     * 1. FETCH EXISTING PROGRESS ROW
     * -------------------------------------------------- */
    const existing = await executeQuery(
      `SELECT * FROM user_assessment_progress WHERE user_id = ?`,
      [userId]
    );

    const userRow = existing[0] || {
      vark_completed: 0,
      cps_completed: 0,
      ai_completed: 0
    };

    /** --------------------------------------------------
     * 2. VARK CALCULATION
     * -------------------------------------------------- */
    let varkType = userRow.vark_result;

    if (varkAnswers.length > 0 && userRow.vark_completed === 0) {
      const score = { V: 0, A: 0, R: 0, K: 0 };

      varkAnswers.forEach(a => {
        score[a.value] = (score[a.value] || 0) + 1;
      });

      varkType = Object.keys(score).reduce((a, b) =>
        score[a] > score[b] ? a : b
      );
    }

    /** --------------------------------------------------
     * 3. CPS SCORING + STORE IN DB
     * -------------------------------------------------- */
    let cpsResult = userRow.cps_result ? JSON.parse(userRow.cps_result) : null;
    let archetype_id = userRow.archetype_id || varkType;

    if (cpsAnswers.length > 0 && userRow.cps_completed === 0) {
      const cps = {
        processing: {},
        flow: {},
        pace: {},
        motivation: {}
      };

      cpsAnswers.forEach(a => {
        cps[a.category][a.value] = (cps[a.category][a.value] || 0) + 1;
      });

      cpsResult = {};
      Object.keys(cps).forEach(dim => {
        const options = Object.keys(cps[dim]);
        if (options.length > 0) {
          cpsResult[dim] = options.reduce((a, b) =>
            cps[dim][a] > cps[dim][b] ? a : b
          );
        } else {
          cpsResult[dim] = ""; // Safe fallback to prevent crashes
        }
      });

      // Standardized Archetype ID Generation (e.g., V-A-S-AC-T)
      const p = (cpsResult.processing || "").charAt(0).toUpperCase() || "X";
      const f = (cpsResult.flow || "").charAt(0).toUpperCase() || "X";
      const pa = (cpsResult.pace || "").slice(0, 2).toUpperCase() || "XX";
      const m = (cpsResult.motivation || "").charAt(0).toUpperCase() || "X";
      
      archetype_id = `${varkType}-${p}-${f}-${pa}-${m}`;
    }

    let seq = await calculateSeq(varkType, cpsResult);
   
    let aiScore = userRow.ai_score || 0;

    if (aiAnswers.length > 0 && userRow.ai_completed === 0) {

      const dbQuestions = await executeQuery(
        `SELECT question_number, correct_option FROM assessment_questions WHERE assessment_type = 'AI' ORDER BY question_number`
      );

      const correctMap = {};
      dbQuestions.forEach(q => correctMap[q.question_number] = q.correct_option);

      let index = 1;
      aiScore = aiAnswers.reduce((sum, ans) => {
        const correctKey = correctMap[index];
        const isCorrect = ans.key === correctKey;
        ans.correct = isCorrect;  // attach correctness in stored JSON
        index++;
        return sum + (isCorrect ? 1 : 0);
      }, 0);
    }


console.log("Computed Results:", {
      varkType,
      cpsResult,
      aiScore,
      archetype_id
    });
    

    await executeQuery(
      `
      INSERT INTO user_assessment_progress
      (user_id, 
       vark_completed, cps_completed, ai_completed,
       vark_result, cps_result, archetype_id, ai_score,
       vark_answers, cps_answers, ai_answers, seq, language)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE

        vark_completed = IF(VALUES(vark_completed)=1, 1, vark_completed),
        cps_completed = IF(VALUES(cps_completed)=1, 1, cps_completed),
        ai_completed = IF(VALUES(ai_completed)=1, 1, ai_completed),

        vark_result = IF(VALUES(vark_result) IS NOT NULL, VALUES(vark_result), vark_result),
        cps_result = IF(VALUES(cps_result) IS NOT NULL, VALUES(cps_result), cps_result),
        archetype_id = IF(VALUES(archetype_id) IS NOT NULL, VALUES(archetype_id), archetype_id),
        ai_score = VALUES(ai_score),

        vark_answers = IF(JSON_LENGTH(VALUES(vark_answers)) > 0, VALUES(vark_answers), vark_answers),
        cps_answers = IF(JSON_LENGTH(VALUES(cps_answers)) > 0, VALUES(cps_answers), cps_answers),
        ai_answers = IF(JSON_LENGTH(VALUES(ai_answers)) > 0, VALUES(ai_answers), ai_answers),
        seq = IF(VALUES(seq) IS NOT NULL, VALUES(seq), seq),
        language = IF(VALUES(language) IS NOT NULL, VALUES(language), language)
      `,
      [
        userId,

        // completion flags
        varkAnswers.length > 0 ? 1 : userRow.vark_completed,
        cpsAnswers.length > 0 ? 1 : userRow.cps_completed,
        aiAnswers.length > 0 ? 1 : userRow.ai_completed,

        // results
        varkType,
        JSON.stringify(cpsResult),
        archetype_id,
        aiScore,

        // answers
        JSON.stringify(varkAnswers),
        JSON.stringify(cpsAnswers),
        JSON.stringify(aiAnswers),
        seq || null,
        language || "en"
      ]
    );

    /** --------------------------------------------------
     * 6. FETCH UPDATED USER FOR FRONTEND STATE
     * -------------------------------------------------- */
    const updatedUser = await executeQuery(`
      SELECT u.*, 
             p.vark_completed, p.cps_completed, p.ai_completed, p.archetype_id, p.seq
      FROM users_data u
      LEFT JOIN user_assessment_progress p ON u.id = p.user_id
      WHERE u.id = ?
    `, [userId]);

    const user = updatedUser[0];

    /** --------------------------------------------------
     * 7. RETURN NEXT STEP + USER DATA
     * -------------------------------------------------- */
    if (varkAnswers.length > 0 && userRow.vark_completed === 0) {
      return res.json({ next: "/csp-start", user });
    }

    if (cpsAnswers.length > 0 && userRow.cps_completed === 0) {
      return res.json({ next: `/res/${seq}`, user });
    }

    if (aiAnswers.length > 0) {
      return res.json({
        next: `ai-roadmap`,
        varkType,
        cpsResult,
        aiScore,
        archetype_id,
        user,
        message: "AI assessment completed successfully!"
      });
    }

    return res.json({ status: "success", user });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};


const varkCspRoadmap = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const rows = await executeQuery(
      "SELECT * FROM user_assessment_progress WHERE user_id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No assessment data found" });
    }

    const row = rows[0];

    const cps_result = typeof row.cps_result === "string" ? JSON.parse(row.cps_result) : row.cps_result;

    const baseStages = {
      foundation: {
        title: "Foundation",
        activities: ["AI FlashLearn", "AI Insight Vault"],
        goal: "Build core understanding of AI concepts",
        stageData: {
          title: "Foundation Stage",
          description: "This stage builds your core understanding of AI concepts using short, focused learning units",
          whatYouDo: [
            "Watch 1-minute AI FlashLearn videos",
            "Learn basic AI terms and definitions",
            "Answer quick validation questions",
          ],
          whyMatters: "Creates a strong base before moving into recall and reasoning.",
          bestFor: ["Visual learner", "Analytical thinker", "Accuracy-focused learners"],
        },
      },
      understanding: {
        title: "Understanding & Recall",
        activities: ["AI Concept Match", "AI Word Forge"],
        goal: "Strengthen terminology and concept recall",
        stageData: {
          title: "Understanding & Recall Stage",
          description: "Reinforce your AI knowledge through interactive matching and word-building exercises that strengthen memory retention",
          whatYouDo: [
            "Match AI concepts with their correct definitions",
            "Build and reconstruct AI terminology",
            "Practice rapid concept recognition",
            "Complete spaced repetition exercises",
          ],
          whyMatters: "Solidifies terminology and ensures you can quickly recall key concepts when needed.",
          bestFor: ["Sequential learners", "Memory-focused students", "Pattern recognizers"],
        },
      },
      context: {
        title: "Context & Reasoning",
        activities: ["AI StoryLens", "AI Myth Breaker"],
        goal: "Apply concepts to real-world scenarios",
        stageData: {
          title: "Context & Reasoning Stage",
          description: "Apply AI concepts to real-world situations and develop critical thinking skills by analyzing stories and debunking myths",
          whatYouDo: [
            "Analyze real-world AI use cases and stories",
            "Identify and debunk common AI misconceptions",
            "Connect theoretical concepts to practical applications",
            "Evaluate AI claims and separate fact from fiction",
          ],
          whyMatters: "Develops critical thinking and helps you understand how AI works in real-world contexts.",
          bestFor: ["Analytical thinkers", "Context-driven learners", "Problem solvers"],
        },
      },
      speed: {
        title: "Speed & Validation",
        activities: ["AI Quick Quiz", "AI Challenge Arena"],
        goal: "Test knowledge under time pressure",
        stageData: {
          title: "Speed & Validation Stage",
          description: "Build confidence and fluency by testing your AI knowledge under timed conditions and competitive challenges",
          whatYouDo: [
            "Complete timed quizzes on AI concepts",
            "Compete in knowledge challenges",
            "Practice rapid decision-making",
            "Validate understanding through speed tests",
          ],
          whyMatters: "Ensures you can recall and apply AI knowledge quickly and confidently in any situation.",
          bestFor: ["Task-driven learners", "Competitive achievers", "Speed-focused students"],
        },
      },
      practical: {
        title: "Practical Application",
        activities: ["AI Project Builder", "AI Case Studies"],
        goal: "Apply knowledge to hands-on projects",
        stageData: {
          title: "Practical Application Stage",
          description: "Put your AI knowledge into action by working on real projects and analyzing comprehensive case studies",
          whatYouDo: [
            "Build mini AI projects from scratch",
            "Analyze detailed AI implementation case studies",
            "Design solutions for real-world AI problems",
            "Create your own AI use case proposals",
          ],
          whyMatters: "Transforms theoretical knowledge into practical skills you can use professionally.",
          bestFor: ["Hands-on learners", "Project-based students", "Career-focused individuals"],
        },
      },
    };

    const orderMap = {
      "SEQ-A": ["foundation", "understanding", "context", "speed", "practical"],
      "SEQ-B": ["foundation", "understanding", "speed", "practical", "context"],
      "SEQ-C": ["context", "foundation", "understanding", "speed", "practical"],
      "SEQ-D": ["understanding", "speed", "context", "foundation", "practical"],
    };

    const seq = row.seq || "SEQ-A";
    const selectedOrder = orderMap[seq] || orderMap["SEQ-A"];

    const iconColors = ["text-white", "text-green-400", "text-purple-400", "text-orange-400", "text-pink-400"];
    const goalColors = ["text-[#046FC8]", "text-[#8FE566CC]", "text-[#046FC8]", "text-[#8FE566CC]", "text-[#046FC8]"];

    const roadmapSteps = selectedOrder.map((stageKey, index) => {
      const stage = baseStages[stageKey];
      return {
        title: stage.title,
        activities: stage.activities,
        goal: stage.goal,
        stageData: stage.stageData,
        stepNumber: index + 1,
        iconColor: iconColors[index],
        goalColor: goalColors[index],
        locked: index === 0, // First stage = starting (play icon), others locked
      };
    });

    const sequenceStyleMap = {
      "SEQ-A": "Concept-first, accuracy-focused",
      "SEQ-B": "Visual-to-action, task-driven",
      "SEQ-C": "Narrative-reasoning, accuracy-focused",
      "SEQ-D": "Momentum-driven, reward-focused",
    };

    const aiScore = row.ai_score || 0;
    let aiLevel = "foundational";
    if (aiScore >= 16) {
      aiLevel = "advanced";
    } else if (aiScore >= 11) {
      aiLevel = "intermediate";
    } else if (aiScore >= 6) {
      aiLevel = "beginner";
    }

    const learningMode = cps_result.flow === "sequential" 
      ? "Structured Deep Learner" 
      : "Exploratory Flexible Learner";

    const learningInfo = [
      { icon: "brain", title: "Learning Type", value: row.archetype_id || "Unknown" },
      { icon: "arrow", title: "Sequence Style", value: sequenceStyleMap[seq] || "Concept-first, accuracy-focused" },
      { icon: "bullseye", title: "Learning Mode", value: learningMode },
      { icon: "stack", title: "AI Level", value: aiLevel },
    ];

    res.json({ learningInfo, roadmapSteps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
const insertVarkQuestion = async (req, res) => {
  try {
    const {
      assessment_type,
      question_number,
      question_text,
      options
    } = req.body;

    /* ---------------- VALIDATION ---------------- */

    if (!assessment_type || !question_number || !question_text || !options) {
      return res.status(400).json({
        error: "assessment_type, question_number, question_text, options are required"
      });
    }

    if (!Array.isArray(options) || options.length === 0) {
      return res.status(400).json({
        error: "options must be a non-empty array"
      });
    }

    const validKeys = ["A", "B", "C", "D"];

    for (const opt of options) {
      if (
        !opt.key ||
        !opt.text ||
        !opt.category ||
        !opt.value
      ) {
        return res.status(400).json({
          error: "Each option must have key, text, category, value"
        });
      }

      if (!validKeys.includes(opt.key)) {
        return res.status(400).json({
          error: `Invalid option key: ${opt.key}`
        });
      }
    }

    /* ---------------- INSERT ---------------- */

    const sql = `
      INSERT INTO assessment_questions
      (assessment_type, question_number, question_text, options, language)
      VALUES (?, ?, ?, ?, ?)
    `;

    await executeQuery(sql, [
      assessment_type.toUpperCase(),
      question_number,
      question_text,
      JSON.stringify(options),
      req.body.language || "en"
    ]);

    res.status(201).json({
      message: "Question inserted successfully"
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Question already exists for this assessment and number"
      });
    }

    res.status(500).json({ error: err.message });
  }
};



const getUserAIPath = async (req, res) => {
  const userId  = req.user.userId; // Assuming authentication middleware sets req.user with userId

  try {
    const rows = await executeQuery(
      `SELECT seq, cps_result FROM user_assessment_progress WHERE user_id = ?`,
      [userId]
    );

    console.log("Fetched Row:", rows);

    const row = rows[0];
    if (!row) {
      return res.status(200).json({
        seq: "SEQ-A",
        flow: "sequential",
      });
    }

    let flow = "sequential";
    if (row.cps_result) {
      try {
        const cps = JSON.parse(row.cps_result);
        flow = cps.flow || "sequential";
      } catch (parseError) {
        console.error("Error parsing cps_result:", parseError);
      }
    }

    console.log("Calculated Flow:", flow, row.cps_result, row.seq);
    return res.status(200).json({
      seq: row.seq || "SEQ-A",
      flow,
    });
  } catch (error) {
    console.error("Error fetching user sequence:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getVarkCspQuestions, submitVarkAssessment ,  insertVarkQuestion ,varkCspRoadmap , getUserAIPath};
