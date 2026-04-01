const { executeQuery } = require("../Db");


// Update token balance
const updateTokenBalance = async (userId, newBalance) => {
  const query = `
    UPDATE users_data
    SET token_balance = token_balance + ?
    WHERE id = ?
  `;
  return await executeQuery(query, [newBalance, userId]);
};

// Count passbook entries
const getPassbookCount = async (userId) => {
  const query = `
    SELECT COUNT(*) AS count
    FROM passbook
    WHERE user_id = ?
  `;
  const rows = await executeQuery(query, [userId]);
  return rows[0].count;
};

const addPassbookRecord = async (userId, type, amount, description) => {
  const query = `
    INSERT INTO passbook (user_id, type, amount, description)
    VALUES (?, ?, ?, ?)
  `;
  return await executeQuery(query, [userId, type, amount, description]);
};

const insertReward = async (userId, rewardType, rewardValue, description, program_type) => {
  const query = `
    INSERT INTO rewards (user_id, reward_type, reward_value, description, program_type)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE user_id = user_id
  `;
  return await executeQuery(query, [
    userId,
    rewardType,
    rewardValue,
    description,
    program_type
  ]);
};


const getUserSeq = async (userId) => {
  const query = `
    SELECT seq 
    FROM user_assessment_progress 
    WHERE user_id = ?
  `;
  const result = await executeQuery(query, [userId]);
  if (result.length === 0) return null;
  return result[0].seq; // example: SEQ-A / SEQ-B / SEQ-C
};


module.exports = {
  updateTokenBalance,
  getPassbookCount,
  addPassbookRecord,
  insertReward,
  getUserSeq
};
