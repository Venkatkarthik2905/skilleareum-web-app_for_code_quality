const { executeQuery } = require("../Db");
const { 
  getPassbookCount, 
  addPassbookRecord, 
  updateTokenBalance,
  insertReward, 
  getUserSeq
} = require("./token.controller");  // make sure insertReward is exported here




const getAIMythQuestions = async (req, res) => {
  const userId = req.user?.userId;
  const { day = 1, assessment_type = "ai_myth", source = "ChallengeMap_7Days", lang = 'en' } = req.query;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const program_type = req.user?.program_type || 'apprentice';

    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM myth_submit_answers
      WHERE user_id = ? AND day = ? AND assessment_type = ? AND program_type = ?
    `;

    const completed = await executeQuery(checkQuery, [userId, day, assessment_type, program_type]);

    if (completed[0].count > 0) {
      return res.status(200).json({
        completed: true,
        message: `You already completed Day-${day} assessment.`,
        redirect: `/${source}`
      });
    }

    const userSeq = await getUserSeq(userId);

    // if (!userSeq) {
    //   return res.status(400).json({ error: "User sequence not found" });
    // }

    const questionQuery = `
      SELECT id, question_text AS text, correct_answer AS correctAnswer, explanation, seq
      FROM ai_myth_questions
      WHERE day = ? AND language = ?
      ORDER BY id ASC
    `;

    let questions = await executeQuery(questionQuery, [day, lang]);

    if (questions.length === 0 && lang !== 'en') {
        questions = await executeQuery(`
          SELECT id, question_text AS text, correct_answer AS correctAnswer, explanation, seq
          FROM ai_myth_questions
          WHERE day = ? AND language = 'en'
          ORDER BY id ASC
        `, [day]);
    }

    return res.status(200).json({
      completed: false,
      seq: userSeq,
      questions
    });

  } catch (error) {
    console.error("Error fetching AI myth questions:", error);
    return res.status(500).json({ error: "Failed to fetch questions" });
  }
};


const submitMythAnswers = async (req, res) => {
  const { answers, day = 1, lang = 'en' } = req.body;

  const userId = req.user?.userId;

  if (!Array.isArray(answers)) return res.status(400).json({ error: "Invalid answers format" });

  try {
    let correctRows = await executeQuery("SELECT id, correct_answer FROM ai_myth_questions WHERE day = ? AND language = ?", [day, lang]);

    if (correctRows.length === 0 && lang !== 'en') {
      correctRows = await executeQuery("SELECT id, correct_answer FROM ai_myth_questions WHERE day = ? AND language = 'en'", [day]);
    }

    const correctMap = {};
    correctRows.forEach(row => {
      correctMap[row.id] = row.correct_answer.trim().toLowerCase();
    });

    let correctCount = 0;
    answers.forEach(ans => {
      const userRes = (ans.response || "").toString().trim().toLowerCase();
      if (userRes === correctMap[ans.questionId]) correctCount++;
    });

    const total = correctRows.length;
    const percentage = (correctCount / total) * 100;
    const result = percentage >= 60 ? "Passed" : "Failed";

    const program_type = req.user?.program_type || 'apprentice'; // apprentice=7-day, genesis=30-day

    await executeQuery(
      `INSERT INTO myth_submit_answers 
        (user_id,  day, answers, correct_count, percentage, result, assessment_type, language, program_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        day,
        JSON.stringify(answers),
        correctCount,
        percentage.toFixed(2),
        result,
        "ai_myth",
        lang,
        program_type
      ]
    );

    if (result === "Passed") {
      const rewardTokens = 150;
      const rewardType = `AI Skill Quest Reward Day-${day}`;

      const checkReward = `
        SELECT COUNT(*) AS count
        FROM rewards
        WHERE user_id = ? AND reward_type = ? AND program_type = ?
      `;

      const existingReward = await executeQuery(checkReward, [userId, rewardType, program_type]);

      if (existingReward[0].count === 0) {
        await addPassbookRecord(userId, "credit", rewardTokens, rewardType);
        await insertReward(userId, rewardType, rewardTokens, `Completed AI Myth Quiz for Day-${day}`, program_type);
        await updateTokenBalance(userId, rewardTokens);
      }
    }

    res.status(200).json({
      correctCount,
      total,
      percentage: percentage.toFixed(2),
      result,
      rewardApplied: result === "Passed"
    });

  } catch (error) {
    console.error("Error submitting myth answers:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




const getAIFailureCases = async (req, res) => {
  const userId = req.user?.userId;
  const { day = 1, assessment_type = "ai_failure", source = "ChallengeMap_7Days", lang = 'en' } = req.query;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const program_type = req.user?.program_type || 'apprentice';

    // Check if already completed
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM ai_failure_submit_answers
      WHERE user_id = ? AND day = ? AND assessment_type = ? AND program_type = ?
    `;
    const completed = await executeQuery(checkQuery, [userId, day, assessment_type, program_type]);

    if (completed[0].count > 0) {
      return res.status(200).json({
        completed: true,
        message: `You already completed this AI Failure assessment.`,
        redirect: `/${source}`
      });
    }

    const userSeq = await getUserSeq(userId);
    // if (!userSeq) {
    //   return res.status(400).json({ error: "User sequence not found" });
    // }

    const questionQuery = `
      SELECT 
        id,
        title,
        description,
        question,
        options,
        correct_answer AS correctAnswer,
        explanation
      FROM ai_failure_cases
      WHERE day = ? AND language = ?
      ORDER BY id ASC
    `;

    let cases = await executeQuery(questionQuery, [day, lang]);

    // Fallback to English if no cases found for the requested language
    if (cases.length === 0 && lang !== 'en') {
      cases = await executeQuery(`
        SELECT 
          id,
          title,
          description,
          question,
          options,
          correct_answer AS correctAnswer,
          explanation
        FROM ai_failure_cases
        WHERE day = ? AND language = 'en'
        ORDER BY id ASC
      `, [day]);
    }

    res.status(200).json({
      completed: false,
      cases
    });

  } catch (error) {
    console.error("Error fetching AI failure cases:", error);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
};

const submitFailureAnswers = async (req, res) => {
  const { answers, day = 1, lang = 'en' } = req.body;
  const userId = req.user?.userId;
  const assessment_type = "ai_failure";

  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (!Array.isArray(answers)) return res.status(400).json({ error: "Invalid answers format" });

  try {
    let correctRows = await executeQuery("SELECT id, correct_answer FROM ai_failure_cases WHERE day = ? AND language = ?", [day, lang]);

    if (correctRows.length === 0 && lang !== 'en') {
      correctRows = await executeQuery("SELECT id, correct_answer FROM ai_failure_cases WHERE day = ? AND language = 'en'", [day]);
    }

    if (!correctRows.length) {
      return res.status(404).json({
        error: "No questions found for this day",
      });
    }

    const correctMap = {};
      correctRows.forEach((row) => {
      correctMap[row.id] = (row.correct_answer || "")
        .toString()
        .trim()
        .toUpperCase();
    });

    let correctCount = 0;
    answers.forEach(ans => {
      const userRes = (ans.response || "").toString().trim().toUpperCase();
      if (userRes === correctMap[ans.questionId]) correctCount++;
    });

    const total = correctRows.length;
    const percentage = total > 0 ? (correctCount / total) * 100 : 0;
    const result = percentage >= 60 ? "Passed" : "Failed";

    const program_type = req.user?.program_type || 'apprentice'; // apprentice=7-day, genesis=30-day

    // Store submission
    await executeQuery(
      `INSERT INTO ai_failure_submit_answers 
        (user_id, day, answers, correct_count, percentage, result, assessment_type, language, program_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        day,
        JSON.stringify(answers),
        correctCount,
        percentage.toFixed(2),
        result,
        assessment_type,
        lang,
        program_type
      ]
    );

      const checkReward = `
        SELECT COUNT(*) AS count
        FROM rewards
        WHERE user_id = ? AND reward_type = ? AND program_type = ?
      `;
      const existing = await executeQuery(checkReward, [userId, rewardType, program_type]);

      if (existing[0].count === 0) {
        const rewardInsert = await insertReward(
          userId,
          rewardType,
          rewardTokens,
          rewardType,
          program_type
        );

      if (rewardInsert.affectedRows === 1) {
        await addPassbookRecord(
          userId,
          "credit",
          rewardTokens,
          rewardType
        );

        await updateTokenBalance(userId, rewardTokens);

        rewardApplied = true;
      }
    }


    res.status(200).json({
      correctCount,
      total,
      percentage: percentage.toFixed(2),
      result,
      rewardApplied: result === "Passed"
    });

  } catch (error) {
    console.error("Error submitting failure answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getAIToolArenaCases = async (req, res) => {
  const userId = req.user?.userId;
  const { day = 1, assessment_type = "ai_tool_arena", source = "ChallengeMap_7Days", lang = 'en' } = req.query;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const program_type = req.user?.program_type || 'apprentice';

    // Check if already completed
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM ai_tool_arena_submit_answers
      WHERE user_id = ? AND day = ? AND assessment_type = ? AND program_type = ?
    `;
    const completed = await executeQuery(checkQuery, [userId, day, assessment_type, program_type]);

    if (completed[0].count > 0) {
      return res.status(200).json({
        completed: true,
        message: `You already completed this AI Tool Arena assessment.`,
        redirect: `/${source}`
      });
    }

    const userSeq = await getUserSeq(userId);
    // if (!userSeq) {
    //   return res.status(400).json({ error: "User sequence not found" });
    // }

    const query = `
      SELECT 
        id,
        question,
        options,
        correct_answer AS correctAnswer,
        explanation
      FROM ai_tool_arena_questions
      WHERE day = ? AND language = ?
      ORDER BY id ASC
    `;

    let cases = await executeQuery(query, [day, lang]);

    if (cases.length === 0 && lang !== 'en') {
      cases = await executeQuery(`
        SELECT 
          id,
          question,
          options,
          correct_answer AS correctAnswer,
          explanation
        FROM ai_tool_arena_questions
        WHERE day = ? AND language = 'en'
        ORDER BY id ASC
      `, [day]);
    }

    res.status(200).json({
      completed: false,
      cases
    });

  } catch (error) {
    console.error("Error fetching AI Tool Arena cases:", error);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
};

// POST: Submit AI Tool Arena answers
const submitToolArenaAnswers = async (req, res) => {
  const { answers, day = 1, lang = 'en' } = req.body;
  const userId = req.user?.userId;
  const assessment_type = "ai_tool_arena";

  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (!Array.isArray(answers)) return res.status(400).json({ error: "Invalid answers format" });

  try {
    let correctRows = await executeQuery("SELECT id, correct_answer FROM ai_tool_arena_questions WHERE day = ? AND language = ?", [day, lang]);

    if (correctRows.length === 0 && lang !== 'en') {
      correctRows = await executeQuery("SELECT id, correct_answer FROM ai_tool_arena_questions WHERE day = ? AND language = 'en'", [day]);
    }

    const correctMap = {};
    correctRows.forEach(row => {
      correctMap[row.id] = row.correct_answer.trim().toUpperCase();
    });

    let correctCount = 0;
    answers.forEach(ans => {
      const userRes = (ans.response || "").toString().trim().toUpperCase();
      if (userRes === correctMap[ans.questionId]) correctCount++;
    });

    const total = correctRows.length;
    const percentage = total > 0 ? (correctCount / total) * 100 : 0;
    const result = percentage >= 60 ? "Passed" : "Failed";

    const program_type = req.user?.program_type || 'apprentice'; // apprentice=7-day, genesis=30-day

    await executeQuery(
      `INSERT INTO ai_tool_arena_submit_answers 
        (user_id, day, answers, correct_count, percentage, result, assessment_type, language, program_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        day,
        JSON.stringify(answers),
        correctCount,
        percentage.toFixed(2),
        result,
        assessment_type,
        lang,
        program_type
      ]
    );

    if (result === "Passed") {
      const rewardTokens = 400; // Adjust as needed
      const rewardType = `AI Tool Arena Reward Day-${day}`;

      const checkReward = `
        SELECT COUNT(*) AS count
        FROM rewards
        WHERE user_id = ? AND reward_type = ? AND program_type = ?
      `;
      const existing = await executeQuery(checkReward, [userId, rewardType, program_type]);

      if (existing[0].count === 0) {
        await addPassbookRecord(userId, "credit", rewardTokens, rewardType);
        await insertReward(userId, rewardType, rewardTokens, rewardType, program_type);
        await updateTokenBalance(userId, rewardTokens);
      }
    }

    res.status(200).json({
      correctCount,
      total,
      percentage: percentage.toFixed(2),
      result,
      rewardApplied: result === "Passed"
    });

  } catch (error) {
    console.error("Error submitting tool arena answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = {
  getAIMythQuestions,
  submitMythAnswers,
  getAIFailureCases,
  submitFailureAnswers,
  getAIToolArenaCases,
  submitToolArenaAnswers
};
