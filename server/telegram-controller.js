const express = require("express");
const bcrypt = require("bcrypt");
// const ethers = require('ethers');
const { executeQuery } = require("./Db");
const BonusPoint = require("./config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const axios = require("axios");
const {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys
} = require('@getbrevo/brevo');

const apiInstance = new TransactionalEmailsApi();
function randomnumber() {
  return Math.floor(Math.random() * (100000 - 1000) + 100000);
}
const JWT_SECRET = "nmGgh9CYN2wvXi7qrNTaLSRFyQE3s7A7";

const SignUpUser = async (req, res) => {
  try {
    const { name, chatId, referral_code, community, source,email } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(chatId, 10);

    const checkQuery = "SELECT * FROM users_data WHERE chatId = ?";
    const checkValues = [chatId];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length > 0) {
      return res
        .status(200)
        .json({ status: "failed", message: "chatId already exists" });
    }

    let referred_by = 0;
    let referrer_community;
    if (referral_code !== null) {
      const getReferral = "SELECT * FROM users_data WHERE referral_code = ?";
      const getReponse = await executeQuery(getReferral, referral_code);
      if (referral_code.length > 0) {
        const getUser = "SELECT * FROM users_data WHERE referral_code = ?";
        const getUserReponse = await executeQuery(getUser, referral_code);
        if (getUserReponse.length <= 0) {
          return res.json({
            status: "Failed",
            message: "Invalid Referral code",
          });
        }
      }
      if (getReponse.length > 0) {
        referred_by = getReponse[0].id;
        referrer_community = getReponse[0].community;
        // Update referrer's balance
        let dogs_referral_point = (referrer_community == 'MBC') ? BonusPoint.PointBook.MBC_dogsBonus : BonusPoint.PointBook.dogsBonus;
        let balance = parseFloat(getReponse[0].token_balance) + BonusPoint.PointBook.referralPoint;
        let dogs_balance = parseFloat(getReponse[0].dogs) + dogs_referral_point;
        const updateQuery = "UPDATE users_data SET token_balance = ? WHERE id= ?";
        await executeQuery(updateQuery, [balance, referred_by]);

        const description = "Referral bonus credited! " + chatId + " joined using your code.";
        const passbookQuery = "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
        

        await executeQuery(passbookQuery, [referred_by, "REFERRAL BONUS", description, 1000]);
     

        // Check referrer's referral count

      }
    } else {
      return res.status(200).json({
        status: "failed",
        message: "You must have a referral code to proceed",
      });
    }

    const refferalCode = "SKLR" + randomnumber();
    const specialEmails = [
      "marketwithabbu@gmail.com",
      "anupk577@gmail.com",
      "jeffvini34@gmail.com",
      "rajmohanoff@fabc.com",
      "santhoshwalker18@gmail.com",
      "corauspatel@gmail.com",
      "Lifestylewithderek@gmail.com",
      "natalyaalexeyenko34@gmail.com",
      "gerdabonomo@gmail.com",
      "Mlmpro13+7@gmail.com",
      "colemanohagan@gmail.com",
      "loyola.ms@gmail.com",
      "2income4you@gmail.com",
      "elitevision247@gmail.com",
      "picodoro@protonmail.com",
      "Proactiveindia3@gmail.com",
      "angela.anderson61@gmail.com",
      "barabanovnik641@gmail.com",
      "devtesting955@gmail.com",
      "heytryai@gmail.com",
      "marketing.jonas.ahrens@gmail.com",
      "ssbizonline@gmail.com",
    ];
    const subStatus = specialEmails.includes(email) ? "active" : "inactive";
    const query = "INSERT INTO users_data (name,email, password, token_balance, referral_code, referred_by, chatId, community, platform,sub_status,current_spins,jumble_life,memory_life,perfectmatch_life,missing_life) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)";
    const values = [name || `TELE${chatId}`,email, hashedPassword, BonusPoint.PointBook.joiningBonus, refferalCode, referred_by, chatId, community, source, subStatus,1,3,3,3,3];
    const response = await executeQuery(query, values);

    // Log join bonus in passbook
    const passbookQuery = "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
    await executeQuery(passbookQuery, [response.insertId, "JOIN BONUS", "Join Bonus Credited", 1000]);
    // await executeQuery(passbookQuery, [response.insertId, "JOIN BONUS", "50 DOGS Points awarded", 50]);
    if(email){
      const passbookInsertQuery =
      "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
    await executeQuery(passbookInsertQuery, [
      response.insertId,
      "Add Email",
      "Your Add Email Bonus Credited",
      500,
    ]);
    const updateUser = "UPDATE users_data SET token_balance = token_balance + 500 WHERE id = ?";
    await executeQuery(updateUser, [response.insertId]);
    

  }
    const countQuery = "SELECT COUNT(*) AS referral_count FROM users_data WHERE referred_by = ?";
    const countResponse = await executeQuery(countQuery, [referred_by]);
    const referralCount = countResponse[0].referral_count;
    console.log("referralCount", referralCount) 

    // Check if the referral count is divisible by 5
    if (referralCount % 5 === 0 && referralCount > 0) { 
      const milestoneBonus = {
        bonus_point: 2500,
        description: "Bonus for reaching referrals target.",
        condition: `Reached ${referralCount} referrals`
      };

      console.log("milestoneBonus", milestoneBonus);
     
      // Add milestone bonus to referrer's balance
      const updateData = `UPDATE users_data SET token_balance = token_balance + ${milestoneBonus.bonus_point} WHERE id= ?`;
      await executeQuery(updateData, [referred_by]);

      await executeQuery(passbookQuery, [referred_by, milestoneBonus.condition, milestoneBonus.description, milestoneBonus.bonus_point]);
    }

    if (!response) {
      return res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }

    return res.status(200).json({
      status: "success",
      message: "User has been registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};
const SignUpAppUser = async (req, res) => {
  try {
    const { name, referral_code, community, source, email, password } = req.body;
    const chatId = email;

    // Basic validations
    if (!email || typeof email !== "string") {
      return res.status(400).json({ status: "failed", message: "Email is required and must be a valid string" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ status: "failed", message: "Password must be at least 6 characters long" });
    }

    if (!community || typeof community !== "string") {
      return res.status(400).json({ status: "failed", message: "Community is required" });
    }

    if (!source || typeof source !== "string") {
      return res.status(400).json({ status: "failed", message: "Source is required" });
    }

    if (!referral_code || typeof referral_code !== "string") {
      return res.status(400).json({ status: "failed", message: "Referral code is required to proceed" });
    }

    // Check for existing user
    const checkQuery = "SELECT * FROM users_data WHERE chatId = ?";
    const checkResponse = await executeQuery(checkQuery, [chatId]);

    if (checkResponse.length > 0) {
      return res.status(409).json({ status: "failed", message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate referral code
    let referred_by = 0;
    let referrer_community = null;

    const getReferral = "SELECT * FROM users_data WHERE referral_code = ?";
    const referralResults = await executeQuery(getReferral, [referral_code]);

    if (referralResults.length === 0) {
      return res.status(400).json({ status: "failed", message: "Invalid Referral Code" });
    }

    referred_by = referralResults[0].id;
    referrer_community = referralResults[0].community;

    // Credit referral bonus
    const dogs_referral_point = referrer_community === 'MBC'
      ? BonusPoint.PointBook.MBC_dogsBonus
      : BonusPoint.PointBook.dogsBonus;

    const newTokenBalance = parseFloat(referralResults[0].token_balance) + BonusPoint.PointBook.referralPoint;

    await executeQuery("UPDATE users_data SET token_balance = ? WHERE id = ?", [newTokenBalance, referred_by]);

    const description = `Referral bonus credited! ${chatId} joined using your code.`;
    await executeQuery(
      "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)",
      [referred_by, "REFERRAL BONUS", description, 1000]
    );

    // Generate referral code
    const refferalCode = "SKLR" + randomnumber();

    // Determine subscription status
    const specialEmails = [/* your predefined list */];
    const subStatus = specialEmails.includes(email) ? "active" : "inactive";

    // Insert new user
    const insertQuery = `
      INSERT INTO users_data 
      (name, email, password, token_balance, referral_code, referred_by, chatId, community, platform, sub_status, current_spins, jumble_life, memory_life, perfectmatch_life, missing_life) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      name || `TELE${chatId}`,
      email,
      hashedPassword,
      BonusPoint.PointBook.joiningBonus,
      refferalCode,
      referred_by,
      chatId,
      community,
      source,
      subStatus,
      1,
      3,
      3,
      3,
      3,
    ];

    const response = await executeQuery(insertQuery, values);

    if (!response || !response.insertId) {
      return res.status(500).json({ status: "failed", message: "User registration failed" });
    }

    // Log join bonus
    await executeQuery(
      "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)",
      [response.insertId, "JOIN BONUS", "Join Bonus Credited", 1000]
    );

    // Email bonus
    await executeQuery(
      "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)",
      [response.insertId, "Add Email", "Your Add Email Bonus Credited", 500]
    );

    await executeQuery("UPDATE users_data SET token_balance = token_balance + 500 WHERE id = ?", [response.insertId]);

    // Count referrer’s referrals
    const countQuery = "SELECT COUNT(*) AS referral_count FROM users_data WHERE referred_by = ?";
    const countResponse = await executeQuery(countQuery, [referred_by]);
    const referralCount = countResponse[0]?.referral_count || 0;

    if (referralCount % 5 === 0 && referralCount > 0) {
      const milestoneBonus = {
        bonus_point: 2500,
        description: "Bonus for reaching referrals target.",
        condition: `Reached ${referralCount} referrals`,
      };

      await executeQuery("UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?", [
        milestoneBonus.bonus_point,
        referred_by,
      ]);

      await executeQuery(
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)",
        [referred_by, milestoneBonus.condition, milestoneBonus.description, milestoneBonus.bonus_point]
      );
    }

    return res.status(200).json({
      status: "success",
      message: "User has been registered successfully",
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ status: "failed", message: "Something went wrong, please try again later." });
  }
};
const fetchBotUserData = async (email) => {
  try {
  const response = await axios.post('https://skilleareum.ai/api/telegram/isUserExistInBot', {
      email: email
    });
    if (response.data.status === "success") {
      return response.data.data; // the Telegram user data
    }
    return null; // user not found
  } catch (err) {
    console.log(err)
    console.error("Error fetching Telegram user data:", err.message);
    return null;
  }
};
function generateReferralCode() {
    return "SKLR" + Math.floor(100000 + Math.random() * 900000); // e.g., SKLR123456
}
async function getUniqueReferralCode() {
    let referralCode;
    let isUnique = false;

    while (!isUnique) {
        referralCode = generateReferralCode();

        const checkReferralQuery = "SELECT id FROM users_data WHERE referral_code = ?";
        const result = await executeQuery(checkReferralQuery, [referralCode]);

        if (result.length === 0) {
            isUnique = true; // ✅ Unique code found
        }
    }

    return referralCode;
}
const SignUpWebGoogleUser = async (req, res) => {
  try {
    const { firstname, googleId, email, referral_code,password,source,evm_wallet_address } = req.body;
    
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const checkQuery = `
      SELECT u.*, 
             p.vark_completed, p.cps_completed, p.ai_completed, p.archetype_id, p.seq
      FROM users_data u
      LEFT JOIN user_assessment_progress p ON u.id = p.user_id
      WHERE u.email = ?
    `;
    const checkValues = [email];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length > 0) {
      const user = checkResponse[0];

      // Generate token for existing user
      const token = jwt.sign(
        { userId: user.id, program_type: user.current_program },
        "nmGgh9CYN2wvXi7qrNTaLSRFyQE3s7A7"
      );

   const { password, ...safeUser } = user;

    return res.status(200).json({
      status: "success",
      error: "User already exists",
      token,
      user: safeUser,
    }); 
    }

    const referralCode =await getUniqueReferralCode();

    const specialEmails = [
      "marketwithabbu@gmail.com",
      "anupk577@gmail.com",
      "jeffvini34@gmail.com",
      "rajmohanoff@fabc.com",
      "santhoshwalker18@gmail.com",
      "corauspatel@gmail.com",
      "Lifestylewithderek@gmail.com",
      "natalyaalexeyenko34@gmail.com",
      "gerdabonomo@gmail.com",
      "Mlmpro13+7@gmail.com",
      "colemanohagan@gmail.com",
      "loyola.ms@gmail.com",
      "2income4you@gmail.com",
      "elitevision247@gmail.com",
      "picodoro@protonmail.com",
      "Proactiveindia3@gmail.com",
      "angela.anderson61@gmail.com",
      "barabanovnik641@gmail.com",
      "devtesting955@gmail.com",
      "heytryai@gmail.com",
      "marketing.jonas.ahrens@gmail.com",
      "ssbizonline@gmail.com",
    ];

const token_balance =  BonusPoint.PointBook.joiningBonus;
const sub_status = (specialEmails.includes(email) ? "active" : "inactive");
const x_userName =  null;
const chatId =  null;
const hmstr = 0;
const ton =  0;
const dogs =  0;
const not_coin = 0;
    let referred_by = 0;
    if (referral_code) {
      const getReferral = "SELECT * FROM users_data WHERE referral_code = ?";
      const refResponse = await executeQuery(getReferral, [referral_code]);

      if (refResponse.length > 0) {
        referred_by = refResponse[0].id;

        // Give referral bonus
        const updateRef = `
          UPDATE users_data
          SET token_balance = token_balance + ${BonusPoint.PointBook.referralPoint},
              dogs = dogs + ${BonusPoint.PointBook.dogsBonus}
          WHERE id = ?
        `;
        await executeQuery(updateRef, [referred_by]);

        const referralDesc = `Referral bonus credited! ${firstname} joined using your code.`;
        const dogsDesc = `Dogs referral bonus credited! ${firstname} joined using your code.`;
        const passbookQuery = "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
        await executeQuery(passbookQuery, [referred_by, "REFERRAL BONUS", referralDesc, 1000]);
        await executeQuery(passbookQuery, [referred_by, "REFERRAL BONUS", dogsDesc, 100]);
      }
    }

    const query = `
 INSERT INTO users_data
(name, email, password, googleId, token_balance, referral_code, sub_status,
 current_spins, jumble_life, memory_life, perfectmatch_life, missing_life,
 referred_by, x_userName, chatId, hmstr, ton, dogs, not_coin,platform,evm_wallet_address)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)

`;

const values = [
  firstname,
  email,
  hashedPassword,
  googleId,
  token_balance,
  referralCode,
  sub_status,
  1,  // current_spins
  3,  // jumble_life
  3,  // memory_life
  3,  // perfectmatch_life
  3,  // missing_life
  referred_by,
  x_userName,
  chatId,
  hmstr,
  ton,
  dogs,
  not_coin,
  source,
  evm_wallet_address
];


    const response = await executeQuery(query, values);

    const userId = response.insertId;

    // Join Bonus
    const passbookQuery = "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
    const updateUser = "UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?";

    await executeQuery(passbookQuery, [userId, "JOIN BONUS", "Join Bonus Credited", 1000]);
    await executeQuery(updateUser, [1000, userId]);

    // Add Email Bonus
    if (email) {
      await executeQuery(passbookQuery, [userId, "Add Email", "Your Add Email Bonus Credited", 500]);
      await executeQuery(updateUser, [500, userId]);
    }


    // Check referral milestone
    if (referred_by > 0) {
      const countQuery = "SELECT COUNT(*) AS referral_count FROM users_data WHERE referred_by = ?";
      const countResponse = await executeQuery(countQuery, [referred_by]);
      const referralCount = countResponse[0].referral_count;

      if (referralCount % 5 === 0 && referralCount > 0) {
        const milestoneBonus = {
          bonus_point: 2500,
          description: "Bonus for reaching referrals target.",
          condition: `Reached ${referralCount} referrals`,
        };

        const updateData = `UPDATE users_data SET token_balance = token_balance + ${milestoneBonus.bonus_point} WHERE id = ?`;
        await executeQuery(updateData, [referred_by]);

        await executeQuery(passbookQuery, [
          referred_by,
          milestoneBonus.condition,
          milestoneBonus.description,
          milestoneBonus.bonus_point,
        ]);
      }
    }

    // ✅ Generate token and respond
    const token = jwt.sign(
      { userId, program_type: "apprentice" }, // or fetch actual `program_type` from DB
      "nmGgh9CYN2wvXi7qrNTaLSRFyQE3s7A7"
    );

    const finalUserQuery = `
      SELECT u.*, 
             p.vark_completed, p.cps_completed, p.ai_completed, p.archetype_id, p.seq
      FROM users_data u
      LEFT JOIN user_assessment_progress p ON u.id = p.user_id
      WHERE u.id = ?
    `;
    const finalUser = await executeQuery(finalUserQuery, [userId]);

    const { password: userPassword, ...safeUser } = finalUser[0];

    return res.status(200).json({
      status: "success",
      message: "User has been registered successfully",
      token,
      user: safeUser,
});
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

const checkSponsorExists = async (req, res) => {
  const { sponsorEmail, userEmail, sponsorWallet } = req.body;

  if (!sponsorEmail || !userEmail) {
    return res.status(400).json({ error: 'Sponsor email and user email are required' });
  }

  try {
    const userResult = await executeQuery('SELECT id FROM users_data WHERE email = ?', [userEmail]);

    if (userResult.length > 0) {
      return res.status(200).json({ exists: true, message: 'User already exists.' });
    }

    const sponsorResult = await executeQuery('SELECT id, referral_code FROM users_data WHERE email = ?', [sponsorEmail]);

    if (sponsorResult.length === 0) {
      return res.status(200).json({ exists: false, message: 'Sponsor email does not exist in the database.' });
    }

    const sponsorId = sponsorResult[0].id;
    const referralCode = sponsorResult[0].referral_code;

    await executeQuery('UPDATE users_data SET community = ?,evm_wallet_address = ? WHERE id = ?', ['MBC', sponsorWallet, sponsorId]);

    return res.status(200).json({ exists: false, message: 'New user added.', referralCode });

  } catch (err) {
    console.error('Error checking sponsor email:', err);
    return res.status(500).json({ error: 'Failed to process referral data' });
  }
};
const registerBotUserToDB = async (data, email) => {
  try {
    const insertQuery = `
      INSERT INTO users_data 
      (email, token_balance, paid_status, x_userName, chatId, hmstr, ton, dogs, not_coin, sub_status, password,referral_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    // Default password (hash it if needed, or set null/empty string)
    const defaultPassword = await bcrypt.hash("default@123", 10); // or use null
       const referralCode = "SKLR" + randomnumber();

    const values = [
      email,
      data.token_balance || 0,
      data.paid_status || 0,
      data.x_userName || null,
      data.chatId || null,
      data.hmstr || 0,
      data.ton || 0,
      data.dogs || 0,
      data.not_coin || 0,
      data.sub_status || "inactive",
      defaultPassword,
       referralCode 

    ];

    const result = await executeQuery(insertQuery, values);
    return result;
  } catch (err) {
    console.error("Error inserting bot user into DB:", err);
    return null;
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await executeQuery(
      `SELECT u.*, 
              p.vark_completed, p.cps_completed, p.ai_completed, p.archetype_id, p.seq
       FROM users_data u
       LEFT JOIN user_assessment_progress p ON u.id = p.user_id
       WHERE u.email = ?`,
      [email]
    );

    // If user doesn't exist in DB
    if (response.length === 0) {
      const telegramUserData = await fetchBotUserData(email);

      if (telegramUserData) {
        const insertedUser = await registerBotUserToDB(telegramUserData, email);

        if (insertedUser) {
          return res.status(200).json({
            status: "Bot_User",
            message: "User synced from bot and registered successfully",
            data: telegramUserData,
          });
        } else {
          return res.status(500).json({
            status: "failed",
            message: "Error inserting user from bot",
          });
        }
      }

      return res.json({
        status: "failed",
        message: "There is no user registered with this email",
      });
    }

    // User exists - validate password
    const user = { ...response[0] };
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ status: "Wrong_Password", error: "Invalid email or password" });
    }

    const SECRET_KEY = "nmGgh9CYN2wvXi7qrNTaLSRFyQE3s7A7";
    const token = jwt.sign(
      { userId: user.id, program_type: user.current_program },
      SECRET_KEY
    );

    return res.status(200).json({
      status: "success",
      error: "Login successful",
      token,
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "failed", error: "Internal Server Error" });
  }
};

const isUserExist = async (req, res) => {
  const { email } = req.query;
  try {
    const checkQuery = "SELECT * FROM users_data WHERE chatId = ?";
    const checkValues = [email];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length > 0) {
      return res.status(200).json({
        email: checkResponse[0].chatId,
        password: checkResponse[0].chatId,
        username: checkResponse[0].x_userName,
        status: "failed",
        message: "Email already exists",
      });
    }

    return res.status(200).json({ status: "success" });
  } catch (error) { }
};

const check_twitter_reward = async (req, res) => {
  const { userId } = req.query;
  try {
    const checkQuery =
      "SELECT * FROM passbook WHERE user_id = ? AND action = ?";
    const checkResponse = await executeQuery(checkQuery, [
      userId,
      "Twitter Join",
    ]);
    let isFollow = 0;
    if (checkResponse.length <= 0) {
      isFollow = 1;
    }
    const isTelegramJoin = `SELECT * FROM passbook WHERE action=? AND user_id=?`;
    const TeleResponse = await executeQuery(isTelegramJoin, [
      "TELEGRAM JOIN",
      userId,
    ]);
    let isJoin = 0;
    if (TeleResponse.length <= 0) {
      isJoin = 1;
    }
    const checkEmail = "SELECT * FROM users_data WHERE id=?";
    const result = await executeQuery(checkEmail, [userId]);
    let isEmail;
    if (result[0].email !== null) {
      isEmail = 0;
    } else {
      isEmail = 1;
    }
    const query =
      "SELECT * FROM users_data WHERE referred_by = ? ORDER BY created_at DESC";
    const userCount = await executeQuery(query, [userId]);
    const farmingQuery = `
    SELECT fs.*, bp.output_per_hour
    FROM FarmingSessions fs
    LEFT JOIN BoosterPlans bp ON fs.booster_plan_id = bp.id
    WHERE fs.user_id = ? AND fs.claimed = ?
    ORDER BY fs.start_time DESC LIMIT 1;
  `;
  const farmingResult = await executeQuery(farmingQuery, [userId, false]);
    res.json({
      isFollow,
      isJoin,
      isEmail,
      totalUsers: userCount.length,
      startTime: farmingResult[0]?.start_time || null,
      endTime: farmingResult[0]?.end_time || null,
    });
  } catch (error) {
    console.log(error);
  }
};

const check_assessment_reward = async (req, res) => {
  const { userId } = req.query;
  try {
    const checkQuery =
      "SELECT * FROM passbook WHERE user_id = ? AND action = ?";
    const checkValues = [userId];
    const checkResponse = await executeQuery(checkQuery, [
      checkValues,
      "AI Skill Quest Reward",
    ]);
    if (checkResponse.length > 0) {
      return res.status(200).json({
        status: "failed",
        message: "AI Skill Quest Reward already exists",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "You can claim AI Test bonus",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const user_data = async (req, res) => {
  const { userId } = req.query;
  try {
    const checkQuery = "SELECT * FROM users_data WHERE id = ?";
    const checkValues = [userId];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length > 0) {
      return res.status(200).json({
        status: "success",
        user: checkResponse[0],
      });
    } else {
      return res.status(200).json({
        status: "failed",
      });
    }
  } catch (error) { }
};
const getReferralCode = async (req, res) => {
  const { email } = req.query;
  if(!email){
    return res.status(400).json({message:"Email is required"})
  }
  try {
    const checkQuery = "SELECT referral_code FROM users_data WHERE email = ?";
    const checkValues = [email];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length > 0) {
      return res.status(200).json({
        status: "success",
        user: checkResponse[0],
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message:"Referrer not exist"
      });
    }
  } catch (error) {
    return res.status(400).json({
        status: "failed",
        message:"Error while getting Referrer"
      });
   }
};
const addEmail = async (req, res) => {
  const { flag, email, userId } = req.query;
  try {
    // console.log(req.query);
    if (flag == 1) {
      const checkQuery = "SELECT * FROM users_data WHERE id=?";
      const result = await executeQuery(checkQuery, [userId]);
      // console.log(result);
      if (result[0].email !== null) {
        return res
          .status(200)
          .json({ success: false, message: "Email already exist" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Email not exist" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const check_user_assessment = async (req, res) => {
  try {
    const { email } = req.body;

    // console.log("checking...", email);

    const userQuery = "SELECT * FROM answer_set WHERE email = ?";
    const userResponse = await executeQuery(userQuery, [email]);

    if (userResponse.length > 0) {
      res.status(200).json({ status: "Success", data: userResponse });
    } else {
      res.status(200).json({
        status: "Failure",
        message: "Failure: No matching records found",
      });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const update_user_avatar = async (req, res) => {
  const { avatar, id } = req.body;

  console.log("req.body", req.body);

  try {
    //   const query = `INSERT INTO users_data (email, avatar) VALUES (?, ?) ON DUPLICATE KEY UPDATE avatar = VALUES(avatar)`;

    const query = `UPDATE users_data SET avatar = ? WHERE id = ?`;

    await executeQuery(query, [avatar, id]);

    res
      .status(200)
      .json({ status: "success", message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error updating avatar:", error.message);
    res
      .status(500)
      .json({ status: "failed", message: "Failed to update avatar" });
  }
};

const fetch_user_data = async (req, res) => {
  const { email } = req.query;

  try {
    const query = `SELECT name, email, referral_code, x_userName ,token_balance, avatar FROM users_data WHERE id = ?`;
    const result = await executeQuery(query, [email]);

    if (result.length > 0) {
      return res.status(200).json({ status: "success", data: result[0] });
    } else {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
   return  res
      .status(500)
      .json({ status: "failed", message: "Error fetching user data" });
  }
};

const update_user_xid = async (req, res) => {
  const { userId, x_userName } = req.body;

  console.log("userId, x_userName", userId, x_userName);

  try {
    const checkQuery = "SELECT * FROM users_data WHERE x_userName = ?";
    const checkValues = [x_userName];
    const checkResponse = await executeQuery(checkQuery, checkValues);
    if (checkResponse.length > 0) {
      return res
        .status(200)
        .json({ status: "failed", message: "Username already exists" });
    }
    const query = `UPDATE users_data SET x_userName = ? WHERE id = ?`;
    await executeQuery(query, [x_userName, userId]);

    res
      .status(200)
      .json({ status: "success", message: "x_userName updated successfully" });
  } catch (error) {
    console.error("Error updating x_userName:", error.message);
    res
      .status(500)
      .json({ status: "failed", message: "Failed to update x_userName" });
  }
};

const sendVeficationEmail = async (req, res) => {
  const { email, userId } = req.query;
  // Generate a verification token
  // console.log("email, userId", email, userId);
  const response = await executeQuery(
    "SELECT * FROM users_data WHERE id = ? AND email IS NOT NULL",
    [userId]
  );

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
  console.log(token);
  console.log(`http://localhost:3000/verifyEmail?token=${token}&id=${userId}`);
  // Send the email with verification link
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 2525,
    secure: false, // If using port 587, set secure to false
    auth: {
      user: "postmaster@mg.skilleareum.ai",
      pass: process.env.Mailgun_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
    timeout: 10000,
    logger: true, // Enables detailed logging
    debug: true,  // Enables debugging output
  
  });

  try {
    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      from: "support@skilleareum.ai",
      html: `<div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">
        <div style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); padding-bottom: 2rem; padding-top: 2rem; padding-left: 3rem;">
            <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
        </div>
        <div style="width: 85%; margin: auto; background-color: #fff; padding: 20px; z-index: 1;">
            <div>
                <p style="font-size: 18px; color: #121a26;">🔒 Verify Your Email!</p>
                <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #121a26;">Claim Your Reward</p>

                <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px; margin-top: 20px; color: #384860;">Hi ${email},</p>
                <p style="margin-bottom: 10px; color: #384860;">
                    Please verify your email to activate your account and unlock your reward.
                    Click the link below to confirm your email:
                </p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <a href="https://skilleareum.ai/verifyEmail?token=${token}&id=${userId}" style="display: inline-block; padding: 12px 24px; background-color: #0285ff; color: white; text-decoration: none; font-weight: 600; border-radius: 5px;">Verify Email and Claim Reward</a>
            </div>
            <div style="margin-top: 20px;">
                <p style="color: #384860;">If you did not request this email, please ignore this message.</p>
            </div>
            <div style="margin-top: 20px;">
                <p style="font-size: 14px; font-weight: 600; color: #384860;">Best regards,<br>Skilleareum Support Team</p>
            </div>
        </div>

        <div style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); height: 100%; padding: 1rem;">
            <div>
                <p style="color: white; text-align: center;">support@skilleareum.ai</p>
            </div>
            <div>
                <p style="color: white; text-align: center;">Skilleareum Inc © 2025</p>
            </div>
        </div>
    </div>
    `,
    });
    res.status(200).json({ message: "Verification email sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error sending email" });
  }
};
const verify_email = async (req, res) => {
  const { userId, token } = req.query;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email.split("?")[0];

    const checkQuery = "SELECT * FROM users_data WHERE email = ?";
    const checkValues = [email];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    const selectQuery = "SELECT * FROM users_data WHERE id = ?";
    const response = await executeQuery(selectQuery, userId);

    if (checkResponse.length === 0) {
      const specialEmails = [
        "marketwithabbu@gmail.com",
        "anupk577@gmail.com",
        "jeffvini34@gmail.com",
        "rajmohanoff@fabc.com",
        "santhoshwalker18@gmail.com",
        "corauspatel@gmail.com",
        "Lifestylewithderek@gmail.com",
        "natalyaalexeyenko34@gmail.com",
        "gerdabonomo@gmail.com",
        "Mlmpro13+7@gmail.com",
        "colemanohagan@gmail.com",
        "loyola.ms@gmail.com",
        "2income4you@gmail.com",
        "elitevision247@gmail.com",
        "picodoro@protonmail.com",
        "Proactiveindia3@gmail.com",
        "angela.anderson61@gmail.com",
        "barabanovnik641@gmail.com",
        "devtesting955@gmail.com",
        "heytryai@gmail.com",
        "marketing.jonas.ahrens@gmail.com",
        "ssbizonline@gmail.com",
      ];

      const passbookQuery =
        "SELECT * FROM passbook WHERE user_id = ? AND action = 'Add Email'";
      const passbookResponse = await executeQuery(
        passbookQuery,
        response[0].id
      );

      if (passbookResponse.length === 0) {
        const update_token_balance = parseInt(response[0].token_balance) + 500;

        const updateUser = `
          UPDATE users_data 
          SET token_balance = ?, email = ?, sub_status = ?
          WHERE id = ?;
        `;

        const subStatus = specialEmails.includes(email) ? "active" : response[0].sub_status;

        await executeQuery(updateUser, [
          update_token_balance,
          email,
          subStatus,
          response[0].id,
        ]);

        const passbookInsertQuery =
          "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
        await executeQuery(passbookInsertQuery, [
          response[0].id,
          "Add Email",
          "Your Add Email Bonus Credited",
          500,
        ]);

        return res.json({
          success: true,
          chatId: response[0].chatId,
          message: "Email added successfully",
        });
      } else {
        const updateQuery = `
          UPDATE users_data 
          SET email = ?, sub_status = ?
          WHERE id = ?;
        `;

        const subStatus = specialEmails.includes(email) ? "active" : response[0].sub_status;

        await executeQuery(updateQuery, [email, subStatus, userId]);

        return res.status(200).json({
          success: false,
          chatId: response[0].chatId,
          message: "Email added successfully",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        chatId: response[0].chatId,
        message: "Email Already Exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid or expired token.");
  }
};

apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey,process.env.BREVO_API_KEY);

const sendOTP = async (req, res) => {
  const { email } = req.query;

  try {
    const isExist = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );

    if (isExist.length > 0) {
      return res.status(201).json({ message: "Email already exists" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Save OTP to DB
    await executeQuery(
      "INSERT INTO otp_data (email, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp = ?, expires_at = ?",
      [email, otp, expirationTime, otp, expirationTime]
    );



    const htmlContent = `
    <div style="font-family: 'Poppins', sans-serif; font-size: 14px; background-color: #f5f5f5; max-width: 700px; margin: auto;">
      <div style="background-color: #0285ff; padding: 2rem 3rem;">
        <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
      </div>
      <div style="background-color: #fff; padding: 20px;">
        <p style="font-size: 18px; font-weight: bold;">🔢 Your OTP Code</p>
        <p>Hi ${email},</p>
        <p>Use the OTP below to complete your authentication. This code is valid for <strong>5 minutes</strong>:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="background-color: #0285ff; color: white; padding: 12px 24px; font-size: 20px; font-weight: bold; border-radius: 5px;">${otp}</span>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p style="font-weight: 600;">Best regards,<br>Skilleareum Support Team</p>
      </div>
      <div style="background-color: #0285ff; padding: 1rem; text-align: center; color: white;">
        <p>support@skilleareum.ai</p>
        <p>Skilleareum Inc © 2025</p>
      </div>
    </div>`;

    const sendSmtpEmail = {
      sender: {
        email: "info@skilleareum.ai",
        name: "Skilleareum"
      },
      to: [
        {
          email: email,
          name: "Skilleareum User"
        }
      ],
      subject: "Your OTP Code",
      htmlContent: htmlContent,
    };

    try {
        apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      console.error("Error sending OTP email:", error);
    }

    res.status(200).json({ message: "OTP sent successfully!" });

  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({ error, message: "Error sending OTP email" });
  }
};
const verifyOTP = async (req, res) => {
  const { email, otp } = req.query;

  try {
// Retrieve the latest OTP from the database
const result = await executeQuery(
  "SELECT otp, expires_at FROM otp_data WHERE email = ? ORDER BY created_at DESC LIMIT 1",
  [email]
);

if (result.length === 0) {
  return res.status(400).json({ error: "Invalid user or email" });
}

const { otp: storedOtp, expires_at: expiresAt } = result[0];


    // Check if the OTP is correct and not expired
    if (storedOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (new Date(expiresAt) < new Date()) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    // OTP is valid
    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error verifying OTP" });
  }
};


async function getAllAssessmentDays(email) {
  const getAllAssessmentsQuery = `
      SELECT day, percentage, created_at 
      FROM answer_set 
      WHERE email = ? 
      ORDER BY day ASC
  `;

  const rows = await executeQuery(getAllAssessmentsQuery, [email]);
  console.log(rows)
  if (rows.length === 0) {
    return [
      {
        day: 1,
        status: "Available",
      },
    ];
  }

  const currentTime = new Date();
  const currentGMTTime = new Date(currentTime.toISOString().substring(0, 10));
  let assessmentStatus = [];
  let availableStatus = [];
  let lastCompletionDate = null;

  // Loop through each row and add "Completed" assessments
  rows.forEach((row) => {
    const assessmentDay = row.day;
    const completionTime = new Date(row.created_at);
    const assessmentPercentage = row.percentage;

    assessmentStatus.push({
      day: assessmentDay,
      status: "Completed",
      percentage: assessmentPercentage,
    });

    lastCompletionDate = new Date(
      completionTime.toISOString().substring(0, 10)
    );
  });

  let nextDay = 1;
  if (lastCompletionDate) {
    // Determine the next day based on the last completion
    nextDay = Math.max(1, ...assessmentStatus.map((status) => status.day)) + 1;

    const nextDayGMT = new Date(lastCompletionDate);
    nextDayGMT.setUTCDate(nextDayGMT.getUTCDate() + 1);
    nextDayGMT.setUTCHours(0, 0, 0, 0); // 00:00

    // If current time has passed, mark the next day as "Available"
    if (currentTime >= nextDayGMT) {
      availableStatus.push({
        day: nextDay,
        status: "Available",
      });
    }
  }

  // Concatenate availableStatus (first) with assessmentStatus (completed days)
  return [...availableStatus, ...assessmentStatus];
}
const getAllAssessmentDaysController = async (req, res) => {
  try {
    const { email } = req.query;
    const {program_type}=req.user

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const getAllAssessmentsQuery = `
      SELECT day, percentage, created_at 
      FROM answer_set 
      WHERE email = ? 
      AND program_type = ?
      ORDER BY day ASC
    `;

    const rows = await executeQuery(getAllAssessmentsQuery, [email,program_type]);

    if (rows.length === 0) {
      return res.json([
        {
          day: 1,
          status: "Available",
        },
      ]);
    }

    const currentTime = new Date();
    const currentGMTTime = new Date(currentTime.toISOString().substring(0, 10));
    let assessmentStatus = [];
    let availableStatus = [];
    let lastCompletionDate = null;

    rows.forEach((row) => {
      const assessmentDay = row.day;
      const completionTime = new Date(row.created_at);
      const assessmentPercentage = row.percentage;

      assessmentStatus.push({
        day: assessmentDay,
        status: "Completed",
        percentage: assessmentPercentage,
      });

      lastCompletionDate = new Date(completionTime.toISOString().substring(0, 10));
    });

    let nextDay = 1;
    if (lastCompletionDate) {
      nextDay = Math.max(1, ...assessmentStatus.map((status) => status.day)) + 1;

      const nextDayGMT = new Date(lastCompletionDate);
      nextDayGMT.setUTCDate(nextDayGMT.getUTCDate() + 1);
      nextDayGMT.setUTCHours(0, 0, 0, 0);

      if (currentTime >= nextDayGMT) {
        availableStatus.push({
          day: nextDay,
          status: "Available",
        });
      }
    }

    return res.json([...availableStatus, ...assessmentStatus]);

  } catch (error) {
    console.error("Error in getAllAssessmentDaysController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const getAllData = async (req, res) => {
  const { userId, email, flag } = req.query;

  try {
    // Fetch user data
    const userQuery = "SELECT name,x_userName,email,referral_code,avatar,token_balance,evm_Wallet_address,created_at FROM users_data WHERE id = ?";
    const userDetails = await executeQuery(userQuery, [userId]);

    // Fetch farming status
    const farmingQuery = `
      SELECT fs.*, bp.output_per_hour
      FROM FarmingSessions fs
      LEFT JOIN BoosterPlans bp ON fs.booster_plan_id = bp.id
      WHERE fs.user_id = ? AND fs.claimed = ?
      ORDER BY fs.start_time DESC LIMIT 1;
    `;
    const farmingResult = await executeQuery(farmingQuery, [userId, false]);

    // Fetch new user data for farming
    const NewUserQuery = `SELECT * FROM FarmingSessions WHERE user_id = ?;`;
    const isNewUser = await executeQuery(NewUserQuery, [userId]);

    // Fetch notification count
    const notificationQuery = `
      SELECT COUNT(*) AS total_data 
      FROM user_notifications un
      INNER JOIN notification n ON un.notification_id = n.id
      WHERE un.user_id = ? 
        AND un.readed = 0 
        AND n.created_at > '2024-09-24';
    `;
    const notificationResponse = await executeQuery(notificationQuery, [userId]);

    // Fetch assessment days
    const assessmentDays = await getAllAssessmentDays(email);
   // Fetch mission status
const missionResult = await executeQuery(
  `SELECT action, created_at FROM passbook WHERE user_id = ?`,
  [userId]
);

const checkAnyTime = ['TELEGRAM JOIN', 'Twitter Join', 'Add Email'];
const checkToday = [
  'Missing Letter',
  'Jumble Word',
  'Memory Game',
  'Perfect Match',
  'FARMING BONUS',
  'AI Learning Bonus',
  'SPIN WHEEL BONUS',
  'AI SPACE BONUS',
  'AI FACT VAULT',
  'RETWEET BONUS',
  'DAILY ACTIVE BONUS'
];

const today = new Date().toISOString().split("T")[0];
const userActions = missionResult.map(row => ({
  action: row.action,
  created_at: row.created_at
}));

let totalMissions = checkAnyTime.length + checkToday.length;
let completedMissions = 0;

const missionStatuses = {};

// Handle 'checkAnyTime' missions
checkAnyTime.forEach(action => {
  const entry = userActions.find(e => e.action === action);
  if (entry) {
    completedMissions++;
    totalMissions--; // exclude this completed action from total
    missionStatuses[action] = 'Completed';
  } else {
    missionStatuses[action] = 'In-progress';
  }
});

// Handle daily missions
checkToday.forEach(action => {
  const isCompleted = userActions.some(entry =>
    entry.action === action &&
    new Date(entry.created_at).toISOString().split("T")[0] === today
  );

  const isDynamic =
    (action === 'RETWEET BONUS' &&
      userActions.some(entry =>
        entry.action && entry.action.startsWith('RETWEET BONUS-') &&
        new Date(entry.created_at).toISOString().split("T")[0] === today
      )) ||
    (action === 'DAILY ACTIVE BONUS' &&
      userActions.some(entry =>
        entry.action && entry.action.startsWith('DAILY ACTIVE BONUS DAY-') &&
        new Date(entry.created_at).toISOString().split("T")[0] === today
      ));

  if (isCompleted || isDynamic) {
    completedMissions++;
    missionStatuses[action] = 'Completed';
  } else {
    missionStatuses[action] = 'In-progress';
  }
});

    // Fetch SP Trend (last 12 days)
    const trendQuery = `
      SELECT DATE(created_at) as date, SUM(amount) as daily_sp 
      FROM passbook 
      WHERE user_id = ? AND amount > 0 AND created_at >= DATE_SUB(NOW(), INTERVAL 12 DAY)
      GROUP BY DATE(created_at) 
      ORDER BY DATE(created_at) ASC;
    `;
    const trendResult = await executeQuery(trendQuery, [userId]);

    const chartData = [];
    const chartLabels = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      chartLabels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      const dayData = trendResult.find(r => {
        const rDate = new Date(r.date).toISOString().split('T')[0];
        return rDate === dateStr;
      });
      chartData.push(dayData ? parseFloat(dayData.daily_sp) : 0);
    }

    // Response object
    const response = {
      user: userDetails.length > 0 ? userDetails[0] : null,
      farming: {
        farmingStatus: farmingResult.length > 0,
        startTime: farmingResult[0]?.start_time || null,
        endTime: farmingResult[0]?.end_time || null,
        boost: farmingResult[0]?.booster_plan_id || "",
        outputPerHour: farmingResult[0]?.output_per_hour || 10,
        durationInHours: farmingResult[0]
          ? Math.floor((new Date(farmingResult[0].end_time) - new Date(farmingResult[0].start_time)) / (1000 * 60 * 60))
          : 0,
        isNewUser: isNewUser.length > 1 ? false : true,
      },
      notifications: {
        total: notificationResponse[0].total_data,
      },
      assessmentDays,
      missions: {
        total: totalMissions,
        completed: completedMissions,
        statuses: missionStatuses
      },
      spTrend: {
        data: chartData,
        labels: chartLabels
      }
    };
    

    // Return final merged response
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching data", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// API endpoint to get all assessment days and their status
const getNextDayAssessment = async (req, res) => {
  const email = req.query.email;
  try {
    const assessmentInfo = await getAllAssessmentDays(email);
    // console.log("assessmentInfo",assessmentInfo)
    res.json(assessmentInfo);
  } catch (error) {
    console.error("Error fetching assessment days:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
async function getAvailableAssessmentCount(email) {
  const getAllAssessmentsQuery = `
      SELECT day, created_at 
      FROM answer_set 
      WHERE email = ? 
      ORDER BY day ASC
  `;

  const rows = await executeQuery(getAllAssessmentsQuery, [email]);

  const currentTime = new Date();
  let lastCompletionDate = null;

  // Loop through each row to find the latest assessment completion date
  rows.forEach((row) => {
    const completionTime = new Date(row.created_at);
    lastCompletionDate = new Date(
      completionTime.toISOString().substring(0, 10)
    );
  });

  let nextDayAvailable = 0;
  if (lastCompletionDate) {
    const nextDayGMT = new Date(lastCompletionDate);
    nextDayGMT.setUTCDate(nextDayGMT.getUTCDate() + 1);
    nextDayGMT.setUTCHours(0, 0, 0, 0); // Reset to 00:00 GMT for comparison

    // If the current time has passed the next available day
    if (currentTime >= nextDayGMT) {
      nextDayAvailable = 1; // We can make at least one day available
    }
  }

  return nextDayAvailable;
}
const getAllNotificationCount = async (req, res) => {
  const { email, userId } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const availableCount = await getAvailableAssessmentCount(email);

    query = `SELECT COUNT(*) AS total_data 
FROM user_notifications un
INNER JOIN notification n ON un.notification_id = n.id
WHERE un.user_id = ? 
  AND un.readed = 0 
  AND n.created_at > '2024-09-24';
 `;
    const response = await executeQuery(query, [userId]);
    const checkQuery =
      "SELECT * FROM passbook WHERE user_id = ? AND action = ?";
    const checkResponse = await executeQuery(checkQuery, [
      userId,
      "Twitter Join",
    ]);
    let isFollow = 0;
    if (checkResponse.length <= 0) {
      isFollow = 1;
    }
    const isTelegramJoin = `SELECT * FROM passbook WHERE action=? AND user_id=?`;
    const TeleResponse = await executeQuery(isTelegramJoin, [
      "TELEGRAM JOIN",
      userId,
    ]);
    let isJoin = 0;
    if (TeleResponse.length <= 0) {
      isJoin = 1;
    }
    const checkEmail = "SELECT * FROM users_data WHERE id=?";
    const result = await executeQuery(checkEmail, [userId]);
    let isEmail;
    if (result[0].email !== null) {
      isEmail = 0;
    } else {
      isEmail = 1;
    }

    let isClaim;
    const user = await executeQuery(
      "SELECT * FROM users_data WHERE id = ?",
      userId
    );
    const lastLogin = user[0].login_time
      ? user[0].login_time.toISOString().split("T")[0]
      : null;
    const today = new Date().toISOString().split("T")[0];
    if (lastLogin == today) {
      isClaim = 0;
    } else isClaim = 1;
    const total =
      response[0].total_data +
      availableCount +
      isFollow +
      isJoin +
      isEmail +
      isClaim +
      1;
    // console.log(response, availableCount, isFollow, isJoin, isEmail, 1);
    res.json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveEmail = async (req, res) => {
  const { email, userId } = req.query;

  // console.log(req.query);

  try {
    const checkQuery = "SELECT * FROM users_data WHERE email = ?";
    const checkValues = [email];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length === 0) {
      const updateQuery = "UPDATE users_data SET email = ? WHERE id = ?";
      await executeQuery(updateQuery, [email, userId]);

      const selectQuery = "SELECT * FROM users_data WHERE id = ?";
      const response = await executeQuery(selectQuery, [userId]);

      const passbookQuery =
        "SELECT * FROM passbook WHERE user_id = ? AND action = 'Add Email'";
      const passbookResponse = await executeQuery(passbookQuery, [
        response[0].id,
      ]);

      if (passbookResponse.length === 0) {
        const update_token_balance = parseInt(response[0].token_balance) + 500;
        const updateUser =
          "UPDATE users_data SET token_balance = ? WHERE id = ?";
        await executeQuery(updateUser, [update_token_balance, response[0].id]);

        const insertPassbookQuery =
          "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
        await executeQuery(insertPassbookQuery, [
          response[0].id,
          "Add Email",
          "Your Add Email Bonus Credited",
          500,
        ]);

        return res.json({
          success: true,
          message: "Email added successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "Email bonus already credited",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error processing the request" });
  }
};

// SPIN
const spinOptions = [
  { type: "500 Skill Points", weight: 20 },
  { type: "10 TON", weight: 0.01 },
  { type: "Extra Spin", weight: 15 },
  { type: "Better luck next time", weight: 9.5 },
  { type: "Lucky draw entry", weight: 10.5 },
  { type: "1000 Skill Points", weight: 20 },
  { type: "AI Fact bonus", weight: 11.99 },
  { type: "0.01 TON", weight: 13 },
];
const spinOptionsNewUser = [
  { type: "50% off- AI Genesis program", weight: 30 },
  { type: "500 Skill Points", weight: 20 },
  { type: "10 TON", weight: 0.01 },
  { type: "Extra Spin", weight: 15 },
  { type: "Better luck next time", weight: 9 },
  { type: "Lucky draw entry", weight: 0 },
  { type: "1000 Skill Points", weight: 20 },
  { type: "AI Fact bonus", weight: 0 },
  { type: "0.01 TON", weight: 5.99 },
];




function getRandomReward(spinOptions) {
  const totalWeight = spinOptions.reduce(
    (acc, option) => acc + option.weight,
    0
  );
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let option of spinOptions) {
    cumulativeWeight += option.weight;
    if (random < cumulativeWeight) {
      return option;
    }
  }
}

const wheel_spin = async (req, res) => {
  const userId = req.params.userId;
  console.log("user Id", userId, req.params);

  try {
    const [userSpins] = await executeQuery(
      "SELECT * FROM users_data WHERE id = ?",
      [userId]
    );
    console.log("user spins", userSpins.current_spins);
    if (!userSpins || userSpins.current_spins <= 0) {
      return res
        .status(400)
        .json({ error: "No spins available or user not found." });
    }
    let result = getRandomReward(spinOptions);
    const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

if (new Date(userSpins.created_at) >= sevenDaysAgo && userSpins.sub_status==="inactive" ) {
    console.log("created_at is within the last 7 days");
    result = getRandomReward(spinOptionsNewUser);
} else {
    console.log("created_at is older than 7 days");
    result = getRandomReward(spinOptions);
}

   
    if (result.type != "Extra Spin") {
      await executeQuery(
        "UPDATE users_data SET current_spins = current_spins - 1 WHERE id = ?",
        [userId]
      );
    }
    if (result.type == "Extra Spin") {
      return res.json({ message: "Extra Spin", result });
    }

    await processSpinResult(userId, result);

    res.json({ message: "Spin successful", result });
  } catch (error) {
    console.error("Error handling spin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const processSpinResult = async (userId, result) => {
  let actionDescription;
  let pointsToAdd = 0;
  let tonToAdd = 0;
  let dogsToAdd = 0;
  let notToAdd = 0;
  let hmstrToAdd = 0;
  let extraLife = 0;
  let fiftyPercentOffer=false;
  let aiFactBonus=false;
  let luckyDrawEntry=false;
  switch (result.type) {
    case "500 Skill Points":
      pointsToAdd = 500;
      actionDescription = "500 Skill Points awarded";
      break;
    case "1000 Skill Points":
      pointsToAdd = 1000;
      actionDescription = "1000 Skill Points awarded";
      break;
    case "10 TON":
      tonToAdd = 10;
      actionDescription = "10 TON Points awarded";
      break;
    case "50% off- AI Genesis program":
      fiftyPercentOffer=true;
      actionDescription = "50% off- AI Genesis program";
      break;
    case "AI Fact bonus":
      aiFactBonus=true;
      actionDescription = "AI Fact bonus";
      break;
    case "Better luck next time":
      actionDescription = "Better luck next time";
      break;
    case "Lucky draw entry":
      luckyDrawEntry=true;
      actionDescription = "Lucky draw entry";
      break;
    case "0.01 TON":
      tonToAdd = 0.01;
      actionDescription = "0.01 TON Points awarded";
      break;
    default:
      actionDescription = result.type;
      break;
  }

  if (pointsToAdd > 0) {
    try {
      await executeQuery(
        `
          INSERT INTO passbook (user_id, action, description, type, amount)
          VALUES (?, ?, ?, 'CREDIT', ?)
        `,
        [userId, "SPIN WHEEL BONUS", actionDescription, pointsToAdd]
      );

      await executeQuery(
        `
          UPDATE users_data 
          SET token_balance = token_balance + ? 
          WHERE id = ?
        `,
        [pointsToAdd, userId]
      );
    } catch (error) {
      console.error(
        "Error updating token balance or inserting into passbook:",
        error
      );
    }
  }
  if (hmstrToAdd > 0) {
    try {
      await executeQuery(
        `
          INSERT INTO passbook (user_id, action, description, type, amount)
          VALUES (?, ?, ?, 'CREDIT', ?)
        `,
        [userId, "SPIN WHEEL BONUS", actionDescription, hmstrToAdd]
      );

      await executeQuery(
        `
          UPDATE users_data 
          SET hmstr = hmstr + ? 
          WHERE id = ?
        `,
        [hmstrToAdd, userId]
      );
    } catch (error) {
      console.error(
        "Error updating token balance or inserting into passbook:",
        error
      );
    }
  }
  if (dogsToAdd > 0) {
    try {
      await executeQuery(
        `
          INSERT INTO passbook (user_id, action, description, type, amount)
          VALUES (?, ?, ?, 'CREDIT', ?)
        `,
        [userId, "SPIN WHEEL BONUS", actionDescription, dogsToAdd]
      );

      await executeQuery(
        `
          UPDATE users_data 
          SET dogs = dogs + ? 
          WHERE id = ?
        `,
        [dogsToAdd, userId]
      );
    } catch (error) {
      console.error(
        "Error updating token balance or inserting into passbook:",
        error
      );
    }
  }
  if (tonToAdd > 0) {
    try {
      await executeQuery(
        `
          INSERT INTO passbook (user_id, action, description, type, amount)
          VALUES (?, ?, ?, 'CREDIT', ?)
        `,
        [userId, "SPIN WHEEL BONUS", actionDescription, tonToAdd]
      );

      await executeQuery(
        `
          UPDATE users_data 
          SET ton = ton + ? 
          WHERE id = ?
        `,
        [tonToAdd, userId]
      );
    } catch (error) {
      console.error(
        "Error updating token balance or inserting into passbook:",
        error
      );
    }
  }
  if (aiFactBonus) {
    try {
      await executeQuery(
        `
          INSERT INTO passbook (user_id, action, description, type, amount)
          VALUES (?, ?, ?, 'CREDIT', ?)
        `,
        [userId, "SPIN WHEEL BONUS", "AI Fact bonus", 0]
      );

    } catch (error) {
      console.error(
        "Error updating token balance or inserting into passbook:",
        error
      );
    }
  }
  if(fiftyPercentOffer){
    try {
      await executeQuery(
        `
          INSERT INTO passbook (user_id, action, description, type, amount)
          VALUES (?, ?, ?, 'CREDIT', ?)
        `,
        [userId, "SPIN WHEEL BONUS", "50% Off- AI Gensis",0]
      );
    console.log("fiftyPercentOffer")
    const res=await executeQuery(
      `
        UPDATE users_data 
        SET discount_percentage = ? , discount_time = ?
        WHERE id = ?
      `,
      [50.00,new Date(), userId]
    );
    console.log(res)
  } catch (error) {
    console.error(
      "Error updating token balance or inserting into passbook:",
      error
    );
  }
}
  if(luckyDrawEntry){
    try {
      await executeQuery(
        `
          INSERT INTO passbook (user_id, action, description, type, amount)
          VALUES (?, ?, ?, 'CREDIT', ?)
        `,
        [userId ,"SPIN WHEEL BONUS","Lucky draw entry",0]
      );
  } catch (error) {
    console.error(
      "Error Lucky draw entry inserting into passbook:",
      error
    );
  }
}
  if (extraLife > 0) {
    await executeQuery(
      `
        INSERT INTO passbook (user_id, action, description, type, amount)
        VALUES (?, ?, ?, 'CREDIT', ?)
      `,
      [userId, "SPIN WHEEL BONUS", actionDescription, extraLife]
    );
  }
};
const user_spin = async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);
  const query = `
      SELECT current_spins, created_at 
      FROM users_data 
      WHERE id = ?
    `;

  try {
    await executeQuery(`
        UPDATE users_data
        SET current_spins = 3
        WHERE current_spins > 3
    `);
  //   await executeQuery(`
  //     UPDATE users_data
  //     SET current_spins = 0
  //     WHERE created_at < NOW() - INTERVAL 7 DAY  -- Check for accounts older than 7 days
  //     AND sub_status = 'inactive' AND id= ?;
  // `,[userId]);
  
  
    const results = await executeQuery(query, [userId]);

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateWallet = async (req, res) => {
  const { address, user_id } = req.body;
  const getData = "SELECT * FROM users_data WHERE id=?";
  const result = await executeQuery(getData, [user_id]);
  if (result.length > 0) {
    if (result[0].wallet_address) {
      console.log("address already updated");
    } else {
      const updateQuery = "UPDATE users_data SET wallet_address = ? WHERE id = ?";
      await executeQuery(updateQuery, [address, user_id]);
    }
    return res.send("success");
  } else {
    console.log("error while getting data");
    return res.send("user not found");
  }
}
const checkUserMembership = async (req, res) => {
  const { chatId, userId } = req.query;
  const botToken = "7380912242:AAGiyxLTYmo6HkDXphpxyM-lLL2aGOqsAg0";
  const channelId = "@skilleareumofficial"; // or channel ID
  // const chatId = "5195277070"; // ID of the user you want to check
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${botToken}/getChatMember`,
      {
        params: {
          chat_id: channelId,
          user_id: chatId,
        },
      }
    );

    const status = response.data.result.status;
    if (
      status === "member" ||
      status === "administrator" ||
      status === "creator"
    ) {
      console.log("User has joined the channel");
      const isTelegramJoin = `SELECT * FROM passbook WHERE action=? AND user_id=?`;
      const TeleResponse = await executeQuery(isTelegramJoin, [
        "TELEGRAM JOIN",
        userId,
      ]);
      if (TeleResponse.length > 0) {
        return res.status(200).json({
          success: false,
          message: "Bonus already claimed!",
        });
      }
      // Add logic to reward user
      const updateUser = `UPDATE users_data 
      SET token_balance = token_balance+250
      WHERE id = ?;
      `;
      await executeQuery(updateUser, [userId]);

      const passbookQuery =
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
      await executeQuery(passbookQuery, [
        userId,
        "TELEGRAM JOIN",
        "Your Telegram Join Bonus Credited",
        250,
      ]);
      return res
        .status(200)
        .json({ success: true, message: "Bonus credited!" });
    } else {
      console.log("Join to claim your reward!");
      return res
        .status(200)
        .json({ success: false, message: "Join to claim your reward!" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.error("Error checking user membership:", error);
  }
};
const contactUs = async (req, res) => {
  const { firstName, email, message, phoneNumber } = req.body;
  
  try {
    // Validate input
    if (!firstName || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Send email
    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 2525,
      secure: false,
      auth: {
        user: "postmaster@mg.skilleareum.ai",
        pass: process.env.Mailgun_password,
      },
      tls: {
        rejectUnauthorized: false,
      },
      timeout: 10000,
      logger: true,
      debug: true,
    });

    await transporter.sendMail({
      to: "support@skilleareum.ai",
      subject: "New Contact Us Message",
      from: email,
      html: `<div style="font-family: 'Poppins', sans-serif; font-size: 14px; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">
          <div style="background-color: #0285ff; padding: 2rem 3rem;">
              <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
          </div>
          <div style="background-color: #fff; padding: 20px;">
              <p style="font-size: 18px; font-weight: bold; color: #121a26;">📩 New Contact Message</p>
              <p style="font-size: 16px; font-weight: 500; color: #384860;">From: <strong>${firstName}</strong> (${email})</p>
              <p style="font-size: 16px; font-weight: 500; color: #384860;">Phone :${phoneNumber}</p>
              <p style="margin-top: 10px; color: #384860;">Message:</p>
              <p style="background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${message}</p>
          </div>
          <div style="background-color: #0285ff; padding: 1rem; text-align: center; color: white;">
              <p>support@skilleareum.ai</p>
              <p>Skilleareum Inc © 2025</p>
          </div>
      </div>`,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Error sending message" });
  }
};
const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Send email
    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 2525,
      secure: false,
      auth: {
        user: "postmaster@mg.skilleareum.ai",
        pass: process.env.Mailgun_password,
      tls: {
        rejectUnauthorized: false,
      },
      timeout: 10000,
      logger: true,
      debug: true,
    });

    await transporter.sendMail({
      to: "support@skilleareum.ai",
      subject: "New Subscription Request",
      from: email,
      html: `<div style="font-family: 'Poppins', sans-serif; font-size: 14px; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">
          <div style="background-color: #0285ff; padding: 2rem 3rem;">
              <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
          </div>
          <div style="background-color: #fff; padding: 20px;">
              <p style="font-size: 18px; font-weight: bold; color: #121a26;">📩 New Subscription</p>
              <p style="font-size: 16px; font-weight: 500; color: #384860;">Email: <strong>${email}</strong></p>
              <p style="margin-top: 10px; color: #384860;">A new user has subscribed to the newsletter.</p>
          </div>
          <div style="background-color: #0285ff; padding: 1rem; text-align: center; color: white;">
              <p>support@skilleareum.ai</p>
              <p>Skilleareum Inc © 2025</p>
          </div>
      </div>`,
    });

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Error subscribing" });
  }
};

const getMissionStatus = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(req.body, req.query);

    if (!userId) {
      return res.status(400).json({ message: "User id is mandatory" });
    }

    const checkAnyTime = ['TELEGRAM JOIN', 'Twitter Join', 'Add Email'];
    const checkToday = [
      'Missing Letter',
      'Jumble Word',
      'Memory Game',
      'Perfect Match',
      'FARMING BONUS',
      'DAILY ACTIVE BONUS',
      'SPIN WHEEL BONUS',
    ];

    const results = await executeQuery(
      `SELECT action, created_at FROM passbook WHERE user_id = ?`,
      [userId]
    );

    const userActions = results.map(row => ({
      action: row.action,
      created_at: row.created_at
    }));

    const today = new Date().toISOString().split("T")[0];
    const missionStatus = {};

    // ✅ For 'TELEGRAM JOIN', 'Twitter Join', 'Add Email'
    checkAnyTime.forEach(action => {
      const entry = userActions.find(e => e.action === action);
      if (!entry) {
        // Not completed at all
        missionStatus[action] = { claimed: false, older: false };
      } else {
        const actionDate = new Date(entry.created_at).toISOString().split("T")[0];
        const isToday = actionDate === today;
        missionStatus[action] = {
          claimed: true,     // Only mark as claimed if done today
          older: !isToday       // True if done before today
        };
      }
    });

    // ✅ For daily tasks (checkToday)
    checkToday.forEach(action => {
      missionStatus[action] = userActions.some(entry =>
        entry.action === action &&
        new Date(entry.created_at).toISOString().split("T")[0] === today
      );
    });

    // ✅ Dynamic matches
    missionStatus['RETWEET BONUS'] = userActions.some(entry =>
      entry.action.startsWith('RETWEET BONUS-') &&
      new Date(entry.created_at).toISOString().split("T")[0] === today
    );

    missionStatus['DAILY ACTIVE BONUS'] = userActions.some(entry =>
      entry.action.startsWith('DAILY ACTIVE BONUS DAY-') &&
      new Date(entry.created_at).toISOString().split("T")[0] === today
    );

    return res.status(200).json({ success: true, data: missionStatus });

  } catch (error) {
    console.error("Error in getMissionStatus:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
const sendResetPasswordLink = async (req, res) => {
  const { email } = req.body;

  try {
    const users = await executeQuery("SELECT * FROM users_data WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "30m" }
     );

    const resetLink = `https://web.skilleareum.ai/reset-password?token=${resetToken}`;

    const htmlContent = `
      <div style="font-family: 'Poppins', sans-serif; font-size: 14px; background-color: #f5f5f5; max-width: 700px; margin: auto;">
        <div style="background-color: #0285ff; padding: 2rem 3rem;">
          <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
        </div>
        <div style="background-color: #fff; padding: 20px;">
          <p style="font-size: 18px; font-weight: bold;">🔐 Reset Your Password</p>
          <p>Hi ${email},</p>
          <p>Click the button below to reset your password. This link will expire in 30 minutes:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #0285ff; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px;">Reset Password</a>
          </div>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p style="font-weight: 600;">Best regards,<br>Skilleareum Support Team</p>
        </div>
        <div style="background-color: #0285ff; padding: 1rem; text-align: center; color: white;">
          <p>support@skilleareum.ai</p>
          <p>Skilleareum Inc © 2025</p>
        </div>
      </div>
    `;

    const sendSmtpEmail = {
      sender: { email: "info@skilleareum.ai", name: "Skilleareum" },
      to: [{ email, name: user.name || "User" }],
      subject: "Password Reset Request",
      htmlContent,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ message: "Reset password link sent to email" });

  } catch (err) {
    console.error("Reset Link Error:", err);
    return res.status(500).json({ message: "Failed to send reset link", error: err });
  }
};
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required." });
    }

    // Check password strength
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded.userId;

    // Check if user still exists
    const userResult = await executeQuery("SELECT * FROM users_data WHERE id = ?", [userId]);
    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found or account no longer exists." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await executeQuery("UPDATE users_data SET password = ? WHERE id = ?", [hashedPassword, userId]);

    return res.status(200).json({ message: "Password updated successfully." });

  } catch (err) {
    console.error("Password Reset Error:", err);

    // Check if token expired or invalid
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Reset link has expired. Please request a new one." });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid reset token." });
    }

    return res.status(500).json({ message: "Something went wrong during password reset.", error: err });
  }
};



// Function to send email to a single recipient
async function sendReminderEmail(email, name) {
  const displayName = name && name.trim() !== '' ? name : 'Participant';

  try {
    let powerAutomateUrl= "https://default3bd08ab751024cd6870a23a3434426.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/47a1d021fb5d4221b4546db9c527cf38/triggers/manual/paths/invoke/?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mt7Oq8znPktzVB4AD16GP4mXBzN63WQatRS7DHS8hfk";
        

        // 4. Call Power Automate webhook
        const response = await axios.post(
            powerAutomateUrl,
            { name :displayName, email },
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.status >= 200 && response.status < 300) {
           return { success: true, email, message: "Email sent successfully" };
        }
    
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}:`, error.message);
    return { success: false, email, error: error.message };
  }
}

// Function to add delay between emails
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to send emails to all subscribers
async function sendBulkReminderEmails(req,res) {
  
  try {

    
    const rows = [
  { name: "", email: "devtesting955@gmail.com", subscribed_at: "2025-07-21 12:06:59" },
  { name: "", email: "admin@gmail.com", subscribed_at: "2025-07-21 15:43:34" },
  { name: "", email: "hipeb67599@forexru.com", subscribed_at: "2025-07-21 15:52:05" },
  { name: "", email: "", subscribed_at: "2025-07-22 06:16:53" },
  { name: "", email: "jdj@hf.com", subscribed_at: "2025-07-25 04:49:37" },
  { name: "", email: "pujoli@mailinator.com", subscribed_at: "2025-07-29 16:46:54" },
  { name: "", email: "vehohanozy@mailinator.com", subscribed_at: "2025-07-29 16:47:06" },
  { name: "Manish", email: "manishsubramanian@mailinator.com", subscribed_at: "2025-07-29 16:51:23" },
  { name: "", email: "xiwes10058@balincs.com", subscribed_at: "2025-07-29 17:51:02" },
  { name: "", email: "pewana9590@balincs.com", subscribed_at: "2025-07-29 18:00:33" },
  { name: "", email: "shubhamsandilyadbg2@gmail.com", subscribed_at: "2025-08-02 05:48:06" },
  { name: "", email: "Kannankarupaiya7@gmail.com", subscribed_at: "2025-08-04 17:06:30" },
  { name: "", email: "jobilal865@sectorid.com", subscribed_at: "2025-08-04 17:07:19" },
  { name: "", email: "manisinv@mailinator.com", subscribed_at: "2025-08-05 07:20:39" },
  { name: "Manju", email: "Loyola.ms@gmail.com", subscribed_at: "2025-08-05 07:23:08" },
  { name: "", email: "aketiseershika@gmail.com", subscribed_at: "2025-08-05 07:24:09" },
  { name: "", email: "minimilitia858@gmail.com", subscribed_at: "2025-08-05 07:28:36" },
  { name: "", email: "shubham@fabc.global", subscribed_at: "2025-08-05 07:42:07" },
  { name: "", email: "titice5214@dekpal.com", subscribed_at: "2025-08-05 07:47:16" },
  { name: "", email: "Manishu@mailinator.com", subscribed_at: "2025-08-05 07:52:47" },
  { name: "", email: "aaravraj858@gmail.com", subscribed_at: "2025-08-05 08:03:26" },
  { name: "", email: "testing@mailinator.com", subscribed_at: "2025-08-05 08:11:44" },
  { name: "", email: "Tests@mailinator.com", subscribed_at: "2025-08-05 10:43:46" },
  { name: "", email: "motax31404@hostbyt.com", subscribed_at: "2025-08-06 20:53:34" },
  { name: "", email: "mefyinoyde@necub.com", subscribed_at: "2025-08-06 20:53:56" },
  { name: "", email: "seershiseershika@gmail.com", subscribed_at: "2025-08-11 04:25:05" },
  { name: "", email: "litado5239@aravites.com", subscribed_at: "2025-08-11 04:52:00" },
  { name: "", email: "naniva6979@aravites.com", subscribed_at: "2025-08-11 06:13:32" },
  { name: "", email: "sklrtesting@mailinator.com", subscribed_at: "2025-08-11 06:36:45" },
  { name: "", email: "testuser@mailinator.com", subscribed_at: "2025-08-11 06:42:47" },
  { name: "", email: "reet@marsalamarketing.com", subscribed_at: "2025-08-11 06:52:16" },
  { name: "", email: "Start@marsalamarketing.com", subscribed_at: "2025-08-13 16:52:21" },
  { name: "", email: "Jasraajskochar@gmail.com", subscribed_at: "2025-08-13 19:53:21" },
  { name: "", email: "saurabhjotwani07@gmail.com", subscribed_at: "2025-08-14 00:00:38" },
  { name: "", email: "venkateshkarthik15@gmail.com", subscribed_at: "2025-08-15 04:26:49" },
  { name: "", email: "venkateshkarthik16@gmail.com", subscribed_at: "2025-08-15 16:41:44" },
  { name: "", email: "suresh310179@gmail.com", subscribed_at: "2025-08-15 22:42:33" },
  { name: "", email: "rpbhinder_bhinder@yahoo.com", subscribed_at: "2025-08-16 00:12:31" },
  { name: "", email: "kaurlyon@gmail.com", subscribed_at: "2025-08-16 03:51:43" },
  { name: "", email: "Mr.bhardwaj1428@gmail.com", subscribed_at: "2025-08-16 23:00:08" },
  { name: "", email: "vishaalgrow@gmail.com", subscribed_at: "2025-08-17 00:21:33" },
  { name: "", email: "D7052644@gmail.com", subscribed_at: "2025-08-17 16:57:45" },
  { name: "", email: "himajoy2094@gmail.com", subscribed_at: "2025-08-17 18:45:10" },
  { name: "", email: "akumaryyz@gmail.com", subscribed_at: "2025-08-18 01:24:05" },
  { name: "", email: "Priyankasarin24@gmail.com", subscribed_at: "2025-08-18 04:43:08" },
  { name: "", email: "xogeto1721@baxidy.com", subscribed_at: "2025-08-18 16:28:33" },
  { name: "", email: "teat@mailinator.com", subscribed_at: "2025-08-18 16:31:32" },
  { name: "shubham", email: "lipado2479@baxidy.com", subscribed_at: "2025-08-19 10:29:06" },
  { name: "Arunachalamani", email: "arunachalamani21@gmail.com", subscribed_at: "2025-08-19 12:33:37" },
  { name: "Kannan", email: "Kannankaruppaiya7@gmail.com", subscribed_at: "2025-08-19 12:40:44" },
  { name: "Kannan", email: "ww.tamilgamers@gmail.com", subscribed_at: "2025-08-19 12:43:21" },
  { name: "shubham", email: "dofepok731@colimarl.com", subscribed_at: "2025-08-19 14:01:19" },
  { name: "Venkat", email: "venkateshkarthik151617@gmail.com", subscribed_at: "2025-08-19 14:06:20" },
  { name: "shubham", email: "mekafa9700@colimarl.com", subscribed_at: "2025-08-19 14:06:43" },
  { name: "Akash", email: "amtrakash@gmail.com", subscribed_at: "2025-08-19 14:07:28" },
  { name: "shubham", email: "merek32760@baxidy.com", subscribed_at: "2025-08-19 14:16:51" },
  { name: "shubham", email: "merek32760@baxidy.com", subscribed_at: "2025-08-19 14:17:06" },
  { name: "Jack", email: "xadev38503@futebr.com", subscribed_at: "2025-08-19 14:17:51" },
  { name: "Akash", email: "vefowow925@jobzyy.com", subscribed_at: "2025-08-19 14:27:35" },
  { name: "bbf", email: "goat07902@mailshan.com", subscribed_at: "2025-08-19 14:27:51" },
  { name: "yathish", email: "yathishmg416@gmail.com", subscribed_at: "2025-08-19 14:43:29" },
  { name: "jack", email: "angelfish77736@mailshan.com", subscribed_at: "2025-08-19 14:47:58" },
  { name: "venkatesh", email: "karthiktester258@gmail.com", subscribed_at: "2025-08-19 14:55:12" },
  { name: "Deepak", email: "deepakbot95@gmail.com", subscribed_at: "2025-08-19 15:03:25" },
  { name: "jack", email: "crocodile33274@aminating.com", subscribed_at: "2025-08-19 15:05:48" },
  { name: "jack", email: "vefowow925@jobzyy.com", subscribed_at: "2025-08-19 15:09:34" },
  { name: "Aaradhya A", email: "a_balasaheb@hotmail.com", subscribed_at: "2025-08-20 05:37:14" },
  { name: "Kannan2949", email: "ww.tamilgamers@gmail.com", subscribed_at: "2025-08-20 09:15:03" },
  { name: "2004dkdk*=*%*%", email: "jdjdkd@jfj.com", subscribed_at: "2025-08-20 09:16:07" },
  { name: "Kannan", email: "kannankaruppaiya@fabc.global", subscribed_at: "2025-08-20 09:24:29" },
  { name: "Shubham", email: "shubhamsandilyadbg2@gmail.com", subscribed_at: "2025-08-21 05:13:15" }
];

    
    console.log(`📧 Found ${rows.length} subscribers to send emails to`);
    
    const results = {
      total: rows.length,
      sent: 0,
      failed: 0,
      errors: []
    };
    
    // Send emails with delay
    for (let i = 0; i < rows.length; i++) {
      const { name, email } = rows[i];
      
      console.log(`📤 Sending email ${i + 1}/${rows.length} to: ${email}`);
      
      const result = await sendReminderEmail(email, name);
      
      if (result.success) {
        results.sent++;
      } else {
        results.failed++;
        results.errors.push({
          email: result.email,
          error: result.error
        });
      }
      
      // Add delay between emails to avoid rate limiting (1 second)
      if (i < rows.length - 1) {
        await delay(1000);
      }
    }
    
    // Print summary
    console.log('\n📈 SUMMARY:');
    console.log(`Total subscribers: ${results.total}`);
    console.log(`Successfully sent: ${results.sent}`);
    console.log(`Failed: ${results.failed}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ Failed emails:');
      results.errors.forEach(error => {
        console.log(`  - ${error.email}: ${error.error}`);
      });
    }
    return res.status(200).json({message: "Bulk email process completed. Check server logs for details.", summary: results});
  } catch (error) {
    console.error('💥 Database error:', error.message);
    return res.status(500).json({message: "Bulk email process failed. Check server logs for details.", error: error.message});

  } 
}

// Test function to send email to a single address first
async function testSingleEmail(req,res) {
  try{
    const email = "shubham@fabc.global"; // Replace with your test email
  const name = "Shubham";
  
 let powerAutomateUrl= "https://default3bd08ab751024cd6870a23a3434426.64.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/47a1d021fb5d4221b4546db9c527cf38/triggers/manual/paths/invoke/?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mt7Oq8znPktzVB4AD16GP4mXBzN63WQatRS7DHS8hfk";
        

        // 4. Call Power Automate webhook
        const response = await axios.post(
            powerAutomateUrl,
            { name, email },
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.status >= 200 && response.status < 300) {
            return res.json({ message: "Invite sent successfully!" });
        } else {
            console.error("Power Automate failed:", response.data);
            return res.status(500).json({ message: "Failed to send invite" });
        }
}catch(error){
    console.log('❌ Test email failed:', error);
    return res.status(500).json({message: "Test email process failed. Check server logs for details.", error: error})
  }
}

module.exports = {
  SignUpUser,
  userLogin,
  isUserExist,
  check_twitter_reward,
  check_assessment_reward,
  user_data,
  check_user_assessment,
  addEmail,
  update_user_avatar,
  fetch_user_data,
  update_user_xid,
  sendVeficationEmail,
  verify_email,
  getNextDayAssessment,
  saveEmail,
  user_spin,
  wheel_spin,
  checkUserMembership,
  getAllNotificationCount,
  getAllData,
  checkSponsorExists,
  updateWallet,
  sendOTP,
  verifyOTP,
  contactUs,
  subscribe,
  getMissionStatus,
  getAllAssessmentDaysController,
  SignUpAppUser,
  SignUpWebGoogleUser,
  sendResetPasswordLink,
  resetPassword,
  testSingleEmail,
  sendBulkReminderEmails,
  getReferralCode
  
};
