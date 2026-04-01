const cron = require("node-cron");
const axios = require("axios");
const { executeQuery } = require("./Db");
require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year

  return `RETWEET BONUS-${day}-${month}`;
};

const changeRead = async (req, res) => {
  try {
    const getTweets = await executeQuery("SELECT * FROM notification");

    for (const value of getTweets) {
      const action = formatDate(value.created_at);
      const tweet_id = value.id;

      const selectQuery = "SELECT * FROM passbook WHERE action = ?";
      const passbooks = await executeQuery(selectQuery, [action]);

      for (const passbook of passbooks) {
        console.log(tweet_id);
        console.log(passbook.user_id);
        const updateQuery =
          "UPDATE user_notifications SET readed = 1 WHERE user_id = ? AND notification_id = ? ";
        await executeQuery(updateQuery, [passbook.user_id, tweet_id]);
      }
      //console.log(passbooks); // You can remove or handle this as needed
    }
    // Send a response after processing all records
    console.log("done");
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error processing notifications:", error);
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const addSpinsEvery8Hours = async () => {
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
    console.log("Added 1 spins to all users.");
  } catch (error) {
    console.error("Error adding spins:", error);
  }
};
const removeExpiredBoosterPlans = async () => {
  // Query to find all expired boosters with user info
  const fetchQuery = `
    SELECT fs.user_id, fs.booster_plan_id
FROM FarmingSessions fs
JOIN BoosterPlans bp ON fs.booster_plan_id = bp.id
WHERE fs.booster_applied_time IS NOT NULL 
  AND (
    (bp.id = 1 AND TIMESTAMPDIFF(HOUR, fs.booster_applied_time, NOW()) >= 120) OR
    (bp.id = 2 AND TIMESTAMPDIFF(HOUR, fs.booster_applied_time, NOW()) >= 150) OR
    (bp.id = 3 AND TIMESTAMPDIFF(HOUR, fs.booster_applied_time, NOW()) >= 200) OR
    (bp.id = 4 AND TIMESTAMPDIFF(HOUR, fs.booster_applied_time, NOW()) >= 300)
  )
  `;

  try {
    const expiredBoosters = await executeQuery(fetchQuery);

    if (expiredBoosters.length > 0) {
      // Insert passbook notifications
      const insertValues = expiredBoosters
        .map((booster) => `(${booster.user_id}, 'Boost has expired', 'AI Farming', 'DEBIT', 0)`)
        .join(',');

      const insertPassbookQuery = `
        INSERT INTO passbook (user_id, action, description, type, amount)
        VALUES ${insertValues}
      `;

      await executeQuery(insertPassbookQuery);

      // Remove booster info from sessions
      const updateQuery = `
        UPDATE FarmingSessions 
        SET booster_plan_id = NULL, booster_applied_time = NULL 
        WHERE booster_applied_time IS NOT NULL 
          AND (
            (booster_plan_id = 1 AND TIMESTAMPDIFF(HOUR, booster_applied_time, NOW()) >= 120) OR
            (booster_plan_id = 2 AND TIMESTAMPDIFF(HOUR, booster_applied_time, NOW()) >= 150) OR
            (booster_plan_id = 3 AND TIMESTAMPDIFF(HOUR, booster_applied_time, NOW()) >= 200) OR
            (booster_plan_id = 4 AND TIMESTAMPDIFF(HOUR, booster_applied_time, NOW()) >= 300)
          )
      `;

      await executeQuery(updateQuery);

      console.log("Expired booster plans removed and passbook updated successfully");
    } else {
      console.log("No expired boosters found");
    }
  } catch (error) {
    console.error("Error in removeExpiredBoosterPlans cron job:", error);
  }
};

const expireAISpaceClick= async () => {
  try {
      // Disable previous day's clicks
      await executeQuery(
          `UPDATE tool_clicks SET points_claimed = 1 
           WHERE DATE(click_time) < CURDATE()`
      );
      console.log('Tool clicks reset for the new day.');
  } catch (error) {
      console.error('Error during midnight reset:', error);
  }
}
const expireFrozenRewards = async () => {
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

console.log(`Expired ${expiredRewards.length} frozen rewards.`);
};

const sendMidwayReminders = async () => {
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

  console.log("Midway reminders updated in freezed_amount.message.");
};

const sendFinalReminders = async () => {
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

  console.log("Final reminders updated in freezed_amount.message.");
};
const runLuckyDrawCron=async()=> {
  try {
      // 1. Get all unique user IDs who participated in the lucky draw this month
      const luckyDrawUsers = await executeQuery(`
          SELECT DISTINCT user_id 
          FROM passbook 
          WHERE action = 'Lucky draw entry' 
          AND created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
      `);

      if (luckyDrawUsers.length === 0) {
          console.log("No eligible users for this month's lucky draw.");
          return;
      }

      // 2. Calculate 10% of the users
      const numWinners = Math.max(1, Math.floor(luckyDrawUsers.length * 0.1));
      
      // 3. Randomly shuffle and pick winners
      const shuffledUsers = luckyDrawUsers.sort(() => 0.5 - Math.random());
      const selectedWinners = shuffledUsers.slice(0, numWinners);

      // 4. Distribute rewards (SKLRM tokens)
      const tokenAmt = 500; // Define the reward amount

      for (const winner of selectedWinners) {
          const userId = winner.user_id;

          // Update token balance
          await executeQuery(
              `UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?`, 
              [tokenAmt, userId]
          );

          // Log transaction in passbook
          await executeQuery(
              `INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)`, 
              [userId, "LUCKY DRAW WIN", "Lucky Draw Airdrop Reward", tokenAmt]
          );

          console.log(`User ${userId} won ${tokenAmt} SKLRM tokens!`);
      }

      console.log(`Lucky Draw Cron Job: ${numWinners} users received rewards.`);

  } catch (error) {
      console.error("Error running lucky draw cron job:", error);
  }
}





// Load ABI
const abi = JSON.parse(fs.readFileSync("./contractABI.json"));

const { providers, Wallet, Contract, utils } = require("ethers");
const provider = new providers.JsonRpcProvider(process.env.BSC_TESTNET_RPC);


// Fixed wallet initialization
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create contract instance
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);


// Import your makePayment function
const makePayment = async () => {
  db.getConnection(async (err, connection) => {
    if (err) {
      console.error("MySQL connection failed:", err);
      return;
    }

    const query = (sql, params = []) =>
      new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });

    try {
      // Fetch eligible payments
      const eligiblePayments = await query(`
        SELECT
            u.id AS user_id,
            u.referred_by,
            ref.evm_wallet_address,
            sh.amount / 2 AS half_amount,
            sh.id AS subscription_id,
            sh.email
        FROM subscription_history sh
        INNER JOIN users_data u 
            ON sh.email = u.email
        INNER JOIN users_data ref 
            ON u.referred_by = ref.id
        INNER JOIN subscription_history ref_sh
            ON ref.email = ref_sh.email AND ref_sh.status = 'success'
        WHERE (u.platform = 'mbc' OR u.platform = 'MBC')
          AND sh.status = 'success'
          AND sh.referral_paid = 0
      `);

      if (!eligiblePayments.length) {
        console.log("No eligible referral payments found.");
        connection.release();
        return;
      }

      //    Filter invalid wallet addresses
      const validPayments = eligiblePayments.filter(row =>
        ethers.utils.isAddress(row.evm_wallet_address)
      );

      if (validPayments.length === 0) {
        console.log("No valid wallet addresses found for referral payments.");
        connection.release();
        return;
      }

      const walletAddresses = validPayments.map(row => row.evm_wallet_address);
      const amounts = validPayments.map(row =>
        ethers.utils.parseUnits(row.half_amount.toString(), 18)
      );

      console.log("Preparing payments to:", walletAddresses);

      //    Estimate gas safely
      try {
        const gasEstimate = await contract.estimateGas.makePayment(walletAddresses, amounts);
        console.log("Estimated gas:", gasEstimate.toString());
      } catch (err) {
        console.warn("Gas estimation failed, proceeding anyway:", err.message);
      }

      //    Send payment transaction
      const tx = await contract.makePayment(walletAddresses, amounts);
      console.log("Transaction hash:", tx.hash);

      const receipt = await tx.wait();
      console.log("Payment confirmed in block:", receipt.blockNumber);

      //    Start transaction
      await query("START TRANSACTION");

      //    Insert referral payments
      const insertValues = validPayments.map(row => [
        row.user_id,
        row.referred_by,
        row.evm_wallet_address,
        row.half_amount,
        tx.hash,
        "success"
      ]);

      await query(
        `INSERT INTO referral_payments 
        (user_id, referred_by, wallet_address, amount, tx_hash, status)
        VALUES ?`,
        [insertValues]
      );

      //    Update subscription history
      const subscriptionIds = validPayments.map(row => row.subscription_id);
      await query(
        `UPDATE subscription_history 
         SET referral_paid = 1 
         WHERE id IN (?)`,
        [subscriptionIds]
      );

      //    Commit transaction
      await query("COMMIT");

      console.log("Referral payments processed successfully!");
      connection.release();
    } catch (err) {
      console.error("Error in makePayment:", err);
      await query("ROLLBACK");
      connection.release();
    }
  });
};

//    Schedule cron job to run every 20 days at 00:00
cron.schedule("0 0 */20 * *", async () => {
  console.log("🚀 Running referral payment cron job...");
  await makePayment();
});


























cron.schedule("*/5 * * * *", getTwitterPost);
cron.schedule("*/5 * * * *", changeRead);
cron.schedule("0 0,8,16 * * *", addSpinsEvery8Hours); //Runs on 0:00, 8:00, 16:00
cron.schedule("0 * * * *", removeExpiredBoosterPlans); // Runs every hour
cron.schedule('1 0 * * *', expireAISpaceClick); // Runs every 12:01 AM
cron.schedule("0 0 * * *", async () => {
  try {
    await expireFrozenRewards();
    await sendMidwayReminders();
    await sendFinalReminders();
    console.log("Cron job executed successfully at 12:00 AM");
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});
// Schedule to run on the 1st day of every month at 00:00 UTC
cron.schedule("0 0 1 * *", () => {
  console.log("Running Lucky Draw Cron Job...");
  runLuckyDrawCron();
});
process.stdin.resume();
