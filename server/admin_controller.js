const express = require('express');
const app = express();
const cors = require('cors');
const bp = require('body-parser');
const bcrypt = require('bcrypt');
const {executeQuery,db} = require('./Db')
const axios = require('axios');
const dotenv = require('dotenv').config()
app.use(bp.json());
const nodemailer = require("nodemailer");


app.use(cors({
  origin: '*'
}))

const admin_login = async (req, res) => {
    const {email, password} = req.body;
    try{

        const response = await executeQuery('SELECT * FROM admin WHERE email = ?', [email])
          if (!response) {
            return res.json({ status:"failed",message: 'Internal server error' });
          }
          if (response.length === 0) {
            return res.json({ status:'failed', message: 'There is No Admin Registered with This Email' });
          }

          const user = response[0];
          console.log(user)
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.json({ status:'failed',message: 'Invalid email or password' });
          }
      
          return res.json({ status: 'success', message: 'Login successful', user });
    }
    catch(error){
        return res.json({status:'failed',message:'Internal Server Error'});
    }
}


const dailychallenges = async (req, res) => {

  const { title, description, day, video_source } = req.body;
  const checkifexists = "SELECT * FROM DailyChallenges where day = ?";
  const getResponse = await executeQuery(checkifexists, day);
  if(getResponse.length == 0){
    const query = 'INSERT INTO DailyChallenges (title, description, day, video_source) VALUES (?, ?, ?, ?)';
    try {
      const result = await executeQuery(query, [title, description, day, video_source]);
      return res.json({status : 'success', message : 'Daily Challenge added successfully!'});
    } catch (error) {
      console.error(error);
      return res.json({status:'failed',message:'Internal Server Error'});
    }
  }
  else{
    return res.json({status : 'failed', message : 'Daily Challenge already exits for the day!'});
  }
};





const user_stats = async (req, res) => {
  try {
      const merchant_query = await executeQuery("SELECT * FROM users_data where account_type=1");
      const merchant_count = merchant_query.length;
      const user_query = await executeQuery("SELECT * FROM users_data where account_type=0");
      const user_count = user_query.length;
      const user_referral_query = await executeQuery("SELECT * FROM users_data WHERE referred_by IN (SELECT id FROM `users_data` WHERE account_type = 0)");
      const user_referral_count = user_referral_query.length
      const merchant_referral_query = await executeQuery("SELECT * FROM users_data WHERE referred_by IN (SELECT id FROM `users_data` WHERE account_type = 1)");
      const merchant_referral_count = merchant_referral_query.length;
      const total_referral_query = await executeQuery("SELECT * FROM users_data WHERE referred_by != 0");
      const total_referral_count = total_referral_query.length;
      const total_challenge_query = await executeQuery("SELECT * FROM DailyChallenges");
      const total_challenge_count = total_challenge_query.length;
      const total_revenue_query = await executeQuery("SELECT SUM(amount) as amount FROM transactions")
      const total_revenue = total_revenue_query[0].amount;
      return res.json({ status : 'success', data : {merchant_count, user_count, user_referral_count, merchant_referral_count, total_referral_count, total_challenge_count,total_revenue}});
  } catch (error) {
    console.log(error);
    return res.json({status:'failed',message:'Internal Server Error'}); 
  }
}

const transaction_history = async (req, res) => {
  try {
    const transaction_query = await executeQuery("SELECT user.name, tx.* FROM transactions as tx INNER JOIN users_data as user ON user.id=tx.user_id ORDER BY created_at desc");
    return res.json({ status : 'success' , data : transaction_query});
  } catch (error) {
    return res.json({status:'failed',message:'Internal Server Error'}); 
  }
}

const updateTicket = async (req, res) => {
  const { status, description, resolve_description ,id} = req.body;
  const query = 'UPDATE tickets SET status=?,  resolved_description=? WHERE id=?';

  console.log("updateTicket",req.body)
  try {
    // Update ticket in the database
    await executeQuery(query, [status, resolve_description, id]);


    const getUserEmailQuery = 'SELECT user_email, ticket_id  FROM tickets WHERE id=?';
    const result = await executeQuery(getUserEmailQuery, [id]);

    if (result.length === 0) {
      return res.status(404).send('Ticket not found');
    }

    const userEmail = result[0].user_email;
    const ticketId = result[0].ticket_id; 

    console.log("Ticket ID",ticketId); 

    // Send email notification
    const emailSubject = status === 'Closed' ? 'Ticket Resolved' : 'Ticket Status Updated';
    const emailBody = status === 'Closed'
      ? `Your ticket has been resolved.`
      : `Your ticket status has been updated. New status: ${status}`;

    await sendEmail(userEmail, emailSubject,resolve_description, emailBody, ticketId);
    

    

    res.status(200).send('Ticket updated successfully');
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Database error');
  }
};


const sendEmail = async (userEmail, subject, message,emailBody, TicketId) => {
  
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: dotenv.parsed.SMTPUSER,
      pass: dotenv.parsed.SMTPPASSWORD,
    },
  });
  try {
    const info = await transporter.sendMail({
      to: userEmail,
      subject,
      from: "support@mg.fabc.global",
      html: `
        <div style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; font-style: normal; box-sizing: border-box; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; max-width: 700px; margin: 0 auto;">

    <div style=" background-image: url(https://skilleareum.ai/assets/emailbg.png); background-color: #0285ff; padding-bottom: 2rem;
    padding-top: 2rem;
    padding-left: 3rem; ">
      <img src="https://skilleareum.ai/assets/skilleareum.png" alt="logo" style="max-width: 100%; height: auto;" />
    </div>

    
    <div style="width: 75%; margin: auto; background-color: #fff; padding: 1rem 3rem 3rem 3rem;">

        <div style=" padding: 10px; text-align: center">
        <h2>Your ticket ID is ${TicketId}</h2>
         
        </div>
        <div>
          <p style="font-size: 16px; color: #333;">Hello,</p>
         <h3 style="color: #333;">${emailBody}</h3>
          <p style="font-size: 16px; color: #333;"><strong>Query Description:</strong>${message}</p>
          <p style="font-size: 16px; color: #333;">Thank you for reaching out to us. If you have any further questions, feel free to reply to this email.</p>
        </div>
         <div style="margin-top: 20px;">
            <p style="font-size: 14px;font-weight: 600; color: #384860; ">Best regards,<br>
                Skilleareum Support Team. </p>
           
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

    console.log("📧 Ticket update email sent successfully. Message ID:", info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const usercount = async (req, res) => {
  try {
    // Query to get the count of users
    const rows = await executeQuery(`
      SELECT 
        COUNT(id) AS user_count
      FROM 
        users_data
    `);
    
    // Send the user count as response
    res.json({ userCount: rows[0].user_count });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const tokentotal = async (req, res) => {
  try {
    // Query to sum the token_balance in the users_data table
    const rows = await executeQuery(`
      SELECT SUM(token_balance) AS totalTokenBalance
      FROM users_data
    `);
    const paid=await executeQuery(`select count(*)as totalUser from subscription_history where status="success"`)
    const withdraw=await executeQuery(`select sum(amount) as totalAmount from withdraw_history where status="success"`)

    // Respond with the sum of token balances
    res.json({ totalTokenBalance: rows[0].totalTokenBalance ,totalPaidUser:paid[0].totalUser,totalAmountPaid:paid[0].totalUser*15,totalWithdraw:withdraw[0].totalAmount });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};


const cointotal = async (req, res) => {
  // Correct SQL query syntax
  const query = `
    SELECT
      SUM(dogs) AS totalDogs,
      SUM(hmstr) AS totalHamster,
      SUM(not_coin) AS totalNotCoin,
      SUM(ton) AS totalTon
    FROM users_data
  `;

  try {
    // Execute the query and get the result
    const [results] = await executeQuery(query);

    // Send the totals back to the frontend
    res.json({
      totalDogs: results.totalDogs || 0,
      totalHamster: results.totalHamster || 0,
      totalNotCoin: results.totalNotCoin || 0,
      totalTon: results.totalTon || 0,
    });
  } catch (err) {
    console.error("Error fetching coin totals:", err);
    return res.status(500).json({ message: "Error fetching coin totals" });
  }
};

const alluser_data = async (req, res) => {
  const { searchParam, startDate, endDate } = req.query; // Extract query parameters
  console.log({ searchParam, startDate, endDate });

  try {
    let query = `
      SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        u.referral_code,
        COUNT(r.id) AS referral_count,
        SUM(CASE WHEN r.sub_status = 'active' THEN 3 ELSE 0 END) AS referral_earning, 
        u.paid_status,
        u.token_balance,
        u.chatId,
        u.created_at,
        u.sub_status,
        u.evm_wallet_address,
        u.platform
      FROM 
        users_data u
      LEFT JOIN 
        users_data r ON u.id = r.referred_by
      WHERE 1 = 1
    `;

    const params = [];

    // Add search filter for email or referral_code
    if (searchParam) {
      query += ` AND (u.email = ? OR u.referral_code = ?) `;
      params.push(searchParam, searchParam);
    }

    // Add date range filter
    if (startDate && endDate) {
      query += ` AND u.created_at BETWEEN ? AND ? `;
      params.push(startDate, endDate);
    } else if (startDate) {
      query += ` AND u.created_at >= ? `;
      params.push(startDate);
    } else if (endDate) {
      query += ` AND u.created_at <= ? `;
      params.push(endDate);
    }

    // Append GROUP BY clause
    query += `
      GROUP BY 
        u.id, u.name, u.email, u.referral_code, u.paid_status, 
        u.token_balance, u.chatId, u.created_at, u.sub_status, 
        u.evm_wallet_address, u.platform
    `;

    const rows = await executeQuery(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Database query error" });
  }
};




const getAllPayments = async (req, res) => {

  try {
    const rows = await executeQuery(
      `
      SELECT 
        u.referral_code AS 'from',
        p.user_id AS transactionId,
        p.amount,
        p.created_at AS date,
        'success' AS status
      FROM 
        users_data u
      JOIN 
        passbook p ON u.id = p.user_id
     
    `    );

    // Return data with payments key
    res.json({ payments: rows });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};

const getAIFacts = async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        Day AS date,
        Historical_Fact AS aihistory,
        Fun_Fact AS aifact,
        Future_Prediction AS aifuture,
        Current_Affair AS aicurrentaffair
      FROM 
        ai_facts
    `;
    
    const rows = await executeQuery(query);


    res.json(rows); 
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};


const updateAIFact = async (req, res) => {
  const { id, aifact, aicurrentaffair,day, aihistory, aifuture } = req.body;

  try {
    const query = `
      UPDATE ai_facts
      SET 
      Day = ?,
        Fun_Fact = ?, 
        Current_Affair = ?, 
        Historical_Fact = ?, 
        Future_Prediction = ?
      WHERE id = ?
    `;


    const result = await executeQuery(query, [day,aifact, aicurrentaffair, aihistory, aifuture, id]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'AI fact updated successfully' });
    } else {
      res.json({ success: false, message: 'No changes made to the AI fact or ID not found' });
    }
  } catch (error) {
    console.error('Error updating AI fact:', error);
    res.status(500).json({ success: false, message: 'Error updating AI fact' });
  }
};
const addAIFact = async (req, res) => {
  const { aifact, aicurrentaffair, aihistory, aifuture,day } = req.body.editedData;
  console.log(aifact, aicurrentaffair, aihistory, aifuture,day,req.body)
  try {
    const query = `
      INSERT INTO ai_facts (Fun_Fact, Current_Affair, Historical_Fact, Future_Prediction,Day) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await executeQuery(query, [aifact, aicurrentaffair, aihistory, aifuture,day]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'AI fact added successfully', id: result.insertId });
    } else {
      res.json({ success: false, message: 'Failed to add AI fact' });
    }
  } catch (error) {
    console.error('Error adding AI fact:', error);
    res.status(500).json({ success: false, message: 'Error adding AI fact' });
  }
};



const deleteAIFact = async (req, res) => {
  const { id } = req.body; 

  try {
 
    const query = `
      DELETE FROM ai_facts
      WHERE id = ?
    `;

   
    const result = await executeQuery(query, [id]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'AI fact deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'AI fact not found' });
    }
  } catch (error) {
    console.error('Error deleting AI fact:', error);
    res.status(500).json({ success: false, message: 'Error deleting AI fact' });
  }
};

const getJumbledWords = async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        day,
        level,
        question,
        language,
        explanation,
        hint_img AS hintImg,
        answer,
        answer_explanation AS answerText
      FROM 
        jumbled_words
    `;
    
    const rows = await executeQuery(query);

    res.json(rows); 
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};


const updateJumbledWord = async (req, res) => {
  const { id, day, level, question,language, explanation, hintImg, answer, answerText } = req.body;

  try {
    const query = `
      UPDATE jumbled_words
      SET
        day = ?, 
        level = ?, 
        question = ?, 
        language = ?, 

        explanation = ?, 
        hint_img = ?, 
        answer = ?, 
        answer_explanation = ?
      WHERE id = ?
    `;

    // Execute the query with the provided values
    const result = await executeQuery(query, [
      day, 
      level, 
      question, 
      language,
      explanation, 
      hintImg, 
      answer, 
      answerText, 
      id
    ]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Jumbled word updated successfully' });
    } else {
      res.json({ success: false, message: 'No changes made to the Jumbled word or ID not found' });
    }
  } catch (error) {
    console.error('Error updating Jumbled word:', error);
    res.status(500).json({ success: false, message: 'Error updating Jumbled word' });
  }
};

const deleteJumbledWord = async (req, res) => {
  const { id } = req.body; 

  try {
    const query = `
      DELETE FROM jumbled_words
      WHERE id = ?
    `;
    
    const result = await executeQuery(query, [id]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Jumbled Word deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Jumbled Word not found' });
    }
  } catch (error) {
    console.error('Error deleting Jumbled Word:', error);
    res.status(500).json({ success: false, message: 'Error deleting Jumbled Word' });
  }
};

const addJumbledWord = async (req, res) => {
  const { day, level, question,language, explanation, hintImg, answer, answerText } = req.body;

  if (!day || !level || !question || !explanation || !answer || !answerText) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const query = `
      INSERT INTO jumbled_words (day, level, question,language, explanation, hint_img, answer, answer_explanation)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await executeQuery(query, [day, level, question,language, explanation, hintImg, answer, answerText]);

    if (result.affectedRows > 0) {
      res.status(201).json({ success: true, message: 'Jumbled Word added successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add Jumbled Word' });
    }
  } catch (error) {
    console.error('Error adding Jumbled Word:', error);
    res.status(500).json({ success: false, message: 'Error adding Jumbled Word' });
  }
};



const getMissingWords = async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        day,
        level,
        question,
        language,
        explanation,
        hint_img AS hintImg,
        answer,
        answer_explanation AS answerText
      FROM 
        missing_letters
    `;
    
    const rows = await executeQuery(query);

    res.json(rows); 
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};


  const updateMissingWord = async (req, res) => {
    const { id, day, level, question, explanation, hintImg,language, answer, answerText } = req.body;

    try {
      const query = `
        UPDATE missing_letters
        SET
          day = ?, 
          level = ?, 
          question = ?, 
          language = ?,
          explanation = ?, 
          hint_img = ?, 
          answer = ?, 
          answer_explanation = ?
        WHERE id = ?
      `;

      // Execute the query with the provided values
      const result = await executeQuery(query, [
        day, 
        level, 
        question, 
        language,
        explanation, 
        hintImg, 
        answer, 
        answerText, 
        id
      ]);

      if (result.affectedRows > 0) {
        res.json({ success: true, message: ' Missing word updated successfully' });
      } else {
        res.json({ success: false, message: 'No changes made to the  Missing word or ID not found' });
      }
    } catch (error) {
      console.error('Error updating Missing word:', error);
      res.status(500).json({ success: false, message: 'Error updating  Missing word' });
    }
  };


const deleteMissingWord = async (req, res) => {
  const { id } = req.body; 

  try {
    const query = `
      DELETE FROM missing_letters
      WHERE id = ?
    `;
    
    const result = await executeQuery(query, [id]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: ' Missing Word deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: ' Missing Word not found' });
    }
  } catch (error) {
    console.error('Error deleting Missing Word:', error);
    res.status(500).json({ success: false, message: 'Error deleting Missing Word' });
  }
};

const addMissingWord = async (req, res) => {
  const { day, level, question, explanation, hintImg,language, answer, answerText } = req.body;

  if (!day || !level || !question || !explanation || !answer || !answerText) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const query = `
      INSERT INTO missing_letters (day, level, question,language, explanation, hint_img, answer, answer_explanation)
      VALUES (?, ?, ?,?, ?, ?, ?, ?)
    `;

    const result = await executeQuery(query, [day, level, question,language, explanation, hintImg, answer, answerText]);

    if (result.affectedRows > 0) {
      res.status(201).json({ success: true, message: 'Missing Word added successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add Missing Word' });
    }
  } catch (error) {
    console.error('Error adding Missing Word:', error);
    res.status(500).json({ success: false, message: 'Error adding Missing Word' });
  }
};


const getPerfectMatch = async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        day,
        level,
        question,
        language,
        explanation,
        hint_img AS hintImg,
        answer,
        answer_explanation AS answerText
      FROM 
        perfect_match
    `;
    
    const rows = await executeQuery(query);

    res.json(rows); 
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
};


const updatePerfectMatch = async (req, res) => {
  const { id, day, level, question,language, explanation, hintImg, answer, answerText } = req.body;

  try {
    const query = `
      UPDATE perfect_match
      SET
        day = ?, 
        level = ?, 
        question = ?, 
        language = ?,
        explanation = ?, 
        hint_img = ?, 
        answer = ?, 
        answer_explanation = ?
      WHERE id = ?
    `;

    // Execute the query with the provided values
    const result = await executeQuery(query, [
      day, 
      level, 
      question,
      language, 
      explanation, 
      hintImg, 
      answer, 
      answerText, 
      id
    ]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: ' Missing word updated successfully' });
    } else {
      res.json({ success: false, message: 'No changes made to the  Missing word or ID not found' });
    }
  } catch (error) {
    console.error('Error updating Missing word:', error);
    res.status(500).json({ success: false, message: 'Error updating  Missing word' });
  }
};


const deletePerfectMatch = async (req, res) => {
  const { id } = req.body; 

  try {
    const query = `
      DELETE FROM perfect_match
      WHERE id = ?
    `;
    
    const result = await executeQuery(query, [id]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: ' Missing Word deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: ' Missing Word not found' });
    }
  } catch (error) {
    console.error('Error deleting Missing Word:', error);
    res.status(500).json({ success: false, message: 'Error deleting Missing Word' });
  }
};


const addPerfectMatch = async (req, res) => {
  const { day, level, question,language, explanation, hintImg, answer, answerText } = req.body;

  if (!day || !level || !question || !explanation || !answer || !answerText) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const query = `
      INSERT INTO perfect_match (day, level, question,language, explanation, hint_img, answer, answer_explanation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await executeQuery(query, [day, level, question,language, explanation, hintImg, answer, answerText]);

    if (result.affectedRows > 0) {
      res.status(201).json({ success: true, message: 'Missing Word added successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add Missing Word' });
    }
  } catch (error) {
    console.error('Error adding Missing Word:', error);
    res.status(500).json({ success: false, message: 'Error adding Missing Word' });
  }
};
const getSubscriptionData = async (req, res) => {
  try {
    const query = `
      SELECT 
        ud.referral_code, 
        ud.email, 
        ud.chatId, 
        ref_ud.referral_code AS referred_by_referral_code,
        ud.created_at, 
        ud.platform, 
        sh.amount, 
        sh.token, 
        sh.hash
      FROM 
        users_data ud
      LEFT JOIN 
        users_data ref_ud
      ON 
        ud.referred_by = ref_ud.id
      INNER JOIN 
        subscription_history sh 
      ON 
        ud.chatId COLLATE utf8mb4_general_ci = sh.chatId COLLATE utf8mb4_general_ci
      WHERE 
        sh.status COLLATE utf8mb4_general_ci = 'success' 
        AND sh.createdAt = (
          SELECT MAX(sub.createdAt)
          FROM subscription_history sub
          WHERE sub.chatId COLLATE utf8mb4_general_ci = sh.chatId COLLATE utf8mb4_general_ci 
          AND sub.status COLLATE utf8mb4_general_ci = 'success'
        );
    `;

    const result = await executeQuery(query);

    // Log and send the data
    console.log('Latest subscription data:', result);
    res.status(200).json({
      message: "Latest subscription data",
      data: result,
    });
  } catch (error) {
    console.error('Error during AIspaceCronTest execution:', error);
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};



const updatesubscriptionstatus = async (req, res) => {
  const { id, sub_status } = req.body;
console.log("response", req.body);
  try {
    const query = `
      UPDATE users_data 
      SET sub_status  = ?
      WHERE id = ?
    `;
    
    const result = await executeQuery(query, [
      sub_status, id
    ]);
    console.log("Executing Query:", query, [sub_status, id]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Subscription Status updated successfully' });
    } else {
      res.json({ success: false, message: 'No changes made to the Subscription Status or ID not found' });
    }
  } catch (error) {
    console.error('Error updating Subscription Status:', error);
    res.status(500).json({ success: false, message: 'Error updating Subscription Status' });
  }
};
/**
 * GET API - Fetch all AI Learning entries with their assessments
 */
const getAiLearning = async (req, res) => {
  const { day } = req.query;

  try {
      if (day) {
          // Fetch AI Learning details for a specific day
          const aiLearning = await executeQuery(`SELECT * FROM ai_learning WHERE day = ?`, [day]);

          if (aiLearning.length === 0) {
              return res.status(404).json({ error: "No AI Learning found for this day" });
          }

          // Fetch assessments for the specific day
          const assessments = await executeQuery(`SELECT * FROM ai_learning_assessments WHERE day = ?`, [day]);

          return res.json({ aiLearning: aiLearning[0], assessments });
      } else {
          // Fetch all AI Learning entries
          const aiLearnings = await executeQuery(`SELECT * FROM ai_learning ORDER BY day ASC`);

          if (aiLearnings.length === 0) {
              return res.status(404).json({ error: "No AI Learning found" });
          }

          // Fetch all assessments grouped by day
          const assessments = await executeQuery(`SELECT * FROM ai_learning_assessments ORDER BY day ASC`);

          // Group assessments by day
          const assessmentsByDay = assessments.reduce((acc, assessment) => {
              if (!acc[assessment.day]) acc[assessment.day] = [];
              acc[assessment.day].push(assessment);
              return acc;
          }, {});

          // Attach assessments to each AI learning entry
          const response = aiLearnings.map(learning => ({
              ...learning,
              assessments: assessmentsByDay[learning.day] || []
          }));

          return res.json(response);
      }
  } catch (error) {
      console.error("Error fetching AI Learning:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};
/**
 * POST API - Create a new AI Learning entry with assessments
 */
const createAiLearning = async (req, res) => {
  const { topic_name, description, video_url, day, assessments } = req.body;

  if (!topic_name || !video_url || !day || !Array.isArray(assessments)) {
      return res.status(400).json({ error: "Missing required fields or invalid assessments format" });
  }

  try {
      // Insert AI Learning entry
      const result = await executeQuery(
          `INSERT INTO ai_learning (topic_name, description, video_url, day) 
           VALUES (?, ?, ?, ?)`,
          [topic_name, description, video_url, day]
      );

      const aiLearningId = result.insertId;

      // Insert assessments only if valid questions exist
      if (assessments.length > 0 && assessments[0].question) {
          const assessmentValues = assessments.map(a => [
              day, a.question, a.option_a, a.option_b, a.option_c, a.option_d, a.correct_option
          ]);

          await executeQuery(
              `INSERT INTO ai_learning_assessments (day, question, option_a, option_b, option_c, option_d, correct_option) 
               VALUES ?`,
              [assessmentValues]
          );
      }

      res.status(201).json({ message: "AI Learning created successfully", aiLearningId });
  } catch (error) {
      console.error("Error creating AI Learning:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
* PUT API - Update AI Learning and its assessments
*/
const updateAiLearning = async (req, res) => {
  const { topic_name, description, video_url, day, assessments } = req.body;

  if (!topic_name || !video_url || !day || !Array.isArray(assessments)) {
      return res.status(400).json({ error: "Missing required fields or invalid assessments format" });
  }

  try {
      // Update AI Learning entry
      await executeQuery(
          `UPDATE ai_learning SET topic_name = ?, description = ?, video_url = ? WHERE day = ?`,
          [topic_name, description, video_url, day]
      );

      // Delete existing assessments for this day
      await executeQuery(`DELETE FROM ai_learning_assessments WHERE day = ?`, [day]);

      // Insert updated assessments
      if (assessments.length > 0) {
          const assessmentValues = assessments.map(a => [
              day, a.question, a.option_a, a.option_b, a.option_c, a.option_d, a.correct_option
          ]);

          await executeQuery(
              `INSERT INTO ai_learning_assessments (day, question, option_a, option_b, option_c, option_d, correct_option) 
               VALUES ?`,
              [assessmentValues]
          );
      }

      res.json({ message: "AI Learning updated successfully" });
  } catch (error) {
      console.error("Error updating AI Learning:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
* DELETE API - Remove AI Learning and its assessments
*/
const deleteAiLearning = async (req, res) => {
  const { day } = req.query;

  if (!day) return res.status(400).json({ error: "Day parameter is required" });

  try {
      // Delete AI Learning entry
      await executeQuery(`DELETE FROM ai_learning WHERE day = ?`, [day]);

      // Delete related assessments
      await executeQuery(`DELETE FROM ai_learning_assessments WHERE day = ?`, [day]);

      res.json({ message: "AI Learning deleted successfully" });
  } catch (error) {
      console.error("Error deleting AI Learning:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};




// // Load ABI
// const fs = require("fs");
// const abi = JSON.parse(fs.readFileSync("./contractABI.json"));

// const { providers,ethers, Wallet, Contract, utils } = require("ethers");

// const provider = new providers.JsonRpcProvider(process.env.BSC_TESTNET_RPC);


// // Fixed wallet initialization
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// // Create contract instance
// const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);





// const makePayment = async (req, res) => {
//   db.getConnection(async (err, connection) => {
//     if (err) {
//       console.error("MySQL connection failed:", err);
//       return res.status(500).json({ message: "Database connection failed" });
//     }

   
//     const query = (sql, params = []) =>
//       new Promise((resolve, reject) => {
//         connection.query(sql, params, (error, results) => {
//           if (error) reject(error);
//           else resolve(results);
//         });
//       });

//     try {
//       //Fetch eligible payments
//       const eligiblePayments = await query(`
//         SELECT
//             u.id AS user_id,
//             u.referred_by,
//             ref.evm_wallet_address,
//             sh.amount / 2 AS half_amount,
//             sh.id AS subscription_id,
//             sh.email
//         FROM subscription_history sh
//         INNER JOIN users_data u 
//             ON sh.email = u.email
//         INNER JOIN users_data ref 
//             ON u.referred_by = ref.id
//         INNER JOIN subscription_history ref_sh
//             ON ref.email = ref_sh.email AND ref_sh.status = 'success'
//         WHERE (u.platform = 'mbc' OR u.platform = 'MBC')
//           AND sh.status = 'success'
//           AND sh.referral_paid = 0
//       `);
//       console.log(eligiblePayments);
//       // return;
//       if (!eligiblePayments.length) {
//         console.log("No eligible referral payments found.");
//         connection.release();
//         return res.status(200).json({ message: "No eligible referral payments found" });
//       }

//       const walletAddresses = eligiblePayments.map(row => row.evm_wallet_address);
//       const amounts = eligiblePayments.map(row =>
//   ethers.utils.parseUnits(row.half_amount.toString(), 18)
// );


//       console.log("Preparing payments to:", walletAddresses);

//       //   Estimate gas safely
//       try {
//         const gasEstimate = await contract.estimateGas.makePayment(walletAddresses, amounts);

//         console.log("Estimated gas:", gasEstimate.toString());
//       } catch (err) {
//         console.warn("Gas estimation failed, proceeding anyway:", err.message);
//       }

//       //   Send payment transaction
//       const tx = await contract.makePayment(walletAddresses, amounts);
//       console.log("Transaction hash:", tx.hash);

//       const receipt = await tx.wait();
//       console.log("Payment confirmed in block:", receipt.blockNumber);

//       //   Start transaction
//       await query("START TRANSACTION");

//       //   Insert referral payments
//       const insertValues = eligiblePayments.map(row => [
//         row.user_id,
//         row.referred_by,
//         row.evm_wallet_address,
//         row.half_amount,
//         tx.hash,
//         "success"
//       ]);

//       await query(
//         `INSERT INTO referral_payments 
//         (user_id, referred_by, wallet_address, amount, tx_hash, status)
//         VALUES ?`,
//         [insertValues]
//       );

//       //   Update subscription history
//       const subscriptionIds = eligiblePayments.map(row => row.subscription_id);
//       await query(
//         `UPDATE subscription_history 
//          SET referral_paid = 1 
//          WHERE id IN (?)`,
//         [subscriptionIds]
//       );

//       //   Commit transaction
//       await query("COMMIT");

//       console.log("Referral payments processed successfully!");
//       connection.release();

//       return res.status(200).json({
//         status: true,
//         message: "Referral payments processed successfully",
//         txHash: tx.hash,
//       });

//     } catch (err) {
//       console.error("Error in makePayment:", err);

//       await query("ROLLBACK");
//       connection.release();

//       if (err.code === "INSUFFICIENT_FUNDS") {
//         return res.status(400).json({ message: "Insufficient funds in wallet" });
//       } else if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
//         return res.status(400).json({ message: "Gas estimation failed - transaction may revert" });
//       } else {
//         return res.status(500).json({ message: "Internal server error", error: err.message });
//       }
//     }
//   });
// };




const jwt = require("jsonwebtoken");
function generateReferralLink(email, src) {
    const payload = {
        referred_by: email,
        src: src
    };

    // Sign JWT with a secret key
    const token = jwt.sign(payload, "fdaSkhWIUHJE87bvgjSGgdgd89fafDEFkvgSgjs", { expiresIn: "7d" });

    // Create encrypted URL
    return `https://web.skilleareum.ai/usersignup?ref=${token}`;
}

// Example usage
// const referralLink = generateReferralLink("shubham@fabc.global", "mbc");
// console.log(referralLink);



module.exports = {
    admin_login, dailychallenges,
    user_stats,
    transaction_history,
    updateTicket,
    usercount,
    tokentotal,
    cointotal,
    alluser_data,
    getAllPayments,
    getAIFacts,
    updateAIFact,
    deleteAIFact,
    addAIFact,
    getJumbledWords,
    updateJumbledWord,
    deleteJumbledWord,
    addJumbledWord,
    getMissingWords,
    updateMissingWord,
    deleteMissingWord,
    addMissingWord,
    getPerfectMatch,
    updatePerfectMatch,
    deletePerfectMatch,
    addPerfectMatch,
    getSubscriptionData,
    updatesubscriptionstatus,
    deleteAiLearning,
    updateAiLearning,
    createAiLearning,
    getAiLearning,
    // makePayment,
}