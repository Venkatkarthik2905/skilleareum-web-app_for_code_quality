const { executeQuery } = require("../Db");

exports.startFarming = async (req, res) => {
  const { userId } = req.user;
  const checkQuery =
    "SELECT * FROM FarmingSessions WHERE user_id = ? AND claimed = ?";
  const existingSessions = await executeQuery(checkQuery, [userId, false]);
  //console.log(existingSessions);
  if (existingSessions.length > 0)
    return res.status(409).json({
      message: "Farming session is already in progress.",
    });

  const checkIntervalQuery = `
    SELECT * FROM FarmingSessions 
    WHERE user_id = ? 
    ORDER BY end_time DESC 
    LIMIT 1
  `;
  const [latestSession] = await executeQuery(checkIntervalQuery, [userId]);
  // //console.log(latestSession);
  let startTime = new Date();
  let endTime;
  let boosterId = null;

  if (latestSession) {
    // Calculate the interval from the latest session
    const previousInterval =
      new Date(latestSession.end_time) - new Date(latestSession.start_time);

    // Add the interval to the current time to determine the new end time
    endTime = new Date(startTime.getTime() + previousInterval);

    //Add previos session booster plan
    boosterId = latestSession.booster_plan_id;
  } else {
    // No previous session, use the default 1-hour interval
    endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    boosterId = null;
  }
  // //console.log(startTime, endTime);

  const createQuery =
    "INSERT INTO FarmingSessions (user_id, start_time, end_time,booster_plan_id, claimed) VALUES (?, ?,?, ?, ?)";
  const response = await executeQuery(createQuery, [
    userId,
    startTime,
    endTime,
    boosterId,
    false,
  ]);

  res.json({ message: "Farming session started", session: response });
};

exports.claimSkillPoints = async (req, res) => {
  const { userId } = req.user;

  // Retrieve the active (unclaimed) farming session for the user
  const sessionQuery = `
    SELECT fs.*, bp.*
    FROM FarmingSessions fs
    LEFT JOIN BoosterPlans bp ON fs.booster_plan_id = bp.id
    WHERE fs.user_id = ? AND fs.claimed = ?`;
  const session = await executeQuery(sessionQuery, [userId, false]);
  if (session.length <= 0) {
    return res
      .status(404)
      .json({ message: "No active farming session found." });
  }
  if (new Date() >= session[0].end_time) {
    // Calculate the difference in hours between start and end times
    const startTime = new Date(session[0].start_time);
    const endTime = new Date(session[0].end_time);
    const hoursDiff = Math.floor((endTime - startTime) / (1000 * 60 * 60));

    // Determine skill points based on the booster plan or default value
    const baseSkillPoints = session[0].booster_plan_id
      ? session[0].output_per_hour
      : 10;
    const skillPoints = baseSkillPoints * hoursDiff;

    // Retrieve the user's current token balance
    const getUser = "SELECT * FROM users_data WHERE id = ?";
    const getReponse = await executeQuery(getUser, userId);

    if (getReponse.length > 0) {
      // Update the user's token balance
      const balance = getReponse[0].token_balance + skillPoints;
      const updateQuery = "UPDATE users_data SET token_balance = ? WHERE id= ?";
      await executeQuery(updateQuery, [balance, userId]);

      // Log the transaction in the passbook
      const passbookQuery =
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
      await executeQuery(passbookQuery, [
        userId,
        "FARMING BONUS",
        "Farming Bonus credited",
        skillPoints,
      ]);
    }

    // Mark the farming session as claimed
    const updateQuery =
      "UPDATE FarmingSessions SET claimed = true WHERE user_id = ? AND claimed = false";
    await executeQuery(updateQuery, [userId]);

    res.json({ message: "Skill points claimed", skillPoints });
  } else {
    res.status(400).json({ message: "Farming session not yet complete" });
  }
};

exports.applyBooster = async (req, res) => {
  const {boosterId } = req.query;
  const { userId } = req.user;
  const NewUserQuery = `SELECT *
  FROM FarmingSessions
  WHERE user_id = ?;`;
  const isNewUser = await executeQuery(NewUserQuery, [userId]);
  if (isNewUser.length <= 1) {
    return res
      .status(404)
      .json({ message: "Complete your farming session to apply" });
  }

  // Retrieve the active farming session for the user
  const sessionQuery =
    "SELECT * FROM FarmingSessions WHERE user_id = ? AND claimed = ?";
  const session = await executeQuery(sessionQuery, [userId, false]);
  if (session.length <= 0) {
    return res
      .status(404)
      .json({ message: "No active farming session found." });
  }

  // Validate the booster plan
  const boosterQuery = "SELECT * FROM BoosterPlans WHERE id = ?";
  const boosterData = await executeQuery(boosterQuery, [boosterId]);
  if (boosterData.length <= 0)
    return res.status(404).json({ message: "Booster plan is not valid" });

  // Check if the booster plan is already applied
  if (session[0].booster_plan_id == boosterId) {
    return res
      .status(400)
      .json({ message: "This booster plan is already applied" });
  }
  if (session[0].booster_plan_id > boosterId) {
    return res.status(400).json({ message: "Cannot decrease booster plan" });
  }

  // Retrieve and validate the user's data
  const getUser = "SELECT * FROM users_data WHERE id = ?";
  const getReponse = await executeQuery(getUser, userId);
  if (getReponse.length <= 0)
    return res.status(404).json({ message: "User not found" });

  // Check if the user has enough tokens to apply the booster
  const skillPoints = boosterData[0].cost ? boosterData[0].cost : 0;
  if (getReponse[0].token_balance < skillPoints)
    return res.status(404).json({ message: "Insufficient coins" });

  const farmingQuery = `
  SELECT fs.*, bp.output_per_hour
  FROM FarmingSessions fs
  LEFT JOIN BoosterPlans bp ON fs.booster_plan_id = bp.id
  WHERE fs.user_id = ? AND fs.claimed = ?
  ORDER BY fs.start_time DESC LIMIT 1;
`;

  const farmingResult = await executeQuery(farmingQuery, [userId, false]);
  // //console.log(farmingResult);
  const now = new Date().getTime();
  const start = new Date(farmingResult[0].start_time).getTime();
  const elapsed = now - start;
  // //console.log(farmingResult[0].startTime);

  const baseSkillPoints = farmingResult[0].booster_plan_id
    ? farmingResult[0].output_per_hour
    : 10;
  const coinsEarned = ((baseSkillPoints * elapsed) / (1000 * 60 * 60)).toFixed(
    0
  );

  const NewBalance =
    parseInt(getReponse[0].token_balance) + parseInt(coinsEarned);
  const ADDQuery = "UPDATE users_data SET token_balance = ? WHERE id= ?";
  await executeQuery(ADDQuery, [NewBalance, userId]);

  // Log the transaction in the passbook
  const passbook =
    "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
  await executeQuery(passbook, [
    userId,
    "FARMING BONUS",
    "Farming Bonus credited",
    coinsEarned,
  ]);
  const updateFarming =
    "UPDATE FarmingSessions SET booster_plan_id = ?, booster_applied_time = ?,claimed = true WHERE user_id = ? AND claimed = ?";
  await executeQuery(updateFarming, [boosterId, new Date(), userId, false]);
  // Deduct the booster cost from the user's token balance
  const balance = getReponse[0].token_balance - skillPoints;
  const updateQuery = "UPDATE users_data SET token_balance = ? WHERE id= ?";
  await executeQuery(updateQuery, [balance, userId]);

  // Log the deduction in the passbook
  const passbookQuery =
    "INSERT INTO passbook (user_id, action, description, type, amount) VALUES (?,?, ?, ?, ?)";
  await executeQuery(passbookQuery, [
    userId,
    "APPLY BOOSTER",
    "Apply Booster amount deducted",
    "DEBIT",
    `-${skillPoints}`,
  ]);

  return res.status(200).json({ message: "Booster plan applied" });
};

exports.applyUpgradeBurn = async (req, res) => {
  const {  burnId } = req.query;
const { userId } = req.user;
  const NewUserQuery = `SELECT *
  FROM FarmingSessions
  WHERE user_id = ?;`;
  const isNewUser = await executeQuery(NewUserQuery, [userId]);
  if (isNewUser.length <= 1) {
    return res
      .status(404)
      .json({ message: "Complete your farming session to apply" });
  }

  // Retrieve the upgrade burn details
  try {
    const burnQuery = "SELECT * FROM UpgradeBurn WHERE id = ?";
    const burn = await executeQuery(burnQuery, [burnId]);
    if (burn.length <= 0) {
      return res
        .status(400)
        .json({ message: "You have reached the highest level." });
    }

    // Retrieve the active farming session for the user
    const sessionQuery =
      "SELECT * FROM FarmingSessions WHERE user_id = ? AND claimed = ?";
    const session = await executeQuery(sessionQuery, [userId, false]);
    if (session.length <= 0)
      return res.status(404).json({ message: "No active session found" });

    // Check if the burn is already applied
    if (session[0].burn_id === burnId) {
      return res
        .status(400)
        .json({ message: "This upgrade burn is already applied" });
    }

    // Calculate the new end time by extending the session duration
    const newEndTime = new Date(
      new Date(session[0].start_time).getTime() +
        burn[0].interval_hours * 60 * 60 * 1000
    );

    // Retrieve and validate the user's data
    const getUser = "SELECT * FROM users_data WHERE id = ?";
    const getReponse = await executeQuery(getUser, [userId]);
    if (getReponse.length <= 0)
      return res.status(404).json({ message: "User not found" });

    // Check if the user has enough tokens to apply the upgrade burn
    const skillPoints = burn[0].cost ? burn[0].cost : 0;
    if (getReponse[0].token_balance < skillPoints)
      return res.status(404).json({ message: "Insufficient coins" });

    // Deduct the burn cost from the user's token balance

    // Update the farming session with the new end time
    await executeQuery(
      "UPDATE FarmingSessions SET burn_id = ?, end_time = ? WHERE id=?",
      [burnId, newEndTime, session[0].id]
    );

    // Log the earned farming bonus
    const now = new Date().getTime();
    const start = new Date(session[0].start_time).getTime();
    const elapsed = now - start;
    const perHour = {
      1: 25,
      2: 50,
      3: 75,
      4: 100,
    };

    const baseSkillPoints = session[0].booster_plan_id
      ? perHour[session[0].booster_plan_id]
      : 10;

    const coinsEarned = (
      (baseSkillPoints * elapsed) /
      (1000 * 60 * 60)
    ).toFixed(0);

    const NewBalance =
      parseInt(getReponse[0].token_balance) + parseInt(coinsEarned);
    await executeQuery("UPDATE users_data SET token_balance = ? WHERE id= ?", [
      NewBalance,
      userId,
    ]);

    // Log the farming bonus in the passbook
    await executeQuery(
      "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)",
      [userId, "FARMING BONUS", "Farming Bonus credited", coinsEarned]
    );
    const balance = getReponse[0].token_balance - skillPoints;
    await executeQuery("UPDATE users_data SET token_balance = ? WHERE id= ?", [
      balance,
      userId,
    ]);

    // Log the deduction in the passbook
    await executeQuery(
      "INSERT INTO passbook (user_id, action, type, description, amount) VALUES (?,?,?, ?, ?)",
      [
        userId,
        "APPLY UPGRADE BURN",
        "DEBIT",
        "Apply Burn amount deducted",
        `-${skillPoints}`,
      ]
    );
    // Mark the session as claimed
    await executeQuery("UPDATE FarmingSessions SET claimed = true WHERE id=?", [
      session[0].id,
    ]);

    return res.json({ message: "Upgrade burn applied", newEndTime });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, message: error.message });
  }
};

exports.getUserEarnings = async (req, res) => {
 const { userId } = req.user;

  try {
    // Query to get the total earnings for the user
    const totalEarningsQuery = `
      SELECT token_balance as totalEarnings
      FROM users_data
      WHERE id = ?
    `;
    const totalEarningsResult = await executeQuery(totalEarningsQuery, [
      userId,
    ]);

    // Query to get the total earned by "FARMING BONUS" for the user
    const farmingBonusQuery = `
      SELECT SUM(amount) as farmingBonus
      FROM passbook
      WHERE user_id = ? AND action = 'FARMING BONUS'
    `;
    const farmingBonusResult = await executeQuery(farmingBonusQuery, [userId]);

    const totalEarnings = totalEarningsResult[0].totalEarnings || 0;
    const farmingBonus = farmingBonusResult[0].farmingBonus || 0;

    res.status(200).json({
      userId,
      totalEarnings,
      farmingBonus,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving earnings", error });
  }
};
exports.getFarmingStatus = async (req, res) => {
  try {
    const { flag } = req.query;
    const { userId } = req.user;

    // Query to fetch the latest unclaimed farming session with the associated booster plan
    const farmingQuery = `
      SELECT fs.*, bp.output_per_hour
      FROM FarmingSessions fs
      LEFT JOIN BoosterPlans bp ON fs.booster_plan_id = bp.id
      WHERE fs.user_id = ? AND fs.claimed = ?
      ORDER BY fs.start_time DESC LIMIT 1;
    `;

    const farmingResult = await executeQuery(farmingQuery, [userId, false]);
    const NewUserQuery = `SELECT *
    FROM FarmingSessions
    WHERE user_id = ?;`;
    const isNewUser = await executeQuery(NewUserQuery, [userId]);
    // //console.log(isNewUser.length);
    if (flag == 1) {
      return res.status(200).json({
        isNewUser: isNewUser.length > 0 ? false : true,
      });
    }
    if (farmingResult.length === 0) {
      return res.status(200).json({
        farmingStatus: false,
        isNewUser: isNewUser.length > 1 ? false : true,

        endTime: null,
        startTime: null,
        boost: "",
        outputPerHour: 0,
      });
    }

    const {
      end_time: endTime,
      start_time: startTime,
      booster_plan_id: boost,
      output_per_hour: outputPerHour,
    } = farmingResult[0];
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);
    const durationInMs = endTimeDate - startTimeDate; // Difference in milliseconds
    const durationInHours = Math.floor(durationInMs / (1000 * 60 * 60));

    // Fetch the interval hours from the upgradeburn table
    const upgradeBurnQuery =
      "SELECT id, interval_hours FROM UpgradeBurn ORDER BY interval_hours ASC;";
    const upgradeBurns = await executeQuery(upgradeBurnQuery);

    // Determine the next interval ID
    let nextIntervalId = null;
    for (let i = 0; i < upgradeBurns.length; i++) {
      if (durationInHours < upgradeBurns[i].interval_hours) {
        nextIntervalId = upgradeBurns[i].id;
        break;
      }
    }

    return res.status(200).json({
      farmingStatus: true,
      endTime,
      startTime,
      boost: boost || "", // Default to an empty string if no boost is active
      outputPerHour: outputPerHour || 10, // Default to 10 if no output per hour is specified
      duration: durationInHours,
      nextIntervalId,
      isNewUser: isNewUser.length > 1 ? false : true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving farming status", error });
  }
};

exports.getBoostExpiration = async (req, res) => {
  try {
    const { userId } = req.user;

    // Retrieve the active farming session for the user
    const sessionQuery = `
  SELECT * FROM FarmingSessions 
  WHERE user_id = ? 
    AND booster_applied_time IS NOT NULL 
  ORDER BY end_time DESC 
  LIMIT 1
`;

    const session = await executeQuery(sessionQuery, [userId]);

    if (session.length === 0) {
      return res
        .status(404)
        .json({ message: "No active farming session found." });
    }

    const boostStartTime = new Date(session[0].booster_applied_time);
    const boostEndTime = new Date(boostStartTime);

    // Get the booster plan duration based on the booster's ID
    const boosterQuery = "SELECT * FROM BoosterPlans WHERE id = ?";
    const boosterData = await executeQuery(boosterQuery, [
      session[0].booster_plan_id,
    ]);

    if (boosterData.length === 0) {
      return res.status(404).json({ message: "Booster plan not found." });
    }

    const boosterDurationInHours =
      boosterData[0].id === 1
        ? 120
        : boosterData[0].id === 2
        ? 150
        : boosterData[0].id === 3
        ? 200
        : 300;

    boostEndTime.setHours(boostEndTime.getHours() + boosterDurationInHours);
    if (boostEndTime < new Date()) {
      const clearBoostQuery = `
  UPDATE FarmingSessions
  SET booster_applied_time = NULL
  WHERE user_id = ?
    AND booster_applied_time IS NOT NULL
`;
      const clearBoosterPlanQuery = `
  UPDATE FarmingSessions
  SET booster_plan_id = NULL
  WHERE user_id = ?
    AND booster_plan_id IS NOT NULL
`;

      // Execute the update query to clear the booster plan ID
      await executeQuery(clearBoosterPlanQuery, [userId]);

      // Execute the update query to clear the boost applied time
      await executeQuery(clearBoostQuery, [userId]);
    }
    return res.status(200).json({
      message: "Boost expiration data fetched successfully",
      boostExpiration: {
        boostStartTime,
        boostEndTime,
      },
    });
  } catch (error) {
    //console.error("Error fetching boost expiration data:", error);
    res.status(500).json({ message: "Error fetching boost expiration data" });
  }
};

exports.getRandomQuestion = async (req, res) => {
  try {
    const query = `SELECT question, answer FROM doyouknow ORDER BY RAND() LIMIT 1`;
    const [randomQuestion] = await executeQuery(query);

    if (!randomQuestion) {
      return res.status(404).json({ message: "No questions found" });
    }

    return res.status(200).json(randomQuestion);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
