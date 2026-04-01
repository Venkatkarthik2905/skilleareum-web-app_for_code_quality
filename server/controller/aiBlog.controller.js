const { executeQuery } = require("../Db");

exports.getAiBlog = async (req, res) => {
    const { userId, program_type } = req.user;
    let language = req.query.language || "en";

    if (!userId) return res.status(400).json({ message: "User Id is mandatory" });
  
    try {
      const userProgress = await executeQuery(
        `SELECT day, claimed_at FROM user_ai_blog_progress WHERE user_id = ? AND program_type = ? AND is_claimed = true ORDER BY day ASC`,
        [userId, program_type]
      );
  
      let nextDay = 1;
      let canClaim = true;
  
      if (userProgress.length) {
        const lastClaim = userProgress[userProgress.length - 1];
        const lastClaimedDate = new Date(lastClaim.claimed_at);
        const today = new Date();
  
        const isSameDay =
          lastClaimedDate.getFullYear() === today.getFullYear() &&
          lastClaimedDate.getMonth() === today.getMonth() &&
          lastClaimedDate.getDate() === today.getDate();
  

           nextDay = lastClaim.day + 1; 
        // if (isSameDay) {
        //   nextDay = lastClaim.day; // stay on same day
        //   canClaim = false;
        // } else {
        //   nextDay = lastClaim.day + 1; // go to next day
        // }
      }

      // Language fallback check
      const langExists = await executeQuery(
        `SELECT 1 FROM ai_blogs WHERE day = ? AND program_type = ? AND language = ? LIMIT 1`,
        [nextDay, program_type, language]
      );

      if (langExists.length === 0) {
        language = "en";
      }
  
      const blog = await executeQuery(
        `SELECT * FROM ai_blogs WHERE day = ? AND program_type = ? AND language = ?`,
        [nextDay, program_type, language]
      );
  
      if (!blog.length) {
        return res.status(404).json({ message: "No more blogs available" });
      }
  
      return res.json({ day: nextDay, blog: blog[0], canClaim, languageUsed: language });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  exports.getCurrentAiBlogDay = async (req, res) => {
        const { userId,program_type } = req.user;
    if (!userId) {
      return res.status(400).json({ message: "User Id is mandatory" });
    }
  
    try {
      const userProgress = await executeQuery(
        `SELECT day, claimed_at FROM user_ai_blog_progress WHERE user_id = ? AND is_claimed = true AND program_type = ? ORDER BY day ASC`,
        [userId,program_type]
      );
  
      let currentDay = 1;
let canClaim = true;


    if (userProgress.length) {
      const lastClaim = userProgress[userProgress.length - 1];
      currentDay = lastClaim.day + 1;
      canClaim = true;
    }


// if (userProgress.length) {
//   const lastClaim = userProgress[userProgress.length - 1];
//   const lastClaimedDate = new Date(lastClaim.claimed_at);
//   const today = new Date();

//   const isSameDay =
//     lastClaimedDate.getFullYear() === today.getFullYear() &&
//     lastClaimedDate.getMonth() === today.getMonth() &&
//     lastClaimedDate.getDate() === today.getDate();

//   if (isSameDay) {
//     currentDay = lastClaim.day;
//     canClaim = false;
//   } else {
//     currentDay = lastClaim.day + 1;
//   }
// }
  
      return res.json({ currentDay, canClaim });
    } catch (err) {
      console.error("Error fetching current AI blog day:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  exports.claimAiBlog = async (req, res) => {
    const { day, language = 'en' } = req.body;
    const { program_type, userId } = req.user;
    console.log("claimAiBlog : ", program_type)
    if (!program_type) {
      return res.status(400).json({ message: "Program type missing from request" });
    }

    if (!userId || !day) return res.status(400).json({ message: "User Id and Day are required" });

    try {
      const alreadyClaimed = await executeQuery(
        `SELECT * FROM user_ai_blog_progress WHERE user_id = ? AND day = ? and program_type= ? AND is_claimed = true`,
        [userId, day, program_type]
      );

      if (alreadyClaimed.length) {
        return res.status(400).json({ message: "Already claimed" });
      }
      console.log("program_type from req.user:", req.user?.program_type);
      console.log("Final INSERT values:", userId, day, program_type, language);


      await executeQuery(
        `INSERT INTO user_ai_blog_progress (user_id, day, is_claimed, claimed_at, program_type, language)
   VALUES (?, ?, true, NOW(), ?, ?)
   ON DUPLICATE KEY UPDATE 
     is_claimed = VALUES(is_claimed), 
     claimed_at = VALUES(claimed_at), 
     program_type = VALUES(program_type),
     language = VALUES(language)`,
        [userId, day, program_type, language]
      );

      await executeQuery(
        `UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?`,
        [220, userId]
      );

      await executeQuery(
        `INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)`,
        [userId, "AI BLOG", "AI BLOG CLAIM BONUS", 220]
      );

      return res.status(200).json({ message: "AI Blog claimed successfully and reward credited!" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };