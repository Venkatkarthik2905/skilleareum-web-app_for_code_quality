const { executeQuery } = require("../Db");

exports.handleCardClick = async (req, res) => {
    const { userId, program_type } = req.user;
    const { cardId } = req.query;
    console.log(req.query);
    
    if (!userId || !cardId) {
        return res.status(400).json({ message: "Invalid userId or cardId" });
    }

    try {
        // Check if user has already clicked the card in this program
        const existingClick = await executeQuery(
            `SELECT * FROM tool_clicks WHERE user_id = ? AND tool_id = ? AND program_type = ? AND points_claimed = 0 AND DATE(click_time) = CURDATE()`,
            [userId, cardId, program_type]
        );
        if (existingClick.length > 0) {
            return res.json({ message: 'You have already clicked this card. Please wait 4 hours to claim the reward.' });
        }
        const isNew = await executeQuery(
            `SELECT * FROM tool_clicks WHERE user_id = ? AND tool_id= ? AND program_type = ? AND DATE(click_time) = CURDATE()`,
            [userId,cardId, program_type]
        );
        // If there are no existing clicks, adjust the clickTime to be 4 hours 3 minutes in the past
        let isFirst =false;
        if (isNew.length === 0) {
          isFirst=true
        }

        // Insert new click event
        await executeQuery(
            'INSERT INTO tool_clicks (user_id, tool_id, click_time, points_claimed, visit_count, isFirstClick, program_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, cardId,  new Date(), 0, 1, isFirst, program_type]
        );

        return res.status(200).json({ message: 'Card clicked. You can claim your reward after 4 hours.' });
    } catch (error) {
        return res.status(400).json({ error });
    }
};


exports.claimClickReward= async (req, res) => {
    const { userId, program_type } = req.user;
    const { cardId } = req.query;

   try {
    const canClaim=
        await executeQuery(
            `SELECT 
        CASE 
          WHEN COUNT(*) >= 6 THEN 'false'
          ELSE 'true'
        END AS canClaim
      FROM tool_clicks
      WHERE user_id = ? 
      AND tool_id = ?
      AND program_type = ?
        AND DATE(claim_time) = CURDATE()
        AND points_claimed = 1;`,
            [userId, cardId, program_type]
        );

        console.log("canclaim :",canClaim[0].canClaim)
if(canClaim[0].canClaim=="false"){
    return res.status(200).json({ message: 'You have already claimed 500 points. Come tomorrow' });
}
   // Get the click event for the user and card in this program
    const clickEvent = await executeQuery(
        'SELECT * FROM tool_clicks WHERE user_id = ? AND tool_id = ? AND program_type = ? AND points_claimed = 0',
        [userId, cardId, program_type]
    );

    if (clickEvent.length === 0) {
        return res.status(400).json({ message: 'No reward available to claim for this card.' });
    }
    const isNew = await executeQuery(
        `SELECT * FROM tool_clicks WHERE user_id = ? AND tool_id= ? AND program_type = ? AND DATE(click_time) = CURDATE() AND points_claimed=1`,
        [userId, cardId, program_type]
    );
    // If there are no existing clicks, adjust the clickTime to be 4 hours 3 minutes in the past
    console.log(isNew.length)
    let isFirst =false;
    if (isNew.length > 0) {
      isFirst=true
  
    const clickTime = new Date(clickEvent[0].click_time);
    const now = new Date();

    // Check if 4 hours have passed since the card was clicked
    const fourHours = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    if (now - clickTime < fourHours) {
        const remainingTime = (fourHours - (now - clickTime)) / (1000 * 60); // Time remaining in minutes
        return res.status(400).json({
            message: `You need to wait ${Math.ceil(remainingTime)} more minutes to claim the reward.`,
        });
    }
    }
    // Reward the user with 100 points
    await executeQuery('UPDATE users_data SET token_balance = token_balance + 100 WHERE id = ?', [userId]);
    const passbookQuery =
    "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
  await executeQuery(passbookQuery, [
    userId,
    "AI SPACE BONUS",
    "AI Space Bonus credited",
    100,
  ]);
    // Mark the reward as claimed
    await executeQuery(
        'UPDATE tool_clicks SET points_claimed = 1, claim_time=? WHERE user_id = ? AND tool_id = ? AND program_type = ? AND points_claimed=0',
        [new Date(), userId, cardId, program_type]
    );

    return res.status(200).json({ message: 'Reward claimed successfully! 50 points credited.' });
} catch (error) {
    return res.status(400).json({error})
} 
}
exports.cardDetails = async (req, res) => {
    const { userId, program_type } = req.user;
    console.log(req.query);
    
    try {
        // Query to get the count of records for each card for the given user and program
        const data = await executeQuery(
            `SELECT tool_id, COUNT(*) AS card_count, SUM(visit_count) AS visited, MAX(click_time) AS click_time, MAX(isFirstClick) AS isFirstClick
             FROM tool_clicks
             WHERE user_id = ? AND program_type = ? AND points_claimed = 1
             GROUP BY tool_id`,
            [userId, program_type]
        );

        // Query to get visit_count for each tool regardless of points_claimed
        const visitedData = await executeQuery(
            `SELECT tool_id, SUM(visit_count) AS visited, MAX(click_time) AS click_time, MAX(isFirstClick) AS isFirstClick
             FROM tool_clicks
             WHERE user_id = ? AND program_type = ? AND points_claimed = 0
             GROUP BY tool_id`,
            [userId, program_type]
        );

        console.log(visitedData);
        console.log("card detail", data);
      
        // Check if no rewards found
        if (data.length === 0) {
            return res.status(200).json({ message: 'No rewards found for the user.', rewardDetails: visitedData });
        }

        // Create a map for visit counts based on tool_id
        const visitCountMap = {};
        visitedData.forEach(visit => {
            visitCountMap[visit.tool_id] = {
                visited: visit.visited,
                click_time: visit.click_time, // Store click_time here as well
                isFirstClick: visit.isFirstClick // Store isFirstClick here as well
            };
        });

        // Calculate total points for each card (50 points per record)
        const cardDetails = data.map(card => ({
            tool_id: card.tool_id,
            visited: (card.visited || 0) + (visitCountMap[card.tool_id]?.visited || 0) || 0, // Get visit count from the map, default to 0 if not found
            points_earned: card.card_count * 50,
            click_time: visitCountMap[card.tool_id]?.click_time || "",
            isFirstClick: visitCountMap[card.tool_id]?.isFirstClick || false // Include isFirstClick in the response
        }));

        // Include visit counts for tools with no claimed points
        visitedData.forEach(visit => {
            if (!cardDetails.some(card => card.tool_id === visit.tool_id)) {
                cardDetails.push({
                    tool_id: visit.tool_id,
                    visited: visit.visited,
                    click_time: visit.click_time,
                    points_earned: 0, // No points earned for this tool
                    isFirstClick: visit.isFirstClick || false // No claims, so add isFirstClick value
                });
            }
        });
       
        // Return the points earned per card
        return res.status(200).json({
            message: 'Reward points fetched successfully.',
            rewardDetails: cardDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error });
    }
};


exports.AIspaceCronTest= async (req,res) => {
    try {
        // Disable previous day's clicks
        await executeQuery(
            `UPDATE tool_clicks SET points_claimed = 1 
             WHERE DATE(click_time) < CURDATE()`
        );
        console.log('Tool clicks reset for the new day.');
        res.send("Cron executed")
    } catch (error) {
        console.error('Error during midnight reset:', error);
    }
  }

  exports.getAiMission = async (req, res) => {
  
    const {program_type,userId}=req.user;
    const { language = 'en' } = req.query;

    if (!userId)
      return res.status(400).json({ message: "User Id is required" });
  
    try {
      const userProgress = await executeQuery(
        `SELECT day, claimed_at, is_claimed FROM user_ai_mission_progress WHERE user_id = ? AND program_type = ? ORDER BY day ASC`,
        [userId,program_type]
      );
  
      let currentDay = 1;
      let isClaimed = false;
  


    if (userProgress.length) {
      const last = userProgress[userProgress.length - 1];

      if (last.is_claimed) {
        currentDay = last.day + 1;
        isClaimed = false;
      } else {
        currentDay = last.day;
        isClaimed = false;
      }
    }
      // if (userProgress.length) {
      //   const last = userProgress[userProgress.length - 1];
      //   const lastClaimedDate = new Date(last.claimed_at);
      //   const today = new Date();
  
      //   const isSameDay =
      //     lastClaimedDate.getFullYear() === today.getFullYear() &&
      //     lastClaimedDate.getMonth() === today.getMonth() &&
      //     lastClaimedDate.getDate() === today.getDate();
  
      //   if (isSameDay) {
      //     currentDay = last.day;
      //     isClaimed = Boolean(last.is_claimed);
      //   } else {
      //     currentDay = last.day + 1;
      //     isClaimed = false;
      //   }
      // }
  
      const mission = await executeQuery(
        `SELECT * FROM ai_space_mission WHERE day = ? AND program_type = ? AND language = ?`,
        [currentDay,program_type, language]
      );

      // Fallback
      if (mission.length === 0 && language !== 'en') {
        const fallbackMission = await executeQuery(
          `SELECT * FROM ai_space_mission WHERE day = ? AND program_type = ? AND language = 'en'`,
          [currentDay,program_type]
        );
        if (fallbackMission.length > 0) {
          return res.status(200).json({
            message: "Mission fetched successfully",
            day: currentDay,
            mission: fallbackMission[0],
            isClaimed
          });
        }
      }
  
      if (!mission.length) {
        return res.status(404).json({ message: "Mission not found for this day" });
      }
  
      return res.status(200).json({
        message: "Mission fetched successfully",
        day: currentDay,
        mission: mission[0],
        isClaimed
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
  
  
  exports.claimAiMission = async (req, res) => {
    const { day, language = 'en' } = req.body;
    const {program_type,userId}=req.user;

    if (!userId || !day) {
      return res.status(400).json({ message: "User Id and Day are required" });
    }
  
    try {
      const today = new Date().toISOString().split('T')[0];
      const parsedDay = parseInt(day);
  
      // Get user's latest mission progress
      const userProgress = await executeQuery(
        `SELECT * FROM user_ai_mission_progress WHERE user_id = ? AND program_type = ? ORDER BY day DESC LIMIT 1`,
        [userId,program_type]
      );
  
      if (!userProgress.length) {
        if (parsedDay !== 1) {
          return res.status(400).json({ message: "User has not started AI mission yet" });
        }
  
        // Insert and claim Day 1
        await executeQuery(
          `INSERT INTO user_ai_mission_progress (user_id, day, is_claimed, claimed_at, program_type, language) VALUES (?, ?, ?, ?, ?, ?)`,
          [userId, 1, true, today, program_type, language]
        );
  
        await executeQuery(
          `UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?`,
          [500, userId]
        );
  
        await executeQuery(
          `INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)`,
          [userId, "AI MISSION", `AI MISSION DAY-1 BONUS`, 500]
        );
  
        return res.status(200).json({
          message: "AI Mission Day-1 claimed successfully! Reward credited."
        });
      }
  
      const { day: latestDay, is_claimed } = userProgress[0];
      const nextDay = latestDay + 1;
  
      // Case: trying to skip a day
      if (parsedDay > nextDay) {
        return res.status(400).json({ message: `You can only claim Day-${nextDay} mission` });
      }
  
      // Case: trying to re-claim a claimed day
      const checkIfAlreadyExists = await executeQuery(
        `SELECT * FROM user_ai_mission_progress WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, parsedDay,program_type]
      );
  
      if (checkIfAlreadyExists.length && checkIfAlreadyExists[0].is_claimed) {
        return res.status(400).json({ message: "This day's mission is already claimed" });
      }
  
      // If row for this day doesn't exist, insert it
      if (!checkIfAlreadyExists.length) {
        await executeQuery(
          `INSERT INTO user_ai_mission_progress (user_id, day, is_claimed, claimed_at, program_type, language) VALUES (?, ?, ?, ?, ?, ?)`,
          [userId, parsedDay, true, today, program_type, language]
        );
      } else {
        // Otherwise just mark as claimed
        await executeQuery(
          `UPDATE user_ai_mission_progress SET is_claimed = true, claimed_at = ?, language = ? WHERE user_id = ? AND day = ? AND program_type = ?`,
          [today, language, userId, parsedDay, program_type]
        );
      }
  
      // Credit reward
      await executeQuery(
        `UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?`,
        [500, userId]
      );
  
      // Log in passbook
      await executeQuery(
        `INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)`,
        [userId, "AI MISSION", `AI MISSION DAY-${parsedDay} BONUS`, 500]
      );
  
      return res.status(200).json({
        message: `AI Mission Day-${parsedDay} claimed successfully! Reward credited.`
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
  
    