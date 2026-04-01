const express = require("express");
const app = express();
const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
const bp = require("body-parser");
const bcrypt = require("bcrypt");
const ethers = require('ethers');
const { executeQuery } = require("./Db");
const axios = require("axios");
const OpenAI = require("openai");
const jwt = require("jsonwebtoken");
// const { exec } = require('child_process');
// const token = require('./contracts/ERC20')
const dotenv = require("dotenv").config();
// const keythereum = require('keythereum');
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const BonusPoint = require("./config");
const { Subscription_ABI } = require("./ABI");
const { platform } = require("os");

app.use(bp.json());

app.use(
  cors({
    origin: "*",
  })
);
const SECRET_KEY = "nmGgh9CYN2wvXi7qrNTaLSRFyQE3s7A7";
const generateToken = (userId,program_type) => {
  const payload = { userId,program_type };
  const options = {};

  return jwt.sign(payload, SECRET_KEY, options);
};

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});

const saltRounds = 10;
const GoogleEmail_Registercheck_User = async (req, res) => {
  const { email } = req.body;

  try {
    const results = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );

    if (results.length > 0) {
      res.json({ message: "exists" });
    } else {
      res.json({ message: "success" });
    }
  } catch (error) {
    console.error("Error during register check:", error);
    res.json({ message: "error" });
  }
};

const SignUpUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      referral_code,
      twitter_name,
      x_userName,
      telegramId,
    } = req.body;
    // const mbc_api = await axios.get(`https://apiuser.mybusinessclub.com/infopower.asmx/Getuseremail?emailid=${email}&token=S@3k%2387sa@%23Cas@0a#87sa@#Cas@0a`)
    // if(mbc_api.data.result == 'SUCCESS'){
    // if(referral_code == 'SKLR178114'){
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkQuery = "SELECT * FROM users_data WHERE email = ?";
    const checkValues = [email];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length > 0) {
      return res
        .status(200)
        .json({ status: "failed", message: "Email already exists" });
    }
    let referred_by = 0;
    if (referral_code !== null) {
      const getReferral = "SELECT * FROM users_data WHERE referral_code = ?";
      const getReponse = await executeQuery(getReferral, referral_code);
      if (getReponse.length > 0) {
        referred_by = getReponse[0].id;
        let balance =
          parseFloat(getReponse[0].token_balance) +
          BonusPoint.PointBook.referralPoint;
        let dogs_balance =
          parseFloat(getReponse[0].dogs) + BonusPoint.PointBook.dogsBonus;
        const updateQuery =
          "UPDATE users_data SET token_balance = ?, dogs = ? WHERE id= ?";
        await executeQuery(updateQuery, [balance, dogs_balance, referred_by]);
        const description =
          "Referral bonus credited! " + name + " joined using your code.";
        const dogs_description =
          "Dogs Referral bonus credited! " + name + " joined using your code.";
        const passbookQuery =
          "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
        await executeQuery(passbookQuery, [
          referred_by,
          "REFERRAL BONUS",
          description,
          1000,
        ]);
        await executeQuery(passbookQuery, [
          referred_by,
          "REFERRAL BONUS",
          dogs_description,
          100,
        ]);
      }
    } else {
      return res.status(200).json({
        status: "failed",
        message: "You must have a referral code to proceed",
      });
    }

    const refferalCode = "SKLR" + randomnumber();

    const query =
      "INSERT INTO users_data (name, email, password,token_balance,referral_code,referred_by, twitter_name,x_userName,telegramId) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)";
    const values = [
      name,
      email,
      hashedPassword,
      BonusPoint.PointBook.joiningBonus,
      refferalCode,
      referred_by,
      twitter_name,
      x_userName,
      telegramId,
    ];
    const response = await executeQuery(query, values);

    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: dotenv.parsed.SMTPUSER,
        pass: dotenv.parsed.SMTPPASSWORD,
      },
    });
    transporter.sendMail({
      to: email,
      subject: "WELCOME TO SKILLEAREUM",
      from: "support@mg.fabc.global",
      html: ` 
            
            <div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">

      <div style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); padding-bottom: 2rem;
padding-top: 2rem;
padding-left: 3rem;">
 <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
</div>
        <div style="width: 85%; margin: auto; background-color: #fff; padding: 20px; z-index: 1;">
   <div>
           <p style="font-size: 18px; color: #121a26;">🎉 Welcome to Skilleareum!</p>
           <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #121a26;">Your Subscription is Confirmed!</p>

          <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px; margin-top: 20px; color: #384860;">Hi ${email},</p>
          
         <p style="margin-bottom: 10px; color: #384860;">
             Welcome to Skilleareum! We're thrilled to have you on board. Your
             subscription is now active, and you're all set to start your learning
             journey with us.
            </p>
     </div>
            <div style="margin-top: 20px; margin-bottom: 20px;">
       <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px; margin-top: 20px; color: #384860;">What's next?</p>
       <ol style="padding-left: 20px;">
         <li style="color: #384860;">
               Explore Courses: Dive into our extensive library of courses and start
               learning at your own pace.
             </li>
            <li style="color: #384860;">
               Earn Rewards: As you learn, you'll earn rewards that can be redeemed
               for various benefits.
             </li>
             <li style="color: #384860;">
               Join the Community: Connect with fellow learners, join discussions,
               and share your progress.
             </li>
           </ol>
            </div>
<div style="margin-top: 20px;">
       <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px; margin-top: 20px; color: #384860;">Need help?</p>
           <p style="color: #384860;">
             If you have any questions or need assistance, our support team is here
             for you. Feel free to reach out to us at
             <span style="color: #0047ff;">support@skilleareum.ai</span> or visit our
             <a href='https://skilleareum.ai/' ><span style="color: #0047ff;">Skilleareum.ai</span></a>
            </p>
     </div>
      <div style="margin-top: 20px;">
     <p style="color: #384860;">Thank you for choosing Skilleareum. We're excited to be a part of your learning journey!</p>

           <div style="margin-top: 20px;">
<p style="font-size: 14px;font-weight: 600; color: #384860; ">Best regards,<br>
Skilleareum Support Team. </p>

</div>
        </div>
   </div>
          
   <div  style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); height: 100%; padding: 1rem;">
    <div>
      <p  style="color: white; text-align: center;">support@skilleareum.ai</p>
    </div>
    <div>
      <p  style="color: white; text-align: center;">Skilleareum Inc © 2024</p>
      <p  style="color: white; text-align: center;">116 Calle Manuel Domenech San Juan, PR 00918 United States</p>
    </div>
  </div>
 
  </div>
          `,
    });

    const passbookQuery =
      "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
    await executeQuery(passbookQuery, [
      response.insertId,
      "JOIN BONUS",
      "Join Bonus Credited",
      1000,
    ]);
    if (!response) {
      return res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }

    // console.log("User signed up successfully.");
    return res.status(200).json({
      status: "success",
      message: "User has been registered successfully",
    });
    // }else{
    //   return res.status(200).json({status: 'failed', message: 'We are not accepting any registration now'});
    // }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

function randomnumber() {
  return Math.floor(Math.random() * (100000 - 1000) + 100000);
}

const SignUpGoogleUser = async (req, res) => {
  try {
    const { email, googleId, firstName } = req.body;
    // console.log("data", req.body);

    const query =
      "INSERT INTO users_data (name, email, googleId, GoogleLogin) VALUES (?, ?, ?, ?)";
    const values = [firstName, email, googleId, true];
    const response = await executeQuery(query, values);

    if (!response) {
      return res.json({ status: "failed", error: "Internal Server Error" });
    }

    // console.log("user signed up successfully..");
    return res
      .status(200)
      .json({ status: "success", message: "User signed up successfully" });
  } catch (err) {
    console.error(err);
    return res.json({ status: "failed", error: "Internal Server Error" });
  }
};

const SignUpWalletUser = async (req, res) => {
  try {
    const { wallet_address } = req.body;

    const existingUserQuery =
      "SELECT * FROM users_data WHERE wallet_address = ?";
    const existingUserValues = [wallet_address];
    const existingUserResponse = await executeQuery(
      existingUserQuery,
      existingUserValues
    );

    if (existingUserResponse.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "User already registered with this wallet address",
      });
    }

    const insertQuery =
      "INSERT INTO users_data (wallet_address, walletLogin) VALUES (?, ?)";
    const insertValues = [wallet_address, true];
    const response = await executeQuery(insertQuery, insertValues);

    if (!response) {
      return res
        .status(500)
        .json({ status: "failed", error: "Internal Server Error" });
    }

    // console.log("User signed up successfully..");
    return res.status(200).json({
      status: "success",
      message: "User signed up with wallet successfully",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "failed", error: "Internal Server Error" });
  }
};

const userWalletLogin = async (req, res) => {
  try {
    const { wallet_address } = req.body;

    const response = await executeQuery(
      "SELECT * FROM users_data WHERE wallet_address = ?",
      [wallet_address]
    );

    if (!response) {
      return res.json({ status: "failed", error: "Internal server error" });
    }

    if (response.length === 0) {
      return res.json({
        status: "failed",
        error: "No user registered with this wallet",
      });
    }

    const user = response[0];
    res.status(200).json({
      status: "success",
      message: "User found. Login successful",
      user,
    });

    // console.log("User login successful...");
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "failed", error: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const response = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );
    if (!response) {
      return res.json({ status: "failed", error: "Internal server error" });
    }
    if (response.length === 0) {
      return res.json({
        status: "failed",
        error: "There is No User Registered with This Email",
      });
    }
    const user = response[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ status: "failed", error: "Invalid email or password" });
    }

    // console.log(streakData);
    const token = generateToken(user.id,user.current_program);
    res
      .status(200)
      .json({ status: "success", error: "Login successful", token, user });

    // console.log("user Login successful...", user);
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: "Internal Server Error" });
  }
};

const GitHubLogin = async (req, res) => {
  const { code } = req.body;

  try {
    const githubTokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: dotenv.parsed.GITHUB_CLIENT_ID,
          client_secret: dotenv.parsed.GITHUB_CLIENT_SECRET,
          code: code,
        },
        headers: {
          accept: "application/json",
        },
      }
    );

    const { access_token } = githubTokenResponse.data;
    if (!access_token) {
      return res.status(400).json({ message: "GitHub login failed" });
    }

    res.json({ access_token });
  } catch (error) {
    console.error("GitHub login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const SignUpGitHubUser = async (req, res) => {
  const { githubId, email, userName } = req.body;

  try {
    const rows = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const sql =
      "INSERT INTO users_data (name, email, GitHubLogin, githubId) VALUES (?, ?, 1, ?)";
    await executeQuery(sql, [userName, email, githubId]);

    res.json({ status: "success" });
  } catch (error) {
    console.error("GitHub signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GitHub_Registercheck_User = async (req, res) => {
  const { email } = req.body;
  // console.log("email", email);
  try {
    const results = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );

    if (results.length > 0) {
      res.json({ message: "exists" });
    } else {
      res.json({ message: "success" });
    }
  } catch (error) {
    console.error("Error during register check:", error);
    res.json({ message: "error" });
  }
};

const LinkedInLogin = async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: dotenv.parsed.REDIRECT_URI,
          client_id: dotenv.parsed.LINKEDIN_CLIENT_ID,
          client_secret: dotenv.parsed.LINKEDIN_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error("Error exchanging code for access token:", error);
    res.status(500).json({ error: "Failed to exchange code for access token" });
  }
};

const SignUpLinkedInUser = async (req, res) => {
  const { linkedinId, email, userName } = req.body;

  try {
    const rows = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const sql =
      "INSERT INTO users_data (name, email, linkedinLogin, linkedinId) VALUES (?, ?, 1, ?)";
    await executeQuery(sql, [userName, email, linkedinId]);

    res.json({ status: "success" });
  } catch (error) {
    console.error("GitHub signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const get_user_profiles_data = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM users_data";
    const selectResults = await executeQuery(selectQuery);
    res.send({
      status: "success",
      message: "User data retrieved",
      userData: selectResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const update_user_profiles_data = async (req, res) => {
  const { email, wallet_address } = req.body;
  try {
    const updateEmailQuery = `
          UPDATE users_data
          SET email = ?
          WHERE wallet_address = ?
      `;
    await executeQuery(updateEmailQuery, [email, wallet_address]);

    const updateWalletQuery = `
          UPDATE users_data
          SET wallet_address = ?
          WHERE email = ?
      `;
    await executeQuery(updateWalletQuery, [wallet_address, email]);

    res.send({ status: "success", message: "User data updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// const getChatGPTResponse = async (req, res) => {
//   const { prompt } = req.body;
//   const projectId = 'proj_5aYki7ZidlvTPEFEYggAlz2e'; // Replace 'your_project_id' with your actual project ID
//   apiKey: process.env.OpenAI_API_KEY,; // Replace 'your_api_key' with your actual API key

//   const url = 'https://api.openai.com/v1/chat/completions';
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//     };

//     const data = {
//         model: 'gpt-3.5-turbo-instruct',
//         messages: [
//             { role: 'user', content: prompt }
//         ],
//         max_tokens: 150,
//         temperature: 0.7,
//     };

//     try {
//         const response = await axios.post(url, data, { headers });
//         const answer = response.data.choices[0].text.trim();
//       res.json(response.data);
//   } catch (error) {
//       console.error('Error getting response from ChatGPT:', error.response ? error.response.data : error.message);
//       res.status(500).json({ error: 'An error occurred while processing the request.' });
//   }
// }

const getChatGPTResponse = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({ text: response.choices[0].text });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).send("Error generating text");
  }
};
const getUserDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const selectQuery = `
      SELECT u.*, 
             p.vark_completed, p.cps_completed, p.ai_completed, p.archetype_id, p.seq
      FROM users_data u
      LEFT JOIN user_assessment_progress p ON u.id = p.user_id
      WHERE u.id = ?
    `;
    const selectResults = await executeQuery(selectQuery, [id]);
    res.send({
      status: "success",
      message: "User data retrieved",
      userData: selectResults,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateTokenPrice = async (req, res) => {
  const url =
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";
  const currency = "usd"; // You should define the currency variable
  const parameters = {
    symbol: "BNB,MATIC",
    convert: currency.toUpperCase(),
  };
  const headers = {
    Accepts: "application/json",
    "X-CMC_PRO_API_KEY": "37241523-8bef-408d-b58b-6027e386e20f",
  };
  const fetch_prices = await axios.get(url, {
    params: parameters,
    headers: headers,
  });
  const response = fetch_prices.data.data;
  const bnb_price = response.BNB[0].quote.USD.price;
  const matic_price = response.MATIC[0].quote.USD.price;
  return res.status(200).send({ bnb_price, matic_price });
};

const addCourses = async (req, res) => {
  try {
    const courseData = {
      courseTitle: req.body.courseTitle,
      description: req.body.description,
      image: req.file ? req.file.path : null,
      duration: req.body.duration,
      category: req.body.category,
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      stage: req.body.stage,
    };

    const sql = `
      INSERT INTO courses (course_title, description, image, duration, category, price, start_date, end_date, stage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(sql, [
      courseData.courseTitle,
      courseData.description,
      courseData.image,
      courseData.duration,
      courseData.category,
      courseData.price,
      courseData.startDate,
      courseData.endDate,
      courseData.stage,
    ]);

    res
      .status(201)
      .json({ message: "Course added successfully", course: courseData });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to add course", error: error.message });
  }
};

const get_course_details = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM courses";
    const selectResults = await executeQuery(selectQuery);
    // console.log("select results", selectResults);
    res.send({
      status: "success",
      message: "course data retrieved",
      userData: selectResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const allDailyChallenges = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM DailyChallenges";
    const selectResults = await executeQuery(selectQuery);
    res.send({
      status: "success",
      message: "Daily challenges retrieved",
      data: selectResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const update_payment_data = async (req, res) => {
  try {
    const {
      user_id,
      chain,
      amount,
      transaction_type,
      transaction_hash,
      transaction_status,
      token_type,
      address,
      wallet_found,
    } = req.body;
    const select_query =
      "SELECT * FROM transactions WHERE transaction_hash = ?";
    const response = await executeQuery(select_query, transaction_hash);
    if (response.length == 0) {
      const insert_query =
        "INSERT INTO transactions (user_id, chain, amount, transaction_type, transaction_hash, transaction_status, token_type) VALUES (?, ?, ?, ?, ?, ?, ?)";
      await executeQuery(insert_query, [
        user_id,
        chain,
        amount,
        transaction_type,
        transaction_hash,
        transaction_status,
        token_type,
      ]);

      const updateQuery =
        "UPDATE users_data SET paid_status = ?, plan = ?, wallet_address = ? WHERE id= ?";
      await executeQuery(updateQuery, ["1", "paid", address, user_id]);

      const insertQuery =
        "INSERT INTO rewards (user_id, reward_type, description, reward_point, chain, reward_token,contract_update, wallet_found) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      await executeQuery(insertQuery, [
        user_id,
        `JOINING BONUS`,
        `You have received joining bonus reward`,
        100,
        "MATIC",
        "SKLRR",
        0,
        1,
      ]);

      const getRefferalQuery = "SELECT * FROM users_data WHERE id = ?";
      const getRefferal = await executeQuery(getRefferalQuery, user_id);
      const percentage = getRefferal[0].community == "mbc" ? 40 : 20;
      const reward = (percentage / 100) * amount;

      await executeQuery(insertQuery, [
        getRefferal[0].referred_by,
        `REFFERAL BONUS`,
        `You have received Referral bonus reward`,
        reward,
        chain,
        "USDT",
        1,
        wallet_found,
      ]);
    }
    return res.send({
      status: "success",
      message: "Payment Completed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

const update_transaction_data = async (req, res) => {
  try {
    const {
      user_id,
      chain,
      amount,
      transaction_type,
      transaction_hash,
      transaction_status,
      token_type,
      address,
    } = req.body;
    const insert_query =
      "INSERT INTO transactions (user_id, chain, amount, transaction_type, transaction_hash, transaction_status, token_type) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await executeQuery(insert_query, [
      user_id,
      chain,
      amount,
      transaction_type,
      transaction_hash,
      transaction_status,
      token_type,
    ]);
    return res.send({
      status: "success",
      message: "Rewards Claimed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

const transaction_details = async (req, res) => {
  try {
    const { user_id, page = 1 } = req.body; // Default page is 1 if not provided
    const limit = 5; // Number of records to show per page
    const offset = (page - 1) * limit; // Calculate offset for pagination

    // First query to get the total number of records for the given user_id
    const count_query = `SELECT COUNT(*) AS total_count FROM passbook  WHERE user_id = ? 
      AND description NOT IN (
        '10 TON Points awarded', 
        '5 NOT Points awarded', 
        '10 HMSTR Points awarded', 
        '25 DOGS Points awarded', 
        '50 DOGS Points awarded', 
        '0.01 TON Points awarded'
      ) 
      AND description NOT LIKE 'Dogs Referral bonus credited! % joined using your code.'
    
  `;
    const countResult = await executeQuery(count_query, [user_id]);
    const total_count = countResult[0].total_count;

    // Modify query to include LIMIT and OFFSET for pagination
    const select_query = `
    SELECT * 
    FROM passbook 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;

    const getResponse = await executeQuery(select_query, [
      user_id,
      limit,
      offset,
    ]);

    // Calculate total pages
    const total_pages = Math.ceil(total_count / limit);

    return res.send({
      status: "success",
      data: getResponse,
      total_count, // Total number of records
      total_pages, // Total number of pages
      current_page: page, // Current page
    });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

const transaction_specificActions = async (req, res) => {
  try {
    const { email, userId } = req.query; // ✅ Using email instead of chatId
    const { page = 1 } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    // ✅ Query to fetch withdrawals based on email
    const withdrawQuery = `
      SELECT id, chatId, userAddress, email, hash, amount, status, 'withdraw' AS type, createdAt
      FROM withdraw_history 
      WHERE email = ? AND status="success"
      LIMIT ? OFFSET ?
    `;

    // ✅ Query to fetch subscriptions based on email
    const subscriptionQuery = `
      SELECT id, chatId, userAddress, plan, email, token, hash, amount, status, 'subscription' AS type, createdAt
      FROM subscription_history 
      WHERE email = ? AND status="success"
      LIMIT ? OFFSET ?
    `;

    // ✅ Query to fetch all successful subscriptions (for referral bonuses)
    const allSubscriptionsQuery = `
      SELECT id, chatId, userAddress, email, plan, token, hash, amount, status, createdAt
      FROM subscription_history 
      WHERE status="success"
    `;

    // ✅ Query to get referred users based on email now instead of chatId
    const referrerQuery = `
      SELECT email FROM users_data WHERE referred_by = ? AND evm_wallet_address IS NOT NULL
    `;

    // ✅ Query to fetch wallet details based on email
    const walletDetailsQuery = `
      SELECT hmstr AS total_hmstr, ton AS total_ton, dogs AS total_dogs, not_coin AS total_not_coin
      FROM users_data 
      WHERE email = ?
    `;

    // ✅ Execute queries
    const withdraws = await executeQuery(withdrawQuery, [email, limit, offset]);
    const subscriptions = await executeQuery(subscriptionQuery, [email, limit, offset]);
    const allSubscriptions = await executeQuery(allSubscriptionsQuery);
    const referredUsers = await executeQuery(referrerQuery, [userId]);

    const transactions = [...withdraws, ...subscriptions];

    // ✅ Loop through referred users to add referral bonuses
    for (const refUser of referredUsers) {
      const referredEmail = refUser.email;

      // Find all subscriptions by the referred user
      const referredSubscriptions = allSubscriptions.filter(sub => sub.email === referredEmail);

      // for (const sub of referredSubscriptions) {
      //   // Add referral bonus transaction
      //   transactions.push({
      //     id: `bonus-${sub.id}`,
      //     email: sub.email,
      //     userAddress: sub.userAddress,
      //     hash: sub.hash,
      //     token: sub.token,
      //     amount: sub.amount * 0.2, // 20% bonus
      //     status: "success",
      //     type: "referral bonus",
      //     createdAt: sub.createdAt,
      //   });
      // }
    }

    // ✅ Sort all transactions by createdAt (latest first)
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // ✅ Get total count based on email instead of chatId
    const totalCountQuery = `
      SELECT COUNT(*) AS total FROM (
        SELECT id FROM withdraw_history WHERE email = ? AND status="success"
        UNION ALL
        SELECT id FROM subscription_history WHERE email = ? AND status="success"
      ) AS combined
    `;

    const totalCountResult = await executeQuery(totalCountQuery, [email, email]);
    const total_count = totalCountResult[0]?.total || 0;
    const total_pages = Math.ceil(total_count / limit);

    // ✅ Fetch wallet details based on email
    const walletDetails = await executeQuery(walletDetailsQuery, [email]);

    return res.json({
      status: "success",
      walletDetails,
      data: transactions,
      total_count,
      total_pages,
      current_page: page,
    });

  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return res.status(500).send({ error: error.message });
  }
};


const verify_email = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const emailotp = otp.replace(/[\[\]]/g, "");
    const select_query = "SELECT * FROM email_OTP WHERE email = ?";
    const getReponse = await executeQuery(select_query, email);
    if (getReponse[0].otp == emailotp) {
      return res.json({
        status: "success",
        message: "OTP Verified Successfully",
      });
    } else {
      return res.json({
        status: "failed",
        message: "Invalid OTP. Please enter valid OTP",
      });
    }
  } catch (error) {
    return res.json({ status: "failed", message: "Unable to verify email" });
  }
};

const subscripe_email = async (req, res) => {
  try {
    const { email } = req.body;
    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: dotenv.parsed.SMTPUSER,
        pass: dotenv.parsed.SMTPPASSWORD,
      },
    });
    transporter.sendMail({
      to: email,
      subject: "WELCOME TO SKILLEAREUM",
      from: "support@mg.fabc.global",
      html: `
      
     <div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">

      <div style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); padding-bottom: 2rem;
padding-top: 2rem;
padding-left: 3rem;">
 <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
</div>
        <div style="width: 85%; margin: auto; background-color: #fff; padding: 20px; z-index: 1;">
   <div>
           <p style="font-size: 18px; color: #121a26;">🎉 Welcome to Skilleareum!</p>
           <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #121a26;">Your Subscription is Confirmed!</p>

          <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px; margin-top: 20px; color: #384860;">Hi ${email},</p>
          
         <p style="margin-bottom: 10px; color: #384860;">
             Welcome to Skilleareum! We're thrilled to have you on board. Your
             subscription is now active, and you're all set to start your learning
             journey with us.
            </p>
     </div>
            <div style="margin-top: 20px; margin-bottom: 20px;">
       <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px; margin-top: 20px; color: #384860;">What's next?</p>
       <ol style="padding-left: 20px;">
         <li style="color: #384860;">
               Explore Courses: Dive into our extensive library of courses and start
               learning at your own pace.
             </li>
            <li style="color: #384860;">
               Earn Rewards: As you learn, you'll earn rewards that can be redeemed
               for various benefits.
             </li>
             <li style="color: #384860;">
               Join the Community: Connect with fellow learners, join discussions,
               and share your progress.
             </li>
           </ol>
            </div>
<div style="margin-top: 20px;">
       <p style="font-size: 16px; font-weight: 500; margin-bottom: 20px; margin-top: 20px; color: #384860;">Need help?</p>
           <p style="color: #384860;">
             If you have any questions or need assistance, our support team is here
             for you. Feel free to reach out to us at
             <span style="color: #0047ff;">support@skilleareum.ai</span> or visit our
             <a href='https://skilleareum.ai/' ><span style="color: #0047ff;">Skilleareum.ai</span></a>
            </p>
     </div>
      <div style="margin-top: 20px;">
     <p style="color: #384860;">Thank you for choosing Skilleareum. We're excited to be a part of your learning journey!</p>

           <div style="margin-top: 20px;">
<p style="font-size: 14px;font-weight: 600; color: #384860; ">Best regards,<br>
Skilleareum Support Team. </p>

</div>
        </div>
   </div>
          
   <div  style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); height: 100%; padding: 1rem;">
    <div>
      <p  style="color: white; text-align: center;">support@skilleareum.ai</p>
    </div>
    <div>
      <p  style="color: white; text-align: center;">Skilleareum Inc © 2024</p>
      <p  style="color: white; text-align: center;">116 Calle Manuel Domenech San Juan, PR 00918 United States</p>
    </div>
  </div>
 
  </div>
    `,
    });
    return res
      .status(200)
      .json({ status: "success", message: "Subscription mail has been sent" });
  } catch (error) {
    return res.status(200).json({
      status: "failed",
      message: "Unable to send Mail. Please try again later",
    });
  }
};

const trigger_email_verify = async (req, res) => {
  try {
    const { email, name } = req.body;
    const select_query = "SELECT * FROM email_OTP where email = ?";
    const getResponse = await executeQuery(select_query, email);
    const emailOtp = Math.floor(1000 + Math.random() * 9000);
    if (getResponse.length == 0) {
      const insertQuery = "INSERT INTO email_OTP (email, otp) VALUES (?,?)";
      await executeQuery(insertQuery, [email, emailOtp]);
    } else {
      const updateQuery = "UPDATE email_OTP SET otp = ? WHERE id = ?";
      await executeQuery(updateQuery, [emailOtp, getResponse[0].id]);
    }
    const otpString = emailOtp.toString();
    const otpArray = otpString.split("");
    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: dotenv.parsed.SMTPUSER,
        pass: dotenv.parsed.SMTPPASSWORD,
      },
    });
    transporter.sendMail({
      to: email,
      subject: "Email Verification OTP",
      from: "support@mg.fabc.global",
      html: `

             <div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">
  
              <div style="background-color: #0285ff; background-image: url('https://skilleareum.ai/assets/emailbg.png'); background-size: cover; background-repeat: no-repeat; padding: 2rem 3rem;">
      <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
    </div>
              <div style="width: 85%; margin: auto; background-color: #fff; padding: 10px;">
      <div style="margin-bottom: 1.5rem;">
                   <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #121a26;">Your Email Verification Code</p>
                  <div>
                     <p style="font-size: 16px; margin-bottom: 10px; color: #384860;"><strong>Dear ${name},</strong></p>
                   <p style="margin-bottom: 10px; color: #384860;">Thank you for signing up with Skilleareum.</p>
                    <p style="margin-bottom: 10px; color: #384860;">
                      To complete your registration and verify your email address,
                      please use the following One-Time Password (OTP).
                    </p>
                  </div>
                </div>
                
                 <div>
        <p style=" font-weight: bold; font-size: 20px; margin-bottom: 10px; text-align: center; color: #384860;">Verification Code</p>
      </div>
       <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; text-align: center; margin: 0 auto;">
        <tr>
          <td style="padding: 10px;">
                  <div style="display: inline-block; text-align: center; max-width: 100%; width: auto;">
                     <div style="background-color: #0285ff; padding: 0.8rem; border-radius: 8px; font-size: 1rem; color: white; font-weight: 700; margin: 2px; display: inline-block;">${otpArray[0]}</div>
                    <div style="background-color: #0285ff; padding: 0.8rem; border-radius: 8px; font-size: 1rem; color: white; font-weight: 700; margin: 2px; display: inline-block;">${otpArray[1]}</div>
                     <div style="background-color: #0285ff; padding: 0.8rem; border-radius: 8px; font-size: 1rem; color: white; font-weight: 700; margin: 2px; display: inline-block;">${otpArray[2]}</div>
                    <div style="background-color: #0285ff; padding: 0.8rem; border-radius: 8px; font-size: 1rem; color: white; font-weight: 700; margin: 2px; display: inline-block;">${otpArray[3]}</div>
                  </div>
                    </td>
        </tr>
      </table>
              

               <div style="margin-bottom: 1.5rem;">
        <p style="color: #384860; margin-top: 5px;">Please enter this code in the verification screen on our platform.</p>
        <p style="color: #384860;">This OTP is valid for the next 3 minutes. If you did not request this, please ignore this email or contact our support team immediately.</p>
      </div>
       <div style="margin-top: 20px;">
            <p style="font-size: 14px;font-weight: 600; color: #384860; ">Best regards,<br>
                Skilleareum Support Team. </p>
           
          </div>
    </div>
              <div style="padding: 10px; width: 90%; margin: auto; font-weight: 500; text-align: center; font-size: small;">
      <p style="font-weight: bold;">
        Important:
        <span style="font-weight: 400 ;" >Do not share this code with anyone. Skilleareum will never ask you for your OTP via email or phone.</span>
      </p>
    </div>
              <div  style="background-image: url(https://skilleareum.ai/assets/emailbg.png); background-color: #0285ff; height: 100%; padding: 1rem;">
      <div>
        <p  style="color: white; text-align: center;">support@skilleareum.ai</p>
      </div>
      <div>
        <p  style="color: white; text-align: center;">Skilleareum Inc © 2024</p>
        <p  style="color: white; text-align: center;">116 Calle Manuel Domenech San Juan, PR 00918 United States</p>
      </div>
    </div>
            </div>
          
      `,
    });
    return res.status(200).json({
      status: "success",
      message: "OTP has been sent to your mail id",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "failed",
      message: "Unable to send OTP. Please try again later",
    });
  }
};

// const user_daily_challenges = async (req, res) => {
//   const { email } = req.query;

//   console.log("response.....",req.query);
//   try {
//     const selectDailyChallengesQuery = "SELECT * FROM DailyChallenges";
//     const dailyChallenges = await executeQuery(selectDailyChallengesQuery);

//     const selectUserActionsQuery = "SELECT day, status FROM users_action WHERE email = ?";
//     const userActions = await executeQuery(selectUserActionsQuery, [email]);

//     const userActionsMap = {};
//     userActions.forEach(action => {
//       userActionsMap[action.day] = action.status;
//     });

//     const response = dailyChallenges.map(challenge => ({
//       ...challenge,
//       userStatus: userActionsMap[challenge.day] || 'not completed',
//       status_image: userActionsMap[challenge.day] === 'completed' ? 'assets/Group 1000015894.png' : 'assets/Group 1000015896.png'
//     }));

//     res.send({ status: "success", message: "Data retrieved successfully", data: response });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal server error" });
//   }
// }

const user_daily_challenges = async (req, res) => {
  const { email } = req.query;

  try {
    // Query to get all daily challenges
    const selectDailyChallengesQuery = "SELECT * FROM DailyChallenges";
    const dailyChallenges = await executeQuery(selectDailyChallengesQuery);

    // Query to get user actions from answer_set
    const selectUserActionsQuery =
      "SELECT day, percentage FROM answer_set WHERE email = ?";
    const userActions = await executeQuery(selectUserActionsQuery, [email]);

    // Query to get user actions from users_action
    const selectUserNewActionsQuery =
      "SELECT day, status FROM users_action WHERE email = ?";
    const userNewActions = await executeQuery(selectUserNewActionsQuery, [
      email,
    ]);

    // Map user actions from answer_set to check completion status
    const userActionsMap = {};
    userActions.forEach((action) => {
      if (action.percentage) {
        userActionsMap[action.day] = "completed";
      }
    });

    // Map user actions from users_action
    const userNewActionsMap = {};
    userNewActions.forEach((action) => {
      userNewActionsMap[action.day] = action.status;
    });

    // Merge the two maps, giving precedence to the actions from answer_set
    const mergedActionsMap = { ...userNewActionsMap, ...userActionsMap };

    // Create response by mapping daily challenges with user actions
    const response = dailyChallenges.map((challenge) => ({
      ...challenge,
      userStatus: mergedActionsMap[challenge.day] || "not completed",
      status_image:
        mergedActionsMap[challenge.day] === "completed"
          ? "/assets/Group 1000015894.png"
          : "/assets/Group 1000015896.png",
    }));

    // Send the response
    res.send({
      status: "success",
      message: "Data retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

// const video_duration = async (req, res) => {
//   try {
//     const {email, day} = req.body;
//     const checkQuery = 'SELECT id, watched_duration  FROM users_action WHERE email = ? AND day = ?';
//     const response = await executeQuery(checkQuery, [email, day]);
//     return res.status(200).json({status : "success", data : response});
//   } catch (error) {
//     res.status(500).send({ error: 'Internal server error' });
//   }
// }

// const users_action = async (req, res) => {
//   const { email, course_id, course_name, day, watched_percentage, watched_duration, status } = req.body;
//   console.log('users_action.....', req.body);

//   // const checkQuery = 'SELECT id, watched_percentage, watched_duration FROM users_action WHERE email = ? AND day = ?';
//   // const updateQuery = 'UPDATE users_action SET watched_percentage = ?, watched_duration = ?, status = ?, updated_at = NOW() WHERE email = ? AND day = ?';
//   // const insertQuery = 'INSERT INTO users_action (email, course_id, course_name, day, watched_percentage, watched_duration, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';

//   const checkQuery = 'SELECT id, watched_percentage  FROM users_action WHERE email = ? AND day = ?';
//   const updateQuery = 'UPDATE users_action SET watched_percentage = ?, status = ?, watched_duration = ?, updated_at = NOW() WHERE email = ? AND day = ?';
//   const insertQuery = 'INSERT INTO users_action (email, course_id, course_name, day, watched_percentage,  status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?,  NOW(), NOW())';
//   try {
//     const existingEntry = await executeQuery(checkQuery, [email, day]);

//     if (existingEntry.length > 0) {
//       const existingData = existingEntry[0];
//       const newWatchedPercentage = Math.max(existingData.watched_percentage, watched_percentage);
//       // const newWatchedDuration = Math.max(existingData.watched_duration, watched_duration);

//       await executeQuery(updateQuery, [newWatchedPercentage, status, watched_duration, email, day]);
//     } else {
//       await executeQuery(insertQuery, [email, course_id, course_name, day, watched_percentage,  status]);
//     }

//     res.status(200).send({ message: 'User action saved successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal server error' });
//   }
// };

const convertToSeconds = (duration) => {
  const parts = duration.split(":");
  return (
    parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  );
};

const users_action = async (req, res) => {
  const {
    email,
    course_id,
    course_name,
    day,
    watched_percentage,
    watched_duration,
    status,
  } = req.body;
  // console.log("req.body", req.body);

  const checkQuery =
    "SELECT id, watched_percentage, watched_duration FROM users_action WHERE email = ? AND day = ?";
  const updateQuery =
    "UPDATE users_action SET watched_percentage = ?, watched_duration = ?, status = ?, updated_at = NOW() WHERE email = ? AND day = ?";
  const insertQuery =
    "INSERT INTO users_action (email, course_id, course_name, day, watched_percentage, watched_duration, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

  try {
    const existingEntry = await executeQuery(checkQuery, [email, day]);

    if (existingEntry.length > 0) {
      const existingData = existingEntry[0];
      const newWatchedPercentage = Math.max(
        existingData.watched_percentage,
        watched_percentage
      );
      const newWatchedDuration =
        convertToSeconds(existingData.watched_duration) >
          convertToSeconds(watched_duration)
          ? existingData.watched_duration
          : watched_duration;

      await executeQuery(updateQuery, [
        newWatchedPercentage,
        newWatchedDuration,
        status,
        email,
        day,
      ]);
    } else {
      await executeQuery(insertQuery, [
        email,
        course_id,
        course_name,
        day,
        watched_percentage,
        watched_duration,
        status,
      ]);
    }

    res.status(200).send({ message: "User action saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const video_duration = async (req, res) => {
  const { email, day } = req.body;

  const query =
    "SELECT watched_duration, watched_percentage FROM users_action WHERE email = ? AND day = ?";

  try {
    const result = await executeQuery(query, [email, day]);

    if (result.length > 0) {
      res.status(200).json({ data: result });
    } else {
      res
        .status(404)
        .json({ error: "No data found for the given email and day" });
    }
  } catch (error) {
    console.error("Error fetching video data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const check_user_action_status = async (req, res) => {
  const { email, day } = req.query;

  const checkActionQuery =
    "SELECT status FROM users_action WHERE email = ? AND day = ?";
  const checkResultQuery =
    "SELECT result FROM answer_set WHERE email = ? AND day = ?";

  try {
    const actionResult = await executeQuery(checkActionQuery, [email, day]);
    const resultSet = await executeQuery(checkResultQuery, [email, day]);

    // if (actionResult.length > 0) {
    //   const status = actionResult[0].status;
    //   const result = resultSet.length > 0 ? resultSet[0].result : null;
    //   res.status(200).json({ status, result });
    // } else {
    //   res.status(200).json({ status: "not found", result: null });
    // }
    res.status(200).json({ result: resultSet });
  } catch (error) {
    console.error("Error checking user action status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_last_access = async (req, res) => {
  const { email, day } = req.query;

  const query =
    "SELECT created_at FROM users_action WHERE email = ? AND day = ? ORDER BY created_at DESC LIMIT 1";

  try {
    const result = await executeQuery(query, [email, day]);

    if (result.length > 0) {
      res.status(200).json({ lastAccessDate: result[0].created_at });
    } else {
      res.status(200).json({
        lastAccessDate: null,
        status: "failed",
        error: "No access record found for the given email and day",
      });
    }
  } catch (error) {
    console.error("Error fetching last access date:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_users_details = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM users_data ORDER BY created_at DESC";
    const selectResults = await executeQuery(selectQuery);
    // console.log("select results", selectResults);
    res.send({
      status: "success",
      message: "course data retrieved",
      userData: selectResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ status: "failed", error: "Email is required" });
    }

    const response = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );

    if (!response) {
      return res.json({ status: "failed", error: "Internal server error" });
    }

    if (response.length === 0) {
      return res.json({
        status: "failed",
        error: "There is No User Registered with This Email",
      });
    }

    return res.json({ status: "success", data: response[0] });
  } catch (error) {
    console.error("Error in userLogin:", error);
    return res.json({ status: "failed", error: "Internal server error" });
  }
};

// const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log("email", email)

//     if (!email) {
//       return res.json({ status: 'failed', error: 'Email is required' });
//     }

//     const response = await executeQuery('SELECT * FROM users_data WHERE email = ?', [email]);

//     if (!response) {
//       return res.json({ status: 'failed', error: 'Internal server error' });
//     }

//     if (response.length === 0) {
//       return res.json({ status: 'failed', error: 'There is No User Registered with This Email' });
//     }

//     // const emailOtp = Math.floor(1000 + Math.random() * 9000);
//     // const updateQuery = "UPDATE users_data SET reset_password_otp = ? WHERE email = ?";
//     // await executeQuery(updateQuery, [emailOtp, email]);

//     // console.log("OTP stored in the database:", emailOtp);

//     // let transporter = nodemailer.createTransport({
//     //   host: "smtp.mailgun.org",
//     //   port: 587,
//     //   auth: {
//     //     user: dotenv.parsed.SMTPUSER,
//     //     pass: dotenv.parsed.SMTPPASSWORD,
//     //   },
//     // });

//     // await transporter.sendMail({
//     //   to: email,
//     //   subject: "Password Reset Verification OTP",
//     //   from: "srifabc@gmail.com",
//     //   html: `
//     //     <p>Dear User,</p>
//     //     <p>We received a request to reset your password for your account with SKilleareum .</p>
//     //     <p>If you initiated this request, please use the following OTP to verify your identity:</p>
//     //     <h2>${emailOtp}</h2>
//     //     <p>If you did not request a password reset, please ignore this email. Your account's security is our top priority.</p>
//     //     <p>Thank you for choosing Skilleareum. We value your security and look forward to serving you!</p>
//     //   `,
//     // });

//     return res.status(200).json({
//       success: "OTP sent successfully to email",
//     });

//   } catch (error) {
//     console.error('Error in checkUser:', error);
//     return res.json({ status: 'failed', error: 'Internal server error' });
//   }
// };

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ status: "failed", error: "Email is required" });
    }

    const response = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );

    if (!response) {
      return res.json({ status: "failed", error: "Internal server error" });
    }

    if (response.length === 0) {
      return res.json({
        status: "failed",
        error: "There is No User Registered with This Email",
      });
    }

    const emailOtp = Math.floor(1000 + Math.random() * 9000);
    const updateQuery =
      "UPDATE users_data SET reset_password_otp = ? WHERE email = ?";
    await executeQuery(updateQuery, [emailOtp, email]);

    console.log("OTP stored in the database:", emailOtp);

    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: dotenv.parsed.SMTPUSER,
        pass: dotenv.parsed.SMTPPASSWORD,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Verification OTP",
      from: "support@mg.fabc.global",
      html: `
        <p>Dear User,</p>
        <p>We received a request to reset your password for your account with Skilleareum.</p>
        <p>If you initiated this request, please use the following OTP to verify your identity:</p>
        <h2>${emailOtp}</h2>
        <p>If you did not request a password reset, please ignore this email. Your account's security is our top priority.</p>
        <p>Thank you for choosing skilleareum. We value your security and look forward to serving you!</p>
      `,
    });

    return res.status(200).json({
      status: "success",
      message: "OTP sent successfully to email",
    });
  } catch (error) {
    console.error("Error in checkUser:", error);
    return res.json({ status: "failed", error: "Internal server error" });
  }
};

const User_verifyOTP = async (req, res) => {
  try {
    const { email, emailOtp } = req.body;
    // console.log("params", req.body);

    const selectQuery =
      "SELECT * FROM users_data WHERE email = ? AND reset_password_otp = ?";

    const results = await executeQuery(selectQuery, [email, emailOtp]);

    if (results.length > 0) {
      // console.log("OTP verification successful");

      res.status(200).json({ success: "OTP verification successful" });
    } else {
      // console.log("Invalid OTPs");
      res.json({ error: "Invalid OTPs" });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    res.json({ error: "Internal server error" });
  }
};

const User_UpdatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("params", req.body);

    const selectQuery = "SELECT * FROM users_data WHERE email = ?";

    const results = await executeQuery(selectQuery, [email]);

    if (results.length > 0) {
      // console.log("User found");

      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log("hashed password", hashedPassword);

      const updatePasswordQuery =
        "UPDATE users_data SET password = ? WHERE email = ?";

      await executeQuery(updatePasswordQuery, [hashedPassword, email]);

      // console.log("Password updated successfully");
      res.status(200).json({ success: "Password updated successfully" });
    } else {
      // console.log("User not found");
      res.json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    res.json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, currentpassword, newpassword } = req.body;

    const response = await executeQuery(
      "SELECT * FROM users_data WHERE email = ?",
      [email]
    );
    if (!response) {
      return res.json({ status: "failed", error: "Internal server error" });
    }
    if (response.length === 0) {
      return res.json({
        status: "failed",
        error: "There is No User Registered with This Email",
      });
    }

    const user = response[0];
    const isPasswordValid = await bcrypt.compare(
      currentpassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.json({ status: "failed", error: "Invalid current password" });
    }

    if (currentpassword === newpassword) {
      return res.json({
        status: "failed",
        error: "New password cannot be the same as the current password",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newpassword, 10);
    await executeQuery("UPDATE users_data SET password = ? WHERE email = ?", [
      hashedNewPassword,
      email,
    ]);

    res
      .status(200)
      .json({ status: "success", message: "Password updated successfully" });
    // console.log("Password updated successfully for user:", email);
  } catch (err) {
    console.error("Error in resetPassword:", err);
    res.send({ status: "failed", error: "Internal Server Error" });
  }
};

const get_referral_count = async (req, res) => {
  try {
    const selectQuery = `
      SELECT 
        u.referral_code,
        r.referral_count
      FROM 
        users_data u
      JOIN 
        (SELECT 
             referred_by,
             COUNT(*) AS referral_count
         FROM 
             users_data
         WHERE 
             referred_by != 0
         GROUP BY 
             referred_by) r
      ON 
        u.id = r.referred_by
    `;

    const selectResults = await executeQuery(selectQuery);
    // console.log("select results", selectResults);
    res.send({
      status: "success",
      message: "Referral data retrieved",
      userData: selectResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getReferralInformation = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Get user's own referral info
    const userQuery = "SELECT referral_code, referred_by FROM users_data WHERE id = ?";
    const userResult = await executeQuery(userQuery, [userId]);
    if (userResult.length === 0) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }
    const { referral_code, referred_by } = userResult[0];

    // 2. Get total referral count
    const countQuery = "SELECT COUNT(*) as total_referrals FROM users_data WHERE referred_by = ?";
    const countResult = await executeQuery(countQuery, [userId]);
    const total_referrals = countResult[0].total_referrals;

    // 3. Get total benefits earned from referral bonuses
    // We check both passbook and rewards tables as mentioned in the analysis
    const passbookSumQuery = "SELECT SUM(amount) as total FROM passbook WHERE user_id = ? AND action = 'REFERRAL BONUS'";
    const rewardsSumQuery = "SELECT SUM(reward_point) as total FROM rewards WHERE user_id = ? AND reward_type = 'REFFERAL BONUS'";
    
    const [passbookSum, rewardsSum] = await Promise.all([
      executeQuery(passbookSumQuery, [userId]),
      executeQuery(rewardsSumQuery, [userId])
    ]);

    const total_benefits = (passbookSum[0].total || 0) + (rewardsSum[0].total || 0);

    // 4. Get Sponsor details
    let sponsor_details = null;
    if (referred_by != 0) {
      const sponsorQuery = "SELECT name, referral_code, avatar, created_at FROM users_data WHERE id = ?";
      const sponsorResult = await executeQuery(sponsorQuery, [referred_by]);
      if (sponsorResult.length > 0) {
        sponsor_details = sponsorResult[0];
      }
    }

    // 5. Get Referral History (Transactions)
    const historyQuery = `
      (SELECT action as title, amount, description as message, created_at FROM passbook WHERE user_id = ? AND action = 'REFERRAL BONUS')
      UNION ALL
      (SELECT reward_type as title, reward_point as amount, description as message, created_at FROM rewards WHERE user_id = ? AND reward_type = 'REFFERAL BONUS')
      ORDER BY created_at DESC
    `;
    const referral_history = await executeQuery(historyQuery, [userId, userId]);

    res.json({
      status: "success",
      data: {
        referral_code,
        total_referrals,
        total_benefits,
        sponsor_details,
        referral_history
      }
    });

  } catch (error) {
    console.error("Error in getReferralInformation:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const sendMessageToSlack = async (req, res) => {
  const webhookUrl =
  const webhook = process.env.SLACK_WEBHOOK_URL;
  const message = { text: req.body.data };
  axios
    .post(webhookUrl, message, {
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
const updatePaymentStatus = async (req, res) => {
  try {
    const updateQuery =
      "UPDATE users_data SET plan= ? , paid_status = ? WHERE id = ?";
    const response = await executeQuery(updateQuery, [
      req.body.plan,
      req.body.paid_status,
      req.body.user_id,
    ]);
    return res.json({ status: "success", message: "Happy Learning" });
  } catch (error) {
    return res.json({ status: "failed", error: "Internal server error" });
  }
};

const get_questions = async (req, res) => {
  const { day, language = 'en' } = req.query;
    const {program_type = 'apprentice'}=req.user;

  // console.log("req.query", req.query);

  const query = "SELECT * FROM question_banks WHERE day = ? AND program_type = ? AND language = ?";
  try {
    let questions = await executeQuery(query, [day, program_type, language]);

    // Fallback to English if no questions found in the selected language
    if ((questions === undefined || (Array.isArray(questions) && questions.length === 0)) && language !== 'en') {
      const fallbackQuery = "SELECT * FROM question_banks WHERE day = ? AND program_type = ? AND language = 'en'";
      questions = await executeQuery(fallbackQuery, [day, program_type]);
    }

    //console.log("questions",questions)
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const normalizeAssessmentAnswer = (value) =>
  String(value || "")
    .trim()
    .replace(/^([a-d])[.):-]\s*/i, "")
    .replace(/\s+/g, " ")
    .toLowerCase();

const resolveStoredQuestionAnswer = (question) => {
  const rawAnswer = String(question?.answer || "").trim();
  const normalizedRawAnswer = normalizeAssessmentAnswer(rawAnswer);
  const optionMap = {
    a: question?.option_a,
    b: question?.option_b,
    c: question?.option_c,
    d: question?.option_d,
    option_a: question?.option_a,
    option_b: question?.option_b,
    option_c: question?.option_c,
    option_d: question?.option_d,
  };

  return optionMap[normalizedRawAnswer] || rawAnswer;
};

const submit_answers = async (req, res) => {
  const { email, course_name, day, course_id, answers, timeTaken, language = 'en' } = req.body;
    const {program_type}=req.user;

  console.log("req.body", req.body);

  const totalQuestions = answers.length;
  const answeredQuestions = answers.filter(
    (answer) => answer.response !== null
  ).length;
  // console.log("answeredQuestions", answeredQuestions);

  // Fetch correct answers from the database
  const fetchCorrectAnswersQuery =
    "SELECT id, answer, option_a, option_b, option_c, option_d FROM question_banks WHERE day = ? AND program_type = ? AND language = ?";
  let correctAnswers = await executeQuery(fetchCorrectAnswersQuery, [day, program_type, language]);

  if ((correctAnswers === undefined || (Array.isArray(correctAnswers) && correctAnswers.length === 0)) && language !== 'en') {
    correctAnswers = await executeQuery(fetchCorrectAnswersQuery, [day, program_type, 'en']);
  }

  const correctAnswersMap = {};
  correctAnswers.forEach((item) => {
    correctAnswersMap[item.id] = normalizeAssessmentAnswer(resolveStoredQuestionAnswer(item));
  });

 
  const correctAnswerCount = answers.filter((answer) => {
    // If the user has not provided a response (null or empty string), mark as incorrect
    const userResponse = answer.response
      ? normalizeAssessmentAnswer(answer.response)
      : null;

    // If no user response, return false (not correct)
    if (!userResponse) {
      return false;
    }

    const correctAnswer = correctAnswersMap[answer.questionId];

    // Compare the user's response with the correct answer
    return userResponse === correctAnswer;
  }).length;



  const rewardPoints = correctAnswerCount;
  

  const percentage = (correctAnswerCount / totalQuestions) * 100;
  const result = percentage >= 50 ? "Passed" : "Failed";


  // Prepare query to save the results
  const query =
    "INSERT INTO answer_set (email, course_name, day, program_type, course_id, answers, percentage, result, reward_points, timeTaken, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const answersJSON = JSON.stringify(answers);

  try {
    await executeQuery(query, [
      email,
      course_name,
      day,
      program_type,
      course_id,
      answersJSON,
      percentage,
      result,
      rewardPoints,
      timeTaken,
      language,
    ]);
    const selectQuery = "SELECT * FROM users_data WHERE id = ?";
    const response = await executeQuery(selectQuery, req.user.userId);
    //const task_reward_point = parseInt(rewardPoints) * 10;
    let task_reward_point;

    if (percentage >= 50) {
      // Calculate as percentage of 350 for scores 50% and above
      task_reward_point = Math.floor((percentage / 100) * 350);
    } else {
      // Calculate as percentage of 175 for scores below 50%
      task_reward_point = Math.floor((percentage / 100) * 175);
    }
    const tokenbalance =
      parseInt(response[0].token_balance) + task_reward_point;
    const updateQuery = "UPDATE users_data SET token_balance = ? WHERE id = ?";
    await executeQuery(updateQuery, [tokenbalance, response[0].id]);
    // Check if the reward for the specific day already exists
    const checkQuery = `
  SELECT COUNT(*) as count 
  FROM passbook 
  WHERE user_id = ? 
  AND action = ?`;

    const existingReward = await executeQuery(checkQuery, [
      response[0].id,
      `AI Skill Quest Reward Day-${day}`,
    ]);

    if (existingReward[0].count === 0) {
      // If no record exists for this day, proceed with the insert
      const insertPassbookQuery = `
    INSERT INTO passbook (user_id, action, description, type, amount) 
    VALUES (?, ?, ?, ?, ?)`;

      await executeQuery(insertPassbookQuery, [
        response[0].id,
        `AI Skill Quest Reward Day-${day}`,
        "Your AI Skill Quest Reward credited",
        "CREDIT",
        parseInt(task_reward_point),
      ]);
    } else {
      console.log("Reward for this day has already been credited.");
    }

    const insertQuery =
      "INSERT INTO rewards (user_id, reward_type, description, reward_point, reward_token,program_type) VALUES (?, ?, ?, ?, ?, ?)";
    await executeQuery(insertQuery, [
      response[0].id,
      `Daily Challenge`,
      `You have received day ${day} reward`,
      parseInt(rewardPoints) * 8,
      "SKLRR",
      program_type
    ]);
    res.status(200).json({
      totalQuestions,
      answeredQuestions,
      result,
      percentage: task_reward_point,
      timeTaken,
      day,
      correctAnswerCount,
    });
  } catch (error) {
    console.error("Error saving results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_last_assessment = async (req, res) => {
  const { email } = req.body;
    const {program_type}=req.user;

  const query =
    "SELECT * FROM answer_set WHERE email = ? AND program_type = ? ORDER BY created_at DESC LIMIT 1";

  try {
    const result = await executeQuery(query, [email,program_type]);

    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        lastAccessDate: result[0].created_at,
        day: result[0].day,
      });
    } else {
      res.status(200).json({
        lastAccessDate: 0,
        day: 0,
        status: "success",
        error: "No access record found for the given email",
      });
    }
  } catch (error) {
    console.error("Error fetching last access date:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const user_result = async (req, res) => {
  const { email, day } = req.body;

  const query = "SELECT * FROM answer_set WHERE email = ? AND day = ?";

  try {
    const result = await executeQuery(query, [email, day]);

    if (result.length > 0) {
      res.status(200).json({ status: "success", data: result });
    } else {
      res.status(404).json({
        status: "failed",
        error: "No data found for the given email and day",
      });
    }
  } catch (error) {
    console.error("Error fetching result  data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateRandomPassword = () => {
  const length = 10;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};

const register_community_user = async (req, res) => {
  try {
    let referralId;
    // console.log(req.body);
    const { email, name, sponsorusername, sponseremail } = req.body;
    const checkSponsorUserExists = `SELECT * FROM users_data WHERE email=?`;
    const sponsorUser = await executeQuery(
      checkSponsorUserExists,
      sponseremail
    );
    const join_bonus = 0;
    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: dotenv.parsed.SMTPUSER,
        pass: dotenv.parsed.SMTPPASSWORD,
      },
    });
    if (sponsorUser.length == 0) {
      const refferalCode = "SKLR" + randomnumber();
      const randomPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);
      const query =
        "INSERT INTO users_data (name, email, password,token_balance,referral_code, community) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [
        sponsorusername,
        sponseremail,
        hashedPassword,
        join_bonus,
        refferalCode,
        "mbc",
      ];
      const response = await executeQuery(query, values);
      transporter.sendMail({
        to: sponseremail,
        subject:
          "Exciting News! Your Referral to Skilleareum Earned You a Reward! ",
        from: "support@mg.fabc.global",
        html: `
          
             <div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">

                <div style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); padding-bottom: 2rem;
    padding-top: 2rem;
    padding-left: 3rem;">
      <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
    </div>

                <div  style="width: 80%; margin: auto; background-color: #fff; padding: 20px;">
        <div>
                    <p  style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #121a26;">
                      Thank You for Referring Us! Claim Your Bonus Now
                    </p>
                    <div>
                       <p  style="font-weight: 600; color: black;"><strong>Dear ${sponsorusername},</strong></p>
                     <p  style="margin-bottom: 20px; margin-top: 20px; font-weight: 400;">
                        Thank you for referring Skilleareum to your friend!
                      </p>
                      <p>
                        We are excited to inform you that your account has been successfully created on our platform.
                      </p>
                     <p  style="margin-bottom: 10px;">
                        Below are your login credentials:
                      </p>
                      <div>
                       <p  style="font-weight: 600; color: black;"> <strong>Email:</strong> <span>${sponseremail}</span></p>
                       <p  style="font-weight: 600; color: black;"> <strong>Password:</strong> <span>${randomPassword}</span></p>
                      </div>
                       <p  style="margin-bottom: 20px;">
                        To get started, please visit <a href="https://skilleareum.ai/login">Here</a> and log in using the credentials provided above. Once logged in, don't forget to claim your referral bonus!
                      </p>
                      <div>
              <p  style="font-weight: 600; color: black;">
                          Important: <span>You have seven days from the receipt of this email to claim your bonus. If you do not log in and claim your bonus within this period, you will lose it.</span>
                        </p>
                      </div>
                     <p  style="margin-bottom: 20px;">
                        Should you encounter any issues or have any questions, please do not hesitate to reach out to our support team at support@skilleareum.ai.
                      </p>
                      <p  style="margin-bottom: 20px;">
                        We look forward to seeing you on our platform and wish you great success!
                      </p>
                    </div>
                  </div>

        <div style="margin-top: 20px;">
<p style="font-size: 14px;font-weight: 600; color: #384860; ">Best regards,<br>
 Skilleareum Support Team. </p>

</div>
                </div>

                <div  style=" width: 90%; margin: auto; font-weight: 600; text-align: center; font-size: small; color: #384860;">
        <p>
                    Important:
                    <span> Do not share the credentials with anyone. </span>
                  </p>
                </div>

              <div  style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); height: 100%; padding: 1rem;">
        <div>
          <p  style="color: white; text-align: center;">support@skilleareum.ai</p>
        </div>
        <div>
          <p  style="color: white; text-align: center;">Skilleareum Inc © 2024</p>
          <p  style="color: white; text-align: center;">116 Calle Manuel Domenech San Juan, PR 00918 United States</p>
        </div>
      </div>
              </div>
           `,
      });
      referralId = response.insertId;
    } else {
      referralId = sponsorUser.id;
    }
    const checkUserExists = `SELECT * FROM users_data WHERE email=?`;
    const checkUserExistsresponse = await executeQuery(checkUserExists, email);
    if (checkUserExistsresponse.length == 0) {
      const user_refferalCode = "SKLR" + randomnumber();
      const randomUserPassword = generateRandomPassword();
      const user_hashedPassword = await bcrypt.hash(
        randomUserPassword,
        saltRounds
      );
      const query =
        "INSERT INTO users_data (name, email, password,token_balance,referral_code, referred_by, community) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        name,
        email,
        user_hashedPassword,
        join_bonus,
        user_refferalCode,
        referralId,
        "mbc",
      ];
      const response = await executeQuery(query, values);
      transporter.sendMail({
        to: email,
        subject: "Welcome to Skilleareum! ",
        from: "support@mg.fabc.global",
        html: `
                 <div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">

                   <div style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); padding-bottom: 2rem;
    padding-top: 2rem;
    padding-left: 3rem;">
      <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
    </div>
                 <div  style="width: 75%; margin: auto; padding: 1rem 2rem 3rem 2rem; background-color: #fff;">
        <div>
                      <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #121a26;">
                        Welcome to Skilleareum! Your Account Has Been Created
                      </p>
                      <div>
                       <p  style="color: #384860;"><strong>Dear ${name},</strong></p>
                        <p  style="margin-bottom: 10px; color: #384860;">
                          We are delighted to inform you that your account has been successfully created on Skilleareum.
                        </p>
                       <p  style="margin-bottom: 10px; color: #384860;">Below are your login credentials:</p>

                        <div>
                            <p style="color: #384860;"><strong>Email:</strong> <span>${email}</span></p>
                           <p style="color: #384860;"><strong>Password:</strong> <span>${randomUserPassword}</span></p>
                        </div>

                        <p style="margin-bottom: 10px; color: #384860;">
                          To get started, please visit <a href="https://skilleareum.ai/login">Here</a> and log in using the credentials provided above.
                        </p>
                        <p style="margin-bottom: 10px; color: #384860;">
                          For security purposes, we recommend changing your password after your first login.
                        </p>
                         <p style="margin-bottom: 10px; color: #384860;">
                          Should you encounter any issues or have any questions, please do not hesitate to reach out to our support team at support@skilleareum.ai.
                        </p>
                        <p style="margin-bottom: 10px; color: #384860;">
                          We look forward to seeing you on our platform and hope you enjoy your experience!
                        </p>
                      </div>
                    </div>

                     <div style="margin-top: 20px;">
          <p style="font-size: 14px;font-weight: 600; color: #384860; ">Best regards,<br>
              Skilleareum Support Team. </p>
         
        </div>
                  </div>

                   <div  style=" width: 90%; margin: auto; font-weight: bold; text-align: center; font-size: small; color: #384860;">
        <p  style="font-weight: bold;">
          Important: <span style="font-weight: 400;">Do not share the credentials with anyone.</span>
        </p>
      </div>

                   <div style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); height: 100%; padding: 1rem;">
        <div style="color: white; text-align: center;">support@skilleareum.ai</div>
        <div style="text-align: center;">
          <p  style="color: white;">Skilleareum Inc © 2024</p>
          <p style="color: white;">
            116 Calle Manuel Domenech San Juan, PR 00918 United States
          </p>
        </div>
      </div>
                </div>
            `,
      });
    }
    const select_query = "SELECT * FROM users_data WHERE email=?";
    const userresponse = await executeQuery(select_query, email);
    const token = generateToken(userresponse[0].id,userresponse[0].program_type);
    return res.json({ status: "success", user: userresponse[0], token });
  } catch (error) {
    return res.json({ status: "failed", error: "Internal server error" });
  }
};

const getrewards = async (req, res) => {
  try {
    const { user_id } = req.body;
    const selectQuery = `SELECT * FROM rewards WHERE user_id = ? AND reward_point != 0 AND contract_update !=0 AND wallet_found = 1 ORDER BY created_at DESC`;
    const response = await executeQuery(selectQuery, user_id);

    return res.json({ status: "success", rewards: response });
  } catch (error) {
    return res.json({ status: "failed", rewards: [] });
  }
};

const updateRewards = async (req, res) => {
  try {
    const { user_id, type, chain } = req.body;
    const condition = type === "REFERRAL BONUS";
    let updateQuery;
    if (condition) {
      updateQuery = `UPDATE rewards SET claim_status = 1 WHERE user_id = ? AND chain = ? AND reward_type = 'REFFERAL BONUS'`;
    } else {
      updateQuery = `UPDATE rewards SET claim_status = 1 WHERE user_id = ? AND chain = ? AND reward_type != 'REFFERAL BONUS'`;
    }
    await executeQuery(updateQuery, [user_id, chain]);
    const selectQuery = `SELECT sum(reward_point) as points FROM rewards WHERE claim_status = 1 AND user_id = ?`;
    const response = await executeQuery(selectQuery, user_id);
    const balance = response.length != 0 ? response[0].points : 0;
    const updateUser = `UPDATE users_data SET token_balance = ? WHERE id = ?`;
    await executeQuery(updateUser, [balance, user_id]);
    return res.json({
      status: "success",
      message: "You have claimed rewards successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "failed",
      message: "Unable to claim rewards. Please try again later",
    });
  }
};

const AddTicket = async (req, res) => {
  const { subject, description, userEmail } = req.body;
  const file = req.file;
  const ticketId = req.ticketId;
  const query =
    "INSERT INTO tickets (ticket_id, subject, description, file_path, user_email, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    ticketId,
    subject,
    description,
    file ? file.path : null,
    userEmail,
    "Open",
    new Date(),
  ];
  try {
    await executeQuery(query, values);
    await sendTicketEmail(userEmail, ticketId, subject);
    res.status(200).json({ message: "Ticket created", ticketId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Database error");
  }
};
const UserTickets = async (req, res) => {
  const { userEmail } = req.body;
  const query =
    "SELECT * FROM tickets WHERE user_email=? ORDER BY timestamp DESC";
  try {
    const tickets = await executeQuery(query, [userEmail]);
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Database error");
  }
};
const All_Tickets = async (req, res) => {
  const query = "SELECT * FROM tickets ORDER BY timestamp DESC";
  try {
    const tickets = await executeQuery(query);
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Database error");
  }
};
const sendTicketEmail = async (userEmail, ticketId, subject) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: dotenv.parsed.SMTPUSER,
      pass: dotenv.parsed.SMTPPASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: "support@mg.skilleareum.ai",
    to: userEmail,
    subject: "Your Ticket has been created",
    html: `
    <div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5;width: 100%; max-width: 700px; margin: 0 auto;">

      <div style=" background-image: url(https://skilleareum.ai/assets/emailbg.png); background-color: #0285ff; padding-bottom: 2rem;
      padding-top: 2rem;
      padding-left: 3rem; ">
        <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
      </div>

      <div style="width: 75%; margin: auto; background-color: #fff; padding: 2rem 2rem 0rem 2rem;">
      <div>
        <h2 style="margin: 0;">Ticket Created Successfully</h2>
      </div>
      <div style="padding: 20px;">
        <p style="margin-top: 0;">Dear User,</p>
        <p>Your ticket with the following details has been created successfully:</p>
        <ul style="list-style-type: none; padding-left: 0;">
          <li><strong>Ticket ID:</strong> ${ticketId}</li>
          <li><strong>Subject:</strong> ${subject}</li>
        </ul>
       <div style="margin-top: 20px;">
          <p style="font-size: 14px;font-weight: 600; color: #384860; ">Best regards,<br>
              Skilleareum Support Team. </p>
        </div>
      </div>
      </div>
      <div  style="background-color: #0285ff; background-image: url(https://skilleareum.ai/assets/emailbg.png); height: 100%; padding: 0.5rem;">
        <div>
          <p  style="color: white; text-align: center;">support@skilleareum.ai</p>
        </div>
        <div>
          <p  style="color: white; text-align: center;">Skilleareum Inc © 2024</p>
          <p  style="color: white; text-align: center;">116 Calle Manuel Domenech San Juan, PR 00918 United States</p>
        </div>
      </div>
    </div>
  `,
  });
  // console.log("Message sent: %s", info.messageId);
};

const get_image_path = async (req, res) => {
  const imagePath = req.query.path;
  // console.log("imagePath", imagePath);
  const imageFullPath = path.resolve(imagePath);
  // Check if the file exists
  if (fs.existsSync(imageFullPath)) {
    // Read the file and send it as response
    const imageStream = fs.createReadStream(imageFullPath);
    imageStream.pipe(res);
  } else {
    res.status(404).send("Image not found");
  }
};

const AirDropStreak = async (req, res) => {
  const { userId, flag } = req.query;

  try {
    if (flag == 1) {
      const user = await executeQuery(
        "SELECT * FROM users_data WHERE id = ?",
        userId
      );
      const lastLogin = user[0].login_time
        ? user[0].login_time.toISOString().split("T")[0]
        : null;
      const today = new Date().toISOString().split("T")[0];
      let newStreak = user[0].streaks;
      if (lastLogin == today) {
        return res.json({
          success: false,
          message: "Already logged in today",
          streak: newStreak,
        });
      }
      console.log(newStreak);
      if (lastLogin && new Date(today) - new Date(lastLogin) > 86400000) {
        newStreak = 0; // Reset streak if not logged in for more than a day
      }
      if (newStreak > 7) {
        const updateQuery = `UPDATE users_data SET streaks = ? WHERE id = ?`;
        const newe = await executeQuery(updateQuery, [0, userId]);
      }

      return res.json({
        success: true,
        streak: newStreak,
      });
    } else {
      const user = await executeQuery(
        "SELECT * FROM users_data WHERE id = ?",
        userId
      );
      const lastLogin = user[0].login_time
        ? user[0].login_time.toISOString().split("T")[0]
        : null;
      const today = new Date().toISOString().split("T")[0];
      let newStreak = user[0].streaks;
      let airdrops = user[0].airdrops;
      if (lastLogin == today) {
        // User already logged in today, streak stays the same

        return res.json({
          success: false,
          message: "Already logged in today",
          streak: newStreak,
        });
        // return;
      } else if (
        lastLogin &&
        new Date(today) - new Date(lastLogin) === 86400000
      ) {
        airdrops += 1;
        // User logged in yesterday, increment streak
        if (newStreak < 7) {
          newStreak += 1;
        }
      } else {
        newStreak = 1;
        airdrops = 1;
      }
      let airdrop = user[0].token_balance;
      let bonus = 0;
      switch (newStreak) {
        case 1:
          bonus = 10;
          airdrop += 10;
          break;
        case 2:
          bonus = 25;
          airdrop += 25;
          break;
        case 3:
          bonus = 50;
          airdrop += 50;
          break;
        case 4:
          bonus = 100;
          airdrop += 100;
          break;
        case 5:
          bonus = 175;
          airdrop += 175;
          break;
        case 6:
          bonus = 300;
          airdrop += 300;
          break;
        case 7:
          bonus = 1000;
          airdrop += 1000;
        default:
          airdrop += 0;
      }

      const passbookQuery =
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
      await executeQuery(passbookQuery, [
        user[0].id,
        `DAILY ACTIVE BONUS DAY-${newStreak}`,
        `You have received ${newStreak} bonus`,
        bonus,
      ]);
      const responseQuery = `select * from users_data WHERE id = ?`;
      const responseData = await executeQuery(responseQuery, [user[0].id]);
      if (newStreak >= 7) {
        newStreak = 0;
      }

      const updateQuery = `UPDATE users_data SET login_time = ?, streaks = ?,token_balance= ?,airdrops=? WHERE id = ?`;
      await executeQuery(updateQuery, [
        new Date(),
        newStreak,
        airdrop,
        airdrops,
        user[0].id,
      ]);
      res.status(200).json({ success: true, data: responseData });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Database error");
  }
};
const isUserExist = async (req, res) => {
  const { email, flag, userId } = req.query;
  try {
    let checkQuery;
    if (flag == 1) {
      checkQuery = "SELECT * FROM users_data WHERE x_userName = ?";
    } else if (flag == 2) {
      checkQuery = "SELECT * FROM users_data WHERE telegramId = ?";
    } else if (flag == 3) {
      const response = "SELECT * FROM users_data WHERE id = ?";
      const result = await executeQuery(response, [userId]);
      console.log("result", result[0].email);
      if (result[0].email) {
        console.log("Hi");
        return res.status(200).json({
          status: "failed",
          message: "Email already exists",
        });
      }
      checkQuery = "SELECT * FROM users_data WHERE email = ?";
    } else {
      checkQuery = "SELECT * FROM users_data WHERE id = ?";
    }
    const checkValues = [email];
    const checkResponse = await executeQuery(checkQuery, checkValues);

    if (checkResponse.length > 0) {
      return res.status(200).json({
        email: checkResponse[0].email,
        password: checkResponse[0].password,
        username: checkResponse[0].x_userName,
        status: "failed",
        message: "Email already exists",
      });
    }

    return res.status(200).json({ status: "success" });
  } catch (error) { }
};
const addTwitterName = async (req, res) => {
  const { name, userId } = req.query;
  try {
    const xname = name.replace("@", "");
    const checkQuery = "SELECT * FROM users_data WHERE x_userName=?";
    const result = await executeQuery(checkQuery, [xname]);
    if (result.length > 0)
      return res
        .status(200)
        .json({ success: false, message: "User name already exist" });
    const updateQuery = `UPDATE users_data SET x_userName=? WHERE id = ?`;
    await executeQuery(updateQuery, [xname, userId]);
    return res.json({
      success: true,
      message: "user name added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getSkillCountToday = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000)
      .toISOString()
      .split("T")[0];

    const query = `
      SELECT 
          (SELECT SUM(amount) FROM passbook WHERE amount > 0 AND created_at >= ? AND created_at < ?) AS skillPointsToday,
          (SELECT SUM(amount) FROM passbook WHERE amount > 0) AS totalAmount
  `;

    const response = await executeQuery(query, [today, tomorrow]);
    // console.log(response);
    const skillPointsToday = response[0].skillPointsToday || 0;
    const totalAmount = response[0].totalAmount || 0;

    const todayPercentageOfTotal = totalAmount
      ? ((skillPointsToday / totalAmount) * 100).toFixed(2)
      : "N/A";

    res.json({
      success: true,
      skillPointsToday,
      totalAmount,
      todayPercentageOfTotal,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getTotalUserData = async (req, res) => {
  try {
    const now = new Date();
    const past24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const totalUsersQuery = "SELECT COUNT(*) AS totalUsers FROM users_data";
    const newUsersQuery =
      "SELECT COUNT(*) AS newUsers FROM users_data WHERE created_at >= ?";

    const totalResults = await executeQuery(totalUsersQuery, []);
    const newResults = await executeQuery(newUsersQuery, [past24Hours]);

    const totalUsers = totalResults[0].totalUsers;
    const newUsers = newResults[0].newUsers;

    // Calculate the percentage of new users out of total users
    const newUsersPercentage =
      totalUsers > 0 ? (newUsers / totalUsers) * 100 : 0;

    res.json({
      success: true,
      totalUsers: totalUsers,
      newUsers: newUsers,
      newUsersPercentage: newUsersPercentage.toFixed(0) + "%", // Format the percentage to two decimal places
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getReferralCount = async (req, res) => {
  try {
    const { userId } = req.query;
    const userQuery = "SELECT * FROM users_data WHERE id = ?";
    const userResponse = await executeQuery(userQuery, [userId]);

    if (userResponse.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const query =
      "SELECT * FROM users_data WHERE referred_by = ? ORDER BY created_at DESC";
    const result = await executeQuery(query, [userId]);

    // console.log(result);
    const totalResults = result.length;

    const bonus = BonusPoint.ReferralBonuses[totalResults];


    res.json({
      success: true,
      totalUsers: totalResults,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error,
    });
  }
};
const telegramAndTwitterBonus = async (req, res) => {
  try {
    const { userId, action, flag } = req.query;

    if (flag == 1) {
      const checkQuery = `
    SELECT * FROM passbook WHERE user_id = ? AND action = ?
  `;
      const resultTwitter = await executeQuery(checkQuery, [
        userId,
        "Twitter Join",
      ]);
      const checkQuery2 = `
    SELECT * FROM passbook WHERE user_id = ? AND action = ?
  `;
      const resultTelegram = await executeQuery(checkQuery2, [
        userId,
        "Telegram Join",
      ]);

      let data = {};
      if (resultTwitter.length > 0 && resultTelegram.length > 0) {
        data.twitter = 1;
        data.telegram = 1;
      } else if (resultTwitter.length > 0) {
        data.twitter = 1;
        data.telegram = 0;
      } else if (resultTelegram.length > 0) {
        data.twitter = 0;
        data.telegram = 1;
      } else {
        data.twitter = 0;
        data.telegram = 0;
      }

      return res.status(200).json({
        success: false,
        data,
        error: "Action already exists for this user",
      });
    } else {
      let description = "";
      let amount = 20;

      if (action === "Twitter") {
        description = "Twitter Joining Bonus";
      } else if (action === "Telegram") {
        description = "Telegram Joining Bonus";
      }

      const query =
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
      const response = await executeQuery(query, [
        userId,
        action,
        description,
        amount,
      ]);
      res.status(201).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error.message,
    });
  }
};
const getAllNotification = async (req, res) => {
  try {
    const { flag, user_id } = req.query;
    let query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    if (flag == 1) {
      query = `SELECT COUNT(*) AS total_data 
               FROM user_notifications 
               WHERE user_id = ? AND readed=0 `;
    } else {
      query = `SELECT n.id, n.user_name, n.created_at, n.description, 
       CAST(n.tweet_id AS CHAR) AS tweetid_str, un.readed AS isReaded  
FROM notification n
INNER JOIN user_notifications un ON n.id = un.notification_id
WHERE un.user_id = ? 
  AND n.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY n.created_at DESC;

`;
    }

    const response = await executeQuery(query, [user_id]);
    const isTelegramJoin = `SELECT * FROM passbook WHERE action=? AND user_id=?`;
    const TeleResponse = await executeQuery(isTelegramJoin, [
      "TELEGRAM JOIN",
      user_id,
    ]);
    let isJoin;
    if (TeleResponse.length > 0) {
      isJoin = true;
    } else isJoin = false;
    // Separate notifications into read and unread arrays
    const unreadNotifications = response.filter((item) => item.isReaded === 0);


    res.status(200).json({
      success: true,
      unread: unreadNotifications,
      telegramJoin: isJoin,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
};
const getTwitterPost = async (req, res) => {
  try {
    const RAPIDAPI_KEY = "5de0ef50e3msh152772a284555ffp190e53jsn818ec61898b4";
    const headers = {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
    };

    // Fetch tweets from the Twitter API
    const response = await axios.get(
      "https://twitter-api45.p.rapidapi.com/timeline.php?screenname=Skilleareum",
      { headers }
    );
    const fetchedTimeline = response.data.timeline;

    // Extract tweet IDs from the API response as strings
    const fetchedTweetIds = response.data.timeline
      .filter((tweet) => !tweet.retweeted || !tweet.retweeted.id)
      .map((data) => String(data.tweet_id));
    // Get all existing tweet IDs from the database as strings
    const existingTweets = await executeQuery(
      "SELECT tweet_id FROM notification"
    );
    const existingTweetIds = existingTweets.map((tweet) =>
      String(tweet.tweet_id)
    );

    // Find tweets to delete (present in DB but not in the fetched data)
    const tweetsToDelete = existingTweetIds.filter(
      (tweetId) => !fetchedTweetIds.includes(tweetId)
    );
    // If there are tweets to delete, perform the deletion
    if (tweetsToDelete.length > 0) {
      // Wrap tweet IDs in quotes for the SQL query
      const tweetIdsToDeleteFormatted = tweetsToDelete
        .map((id) => `'${id}'`)
        .join(",");

      // Delete from user_notifications first
      await executeQuery(
        `DELETE FROM user_notifications WHERE notification_id IN (SELECT id FROM notification WHERE tweet_id IN (${tweetIdsToDeleteFormatted}))`
      );

      // Now delete from notification
      await executeQuery(
        `DELETE FROM notification WHERE tweet_id IN (${tweetIdsToDeleteFormatted})`
      );
    }

    // Insert new tweets into the database
    for (const data of fetchedTimeline) {
      const tweetIdStr = String(data.tweet_id).trim(); // Ensure tweet_id is treated as a string and trimmed
      if (!existingTweetIds.includes(tweetIdStr)) {
        const notificationQuery =
          "INSERT INTO notification (tweet_id, description, created_at) VALUES (?, ?, ?)";
        try {
          const result = await executeQuery(notificationQuery, [
            tweetIdStr, // Insert tweet_id as string
            // data.author.screen_name,
            data.text,
            new Date(data.created_at),
          ]);
          const notificationId = result.insertId;

          // Insert notification for all users
          const users = await executeQuery("SELECT id FROM users_data");
          for (const user of users) {
            const userNotificationQuery =
              "INSERT INTO user_notifications (user_id, notification_id, readed) VALUES (?, ?, 0)";
            await executeQuery(userNotificationQuery, [
              user.id,
              notificationId,
            ]);
          }
        } catch (insertError) {
          // Handle the case where the tweet is already in the database
          if (insertError.code === "ER_DUP_ENTRY") {
            console.log(`Tweet ${tweetIdStr} already exists in the database.`);
          } else {
            throw insertError;
          }
        }
      }
    }
    return res.json({
      xApiResult: fetchedTimeline,
      tweetsToDelete: tweetsToDelete,
      existingTweetIds: existingTweetIds,
      fetchedTimeline: fetchedTimeline,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.json(error)
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year

  return `${day}-${month}`;
};
const markAsReaded = async (req, res) => {
  const RAPIDAPI_KEY = "5de0ef50e3msh152772a284555ffp190e53jsn818ec61898b4";
  const headers = {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
  };
  try {
    const { user_id, notification_id, tweet_id, created_at } = req.body;

    if (!user_id || !notification_id) {
      return res.status(400).json({
        success: false,
        message: "user_id and notification_id are required",
      });
    }

    const userDetails =
      "SELECT id,x_userName,token_balance FROM users_data WHERE id=?";
    const userData = await executeQuery(userDetails, user_id);
    if (!userData[0].x_userName) {
      return res
        .status(400)
        .json({ success: false, message: "X username not available" });
    }
    console.log(userData[0].x_userName,tweet_id)
    const response = await axios.get(
      `https://twitter-api45.p.rapidapi.com/checkretweet.php?screenname=${userData[0].x_userName}&tweet_id=${tweet_id}`,
      { headers }
    );
    console.log(response);
    const uniqueData = `${userData[0].x_userName}-${tweet_id}`;
    if (response.data.is_retweeted) {
      const checkQuery = `SELECT * FROM passbook where userName_tweetId = ?`;
      const checkResponse = await executeQuery(checkQuery, uniqueData);
      // console.log("Isrewarded", checkResponse);
      if (!checkResponse.length) {
        //IF REQUIRED TO ADD IN TOKEN UNCOMMENT
        const update_token_balance = userData[0].token_balance + 250;
        const updateUser = `UPDATE users_data SET token_balance = ? WHERE id = ?`;
        await executeQuery(updateUser, [update_token_balance, user_id]);
        const passbookQuery =
          "INSERT INTO passbook (user_id, action, description, amount,userName_tweetId) VALUES (?,?, ?, ?,?)";
        await executeQuery(passbookQuery, [
          user_id,
          `RETWEET BONUS-${formatDate(created_at)}`,
          "Retweet post bonus",
          250,
          uniqueData,
        ]);
        const query = `UPDATE user_notifications 
        SET readed = 1 
        WHERE user_id = ? AND notification_id = ?`;
        await executeQuery(query, [user_id, notification_id]);
        return res.status(200).json({
          success: true,
          message: "Reward claimed successfully",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Reward already claimed ",
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: "Retweet to claim reward",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
};
const isFollowedX = async (req, res) => {
  try {
    const { userName, id, flag } = req.query;
    // if (flag == 1) {
    // const passbookQuery =
    //   "SELECT * FROM passbook where user_id = ? AND action = 'Twitter Join'";
    // const passbookResponse = await executeQuery(passbookQuery, id);
    // if (passbookResponse.length !== 0) {
    //   return res.status(200).json({ success: true, message: "claimed" });
    // }
    // return res.status(200).json({ success: true, message: "not Claimed" });
    // } else {
    const RAPIDAPI_KEY = "5de0ef50e3msh152772a284555ffp190e53jsn818ec61898b4";
    const headers = {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
    };
    const response = await axios.get(
      `https://twitter-api45.p.rapidapi.com/checkfollow.php?user=${userName}&follows=Skilleareum`,
      { headers }
    );
    console.log(response.data);
    if (response.data.is_follow) {
      const selectQuery = "SELECT * FROM users_data WHERE x_userName LIKE ?";
      const searchValue = `%${userName}%`;
      const response = await executeQuery(selectQuery, searchValue);
      const passbookQuery =
        "SELECT * FROM passbook where user_id = ? AND action = 'Twitter Join'";
      const passbookResponse = await executeQuery(
        passbookQuery,
        response[0].id
      );
      // console.log(passbookResponse);
      if (passbookResponse.length == 0) {
        const update_token_balance = parseInt(response[0].token_balance) + 250;
        const updateUser = `UPDATE users_data SET token_balance = ? WHERE id = ?`;
        await executeQuery(updateUser, [update_token_balance, response[0].id]);

        const passbookQuery =
          "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
        await executeQuery(passbookQuery, [
          response[0].id,
          "Twitter Join",
          "Your Twitter Joining Bonus Credited",
          250,
        ]);

        return res
          .status(200)
          .json({ success: true, message: "Reward claimed successfully" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Reward already claimed" });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Follow to claim reward" });
    }
    // }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const markReadedNotifications = async (req, res) => {
  try {
    // Fetch all entries from passbook where userName_tweetId is not null
    const passbookEntries = await executeQuery(
      "SELECT user_id, userName_tweetId FROM passbook WHERE userName_tweetId IS NOT NULL"
    );

    if (passbookEntries.length === 0) {
      return res.status(404).json({ message: "No entries found in passbook." });
    }

    // Loop through each passbook entry
    for (const entry of passbookEntries) {
      const { user_id, userName_tweetId } = entry;

      // Split userName_tweetId to extract tweetId
      const tweetId = userName_tweetId.split("-").pop();

      // Find the corresponding notification ID
      const notification = await executeQuery(
        "SELECT id FROM notification WHERE tweet_id = ?",
        [tweetId]
      );

      if (notification.length > 0) {
        const notificationId = notification[0].id;

        // Update the user_notifications table to mark readed as 1
        await executeQuery(
          "UPDATE user_notifications SET readed = 1 WHERE user_id = ? AND notification_id = ?",
          [user_id, notificationId]
        );
      }
    }

    res.status(200).json({ message: "Notifications marked as readed." });
  } catch (error) {
    console.error("Error marking notifications as readed:", error);
    res.status(500).json({ message: "Server error." });
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
    console.error('Error processing sponsor and user data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getWalletAddress = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }

  try {
    // Fetch user details including platform and referred_by
    const userResult = await executeQuery(
      'SELECT id, evm_wallet_address, referred_by, platform FROM users_data WHERE email = ?',
      [email]
    );

    if (userResult.length === 0) {
      return res.json({ status: false, message: 'User not found' });
    }

    const user = userResult[0];

    let isEligibleForDiscount = false;

    // ✅ Check if the user is on the MBC platform
    if (user.platform.toLowerCase() === "mbc") {
      // Count total MBC users registered before or equal to this user's ID
      const mbcCountResult = await executeQuery(
        'SELECT COUNT(*) AS count FROM users_data WHERE platform = "MBC" AND id <= ?',
        [user.id]
      );

      // ✅ Eligible only if within the first 500 users on MBC
      // isEligibleForDiscount = mbcCountResult[0].count <= 500;
      isEligibleForDiscount = false;
    }

    // Get referrer wallet address
    const sponsorResult = await executeQuery(
      'SELECT evm_wallet_address FROM users_data WHERE id = ?',
      [user.referred_by]
    );

    const data = {
      userAddress: user.evm_wallet_address,
      referrerAddress:
        sponsorResult.length > 0
          ? sponsorResult[0].evm_wallet_address
          : '0x0000000000000000000000000000000000000000',
      platform: user.platform,
      isEligibleForDiscount, // ✅ Only true if MBC + within first 500
    };

    return res.json({ status: true, data });
  } catch (err) {
    console.error('Error processing sponsor and user data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const storeSubscription = async (req, res) => {
  const { userAddress, referrerAddress, plan, token, hash, amount, status, email } = req.body;

  try {
    // 🧩 1️⃣ Check if same email + plan already has success
    const checkQuery = `
      SELECT id FROM subscription_history 
      WHERE email = ? AND plan = ? AND status = 'success' 
      LIMIT 1
    `;
    const existing = await executeQuery(checkQuery, [email, plan]);

        // 🧩 5️⃣ Get updated user details
    const usersDataQuery = `SELECT * FROM users_data WHERE email = ?`;
    const usersDataResult = await executeQuery(usersDataQuery, [email]);
     // 🧩 3️⃣ Update user sub_status
    const sub_status = status === "success" ? "active" : "inactive";

    if (existing.length > 0) {
      return res.send({
        success: true,
        data: { ...usersDataResult[0], sub_status },
        message: "You already have an active subscription for this plan.",
      });
    }

    // 🧩 2️⃣ Store the new subscription
    const insertQuery = `
      INSERT INTO subscription_history (userAddress, plan, token, hash, amount, status, email) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const insertValues = [userAddress, plan, token, hash, amount, status, email];
    const storeSubs = await executeQuery(insertQuery, insertValues);

   
    const updateUserQuery = `
      UPDATE users_data 
      SET evm_wallet_address = ?, sub_status = ? 
      WHERE email = ?
    `;
    await executeQuery(updateUserQuery, [userAddress, sub_status, email]);

    // 🧩 4️⃣ If referral is empty + success → freeze bonus
    if (referrerAddress === "0x0000000000000000000000000000000000000000" && status === "success") {
      await saveFreezedData(email, userAddress, amount);
    }

 

    // 🧩 6️⃣ Return success response
    if (storeSubs.affectedRows > 0) {
      return res.send({
        success: true,
        message: "Transaction saved successfully.",
        data: { ...usersDataResult[0], sub_status },
      });
    } else {
      return res.status(500).send({ success: false, message: "Transaction not saved. Please try again." });
    }
  } catch (error) {
    console.error("Error inserting transaction:", error);
    res.status(500).send({ success: false, message: "Database insertion failed." });
  }
};


const storeWithdraw = async (req, res) => {
  const { chatId, userAddress, hash, amount, status } = req.body;

  try {
    const query = `INSERT INTO withdraw_history (chatId, userAddress, hash, amount, status) 
                   VALUES (?, ?, ?, ?, ?)`;
    const values = [chatId, userAddress, hash, amount, status];

    const storeData = await executeQuery(query, values);

    if (storeData.affectedRows > 0) {
      res.send({ success: true, message: 'Transaction saved successfully.' });
    } else {
      res.status(500).send({ success: false, message: 'Transaction not saved. Please try again.' });
    }
  } catch (error) {
    console.error('Error inserting transaction:', error);
    res.status(500).send({ success: false, message: 'Database insertion failed.' });
  }
};

const getWalletAddressByID = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const userResult = await executeQuery('SELECT evm_wallet_address,referred_by FROM users_data WHERE id = ?', [userId]);

    if (userResult.length === 0) {
      return res.json({ status: false, message: 'User not found' });
    }

    const sponsorResult = await executeQuery('SELECT evm_wallet_address FROM users_data WHERE id = ?', [userResult[0].referred_by]);

    if (sponsorResult.length === 0) {
      let data = {
        userAddress: userResult[0].evm_wallet_address,
        referrerAddress: "0x0000000000000000000000000000000000000000"
      }
      return res.json({ status: true, data: data });
    }

    let data = {
      userAddress: userResult[0].evm_wallet_address,
      referrerAddress: sponsorResult[0].evm_wallet_address
    }
    return res.json({ status: true, data: data });
  } catch (err) {
    console.error('Error processing sponsor and user data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const saveFreezedData = async (email, userAddress, amount) => {
  try {
    const userResult = await executeQuery('SELECT id, referred_by FROM users_data WHERE email = ?', [email]);

    if (userResult.length === 0) {
      throw new Error('User not found.');
    }

    const freezeQuery = `
      INSERT INTO freezed_amount (userId, referrerId, userAddress, amount, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const freezeValues = [userResult[0].id, userResult[0].referred_by, userAddress, amount * 0.2, 'freezed'];
    const freezeResult = await executeQuery(freezeQuery, freezeValues);

    if (freezeResult.affectedRows === 0) {
      throw new Error('Failed to save frozen data.');
    }
  } catch (error) {
    console.error('Error in saveFreezedData:', error);
    throw error;
  }
};

const getFreezedAmount = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    // Query to get the total freezed amount
    const totalFreezedAmountQuery = `SELECT 
                                       COALESCE(SUM(amount), 0) AS totalFreezedAmount
                                     FROM freezed_amount 
                                     WHERE referrerId = ? AND status = ?`;

    const totalFreezedAmountValues = [userId, 'freezed'];

    // Query to get the messages and their 'readed' status
    const messagesQuery = `SELECT 
    id,
                             message,
                             readed
                           FROM freezed_amount 
                           WHERE referrerId = ? AND status = ?`;

    const messagesValues = [userId, 'freezed'];
    console.log(messagesValues)
    // Execute the queries in parallel
    const [totalFreezedAmountResult, messagesResult] = await Promise.all([
      executeQuery(totalFreezedAmountQuery, totalFreezedAmountValues),
      executeQuery(messagesQuery, messagesValues)
    ]);

    if (totalFreezedAmountResult.length === 0) {
      return res.status(200).json({
        success: true,
        totalFreezedAmount: 0,
        messages: []
      });
    }

    return res.status(200).json({
      success: true,
      totalFreezedAmount: totalFreezedAmountResult[0]?.totalFreezedAmount || 0,
      messages: messagesResult.map(item => ({
        id:item.id,
        message: item.message,
        readed: item.readed
      }))
    });

  } catch (err) {
    console.error('Error fetching freezed amount and messages:', err);
    return res.status(500).json({ error: 'Internal server error',err });
  }
};





const getReferrerAddress = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const query = `SELECT userAddress FROM freezed_amount WHERE referrerId = ? AND status = ?`;
    const values = [userId, 'freezed'];
    const results = await executeQuery(query, values);
    const userAddresses = results.map(row => row.userAddress);
    return res.status(200).json({
      success: true,
      userAddresses,
    });
  } catch (err) {
    console.error('Error fetching user addresses from freezed_amount table:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserWalletAddress = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  try {
    const userResult = await executeQuery('SELECT evm_wallet_address FROM users_data WHERE id = ?', [userId]);
    if (userResult.length === 0) {
      return res.json({ status: false, message: 'User not found' });
    }
    let userAddress = userResult[0].evm_wallet_address;
    return res.json({ status: true, userAddress: userAddress });
  } catch (err) {
    console.error('Error processing sponsor and user data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateFreezedAmountStatus = async (req, res) => {
  const { referrerId } = req.query;

  if (!referrerId) {
    return res.status(400).json({ error: 'referrerId is required' });
  }

  try {
    const query = `UPDATE freezed_amount SET status = 'unfreezed' WHERE referrerId = ? AND status = 'freezed'`;
    const values = [referrerId];

    const results = await executeQuery(query, values);

    if (results.affectedRows > 0) {
      return res.status(200).json({ success: true, message: 'Status updated successfully.' });
    } else {
      return res.status(404).json({ success: false, message: 'No records found to update.' });
    }
  } catch (err) {
    console.error('Error updating freezed amount status:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getPlatform = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'email is required' });
  }

  try {
    const userResult = await executeQuery(
      'SELECT * FROM users_data WHERE id = ?',
      [id]
    );

    console.log("userResult:", userResult);

    if (!userResult || userResult.length === 0) {
      return res.json({ status: false, message: 'User not found' });
    }

    const data = userResult[0];

    return res.json({ status: true,platform:userResult[0]?.platform ,data });
  } catch (err) {
    console.error('Error processing user platform:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const CheckAddress = async (req, res) => {
  const { address, id } = req.query;

  if (!address) {
    return res.status(400).json({ status: "failed", message: "Address is required" });
  }

  try {
    // Step 1: Check if the user already has a linked wallet
    const userQuery = `SELECT evm_wallet_address FROM users_data WHERE id = ?`;
    const userResult = await executeQuery(userQuery, [id]);

    if (userResult.length > 0 && userResult[0].evm_wallet_address) {
      // If user already has a wallet and it's different from the requested one → error
      if (userResult[0].evm_wallet_address.toLowerCase() !== address.toLowerCase()) {
        return res.status(400).json({
          status: "failed",
          message: "You already have a different wallet address linked",
        });
      }
    }

    // Step 2: Check if the requested address exists for another user
    const selectQuery = `SELECT id FROM users_data WHERE evm_wallet_address = ?`;
    const results = await executeQuery(selectQuery, [address]);

    if (results.length > 0) {
      if (results[0].id.toString() === id.toString()) {
        return res.status(200).json({
          status: "success",
          message: "Address belongs to the same user",
          exists: "no",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "Address already used by another user",
          exists: "yes",
        });
      }
    } else {
      return res.status(200).json({
        status: "success",
        message: "Address not found",
        exists: "no",
      });
    }
  } catch (error) {
    console.error("Error checking address existence:", error);
    return res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
};



let providerURL = process.env.PROVIDER_URL;
let contractAddress = process.env.SUBSCRIPTION_CONTRACT;
let AdminKey = process.env.WALLET_PRIVATE_KEY;

const Unfreez = async (req, res) => {
  const { user, referrer, referrerId, amount } = req.body;
  console.log(req.body)

  if (!user || !referrer || !referrerId || amount <= 0) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {

    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    const wallet = new ethers.Wallet(AdminKey, provider);
    const SubsContract = new ethers.Contract(contractAddress, Subscription_ABI, wallet);

    const gasPrice = await provider.getGasPrice();
    const gasLimit = ethers.BigNumber.from(2000000);
    const amountInWei = ethers.utils.parseEther(amount.toString());
    console.log(amountInWei);
    const transaction1 = await SubsContract.updateReferrerDetails(user, referrer, {
      gasPrice,
      gasLimit,
    });

    const tx1 = await transaction1.wait();
    const status1 = tx1.status === 1 ? "success" : "failed";
    if (status1 === "success") {
      const transaction2 = await SubsContract.updateBonusDetails(referrer, [amountInWei], {
        gasPrice,
        gasLimit,
      });

      const tx2 = await transaction2.wait();
      const status2 = tx2.status === 1 ? "success" : "failed";
      if (status2 === "success") {
        const query = `UPDATE freezed_amount SET status = 'unfreezed' WHERE referrerId = ? AND status = 'freezed'`;
        const values = [referrerId];
        const results = await executeQuery(query, values);

        if (results.affectedRows > 0) {
          return res.status(200).json({ success: true, message: 'Unfreeze successful and status updated.' });
        } else {
          return res.status(404).json({ success: false, message: 'No records found to update.' });
        }
      }} else {
      return res.status(500).json({ success: false, message: 'Transaction failed.' });
    }
  } catch (error) {
    console.error("Error during unfreeze transaction:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

}

const getClaimHistory = async (req, res) => {
  const { chatId } = req.query;

  if (!chatId) {
    return res.status(400).json({ error: 'chatId is required' });
  }

  try {
    const query = `SELECT * FROM withdraw_history WHERE chatId = ?`;
    const values = [chatId];
    const results = await executeQuery(query, values);

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (err) {
    console.error('Error fetching user addresses from freezed_amount table:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const optionalFeatureStatus_old = async (userId) => {
  try {
    if (!userId) {
      return res.status(400).json({ message: "User id is mandatory" });
    }

    const checkToday = [
      'Missing Letter',
      'Jumble Word',
      'Memory Game',
      'Perfect Match',
      'FARMING BONUS',
      'DAILY ACTIVE BONUS',
      'SPIN WHEEL BONUS',
      'REFERRAL BONUS',
    ];

    const results = await executeQuery(
      `SELECT action, created_at
       FROM passbook
       WHERE user_id = ?
         AND created_at >= UTC_DATE() - INTERVAL 6 DAY`,
      [userId]
    );

    const userActions = results.map(row => ({
      action: row.action,
      created_at: row.created_at
    }));

    const today = new Date().toISOString().split("T")[0];
    const missionStatus = {};

    checkToday.forEach(action => {
      missionStatus[action] = userActions.some(entry =>
        (
          action === 'DAILY ACTIVE BONUS' || action === 'REFERRAL BONUS'
            ? entry.action.startsWith(action)
            : entry.action === action
        ) &&
        new Date(entry.created_at).toISOString().split("T")[0] === today
      );
    });

    console.log("checkToday",checkToday)

    // ✅ Special case for RETWEET BONUS
    missionStatus['RETWEET BONUS'] = userActions.some(entry =>
      entry.action.startsWith('RETWEET BONUS-') &&
      new Date(entry.created_at).toISOString().split("T")[0] === today
    );

    return { ...missionStatus };

  } catch (error) {
    console.error("Error in getMissionStatus:", error);
    return { success: false, message: "Server error" };
  }
};

const optionalFeatureStatus = async (userId) => {
  try {
    if (!userId) {
      return {};
    }

    const checkToday = [
      'FARMING BONUS',
      'DAILY ACTIVE BONUS',
      'SPIN WHEEL BONUS',
      'REFERRAL BONUS',
    ];

    const results = await executeQuery(
      `
      SELECT action, created_at
      FROM passbook
      WHERE user_id = ?
        AND action IS NOT NULL
        AND created_at >= UTC_DATE() - INTERVAL 1 DAY
      `,
      [userId]
    );

    const today = new Date().toISOString().split("T")[0];
    const missionStatus = {};

    for (const action of checkToday) {
      missionStatus[action] = results.some(row => {
        if (!row.action) return false;

        const isSameDay =
          new Date(row.created_at).toISOString().split("T")[0] === today;

        if (!isSameDay) return false;

        if (action === 'DAILY ACTIVE BONUS' || action === 'REFERRAL BONUS') {
          return row.action.startsWith(action);
        }

        return row.action === action;
      });
    }

    // ✅ RETWEET BONUS (special case)
    missionStatus['RETWEET BONUS'] = results.some(row => {
      if (!row.action) return false;

      const isSameDay =
        new Date(row.created_at).toISOString().split("T")[0] === today;

      return isSameDay && row.action.startsWith('RETWEET BONUS-');
    });

    return missionStatus;

  } catch (error) {
    console.error("Error in optionalFeatureStatus:", error);
    return {};
  }
};

const getUserDailyProgress = async (req, res) => {
  const { day } = req.query;
  // SECURITY: program_type is ALWAYS sourced from the middleware (req.user).
  // It is NOT allowed to be overridden by any query parameter submitted by the client.
  // Middleware already enforces progression gating (Apprentice must complete before Genesis).
  const { userId, program_type } = req.user;

  console.log("getUserDailyProgress user:", userId, "day:", day, "program_type:", program_type);

  try {
    const [userData] = await executeQuery(
      `SELECT created_at FROM users_data WHERE id = ?`,
      [userId]
    );

    if (userData) {
      const getISTDateString = (date) => {
        const istOffset = 330; 
        const istDate = new Date(date.getTime() + istOffset * 60000);
        return istDate.toISOString().split('T')[0];
      };
      
      const todayIST = getISTDateString(new Date());
      const regIST = getISTDateString(new Date(userData.created_at));
      const diffInDays = Math.floor((new Date(todayIST) - new Date(regIST)) / (1000 * 60 * 60 * 24)) + 1;
      
      if (parseInt(day) > diffInDays) {
        return res.status(403).json({ status: "failed", message: "Day not yet unlocked" });
      }
    }

    // A1: FlashLearn + Quest
    const [aiLearning] = await executeQuery(
      `SELECT video_completed, quest_completed 
       FROM ai_learning_progress 
       WHERE user_id = ? AND day = ? AND program_type = ?`,
      [userId, day, program_type]
    );
    const videoAndQuestCompleted = aiLearning
      ? aiLearning.video_completed === 1 && aiLearning.quest_completed === 1
      : false;

    // A2: Insight Vault (ai Fun Fact)
    // const [visit] = await executeQuery(
    //   `SELECT visitCount, status 
    //    FROM aifact_user_visit 
    //    WHERE userId = ? AND day = ? AND status = ? AND program_type = ? 
    //    ORDER BY visitTime DESC LIMIT 1`,
    //   [userId, day, 'not visited', program_type]
    // );
    // const aiFunFactVisited = visit
    //   ? visit.visitCount >= 4 && visit.status === 'not visited'
    //   : false;

    const [visit] = await executeQuery(
    `SELECT visitCount, status 
    FROM aifact_user_visit 
    WHERE userId = ? AND day = ? AND program_type = ?
    LIMIT 1`,
    [userId, day, program_type]
  );

  const aiFunFactVisited = visit ? visit.visitCount >= 4 : false;


    // A3: StoryLens (blog)
    const [blog] = await executeQuery(
      `SELECT is_claimed 
       FROM user_ai_blog_progress 
       WHERE user_id = ? AND day = ? AND program_type = ?`,
      [userId, day, program_type]
    );
    const blogClaimed = blog ? blog.is_claimed === 1 : false;

    // A4: Myth Breaker
    // program_type mapped: 7-day=apprentice, 30-day=genesis
    const mythRows = await executeQuery(
      `SELECT id FROM myth_submit_answers WHERE user_id = ? AND day = ? AND program_type = ?`,
      [userId, day, program_type]
    );
    const mythBreakerCompleted = mythRows.length > 0;

    // A5: Failure Files
    // program_type mapped: 7-day=apprentice, 30-day=genesis
    const failureRows = await executeQuery(
      `SELECT id FROM ai_failure_submit_answers WHERE user_id = ? AND day = ? AND program_type = ?`,
      [userId, day, program_type]
    );
    const failureFilesCompleted = failureRows.length > 0;

    // A6: RapidFire Quest reward (rewards table)
    const reward = await executeQuery(
      `SELECT id FROM rewards WHERE user_id = ? AND description LIKE ? AND program_type = ?`,
      [userId, `%day ${day}%`, program_type]
    );
    const rewardClaimed = reward && reward.length > 0;

    // A7 - A10: Games tracked in user_played_questions
    const playedGames = await executeQuery(
      `SELECT game_type FROM user_played_questions 
       WHERE user_id = ? AND day = ? AND program_type = ?`,
      [userId, day, program_type]
    );
    
    const gameStatus = {
      "Missing Letter": playedGames.some(g => g.game_type === 'missing_letters'),
      "Jumble Word": playedGames.some(g => g.game_type === 'jumble_words'),
      "Perfect Match": playedGames.some(g => g.game_type === 'perfect_match'),
      "Memory Game": playedGames.some(g => g.game_type === 'memory_game'),
    };

    // A11: Symbol Decode (user_emoji_progress)
  // A11: Symbol Decode (user_emoji_progress)
      const emoji = await executeQuery(
        `SELECT COUNT(*) as completedCount
        FROM user_emoji_progress 
        WHERE user_id = ? 
          AND day = ? 
          AND is_completed = 1 
          AND program_type = ?`,
        [userId, day, program_type]
      );

      const emojiGameCompleted = emoji[0].completedCount > 0;
    // A12: Tool Missions (user_ai_mission_progress)
    const [mission] = await executeQuery(
      `SELECT is_claimed 
       FROM user_ai_mission_progress 
       WHERE user_id = ? AND day = ? AND program_type = ?`,
      [userId, day, program_type]
    );
    const aiMissionClaimed = mission ? mission.is_claimed === 1 : false;

    // A13: Tool Arena
    // program_type mapped: 7-day=apprentice, 30-day=genesis
    const arenaRows = await executeQuery(
      `SELECT id FROM ai_tool_arena_submit_answers WHERE user_id = ? AND day = ? AND program_type = ?`,
      [userId, day, program_type]
    );
    const toolArenaCompleted = arenaRows.length > 0;

    // Optional/Bonus features (Calendar Day based)
    const optionalData = await optionalFeatureStatus(userId);

    // program_type label: apprentice = 7-day program, genesis = 30-day program
    const programLabel = program_type === 'apprentice' ? 'apprentice' : 'genesis';

    return res.status(200).json({
      userId,
      program_type: programLabel,         // 'apprentice' (7-day) | 'genesis' (30-day)
      data: {
        videoAndQuestCompleted,     // A1
        aiFunFactVisited,           // A2
        blogClaimed,                // A3
        mythBreakerCompleted,       // A4
        failureFilesCompleted,      // A5
        rewardClaimed,              // A6
        ...gameStatus,              // A7, A8, A9, A10
        emojiGameCompleted,         // A11
        aiMissionClaimed,           // A12
        toolArenaCompleted,         // A13
        ...optionalData             // Bonus activities
      }
    });

  } catch (error) {
    console.error('Error tracking user progress:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const getUserCurrentDay_old_24hr = async (req, res) => {
  const {userId}=req.user;

  console.log(req.user)
  try {
    const getprogram_typeQuery = `SELECT current_program FROM users_data WHERE id = ?`;
    const program_typeResult = await executeQuery(getprogram_typeQuery, [userId]);
    const program_type = program_typeResult[0]?.current_program || 'apprentice';
    const params = Array(6).fill([userId, program_type]).flat();
const days = await executeQuery(`
  SELECT DISTINCT day FROM (
    SELECT day FROM ai_learning_progress WHERE user_id = ? AND program_type = ?
    UNION
    SELECT day FROM user_emoji_progress WHERE user_id = ? AND program_type = ?
    UNION
    SELECT day FROM user_ai_blog_progress WHERE user_id = ? AND program_type = ?
    UNION
    SELECT day FROM user_played_questions WHERE user_id = ? AND program_type = ?
    UNION
    SELECT day FROM aifact_user_visit WHERE userId = ? AND program_type = ?
    UNION
   
    SELECT day FROM user_ai_mission_progress WHERE user_id = ? AND program_type = ?
  ) AS all_days 
  ORDER BY day ASC
`, params);

    let lastCompletedDay = 0;
    let lastCompletedDate = null;
    console.log("days",days);
    for (const row of days) {
      const day = row.day;

      const [aiLearning] = await executeQuery(
        `SELECT video_completed, quest_completed, updated_at FROM ai_learning_progress WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day,program_type]
      );
      const videoAndQuestCompleted = aiLearning
        ? aiLearning.video_completed === 1 && aiLearning.quest_completed === 1
        : false;

      const emoji = await executeQuery(
        `SELECT * FROM user_emoji_progress WHERE user_id = ? AND day = ? AND is_completed = 1 AND program_type = ?`,
        [userId, day,program_type]
      );
      const emojiGameCompleted = emoji ? emoji.length > 0 : false;
      // console.log("emoji :", emoji)

      const [blog] = await executeQuery(
        `SELECT is_claimed, updated_at FROM user_ai_blog_progress WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day,program_type]
      );
      const blogClaimed = blog ? blog.is_claimed === 1 : false;

      const [mission] = await executeQuery(
        `SELECT is_claimed, updated_at FROM user_ai_mission_progress WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day, program_type]
      );
      const aiMissionClaimed = mission ? mission.is_claimed === 1 : false;

      const [visit] = await executeQuery(
        `SELECT visitCount, status, updated_at FROM aifact_user_visit WHERE userId = ? AND day = ? AND program_type = ? ORDER BY updated_at DESC LIMIT 1 `,
        [userId, day,program_type]
      );
      const aiFunFactVisited = visit
        ? visit.visitCount >= 4 && visit.status === 'not visited'
        : false;

      const [mythRows] = await executeQuery(
        `SELECT id, updated_at FROM myth_submit_answers WHERE user_id = ? AND day = ? AND program_type = ? LIMIT 1`,
        [userId, day, program_type]
      );
      const mythBreakerCompleted = mythRows ? true : false;

      const [failureRows] = await executeQuery(
        `SELECT id, updated_at FROM ai_failure_submit_answers WHERE user_id = ? AND day = ? AND program_type = ? LIMIT 1`,
        [userId, day, program_type]
      );
      const failureFilesCompleted = failureRows ? true : false;

      const [arenaRows] = await executeQuery(
        `SELECT id, updated_at FROM ai_tool_arena_submit_answers WHERE user_id = ? AND day = ? AND program_type = ? LIMIT 1`,
        [userId, day, program_type]
      );
      const toolArenaCompleted = arenaRows ? true : false;

      const reward = await executeQuery(
        `SELECT claim_status, updated_at FROM rewards WHERE user_id = ? AND  description LIKE ? AND program_type = ?`,
        [userId, `%day ${day}%`,program_type]
      );
      const rewardClaimed = reward ? reward.length >= 1 : false;

      // A7-A10: Individual game checks (must all be completed)
      const playedGames = await executeQuery(
        `SELECT game_type, updated_at FROM user_played_questions WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day, program_type]
      );
      const missingLetterCompleted = playedGames.some(g => g.game_type === 'missing_letters');
      const jumbleWordCompleted    = playedGames.some(g => g.game_type === 'jumble_words');
      const perfectMatchCompleted  = playedGames.some(g => g.game_type === 'perfect_match');
      const memoryGameCompleted    = playedGames.some(g => g.game_type === 'memory_game');

      console.log({
        day,
        videoAndQuestCompleted,   // A1
        aiFunFactVisited,         // A2
        blogClaimed,              // A3
        mythBreakerCompleted,     // A4
        failureFilesCompleted,    // A5
        rewardClaimed,            // A6
        missingLetterCompleted,   // A7
        jumbleWordCompleted,      // A8
        perfectMatchCompleted,    // A9
        memoryGameCompleted,      // A10
        emojiGameCompleted,       // A11
        aiMissionClaimed,         // A12
        toolArenaCompleted,       // A13
      });

      const allCompleted =
        videoAndQuestCompleted &&   // A1
        aiFunFactVisited &&         // A2
        blogClaimed &&              // A3
        mythBreakerCompleted &&     // A4
        failureFilesCompleted &&    // A5
        rewardClaimed &&            // A6
        missingLetterCompleted &&   // A7
        jumbleWordCompleted &&      // A8
        perfectMatchCompleted &&    // A9
        memoryGameCompleted &&      // A10
        emojiGameCompleted &&       // A11
        aiMissionClaimed &&         // A12
        toolArenaCompleted;         // A13

      if (allCompleted) {
        lastCompletedDay = day;

        // Get the latest updated_at date among activities
        const dates = [
          aiLearning?.updated_at,
          emoji?.updated_at,
          blog?.updated_at,
          mission?.updated_at,
          visit?.updated_at,
          mythRows?.updated_at,
          failureRows?.updated_at,
          arenaRows?.updated_at,
          reward?.updated_at,
          playedGames?.[0]?.updated_at
        ].filter(Boolean).sort((a, b) => new Date(b) - new Date(a)); // latest first

        if (dates.length) {
          lastCompletedDate = new Date(dates[0]); // Most recent completion
        }
      } else {
        break;
      }
    }

    const getISTDateString = (date) => {
  const istOffset = 330; // IST is UTC+5:30 in minutes
  const istDate = new Date(date.getTime() + istOffset * 60000);
  return istDate.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
};

const today = new Date();
const todayString = getISTDateString(today);
const completedDateString = lastCompletedDate ? getISTDateString(lastCompletedDate) : null;

console.log("lastCompletedDate:", lastCompletedDate);
let nextDay = lastCompletedDay;
let isTodayCompleted = false;

if (completedDateString && completedDateString < todayString) {
  nextDay = lastCompletedDay + 1;
}
    else if(completedDateString && completedDateString >= todayString){
      isTodayCompleted=true
    }
    const [balance] = await executeQuery(
      `SELECT token_balance,current_program from users_data WHERE id = ?`,
      [userId]
    );

    let current_program = balance?.current_program;
    console.log("lastCompletedDay===7 && balance?.current_program :  ", lastCompletedDay, balance?.current_program)
    if(lastCompletedDay===7 && balance?.current_program==="apprentice"){
     await executeQuery(
      `UPDATE users_data set current_program='genesis' WHERE id = ?`,
      [userId]
    );
     current_program = 'genesis';
    }
    // console.log(balance)
     return res.json({
      current_program,
      userId,
      lastCompletedDay,
      currentDayToWorkOn: lastCompletedDay === 0 ? 1 : nextDay >7 ? 7 :nextDay,
      balance: balance?.token_balance,
      isTodayCompleted,
      lastCompletedTime: lastCompletedDate
    });

  } catch (error) {
    console.error('Error determining user current day:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserCurrentDay = async (req, res) => {
  // Use the effectively computed program_type from middleware
  const { userId, program_type } = req.user;

  try {
    const [userData] = await executeQuery(
      `SELECT token_balance, current_program, apprentice_completed, genesis_completed, created_at FROM users_data WHERE id = ?`,
      [userId]
    );

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const registrationDate = new Date(userData.created_at);
    const now = new Date();

    const getISTDateString = (date) => {
      const istOffset = 330; // IST is UTC+5:30 in minutes
      const istDate = new Date(date.getTime() + istOffset * 60000);
      return istDate.toISOString().split('T')[0];
    };

    const todayIST = getISTDateString(now);
    const regIST = getISTDateString(registrationDate);

    // Calculate days since registration (Day 1 is the day of registration)
    const diffInMs = new Date(todayIST) - new Date(regIST);
    const daysSinceReg = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

    const maxProgramDays = program_type === 'apprentice' ? 7 : 37;
    const maxUnlockedDay = Math.min(daysSinceReg, maxProgramDays);

    const params = Array(6).fill([userId, program_type]).flat();
    const days = await executeQuery(`
      SELECT DISTINCT day FROM (
        SELECT day FROM ai_learning_progress WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM user_emoji_progress WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM user_ai_blog_progress WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM user_played_questions WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM aifact_user_visit WHERE userId = ? AND program_type = ?
        UNION
        SELECT day FROM user_ai_mission_progress WHERE user_id = ? AND program_type = ?
      ) AS all_days 
      ORDER BY day ASC
    `, params);

    let lastCompletedDay = 0;
    let lastCompletedDate = null;

    for (const row of days) {
      const day = row.day;

      const [aiLearning] = await executeQuery(
        `SELECT video_completed, quest_completed, updated_at FROM ai_learning_progress WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day, program_type]
      );
      const videoAndQuestCompleted = aiLearning
        ? aiLearning.video_completed === 1 && aiLearning.quest_completed === 1
        : false;

      const emoji = await executeQuery(
        `SELECT updated_at FROM user_emoji_progress WHERE user_id = ? AND day = ? AND is_completed = 1 AND program_type = ?`,
        [userId, day, program_type]
      );
      const emojiGameCompleted = emoji && emoji.length > 0;

      const [blog] = await executeQuery(
        `SELECT is_claimed, updated_at FROM user_ai_blog_progress WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day, program_type]
      );
      const blogClaimed = blog ? blog.is_claimed === 1 : false;

      const [mission] = await executeQuery(
        `SELECT is_claimed, updated_at FROM user_ai_mission_progress WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day, program_type]
      );
      const aiMissionClaimed = mission ? mission.is_claimed === 1 : false;

      const [visit] = await executeQuery(
        `SELECT visitCount, status, updated_at FROM aifact_user_visit WHERE userId = ? AND day = ? AND program_type = ? ORDER BY updated_at DESC LIMIT 1 `,
        [userId, day, program_type]
      );
      const aiFunFactVisited = visit
        ? visit.visitCount >= 4
        : false;

      const [mythRows] = await executeQuery(
        `SELECT id, updated_at FROM myth_submit_answers WHERE user_id = ? AND day = ? AND program_type = ? LIMIT 1`,
        [userId, day, program_type]
      );
      const mythBreakerCompleted = !!mythRows;

      const [failureRows] = await executeQuery(
        `SELECT id, updated_at FROM ai_failure_submit_answers WHERE user_id = ? AND day = ? AND program_type = ? LIMIT 1`,
        [userId, day, program_type]
      );
      const failureFilesCompleted = !!failureRows;

      const [arenaRows] = await executeQuery(
        `SELECT id, updated_at FROM ai_tool_arena_submit_answers WHERE user_id = ? AND day = ? AND program_type = ? LIMIT 1`,
        [userId, day, program_type]
      );
      const toolArenaCompleted = !!arenaRows;

      const [reward] = await executeQuery(
        `SELECT updated_at FROM rewards WHERE user_id = ? AND description LIKE ? AND program_type = ? LIMIT 1`,
        [userId, `%day ${day}%`, program_type]
      );
      const rewardClaimed = !!reward;

      const playedGames = await executeQuery(
        `SELECT game_type, updated_at FROM user_played_questions WHERE user_id = ? AND day = ? AND program_type = ?`,
        [userId, day, program_type]
      );
      const missingLetterCompleted = playedGames.some(g => g.game_type === 'missing_letters');
      const jumbleWordCompleted    = playedGames.some(g => g.game_type === 'jumble_words');
      const perfectMatchCompleted  = playedGames.some(g => g.game_type === 'perfect_match');
      const memoryGameCompleted    = playedGames.some(g => g.game_type === 'memory_game');

      const allCompleted =
        videoAndQuestCompleted &&
        aiFunFactVisited &&
        blogClaimed &&
        mythBreakerCompleted &&
        failureFilesCompleted &&
        rewardClaimed &&
        missingLetterCompleted &&
        jumbleWordCompleted &&
        perfectMatchCompleted &&
        memoryGameCompleted &&
        emojiGameCompleted &&
        aiMissionClaimed &&
        toolArenaCompleted;

      if (allCompleted) {
        lastCompletedDay = day;
        const dates = [
          aiLearning?.updated_at,
          emoji?.[0]?.updated_at,
          blog?.updated_at,
          mission?.updated_at,
          visit?.updated_at,
          mythRows?.updated_at,
          failureRows?.updated_at,
          arenaRows?.updated_at,
          reward?.updated_at,
          playedGames?.[0]?.updated_at
        ].filter(Boolean).sort((a, b) => new Date(b) - new Date(a));

        if (dates.length) {
          lastCompletedDate = new Date(dates[0]);
        }
      } else {
        break;
      }
    }

    const unlockIntervalMinutes = parseInt(process.env.UNLOCK_INTERVAL_MINUTES) || 0;
    let nextDay = lastCompletedDay;
    let isTodayCompleted = false;
    let nextUnlockTime = null;

    if (unlockIntervalMinutes > 0) {
      if (lastCompletedDate) {
        nextUnlockTime = new Date(lastCompletedDate.getTime() + unlockIntervalMinutes * 60 * 1000);
        if (now.getTime() >= nextUnlockTime.getTime()) {
          nextDay = lastCompletedDay + 1;
        } else {
          isTodayCompleted = true;
        }
      }
    } else {
      const todayString = getISTDateString(now);
      const completedDateString = lastCompletedDate ? getISTDateString(lastCompletedDate) : null;

      if (completedDateString && completedDateString < todayString) {
        nextDay = lastCompletedDay + 1;
      } else if (completedDateString && completedDateString >= todayString) {
        isTodayCompleted = true;
      }
    }

    let current_program = userData.current_program || 'apprentice';

    let apprentice_completed = userData.apprentice_completed || 0;
    let genesis_completed = userData.genesis_completed || 0;
    
    
    // When the user completes Day 7 while actively in the 'apprentice' program
    if (lastCompletedDay === 7 && program_type === "apprentice") {
      await executeQuery(
        `UPDATE users_data SET current_program='genesis', apprentice_completed=1 WHERE id = ?`,
        [userId]
      );
      current_program = 'genesis';
      apprentice_completed = 1;
      genesis_completed = 0;
    } 
    // When the user completes Day 30 while actively in the 'genesis' program
    else if (lastCompletedDay === 30 && program_type === "genesis") {
      await executeQuery(
        `UPDATE users_data SET genesis_completed=1 WHERE id = ?`,
        [userId]
      );
      genesis_completed = 1;

    }

    return res.json({
      current_program,
      userId,
      lastCompletedDay,
      maxUnlockedDay,
      currentDayToWorkOn: lastCompletedDay === 0 ? 1 : (nextDay > maxProgramDays ? maxProgramDays : nextDay),
      balance: userData.token_balance,
      isTodayCompleted,
      lastCompletedTime: lastCompletedDate,
      program_type,
      apprentice_completed,
      genesis_completed,
      unlockIntervalMinutes,
      nextUnlockTime
    });

  } catch (error) {
    console.error('Error determining user current day:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addSpinsEvery8Hours = async (req, res) => {
  try {
    await executeQuery(`
      UPDATE users_data
      SET 
          current_spins = CASE 
                          WHEN current_spins < 3 THEN current_spins + 1
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
                      END;
    `);
    // console.log("Added 1 spins to all users.");
    return res.status(200).json({success:true, message:"Spins Added"})
  } catch (error) {
    console.error("Error adding spins:", error);
  }
};

const getUserOverallProgress = async (req, res) => {
  const { userId, program_type } = req.user;
  
  try {
    // 1. Get all days where user has some activity recorded for heatmap/active days
    // We'll check multiple tables to find any activity
    const activityDaysQuery = `
      SELECT DISTINCT day FROM (
        SELECT day FROM ai_learning_progress WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM user_emoji_progress WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM user_ai_blog_progress WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM user_played_questions WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM aifact_user_visit WHERE userId = ? AND program_type = ?
        UNION
        SELECT day FROM user_ai_mission_progress WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM myth_submit_answers WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM ai_failure_submit_answers WHERE user_id = ? AND program_type = ?
        UNION
        SELECT day FROM ai_tool_arena_submit_answers WHERE user_id = ? AND program_type = ?
      ) AS all_days ORDER BY day ASC
    `;
    
    const activityDays = await executeQuery(activityDaysQuery, [
      userId, program_type,
      userId, program_type,
      userId, program_type,
      userId, program_type,
      userId, program_type,
      userId, program_type,
      userId, program_type,
      userId, program_type,
      userId, program_type
    ]);

    const activeDaysList = activityDays.map(row => row.day);

    // 2. Calculate Streaks and Active Days (calendar based)
    // We'll use the 'passbook' table to track daily activity by date
    const dailyActivityDatesQuery = `
      SELECT DISTINCT DATE(created_at) as activity_date 
      FROM passbook 
      WHERE user_id = ? 
      ORDER BY activity_date DESC
    `;
    const activityDates = await executeQuery(dailyActivityDatesQuery, [userId]);
    
    let currentStreak = 0;
    let longestStreak = 0;
    let activeDaysCount = activityDates.length;
    
    if (activityDates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lastActivityDate = new Date(activityDates[0].activity_date);
      lastActivityDate.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today - lastActivityDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // If last activity was today or yesterday, continue streak
      if (diffDays <= 1) {
        currentStreak = 1;
        let tempStreak = 1;
        for (let i = 0; i < activityDates.length - 1; i++) {
          const d1 = new Date(activityDates[i].activity_date);
          const d2 = new Date(activityDates[i+1].activity_date);
          const diff = Math.ceil(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24));
          
          if (diff === 1) {
            tempStreak++;
            currentStreak = tempStreak;
          } else {
            break;
          }
        }
      }

      // Longest streak calculation
      let maxStreak = 0;
      let currentTemp = 1;
      for (let i = 0; i < activityDates.length - 1; i++) {
        const d1 = new Date(activityDates[i].activity_date);
        const d2 = new Date(activityDates[i+1].activity_date);
        const diff = Math.ceil(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24));
        
        if (diff === 1) {
          currentTemp++;
        } else {
          maxStreak = Math.max(maxStreak, currentTemp);
          currentTemp = 1;
        }
      }
      longestStreak = Math.max(maxStreak, currentTemp);
    }

    // 3. Get total SP earned per day for heatmap details
    // We can parsing description for "day X" or use some other logic
    // For now, let's group by day if we can, or just return total per day if available
    // Alternatively, just return which days are "fully completed"
    
    const dayProgress = [];
    // The program is currently 7 or 37 days. Let's support up to 37.
    const maxDays = program_type === 'apprentice' ? 7 : 37;

    for (let day = 1; day <= maxDays; day++) {
      // Check completion (simplified version of getUserDailyProgress)
      const isDayActive = activeDaysList.includes(day);
      
      // Get score for this day from passbook if description contains "day X"
      const dayScoreQuery = `
        SELECT SUM(amount) as total_score 
        FROM passbook 
        WHERE user_id = ? AND (description LIKE ? OR action LIKE ?)
      `;
      const scoreResult = await executeQuery(dayScoreQuery, [userId, `%day ${day}%`, `%day ${day}%`]);
      const score = scoreResult[0]?.total_score || 0;

      dayProgress.push({
        day,
        active: isDayActive,
        score: score,
        // For time spent, we might need another table or just record it in passbook
        time_spent: '30+ min' // Placeholder
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        currentStreak,
        longestStreak,
        activeDaysCount,
        dayProgress,
        program_type
      }
    });

  } catch (error) {
    console.error('Error in getUserOverallProgress:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  GoogleEmail_Registercheck_User,
  SignUpUser,
  SignUpGoogleUser,
  userLogin,
  GitHubLogin,
  SignUpGitHubUser,
  GitHub_Registercheck_User,
  LinkedInLogin,
  SignUpLinkedInUser,
  SignUpWalletUser,
  userWalletLogin,
  get_user_profiles_data,
  update_user_profiles_data,
  getChatGPTResponse,
  getUserDetails,
  addCourses,
  get_course_details,
  trigger_email_verify,
  verify_email,
  subscripe_email,
  register_community_user,

  get_users_details,
  checkUser,
  resetPassword,
  sendOTP,
  User_verifyOTP,
  User_UpdatePassword,
  get_referral_count,
  getReferralInformation,

  allDailyChallenges,
  user_daily_challenges,
  users_action,
  video_duration,
  check_user_action_status,
  get_last_access,
  get_questions,
  submit_answers,
  user_result,
  get_last_assessment,

  //Payments
  updatePaymentStatus,
  updateTokenPrice,
  update_payment_data,
  transaction_details,

  getrewards,
  updateRewards,
  update_transaction_data,
  sendMessageToSlack,

  AddTicket,
  All_Tickets,
  UserTickets,
  get_image_path,
  AirDropStreak,
  isUserExist,
  addTwitterName,
  getSkillCountToday,
  getTotalUserData,
  getReferralCount,
  telegramAndTwitterBonus,
  getAllNotification,
  markAsReaded,
  isFollowedX,
  markReadedNotifications,
  transaction_specificActions,
  getTwitterPost,
  checkSponsorExists,
  getWalletAddress,
  storeSubscription,
  storeWithdraw,
  getWalletAddressByID,
  saveFreezedData,
  getFreezedAmount,
  getReferrerAddress,
  getUserWalletAddress,
  updateFreezedAmountStatus,
  getPlatform,
  CheckAddress,
  Unfreez,
  getClaimHistory,
  getUserDailyProgress,
  getUserCurrentDay,
  addSpinsEvery8Hours,
  getUserOverallProgress
};
