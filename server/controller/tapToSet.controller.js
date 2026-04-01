const { executeQuery } = require("../Db");
function getRandomLetters(correctLetter, numOptions) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const randomLetters = new Set([correctLetter]); // Start with the correct letter
  while (randomLetters.size < numOptions) {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    randomLetters.add(randomLetter);
  }
  return Array.from(randomLetters).sort(); // Convert to array and sort for consistency
}

function getWordWithMissingLetter(word, numOptions) {
  const randomIndex = Math.floor(Math.random() * word.length);
  const missingLetter = word[randomIndex];
  const wordWithMissing =
    word.slice(0, randomIndex) + "_" + word.slice(randomIndex + 1);
  const options = getRandomLetters(missingLetter, numOptions);
  return { word: wordWithMissing, missingLetter, options };
}
exports.getWord = async (req, res) => {
  //   console.log("hi");
  try {
    const difficulty = req.query.difficulty;
    const userId = req.query.userId;
    // console.log(difficulty);

    if (!difficulty) {
      return res
        .status(400)
        .json({ error: "Difficulty parameter is required" });
    }

    const query = "SELECT * FROM taptoset WHERE difficulty = ?";

    const response = await executeQuery(query, [difficulty]);
    // console.log(response);
    const balance = await executeQuery(
      "SELECT token_balance,referral_code FROM users_data WHERE id = ?",
      [userId]
    );
    console.log(balance);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    let lastLeft = 0;
    let lastTop = 0;

    const lettersData = alphabet.map((letter, index) => {
      const animationDelay = index * 0.9;

      let left = Math.random() * 80 + 10;
      let top = Math.random() * 40 + 10;

      while (Math.abs(left - lastLeft) < 10 && Math.abs(top - lastTop) < 10) {
        left = Math.random() * 80 + 10;
        top = Math.random() * 40 + 10;
      }

      lastLeft = left;
      lastTop = top;

      return {
        letter,
        id: index,
        left,
        top,
        animationDuration: 35,
        animationDelay,
        isVisible: true,
      };
    });

    if (response.length > 0) {
      const index = Math.floor(Math.random() * response.length);
      const randomWord = response[index].answer;
      const numOptions =
        difficulty === "Easy" ? 3 : difficulty === "Medium" ? 4 : 5;
      const wordData = getWordWithMissingLetter(randomWord, numOptions);
      // console.log("wordData", wordData);
      wordData.answer = randomWord;
      wordData.question = response[index].question;
      wordData.balance = balance[0].token_balance;
      wordData.code = balance[0].referral_code;
      wordData.letter = lettersData;
      res.json(wordData);
    } else {
      return res.status(404).json({ error: "Word not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
exports.addPoint = async (req, res) => {
  const { userId, difficulty, status } = req.body;
  try {
    if (!userId || !difficulty) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    let point = 0;
    if (difficulty === "Easy") {
      point = 1;
    } else if (difficulty === "Medium") {
      point = 2;
    } else if (difficulty === "Hard") {
      point = 3;
    }
    if (status === "correct") {
      const query = `UPDATE users_data SET token_balance = token_balance + ?  WHERE id = ?`;
      await executeQuery(query, [point, userId]);
      return res.status(200).json({ message: "Points added successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};


exports.expireFrozenRewards = async (req, res) => {
  const now = new Date();
  now.setDate(now.getDate() - 30); // Get the date 30 days ago
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

  // Get all frozen rewards older than 30 days
  const expiredRewards = await executeQuery(
      `SELECT id, userId, amount FROM freezed_amount WHERE status = 'freezed' AND createdAt <= ?`,
      [formattedDate]
  );

  if (expiredRewards.length === 0) return;

  // Move expired rewards to Community Fund
  for (const reward of expiredRewards) {
    

    // Update the reward status and set the message
    await executeQuery(
        `UPDATE freezed_amount SET status = 'expired',readed=0, message = ? WHERE id = ?`,
        ["Your frozen rewards have expired and moved to the community fund.", reward.id]
    );
}

 return res.json(`Expired ${expiredRewards.length} frozen rewards.`);
};

exports.sendMidwayReminders = async (req,res) => {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  const formattedDate = fifteenDaysAgo.toISOString().slice(0, 19).replace('T', ' ');

  // Update message and reset readed status
  await executeQuery(
      `UPDATE freezed_amount 
       SET message = ?, 
           readed = 0 
       WHERE status = 'freezed' AND createdAt <= ?`,
      ["Reminder: You have 15 days left to upgrade and claim your reward.", formattedDate]
  );

  return res.json("Midway reminders updated in freezed_amount.message.");
};

exports.sendFinalReminders = async (req,res) => {
  const twoDaysLeft = new Date();
  twoDaysLeft.setDate(twoDaysLeft.getDate() - 28);
  const formattedDate = twoDaysLeft.toISOString().slice(0, 19).replace('T', ' ');

  // Update message and reset readed status
  await executeQuery(
      `UPDATE freezed_amount 
       SET message = ?, 
           readed = 0 
       WHERE status = 'freezed' AND createdAt <= ?`,
      ["Final Notice: Upgrade within 2 days to claim your frozen rewards!", formattedDate]
  );

  return res.json("Final reminders updated in freezed_amount.message.");
};



exports.addSpinsForActiveUsers = async (req,res) => {
  try {
    await executeQuery(`
      UPDATE users_data
      SET
        current_spins = CASE
                          WHEN sub_status = 'active' THEN 
                            CASE
                              WHEN current_spins < 3 THEN current_spins + 1
                              ELSE 3
                            END
                          ELSE current_spins
                        END,
        missing_life = CASE
                          WHEN missing_life < 3 THEN missing_life + 1
                          ELSE 3
                        END,
        perfectmatch_life = CASE
                          WHEN perfectmatch_life < 3 THEN perfectmatch_life + 1
                          ELSE 3
                        END,
        memory_life = CASE
                          WHEN memory_life < 3 THEN memory_life + 1
                          ELSE 3
                        END,
        jumble_life = CASE
                        WHEN jumble_life < 3 THEN jumble_life + 1
                        ELSE 3
                      END
      WHERE sub_status = 'active';
    `);
    console.log("Updated spins for active users");
    return res.json("success")
  } catch (error) {
    return res.json(error)
    console.error("Error updating spins for active users:", error);
  }
};
exports.addSpinsForInactiveUsers = async (req,res) => {
  try {
    await executeQuery(`
      UPDATE users_data
      SET current_spins = CASE 
                            WHEN current_spins < 1 THEN current_spins + 1 
                            ELSE 1 
                          END
      WHERE sub_status != 'active';
    `);
    console.log("Updated spins for inactive users");
  } catch (error) {
    console.error("Error updating spins for inactive users:", error);
  }
};

exports.markMessageAsRead = async (req, res) => {
  const { messageId } = req.body;

  if (!messageId) {
    return res.status(400).json({ error: 'Message ID is required' });
  }

  try {
    // Update the 'readed' column to 1 (marked as read) for the specified message ID
    const query = `UPDATE freezed_amount SET readed = 1 WHERE id = ?`;
    const values = [messageId];

    const result = await executeQuery(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error marking message as read:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};