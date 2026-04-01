const { executeQuery } = require("../Db");
// Assuming you have a function to execute SQL queries
const images = [
  "../assets/Rank3.png",
  "../assets/user1.png",
  "../assets/Rank2.png",
  "../assets/user2.png",
  "../assets/Userimage.png",
];

const calculateRank = (data) => {
  return data.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};

// Function to add image links to the data
const addImages = (data) => {
  return data.map((item, index) => {
    return {
      ...item,
      img: images[index % images.length],
    };
  });
};

// Function to get the top 10 users and include the specified user if not in top 10
const getTop10WithUser = (data, userId) => {
  const top10 = data.slice(0, 10);
  const userInList = data.find((item) => item.id === parseInt(userId));

  // If user is not in the top 10, add them with their rank
  if (userInList && !top10.some((item) => item.id === userInList.id)) {
    top10.pop();  // Remove the last item to keep only 10 entries
    top10.push(userInList);
  }
  return top10;
};


// Function specifically for quiz data to ensure user rank is included in response
const getTop10WithUserForQuiz = (data, userId) => {
  const top10 = data.slice(0, 10);
  const userInList = data.find((item) => item.email == userId);

  if (!userInList) return top10;

  // If user is in top 10, return top 10 as is
  if (top10.some((item) => item.email == userInList.id)) return top10;

  // If user is outside top 10, add them with their actual rank
  const userWithRank = data.find((item) => item.email == userId);
  return [...top10, userWithRank];
};
const getTop10WitHAISpace = (data, userId) => {
  const top10 = data.slice(0, 10);
  const userInList = data.find((item) => item.user_id == userId);

  // If user is not in the top 10, add them with their rank
  if (userInList && !top10.some((item) => item.user_id == userId)) {
    top10.pop();  // Remove the last item to keep only 10 entries
    top10.push(userInList);
  }
  return top10;
};
exports.getLeaderboard = async (req, res) => {
  const { userId } = req.query;
  try {
    
    // Function to calculate the rank for each user

    // Fetch data sorted by token_balance and calculate rank
    const tokenBalanceQuery = `
      SELECT id, name, email, avatar, referral_code, token_balance 
      FROM users_data 
      ORDER BY token_balance DESC
    `;
    let tokenBalanceData = await executeQuery(tokenBalanceQuery);
    tokenBalanceData = calculateRank(tokenBalanceData);
    tokenBalanceData = addImages(tokenBalanceData);
    tokenBalanceData = getTop10WithUser(tokenBalanceData, userId);

    // Fetch data sorted by referral count and calculate rank
    const referralCountQuery = `
      SELECT u.id, u.name, u.email, u.referral_code, u.avatar, 
        (SELECT COUNT(*) FROM users_data WHERE referred_by = u.id) AS referral_count 
      FROM users_data u
      ORDER BY referral_count DESC
    `;
    let referralCountData = await executeQuery(referralCountQuery);
    referralCountData = calculateRank(referralCountData);
    referralCountData = addImages(referralCountData);
    referralCountData = getTop10WithUser(referralCountData, userId);

    // Fetch data sorted by streaks and calculate rank
    const streaksQuery = `
      SELECT id, name, email, referral_code, airdrops, streaks, avatar 
      FROM users_data 
      ORDER BY airdrops DESC
    `;
    let streaksData = await executeQuery(streaksQuery);
    streaksData = calculateRank(streaksData);
    streaksData = addImages(streaksData);
    streaksData = getTop10WithUser(streaksData, userId);

    // Fetch quiz data sorted by highest day
    const topUsersQuery = `
    SELECT 
        u.id,
        u.avatar, 
        u.email, 
        MAX(a.day) AS highest_day,
        u.referral_code
    FROM 
        answer_set a
    JOIN 
        users_data u ON a.email = u.id
    GROUP BY 
        u.id, u.email, u.referral_code
    ORDER BY 
        highest_day DESC
  `;
  
    let quizData = await executeQuery(topUsersQuery);
    quizData = calculateRank(quizData);
    quizData = addImages(quizData);
    quizData = getTop10WithUserForQuiz(quizData, userId);

    const AiSpaceQuery = `
  SELECT 
      p.user_id,
      u.referral_code,
      u.avatar,
      COUNT(*) AS action_count,
      RANK() OVER (ORDER BY COUNT(*) DESC) AS user_rank
  FROM 
      passbook p
  JOIN 
      users_data u ON p.user_id = u.id
  WHERE 
      p.action = 'AI SPACE BONUS'
  GROUP BY 
      p.user_id
  ORDER BY 
      action_count DESC, p.user_id
`;

    let AISpaceData=await executeQuery(AiSpaceQuery)
    AISpaceData = calculateRank(AISpaceData);
    AISpaceData = addImages(AISpaceData);
    console.log(AISpaceData);
    AISpaceData = getTop10WitHAISpace(AISpaceData, userId);
     // Emoji Game Leaderboard
     const emojiQuery = `
     SELECT 
       u.id AS user_id,
       u.name,
       u.avatar,
       u.referral_code,
       COUNT(*) AS completed_days
     FROM 
       user_emoji_progress e
     JOIN 
       users_data u ON u.id = e.user_id
     WHERE 
       e.is_completed = 1
     GROUP BY 
       e.user_id
     ORDER BY 
       completed_days DESC
   `;
   let emojiGameData = await executeQuery(emojiQuery);
   emojiGameData = calculateRank(emojiGameData);
   emojiGameData = addImages(emojiGameData);

   const userEmojiInList = emojiGameData.find(item => item.user_id == userId);
   if (userEmojiInList && !emojiGameData.slice(0, 10).some(item => item.user_id == userId)) {
     emojiGameData = [...emojiGameData.slice(0, 9), userEmojiInList];
   } else {
     emojiGameData = emojiGameData.slice(0, 10);
   }

   // AI Blog Progress Leaderboard
   const aiBlogQuery = `
     SELECT 
       u.id AS user_id,
       u.name,
       u.avatar,
       u.referral_code,
       COUNT(*) AS claimed_days
     FROM 
       user_ai_blog_progress b
     JOIN 
       users_data u ON u.id = b.user_id
     WHERE 
       b.is_claimed = 1
     GROUP BY 
       b.user_id
     ORDER BY 
       claimed_days DESC
   `;
   let aiBlogData = await executeQuery(aiBlogQuery);
   aiBlogData = calculateRank(aiBlogData);
   aiBlogData = addImages(aiBlogData);

   const userAiBlogInList = aiBlogData.find(item => item.user_id == userId);
   if (userAiBlogInList && !aiBlogData.slice(0, 10).some(item => item.user_id == userId)) {
     aiBlogData = [...aiBlogData.slice(0, 9), userAiBlogInList];
   } else {
     aiBlogData = aiBlogData.slice(0, 10);
   }
   res.status(200).json({
    message: "Leaderboard data fetched successfully",
    skillPoints: tokenBalanceData,
    inviteFandF: referralCountData,
    dailyChallenge: streaksData,
    quizData: quizData,
    AISpaceData: AISpaceData,
    emojiGameData: emojiGameData,
    aiBlogData: aiBlogData
  });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({
      message: "Error fetching leaderboard data",
      error:error.message
    });
  }
};

