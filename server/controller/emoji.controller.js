const { executeQuery } = require("../Db");


exports.getEmojiGames = async (req, res) => {
  const { program_type, userId } = req.user;
  const { language = 'en', day } = req.query;

  if (!userId) return res.status(400).json({ message: "User Id is mandatory" });
  if (!day) return res.status(400).json({ message: "Day is mandatory" });

  try {
    const games = await executeQuery(
      `SELECT eg.* 
       FROM emoji_games eg
       WHERE eg.day = ? 
         AND eg.program_type = ? 
         AND eg.language = ?
         AND NOT EXISTS (
           SELECT 1 FROM user_emoji_progress uep 
           WHERE eg.day = uep.day 
             AND eg.game_number = uep.game_number 
             AND uep.user_id = ? 
             AND uep.program_type = ?
             AND uep.is_completed = 1
         )
       ORDER BY eg.game_number ASC`,
      [day, program_type, language, userId, program_type]
    );

    if (games.length > 0) {
      return res.json({ day, games: [games[0]] });
    }

    // ✅ Fallback to English
    if (language !== 'en') {
      const fallbackGames = await executeQuery(
        `SELECT eg.* 
         FROM emoji_games eg
         WHERE eg.day = ? 
           AND eg.program_type = ? 
           AND eg.language = 'en'
           AND NOT EXISTS (
             SELECT 1 FROM user_emoji_progress uep 
             WHERE eg.day = uep.day 
               AND eg.game_number = uep.game_number 
               AND uep.user_id = ? 
               AND uep.program_type = ?
               AND uep.is_completed = 1
           )
         ORDER BY eg.game_number ASC`,
        [day, program_type, userId, program_type]
      );

      if (fallbackGames.length > 0) {
        return res.json({ day, games: [fallbackGames[0]] });
      }
    }

    // ✅ No pending games
    return res.status(200).json({
      day,
      games: [],
      message: "Task Completed for today"
    });

  } catch (err) {
    console.error("getEmojiGames error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Submit answer for a game
exports.submitEmojiGame = async (req, res) => {
  const { gameId, selectedOption, language = 'en' } = req.body;
  const { program_type, userId } = req.user;

  try {
    const game = await executeQuery(
      `SELECT * FROM emoji_games WHERE id = ?`,
      [gameId]
    );

    if (!game.length) {
      return res.status(404).json({ message: "Game not found" });
    }

    const { day, game_number, correct_option } = game[0];
    const isCorrect = selectedOption === correct_option;

    if (isCorrect) {
      // Check if already completed to avoid double rewards
      const existing = await executeQuery(
        `SELECT * FROM user_emoji_progress WHERE user_id = ? AND day = ? AND game_number = ? AND is_completed = true AND program_type = ?`,
        [userId, day, game_number, program_type]
      );

      if (!existing.length) {
        // Save progress & reward
        await executeQuery(
          `INSERT INTO user_emoji_progress (user_id, day, game_number, is_completed, completed_at, program_type, language)
           VALUES (?, ?, ?, ?, NOW(), ?, ?)
           ON DUPLICATE KEY UPDATE is_completed = VALUES(is_completed), completed_at = VALUES(completed_at), language = VALUES(language)`,
          [userId, day, game_number, true, program_type, language]
        );

        await executeQuery(
          `UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?`,
          [120, userId]
        );

        await executeQuery(
          `INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)`,
          [userId, "EMOJI GAME", "EMOJI GAME BONUS", 120]
        );
      }
    } else {
      // For wrong answer, we don't mark as completed, allowing retry.
      // We could log the attempt if needed, but not marking as is_completed = true.
      await executeQuery(
        `INSERT INTO user_emoji_progress (user_id, day, game_number, is_completed, completed_at, program_type, language)
         VALUES (?, ?, ?, ?, NOW(), ?, ?)
         ON DUPLICATE KEY UPDATE completed_at = VALUES(completed_at), language = VALUES(language)`,
        [userId, day, game_number, false, program_type, language]
      );
    }

    res.json({
      correct: isCorrect,
      message: isCorrect ? "Correct 🎉" : "Wrong answer, try again!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


