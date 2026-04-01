const { executeQuery } = require("../Db");
// Assuming you have a function to execute SQL queries

exports.getTodayFacts = async (req, res) => {
    try {
          const {program_type,userId}=req.user;

        const now = new Date();
        const offsetIST = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);

        const hours = offsetIST.getUTCHours();
        const minutes = offsetIST.getUTCMinutes();

        // Count how many total facts user has visited before
        const visitQuery = `SELECT COUNT(DISTINCT day) as dayCount FROM aifact_user_visit WHERE STATUS = ? AND userId = ? AND program_type= ?`;
        const userProgress = await executeQuery(visitQuery, ["not visited",userId,program_type]);

        const currentDayIndex = (userProgress[0].dayCount || 0) + 1;

        let lang = req.query.lang || 'en';

        // if ((hours === 5 && minutes >= 0) || (hours > 5 && hours < 10)) {
        //     query = `SELECT id, day_index AS Day, Historical_Fact FROM ai_facts WHERE day_index = ?`;
        // } else if ((hours === 10 && minutes >= 0) || (hours > 10 && hours < 15)) {
        //     query = `SELECT id, day_index AS Day, Fun_Fact, Historical_Fact FROM ai_facts WHERE day_index = ?`;
        // } else if ((hours === 15 && minutes >= 0) || (hours > 15 && hours < 20)) {
        //     query = `SELECT id, day_index AS Day, Historical_Fact, Fun_Fact, Future_Prediction FROM ai_facts WHERE day_index = ?`;
        // } else {
            query = `SELECT id, day_index AS Day, Historical_Fact, Fun_Fact, Future_Prediction, Current_Affair FROM ai_facts WHERE day_index = ? AND program_type = ? AND language = ?`;
        // }

        let facts = await executeQuery(query, [currentDayIndex,program_type,lang]);
        
        // Fallback to 'en' if facts in requested language don't exist
        if (facts.length === 0 && lang !== 'en') {
            facts = await executeQuery(`SELECT id, day_index AS Day, Historical_Fact, Fun_Fact, Future_Prediction, Current_Affair FROM ai_facts WHERE day_index = ? AND program_type = ? AND language = 'en'`, [currentDayIndex,program_type]);
        }

        if (facts.length === 0) {
            return res.status(404).json({ message: `No facts found for Day ${currentDayIndex}` });
        }
// Check last visited full day (all 4 intervals completed)
        const previousDayCheckQuery = `
            SELECT visitCount, DATE(visitTime) AS visitDate
            FROM aifact_user_visit
            WHERE userId = ? AND STATUS != ? AND program_type = ?
            ORDER BY visitTime DESC
            LIMIT 1
        `;
        const previousDayVisits = await executeQuery(previousDayCheckQuery, [userId, "not visited", program_type]);
        console.log(previousDayVisits)
        const canClaim = previousDayVisits.length > 0 && previousDayVisits[0].visitCount === 4;
        const UserVisit = {canClaim}
        return res.status(200).json({ facts, currentDayIndex,UserVisit,count:previousDayVisits[0]?.visitCount || 0});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.incrementVisitCount = async (req, res) => {
    try {
        const {Fact } = req?.query;
          const {program_type,userId}=req.user;


        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Get yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate()); // Subtract 1 day

        // Format yesterday's date as 'YYYY-MM-DD'
        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(yesterday.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

      const checkVisitQuery = `
    SELECT id,visitCount, DATE(visitTime) AS visitDate
            FROM aifact_user_visit
            WHERE userId = ? AND STATUS != ? AND program_type = ?
            ORDER BY visitTime DESC
            LIMIT 1
`;
        const visitData = await executeQuery(checkVisitQuery, [userId, "not visited", program_type]);
        console.log("visitData :",visitData)
   // Count how many total facts user has visited before
        const visitQuery = `SELECT COUNT(DISTINCT day) as dayCount FROM aifact_user_visit WHERE STATUS = ? AND userId = ? AND program_type=?`;
        const userProgress = await executeQuery(visitQuery, ["not visited",userId,program_type]);

        const currentDayIndex = (userProgress[0].dayCount || 0) + 1;
        
        let count = 1;

        if (visitData.length > 0) {
            const currentVisitCount = visitData[0].visitCount;
            if(currentVisitCount===4){
                return res.status(200).json({ message: "Already completed visit count"});
            }
            if(Fact==="AI History" && currentVisitCount===0){
                count=1;
            }else if(Fact==="AI Fun Fact" && currentVisitCount===1){
                count=2
            }else if(Fact==="AI Future" && currentVisitCount===2){
                count=3
            }else if(Fact==="AI Current Affair’s" && currentVisitCount===3){
                count=4
            }
        }
        
        // Use UPSERT (INSERT ... ON DUPLICATE KEY UPDATE) to enforce exactly one record per (userId, day, program_type)
        const upsertQuery = `
            INSERT INTO aifact_user_visit (userId, visitCount, visitTime, STATUS, day, program_type)
            VALUES (?, ?, ?, 'visited', ?, ?)
            ON DUPLICATE KEY UPDATE 
                visitCount = IF(VALUES(visitCount) > visitCount, VALUES(visitCount), visitCount),
                visitTime = VALUES(visitTime)
        `;
        
        const visitDateObj = new Date();
        await executeQuery(upsertQuery, [userId, count, visitDateObj, currentDayIndex, program_type]);

        const visitnumber = await executeQuery("SELECT * FROM aifact_user_visit WHERE userId = ? AND day = ? AND program_type = ?", [userId, currentDayIndex, program_type]);

        return res.status(200).json({ message: "Visit count updated", visitnumber });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};

const trackUserVisit = async (userId, offsetIST, currentDayIndex) => {
    try {
        const hours = offsetIST.getUTCHours();
        const minutes = offsetIST.getUTCMinutes();

        let intervalIndex = 0;
        let completed = 0;

        if ((hours === 5 && minutes >= 0) || (hours > 5 && hours < 10)) {
            intervalIndex = 1;
            completed = 0;
        } else if ((hours === 10 && minutes >= 0) || (hours > 10 && hours < 15)) {
            intervalIndex = 2;
            completed = 1;
        } else if ((hours === 15 && minutes >= 0) || (hours > 15 && hours < 20)) {
            intervalIndex = 3;
            completed = 2;
        } else if ((hours === 20 && minutes >= 0) || (hours > 20 || hours < 5)) {
            intervalIndex = 4;
            completed = 3;
        }

        const today = offsetIST;
        const formattedDate = today.toISOString().split("T")[0];

        // Check last visited full day (all 4 intervals completed)
        const previousDayCheckQuery = `
            SELECT visitCount, DATE(visitTime) AS visitDate
            FROM aifact_user_visit
            WHERE userId = ? AND STATUS != ? AND program_type = ?
            ORDER BY visitTime DESC
            LIMIT 1
        `;
        const previousDayVisits = await executeQuery(previousDayCheckQuery, [userId, "not visited", program_type]);
        console.log(previousDayVisits)
        const canClaim = previousDayVisits.length > 0 && previousDayVisits[0].visitCount === 4;

        // Check if new user
        const isNewUserQuery = `SELECT * FROM aifact_user_visit WHERE userId = ? AND program_type = ?`;
        const isNew = await executeQuery(isNewUserQuery, [userId, program_type]);

        // Check today’s record
        const checkQuery = `SELECT * FROM aifact_user_visit WHERE userId = ? AND DATE(visitTime)= ? AND program_type = ?`;
        const visitsToday = await executeQuery(checkQuery, [userId, formattedDate, program_type]);

        // Update visitCount for today if already exists and new interval is higher
        if (visitsToday.length > 0) {
            const currentVisit = visitsToday[0];
            if (currentVisit.visitCount < intervalIndex) {
                const updateVisit = `UPDATE aifact_user_visit SET visitCount = ? WHERE userId = ? AND DATE(visitTime) = ? AND program_type = ?`;
                await executeQuery(updateVisit, [intervalIndex, userId, formattedDate, program_type]);
            }
            const visitCount = await executeQuery(checkQuery, [userId, formattedDate, program_type]);
            return {
                message: "User has already visited today",
                isNew: isNew.length === 0,
                count: visitCount[0],
                canClaim,
                currentDayIndex
            };
        }

        // Insert first visit for today
        const insertQuery = `INSERT INTO aifact_user_visit (userId, visitTime, visitCount, STATUS, day, program_type) VALUES (?, ?, ?, ?,?, ?)`;
        await executeQuery(insertQuery, [userId, new Date(), intervalIndex, 'visited',currentDayIndex, program_type]);

        return {
            message: `Visit recorded`,
            isNew: isNew.length === 0,
            canClaim,
            currentDayIndex
        };
    } catch (error) {
        return { error: error.message };
    }
};



exports.getYesterdayFacts = async (req, res) => {
    try {
        const { userId, lang = 'en' } = req?.query
        // Get yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);  // Subtract 1 day

        // Format yesterday's date as 'YYYY-MM-DD' to match the database date format
        const year = yesterday.getFullYear();
        const month = String(yesterday.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed
        const day = String(yesterday.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const visitQuery = `SELECT COUNT(DISTINCT DATE(visitTime)) as dayCount FROM aifact_user_visit WHERE STATUS = ? AND userId = ? AND program_type = ?`;
        const userProgress = await executeQuery(visitQuery, ["not visited", userId, program_type]);

        const currentDayIndex = (userProgress[0].dayCount || 0) + 1;
        // Query the database for facts where the date matches yesterday
        // Note: For now assuming program_type is not required here, but language is. If program_type is needed, it would need to be passed or derived, we'll just check language.
        const query = `
            SELECT id, day_index as Day, Historical_Fact, Fun_Fact, Future_Prediction, Current_Affair 
            FROM ai_facts 
            WHERE day_index = ? AND language = ?

        `;
        
        // Execute the query with the formatted date
        let facts = await executeQuery(query, [currentDayIndex, lang]);

        // Fallback to 'en'
        if (facts.length === 0 && lang !== 'en') {
            facts = await executeQuery(`SELECT id, day_index as Day, Historical_Fact, Fun_Fact, Future_Prediction, Current_Affair FROM ai_facts WHERE day_index = ? AND language = 'en'`, [currentDayIndex]);
        }

        if (facts.length === 0) {
            return res.status(404).json({ message: "No facts found for yesterday" });
        }

     
// Query to find the most recent day with STATUS != 'not visited' and date not equal to today
// const previousDayCheckQuery = `
//     SELECT visitCount, visitTime
//     FROM aifact_user_visit
//     WHERE userId = ?  AND DATE(visitTime) = ?
  
// `;
// console.log(formattedDate)
// // Execute the query with the userId, "not visited" status, and today's date
// const previousDayVisits = await executeQuery(previousDayCheckQuery, [userId, formattedDate]);

console.log(facts)
       

        return res.status(200).json({ facts ,});

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};


exports.claimReward = async (req, res) => {
    try {
         const {program_type,userId}=req.user;
        console.log(userId);
        
        const today = new Date();
        const offsetIST = new Date(today.getTime() + 5.5 * 60 * 60 * 1000); // +5:30 hrs in ms
        const formattedToday = `${offsetIST.getUTCFullYear()}-${String(offsetIST.getUTCMonth() + 1).padStart(2, '0')}-${String(offsetIST.getUTCDate()).padStart(2, '0')}`;

        // Query to find the most recent day with STATUS != 'not visited' and date not equal to today
        const previousDayCheckQuery = `
            SELECT visitCount, DATE(visitTime) AS visitDate
            FROM aifact_user_visit
            WHERE userId = ? AND STATUS != ? AND program_type = ?
            ORDER BY visitTime DESC
            LIMIT 1
        `;
        
        // Execute the query with the userId, "not visited" status, and program_type
        const previousDayVisits = await executeQuery(previousDayCheckQuery, [userId, "not visited", program_type]);
        console.log(previousDayVisits);

        // Check if there is a previous day with visitCount of 4
        const canClaim = previousDayVisits.length > 0 && previousDayVisits[0].visitCount === 4;

        if (!canClaim) {
            return res.status(400).json({ message: "User is not eligible to claim the reward.", canClaim: false });
        }

        // Update the status to 'CLAIMED' for the user's visit on the most recent eligible day
        const updateStatusQuery = `
            UPDATE aifact_user_visit
            SET status = ?
            WHERE userId = ? AND DATE(visitTime) = ? AND program_type = ?
        `;
        await executeQuery(updateStatusQuery, ["not visited", userId, previousDayVisits[0].visitDate, program_type]);
        const bonusQuery = `
        SELECT created_at 
        FROM passbook 
        WHERE user_id = ? 
        AND description = 'AI Fact bonus' 
        ORDER BY created_at DESC 
        LIMIT 1
    `;
    
    const bonusRes = await executeQuery(bonusQuery, [userId]);
    
    let isBonusFact = false; // Default: Not eligible
    
    if (bonusRes.length) {
        const lastBonusTime = new Date(bonusRes[0].created_at);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
        if (lastBonusTime >= oneHourAgo) {
            isBonusFact = true; // Eligible if the last bonus was within 1 hour
        }
    }
    let tokenAmt=180;
    if(isBonusFact){
        tokenAmt=360
    }
        // Update user's token balance
        await executeQuery('UPDATE users_data SET token_balance = token_balance + ? WHERE id = ?', [tokenAmt,userId]);

        // Insert a record into the passbook table
        const passbookQuery = "INSERT INTO passbook (user_id, action, description, amount) VALUES (?, ?, ?, ?)";
        await executeQuery(passbookQuery, [userId, "AI FACT VAULT", "AI Fact Vault Bonus credited", tokenAmt]);

        return res.status(200).json({ message: "Reward claimed successfully.", canClaim: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};




