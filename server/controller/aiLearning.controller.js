
const { executeQuery } = require("../Db");


exports.getUnlockedVideo = async (req, res) => {
  try {
    const { userId, program_type } = req.user;
    let language = req.query.language || "en";

    console.log("userId, program_type, language:", userId, program_type, language);

    // ✅ Guard clause
    if (!userId || !program_type) {
      return res.status(400).json({
        error: "UserId or Program type missing",
      });
    }

    // -------------------------------------------------
    // 🔁 0️⃣ Language fallback check
    // -------------------------------------------------
    const langExists = await executeQuery(
      `
      SELECT 1
      FROM ai_learning
      WHERE program_type = ?
        AND language = ?
      LIMIT 1
      `,
      [program_type, language]
    );

    if (langExists.length === 0) {
      language = "en";
    }

    // -------------------------------------------------
    // 1️⃣ Get first incomplete video
    // 🚨 progress is language-agnostic now
    // -------------------------------------------------
    const unlockedVideo = await executeQuery(
      `
      SELECT 
        a.id,
        a.topic_name,
        a.description,
        a.video_url,
        a.day
      FROM ai_learning a
      WHERE NOT EXISTS (
          SELECT 1
          FROM ai_learning_progress p
          WHERE p.day = a.day
            AND p.user_id = ?
            AND p.program_type = ?
            AND p.video_completed = TRUE
            AND p.quest_completed = TRUE
      )
      AND a.program_type = ?
      AND a.language = ?
      ORDER BY a.day ASC
      LIMIT 1
      `,
      [userId, program_type, program_type, language]
    );

    if (unlockedVideo.length === 0) {
      return res.json({ message: "All videos completed!" });
    }

    const currentDay = unlockedVideo[0].day;

    // -------------------------------------------------
    // 2️⃣ Ensure progress row exists (NO language check)
    // -------------------------------------------------
    await executeQuery(
      `
      INSERT INTO ai_learning_progress
        (user_id, day, video_completed, quest_completed, program_type, language)
      VALUES (?, ?, FALSE, FALSE, ?, ?)
      ON DUPLICATE KEY UPDATE user_id = user_id
      `,
      [userId, currentDay, program_type, language]
    );

    // -------------------------------------------------
    // 3️⃣ Check if completed today (language-agnostic)
    // -------------------------------------------------


    
    // const completedToday = await executeQuery(
    //   `
    //   SELECT updated_at
    //   FROM ai_learning_progress
    //   WHERE user_id = ?
    //     AND program_type = ?
    //     AND video_completed = TRUE
    //     AND quest_completed = TRUE
    //     AND DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30'))
    //         = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))
    //   LIMIT 1
    //   `,
    //   [userId, program_type]
    // );


    // 3️⃣ Check if completed based on UNLOCK_INTERVAL_MINUTES (language-agnostic)
    // -------------------------------------------------
    const unlockIntervalMinutes = parseInt(process.env.UNLOCK_INTERVAL_MINUTES) || 0;
    let completedToday = [];
    let nextUnlockTime = null;

    if (unlockIntervalMinutes > 0) {
      completedToday = await executeQuery(        `
        SELECT updated_at
        FROM ai_learning_progress
        WHERE user_id = ?
          AND program_type = ?
          AND video_completed = TRUE
          AND quest_completed = TRUE
          AND updated_at >= NOW() - INTERVAL ? MINUTE
        ORDER BY updated_at DESC
        LIMIT 1
        `,
        [userId, program_type, unlockIntervalMinutes]
      );
      if (completedToday.length > 0) {
        nextUnlockTime = new Date(new Date(completedToday[0].updated_at).getTime() + unlockIntervalMinutes * 60 * 1000);
      }
    } else {
      completedToday = await executeQuery(
        `
        SELECT updated_at
        FROM ai_learning_progress
        WHERE user_id = ?
          AND program_type = ?
          AND video_completed = TRUE
          AND quest_completed = TRUE
          AND DATE(CONVERT_TZ(updated_at, '+00:00', '+05:30'))
              = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))
        LIMIT 1
        `,
        [userId, program_type]
      );
    }

    const status = completedToday.length > 0 ? "locked" : "unlocked";

    // -------------------------------------------------
    // 4️⃣ Completed topics (language-agnostic progress)
    // -------------------------------------------------
    const completedTopics = await executeQuery(
      `
      SELECT 
        a.day,
        a.topic_name,
        a.description
      FROM ai_learning a
      INNER JOIN ai_learning_progress p
        ON a.day = p.day
      WHERE p.user_id = ?
        AND p.program_type = ?
        AND p.video_completed = TRUE
        AND p.quest_completed = TRUE
        AND a.program_type = ?
        AND a.language = ?
      ORDER BY a.day ASC
      `,
      [userId, program_type, program_type, language]
    );

    // -------------------------------------------------
    // 5️⃣ Next 4 upcoming topics
    // -------------------------------------------------
    const subsequentTopics = await executeQuery(
      `
      SELECT day, topic_name
      FROM ai_learning a
      WHERE NOT EXISTS (
          SELECT 1
          FROM ai_learning_progress p
          WHERE p.day = a.day
            AND p.user_id = ?
            AND p.program_type = ?
            AND p.video_completed = TRUE
            AND p.quest_completed = TRUE
      )
      AND a.day != ?
      AND a.program_type = ?
      AND a.language = ?
      ORDER BY a.day ASC
      LIMIT 4
      `,
      [userId, program_type, currentDay, program_type, language]
    );

    // -------------------------------------------------
    // ✅ Final response
    // -------------------------------------------------
    return res.json({
      video: {
        ...unlockedVideo[0],
        status,
        createdAt:
          completedToday.length > 0
            ? completedToday[0].updated_at
            : "",
        languageUsed: language, // 👈 helpful for frontend
        unlockIntervalMinutes,
        nextUnlockTime,
      },
      nextTopics: subsequentTopics,
      completedTopics,
    });
  } catch (error) {
    console.error("Error fetching unlocked video:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};





exports.getAssessmentsByDay = async (req, res) => {
  try {
    const { day } = req.params;
    const { program_type } = req.user;
    let language = req.query.language || "en";

    // ✅ guard clause
    if (!day || !program_type) {
      return res.status(400).json({
        error: "Day or Program type missing",
      });
    }

    // -------------------------------------------------
    // 🔁 Language fallback check
    // -------------------------------------------------
    const langExists = await executeQuery(
      `
      SELECT 1
      FROM ai_learning_assessments
      WHERE day = ?
        AND program_type = ?
        AND language = ?
      LIMIT 1
      `,
      [day, program_type, language]
    );

    if (langExists.length === 0) {
      language = "en";
    }

    // -------------------------------------------------
    // 📚 Fetch assessments
    // -------------------------------------------------
    const result = await executeQuery(
      `
      SELECT 
        id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option
      FROM ai_learning_assessments
      WHERE day = ?
        AND program_type = ?
        AND language = ?
      `,
      [day, program_type, language]
    );

    if (result.length === 0) {
      return res.json({
        message: "No assessments found for this day.",
      });
    }

    return res.json({
      assessments: result,
      languageUsed: language, // 👈 helpful for frontend
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.completeVideo = async (req, res) => {
  try {
    const { day } = req.body;
    const { program_type, userId } = req.user;

    if (!day) {
      return res.status(400).json({ error: "Day is required" });
    }

    // -------------------------------------------------
    // 1️⃣ Check existing progress (language-agnostic)
    // -------------------------------------------------
    const existing = await executeQuery(
      `
      SELECT video_completed
      FROM ai_learning_progress
      WHERE user_id = ?
        AND day = ?
        AND program_type = ?
      LIMIT 1
      `,
      [userId, day, program_type]
    );

    if (existing.length && existing[0].video_completed) {
      return res.json({ message: "Reward Already Provided" });
    }

    // -------------------------------------------------
    // 2️⃣ Update progress (🚨 LANGUAGE REMOVED)
    // -------------------------------------------------
    const updateResult = await executeQuery(
      `
      UPDATE ai_learning_progress
      SET video_completed = TRUE
      WHERE user_id = ?
        AND day = ?
        AND program_type = ?
      `,
      [userId, day, program_type]
    );

    // ✅ safety check
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        error: "Progress record not found",
      });
    }

    // -------------------------------------------------
    // 3️⃣ Reward user
    // -------------------------------------------------
    await executeQuery(
      `
      INSERT INTO passbook
      (user_id, action, description, type, amount)
      VALUES (?, ?, ?, 'CREDIT', ?)
      `,
      [userId, "AI Learning Bonus", "Video Completed", 60]
    );

    await executeQuery(
      `
      UPDATE users_data
      SET token_balance = token_balance + ?
      WHERE id = ?
      `,
      [60, userId]
    );

    return res.json({
      message: "Video marked as completed & rewards granted!",
    });
  } catch (error) {
    console.error("completeVideo error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.completeQuest = async (req, res) => {
  try {
    const { day } = req.body;
    const { program_type, userId } = req.user;

    if (!day) {
      return res.status(400).json({ error: "Day is required" });
    }

    const progress = await executeQuery(
      `
      SELECT quest_completed
      FROM ai_learning_progress
      WHERE user_id = ?
        AND day = ?
        AND program_type = ?
      LIMIT 1
      `,
      [userId, day, program_type]
    );

    if (progress.length && progress[0].quest_completed) {
      return res
        .status(400)
        .json({ message: "Quest already completed and reward granted." });
    }

    const updateResult = await executeQuery(
      `
      UPDATE ai_learning_progress
      SET quest_completed = TRUE
      WHERE user_id = ?
        AND day = ?
        AND program_type = ?
      `,
      [userId, day, program_type]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        error: "Progress record not found",
      });
    }

    await executeQuery(
      `
      INSERT INTO passbook
      (user_id, action, description, type, amount)
      VALUES (?, ?, ?, 'CREDIT', ?)
      `,
      [userId, "AI Learning Bonus", "Quest Completed", 60]
    );

    await executeQuery(
      `
      UPDATE users_data
      SET token_balance = token_balance + ?
      WHERE id = ?
      `,
      [60, userId]
    );

    return res.json({
      message: "Quest marked as completed & rewards granted!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

