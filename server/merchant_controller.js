const express = require('express');
const app = express();
const cors = require('cors');
const bp = require('body-parser');
const bcrypt = require('bcrypt');
const { executeQuery, db } = require('./Db')
const axios = require('axios');
const dotenv = require('dotenv').config()
app.use(bp.json());
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} = require("@getbrevo/brevo");

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY 
);



const merchant_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await executeQuery(
            "SELECT * FROM merchant WHERE email = ?",
            [email]
        );

        if (!response || response.length === 0) {
            return res.json({
                status: "failed",
                message: "There is No Merchant Registered with This Email",
            });
        }

        const merchant = response[0];

        const isPasswordValid = await bcrypt.compare(
            password,
            merchant.password
        );

        if (!isPasswordValid) {
            return res.json({
                status: "Wrong_Password",
                message: "Invalid email or password",
            });
        }


        const token = jwt.sign(
            {
                merchant_id: merchant.id,
                email: merchant.email,
                role: "merchant",
            },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: "30d" }
        );

        return res.json({
            status: "success",
            message: "Login successful",
            token,
            user: {
                id: merchant.id,
                email: merchant.email,
                name: merchant.name,
                role: "merchant",
                merchantId: merchant.merchantId
            },
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: "failed",
            message: "Internal Server Error",
        });
    }
};


// const sendMerchantOtp = async (req, res) => {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             return res.json({
//                 status: "failed",
//                 message: "Email required",
//             });
//         }

//         const merchant = await executeQuery(
//             "SELECT id, email FROM merchant WHERE email = ?",
//             [email]
//         );

//         if (merchant.length === 0) {
//             return res.json({
//                 status: "failed",
//                 message: "Merchant not found",
//             });
//         }

//         /* -------------------- OTP Cooldown (60 sec) -------------------- */
//         const recentOtp = await executeQuery(
//             "SELECT created_at FROM otp_data WHERE email = ? ORDER BY created_at DESC LIMIT 1",
//             [email]
//         );

//         if (recentOtp.length > 0) {
//             const diffSeconds =
//                 (Date.now() - new Date(recentOtp[0].created_at)) / 1000;

//             if (diffSeconds < 60) {
//                 return res.json({
//                     status: "failed",
//                     message: "Please wait 60 seconds before requesting a new OTP",
//                 });
//             }
//         }


//         await executeQuery(
//             "DELETE FROM otp_data WHERE email = ?",
//             [email]
//         );

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

//         await executeQuery(
//             "INSERT INTO otp_data (email, otp, expires_at) VALUES (?, ?, ?)",
//             [email, otp, expiresAt]
//         );


//         const transporter = nodemailer.createTransport({
//             host: dotenv.parsed.SMTPHOST,
//             port: dotenv.parsed.SMTPPORT,
//             auth: {
//                 user: dotenv.parsed.SMTPUSER,
//                 pass: dotenv.parsed.SMTPPASSWORD,
//             },
//         });

//         await transporter.sendMail({
//             from: `"Skilleareum" <${dotenv.parsed.SMTPUSER}>`,
//             to: email,
//             subject: "OTP for Password Reset",
//             html: `
//         <div style="font-family:Poppins,sans-serif;background:#f5f5f5;max-width:700px;margin:auto;">
//           <div style="background:#0285ff;padding:2rem">
//             <img src="https://skilleareum.ai/assets/skilleareum.png" alt="Skilleareum" />
//           </div>
//           <div style="background:#fff;padding:20px">
//             <h2>🔐 Reset Your Password</h2>
//             <p>Hello ${email},</p>
//             <h1 style="letter-spacing:4px">${otp}</h1>
//             <p>OTP is valid for <b>5 minutes</b>.</p>
//             <p>If you didn’t request this, please ignore this email.</p>
//           </div>
//           <div style="background:#0285ff;color:#fff;text-align:center;padding:1rem">
//             © 2026 Skilleareum
//           </div>
//         </div>
//       `,
//         });

//         return res.json({
//             status: "success",
//             message: "OTP sent successfully",
//         });

//     } catch (error) {
//         console.error("Merchant OTP Error:", error);
//         return res.status(500).json({
//             status: "failed",
//             message: "Internal Server Error",
//         });
//     }
// };

//

/*Brevo Transactional API*/
const sendMerchantOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        status: "failed",
        message: "Email required",
      });
    }

    const merchant = await executeQuery(
      "SELECT id, email FROM merchant WHERE email = ?",
      [email]
    );

    if (merchant.length === 0) {
      return res.json({
        status: "failed",
        message: "Merchant not found",
      });
    }

    /* -------------------- OTP Cooldown (60 sec) -------------------- */
    const recentOtp = await executeQuery(
      "SELECT created_at FROM otp_data WHERE email = ? ORDER BY created_at DESC LIMIT 1",
      [email]
    );

    if (recentOtp.length > 0) {
      const diffSeconds =
        (Date.now() - new Date(recentOtp[0].created_at)) / 1000;

      if (diffSeconds < 60) {
        return res.json({
          status: "failed",
          message: "Please wait 60 seconds before requesting a new OTP",
        });
      }
    }

    /* -------------------- Generate OTP -------------------- */
    await executeQuery("DELETE FROM otp_data WHERE email = ?", [email]);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await executeQuery(
      "INSERT INTO otp_data (email, otp, expires_at) VALUES (?, ?, ?)",
      [email, otp, expiresAt]
    );

    /* -------------------- Email Template -------------------- */
    const htmlContent = `
      <div style="font-family:Poppins,sans-serif;background:#f5f5f5;max-width:700px;margin:auto;">
        <div style="background:#0285ff;padding:2rem">
          <img src="https://skilleareum.ai/assets/skilleareum.png" alt="Skilleareum" />
        </div>

        <div style="background:#fff;padding:20px">
          <h2>🔐 Reset Your Password</h2>
          <p>Hello ${email},</p>

          <div style="text-align:center;margin:24px 0;">
            <span style="
              background:#0285ff;
              color:#fff;
              padding:14px 28px;
              font-size:24px;
              letter-spacing:4px;
              border-radius:6px;
              display:inline-block;
            ">
              ${otp}
            </span>
          </div>

          <p>OTP is valid for <b>5 minutes</b>.</p>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>

        <div style="background:#0285ff;color:#fff;text-align:center;padding:1rem">
          © 2026 Skilleareum
        </div>
      </div>
    `;


    const sendSmtpEmail = {
      sender: {
        email: "info@skilleareum.ai",
        name: "Skilleareum",
      },
      to: [
        {
          email,
          name: "Merchant",
        },
      ],
      subject: "OTP for Password Reset",
      htmlContent,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.json({
      status: "success",
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Merchant OTP Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};


const verifyMerchantOtp = async (req, res) => {
    const { email, otp } = req.body;

    const record = await executeQuery(
        `SELECT * FROM otp_data 
     WHERE email = ? AND otp = ? AND expires_at > NOW()
     ORDER BY id DESC LIMIT 1`,
        [email, otp]
    );

    if (record.length === 0) {
        return res.json({
            status: "failed",
            message: "Invalid or expired OTP",
        });
    }

    res.json({
        status: "success",
        message: "OTP verified",
    });
};

const resetMerchantPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await executeQuery(
        "UPDATE merchant SET password = ? WHERE email = ?",
        [hashedPassword, email]
    );

    await executeQuery(
        "DELETE FROM otp_data WHERE email = ?",
        [email]
    );

    res.json({
        status: "success",
        message: "Password reset successfully",
    });
};

const getUserDay = async (req, res) => {
  try {
    const program_type = "apprentice";

    const query = `
      SELECT
        enrolled.total_enrolled AS enrolled,
        overall.completed AS completed,
        last_month.completed AS last_month_completed
      FROM
        (SELECT COUNT(*) AS total_enrolled FROM users_data) enrolled,

        (
          SELECT COUNT(DISTINCT user_id) AS completed
          FROM (
            SELECT user_id, MAX(day) AS last_completed_day
            FROM (
              SELECT user_id, day FROM ai_learning_progress WHERE program_type = ?
              UNION ALL
              SELECT user_id, day FROM user_emoji_progress WHERE program_type = ?
              UNION ALL
              SELECT user_id, day FROM user_ai_blog_progress WHERE program_type = ?
              UNION ALL
              SELECT user_id, day FROM user_played_questions WHERE program_type = ?
              UNION ALL
              SELECT userId, day FROM aifact_user_visit WHERE program_type = ?
              UNION ALL
              SELECT user_id, day FROM user_ai_mission_progress WHERE program_type = ?
            ) all_days
            GROUP BY user_id
            HAVING last_completed_day >= 37
          ) completed_users
        ) overall,

        (
          SELECT COUNT(DISTINCT user_id) AS completed
          FROM (
            SELECT user_id, MAX(day) AS last_completed_day
            FROM (
              SELECT user_id, day FROM ai_learning_progress
                WHERE program_type = ?
                AND updated_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
              UNION ALL
              SELECT user_id, day FROM user_emoji_progress
                WHERE program_type = ?
                AND updated_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
              UNION ALL
              SELECT user_id, day FROM user_ai_blog_progress
                WHERE program_type = ?
                AND updated_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
              UNION ALL
              SELECT user_id, day FROM user_played_questions
                WHERE program_type = ?
                AND updated_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
              UNION ALL
              SELECT userId, day FROM aifact_user_visit
                WHERE program_type = ?
                AND updated_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
              UNION ALL
              SELECT user_id, day FROM user_ai_mission_progress
                WHERE program_type = ?
                AND updated_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
            ) last_month_days
            GROUP BY user_id
            HAVING last_completed_day >= 37
          ) last_month_completed
        ) last_month;
    `;

    const params = Array(12).fill(program_type);
    const result = await executeQuery(query, params);

    const enrolled = result[0].enrolled || 0;
    const completed = result[0].completed || 0;
    const lastMonthCompleted = result[0].last_month_completed || 0;

    const completionPercentage =
      enrolled > 0 ? ((completed / enrolled) * 100).toFixed(2) : 0;

    const lastMonthPercentage =
      enrolled > 0 ? ((lastMonthCompleted / enrolled) * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      enrolled,
      completed,
      completionPercentage,
      lastMonthCompleted,
      lastMonthPercentage
    });
  } catch (error) {
    console.error("getUserDay error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user day data"
    });
  }
};

const tokenBalance = async (req, res) => {
  try {
    // Query to sum the token_balance in the users_data table
    const rows = await executeQuery(`
      SELECT SUM(token_balance) AS totalTokenBalance
      FROM users_data
    `);
    const paid=await executeQuery(`select count(*)as totalUser from subscription_history where status="success"`)
    const withdraw=await executeQuery(`select sum(amount) as totalAmount from withdraw_history where status="success"`)


      const totalRevenueQuery = `
      SELECT SUM(amount) AS totalRevenue, COUNT(DISTINCT email) AS totalPaidUsers
      FROM subscription_history
      WHERE status = 'success'
    `;
    const revenueResult = await executeQuery(totalRevenueQuery);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const totalPaidUsers = revenueResult[0]?.totalPaidUsers || 0;
    // Respond with the sum of token balances
    res.json({ totalTokenBalance: rows[0].totalTokenBalance ,totalPaidUser:totalPaidUsers,totalAmountPaid:paid[0].totalUser*15,totalWithdraw:withdraw[0].totalAmount, total_revenue: totalRevenue });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};


const recentActivities = async (req, res) => {
  try {   
    const activity = await executeQuery(`
      SELECT 
        p.id AS passbook_id,
        p.user_id,
        p.action,
        p.description,
        p.type,
        p.amount,
        p.created_at,
        p.updated_at,
        u.name AS user_name,
        u.email,
        u.referral_code
      FROM passbook p
      LEFT JOIN users_data u
        ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 5;  
    `);

    res.json({ success: true, data: activity });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const getUserData = async (req, res) => {
  try {
    const program_type = "apprentice";

    const query = `
      SELECT
        u.id AS user_id,
        u.email,
        u.referral_code,
        u.plan,
        u.current_program,

        MAX(p.day) AS day,

        ROUND(
          (COALESCE(MAX(p.day), 0) / 37) * 100,
          2
        ) AS completionPercentage,

        u.created_at AS startDate,

        a.seq,
        a.archetype_id,
        a.vark_result

      FROM users_data u

      LEFT JOIN (
        SELECT user_id, day FROM ai_learning_progress WHERE program_type = ?
        UNION ALL
        SELECT user_id, day FROM user_emoji_progress WHERE program_type = ?
        UNION ALL
        SELECT user_id, day FROM user_ai_blog_progress WHERE program_type = ?
        UNION ALL
        SELECT user_id, day FROM user_played_questions WHERE program_type = ?
        UNION ALL
        SELECT userId AS user_id, day FROM aifact_user_visit WHERE program_type = ?
        UNION ALL
        SELECT user_id, day FROM user_ai_mission_progress WHERE program_type = ?
      ) p ON p.user_id = u.id

      LEFT JOIN user_assessment_progress a
        ON a.user_id = u.id

      GROUP BY
        u.id,
        u.email,
        u.referral_code,
        u.plan,
        u.current_program,
        u.created_at,
        a.seq,
        a.archetype_id,
        a.vark_result

      ORDER BY u.created_at DESC
    `;

    const params = Array(6).fill(program_type);
    const result = await executeQuery(query, params);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("getUserData error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data"
    });
  }
};

const subscription_history = async (req, res) => {
  try {
    // Fetch subscription history with user data
    const query = `
      SELECT 
        s.*, 
        u.email,
        u.referral_code,
        u.plan AS user_plan,
        u.paid_status,
        u.sub_status,
        u.current_program
      FROM subscription_history s
      LEFT JOIN users_data u
        ON s.email = u.email
      ORDER BY s.createdAt DESC
    `;
    const subscriptions = await executeQuery(query);

    // Calculate total revenue
    const totalRevenueQuery = `
      SELECT SUM(amount) AS totalRevenue, COUNT(DISTINCT email) AS totalPaidUsers
      FROM subscription_history
      WHERE status = 'success'
    `;
    const revenueResult = await executeQuery(totalRevenueQuery);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;
    const totalPaidUsers = revenueResult[0]?.totalPaidUsers || 0;

    // Total paid users for this month
    const thisMonthQuery = `
      SELECT COUNT(DISTINCT email) AS paidUsersThisMonth
      FROM subscription_history
      WHERE status = 'success'
        AND MONTH(createdAt) = MONTH(CURDATE())
        AND YEAR(createdAt) = YEAR(CURDATE())
    `;
    const thisMonthResult = await executeQuery(thisMonthQuery);
    const paidUsersThisMonth = thisMonthResult[0]?.paidUsersThisMonth || 0;

    // Percentage of paid users this month
    const paidUsersThisMonthPercentage = totalPaidUsers
      ? ((paidUsersThisMonth / totalPaidUsers) * 100).toFixed(2)
      : 0;

    res.status(200).json({
      status: 'success',
      data: subscriptions,
      stats: {
        totalRevenue,
        totalPaidUsers,
        paidUsersThisMonth,
        paidUsersThisMonthPercentage
      }
    });

  } catch (error) {
    console.error("subscription_history error:", error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error'
    }); 
  }
};

const sequenceData = async (req, res) => {
  try {
  
    const sequence = await executeQuery(`
      SELECT 
        id,
        user_id,
        vark_completed,
        cps_completed,
        ai_completed,
        vark_result,
        archetype_id,                
        created_at,
        updated_at,
        ai_score,
        ai_percentage,
        cps_result,
        seq
      FROM user_assessment_progress
      ORDER BY created_at DESC;
    `);

    // Fetch separate counts for each sequence
    const seqCounts = await executeQuery(`
      SELECT
        SUM(seq = 'SEQ-A') AS SEQ_A_Count,
        SUM(seq = 'SEQ-B') AS SEQ_B_Count,
        SUM(seq = 'SEQ-C') AS SEQ_C_Count,
        SUM(seq = 'SEQ-D') AS SEQ_D_Count
      FROM user_assessment_progress;
    `);

    res.json({
      success: true,
      data: sequence,
      counts: seqCounts[0] // { SEQ_A_Count: 10, SEQ_B_Count: 5, ... }
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};







module.exports = { merchant_login, sendMerchantOtp, verifyMerchantOtp, resetMerchantPassword, 
    getUserDay, tokenBalance,recentActivities, getUserData, subscription_history, sequenceData
 };