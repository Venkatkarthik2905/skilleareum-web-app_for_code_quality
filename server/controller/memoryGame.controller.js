const { executeQuery } = require("../Db");

exports.getUnplayedQuestions = async (req, res) => {
    const {  level, day, language = 'en' } = req.query;
        const {userId,program_type}=req.user;

    if (!userId || !level || !day) {
        return res.status(400).json({ message: "Invalid data" });
    }

    try {
        // Step 1: Check memory life
        const [user] = await executeQuery(
            `SELECT memory_life FROM users_data WHERE id = ?;`,
            [userId]
        );

        if (user.memory_life <= 0) {
         
            // Step 4: Return no life left response
            return res.status(200).json({
                success: false,
                message: "No life left",
                remainingLife: 0,
            });
        }

        // Tier 1: Try to get an UNPLAYED question in the requested language
        const query = `
            SELECT jq.*
            FROM memory_game jq
            WHERE jq.level = ?
            AND jq.day = ?
            AND jq.program_type = ?
            AND jq.language = ?
            AND NOT EXISTS (
                SELECT 1 FROM user_played_questions upq
                WHERE jq.id = upq.question_id
                AND upq.user_id = ?
                AND upq.game_type = 'memory_game'
                AND upq.program_type = ?
            )
            LIMIT 1
        `;

        let [result] = await executeQuery(query, [level, day, program_type, language, userId, program_type]);

        // Tier 2: Fallback to UNPLAYED in English if no matching language question is found
        if (!result && language !== 'en') {
            const fallbackUnplayedQuery = `
                SELECT jq.*
                FROM memory_game jq
                WHERE jq.level = ?
                AND jq.day = ?
                AND jq.program_type = ?
                AND jq.language = 'en'
                AND NOT EXISTS (
                    SELECT 1 FROM user_played_questions upq
                    WHERE jq.id = upq.question_id
                    AND upq.user_id = ?
                    AND upq.game_type = 'memory_game'
                    AND upq.program_type = ?
                )
                LIMIT 1
            `;
            [result] = await executeQuery(fallbackUnplayedQuery, [level, day, program_type, userId, program_type]);
        }

        // Tier 3: If still no unplayed found, get ANY random question in the requested language (Repeat logic)
        if (!result) {
            const repeatQuery = `
                SELECT * FROM memory_game 
                WHERE level = ? AND language = ? AND day = ? AND program_type = ?
                ORDER BY RAND() LIMIT 1`;
            [result] = await executeQuery(repeatQuery, [level, language, day, program_type]);
            if (Array.isArray(result)) result = result[0];
        }

        // Tier 4: Finally, fallback to ANY random question in English if target language is empty
        if (!result && language !== 'en') {
            const repeatFallbackQuery = `
                SELECT * FROM memory_game 
                WHERE level = ? AND language = 'en' AND day = ? AND program_type = ?
                ORDER BY RAND() LIMIT 1`;
            [result] = await executeQuery(repeatFallbackQuery, [level, day, program_type]);
            if (Array.isArray(result)) result = result[0];
        }

        // Ensure we finally have a question
        if (!result) {
            return res.status(200).json({
                success: false,
                message: "No questions found for today",
            });
        }

       // Parse the image_pairs JSON string from the result
const pairs = JSON.parse(result.image_pairs);

// Directly map the pairs into the `initialImages` structure
const initialImages = pairs.map((pair) => ({
    src: pair.src,
    id: pair.id
}));

// Shuffle the initialImages array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const shuffledImages = shuffleArray(initialImages);

// Attach the shuffledImages to the result object
result.initialImages = shuffledImages;

// Log the result for debugging
console.log(result.initialImages);
console.log(shuffledImages.length)

        // Send the response with transformed data
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};




// When marking a question as played, first check if it exists in jumbled_words:
exports.markQuestionAsPlayed = async (req, res) => {
      const {  questionId, answer } = req.query;
      const {userId,program_type}=req.user;
    try {
        console.log(userId, questionId);
        
        // Step 1: Check if question exists and retrieve the correct answer
        const checkQuestionQuery = "SELECT id,level,day FROM memory_game WHERE id = ?";
        const [question] = await executeQuery(checkQuestionQuery, [questionId]);

        if (!question || question.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Question does not exist"
            });
        }
        console.log(question)

        // Step 2: Check if the provided answer matches the correct answer
       
        // Step 3: Insert into user_played_questions table if answer is correct
        const insertQuery = `
            INSERT IGNORE INTO user_played_questions (user_id, question_id,date_played,level,game_type,day,program_type, language)
            VALUES (?, ?, CURDATE(),?,?,?,?,?);
        `;
        await executeQuery(insertQuery, [userId, questionId,question?.level,"memory_game",question?.day,program_type, req.query.language || 'en']);


        //Step 3: Provide reward to the user
        await executeQuery('UPDATE users_data SET token_balance = token_balance + 200 WHERE id = ?', [userId]);
        const passbookQuery =
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
      await executeQuery(passbookQuery, [
        userId,
        "Memory Game",
        "Memory Game Bonus credited",
        200,
      ]);
        res.status(200).json({
            success: true,
            message: "Question marked as played"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while marking the question as played",
            error: error.message
        });
    }
};
const deductJumbleLifeIfNotPlayed = async (req) => {
    const { userId, questionId } = req.query;
    const { program_type } = req.user;
  
    try {
      // Step 1: Check if the question has already been played by the user in this program
      const [playedData] = await executeQuery(
        `
        SELECT * 
        FROM user_played_questions 
        WHERE user_id = ? AND question_id = ? AND game_type = ? AND program_type = ?;
        `,
        [userId, questionId, "memory_game", program_type]
      );
      console.log("Data  ",playedData)
  
      if (!playedData) {
        // Step 2: Check the current jumble_life of the user
        const [user] = await executeQuery(
          `
          SELECT memory_life 
          FROM users_data 
          WHERE id = ?;
          `,
          [userId]
        );

        console.log("User    ",user)
        if (user && user.memory_life > 0) {
          // Step 3: Deduct 1 from jumble_life
          await executeQuery(
            `
            UPDATE users_data
            SET memory_life = memory_life - 1
            WHERE id = ?;
            `,
            [userId]
          );
  
  
          return {
            success: true,
            message: "memory_life deducted and question logged successfully.",
          };
        } else {
          return {
            success: false,
            message: "Insufficient memory_life.",
          };
        }
      } else {
        return{
          success: false,
          message: "Question already played. No life deducted.",
        };
      }
    } catch (error) {
      console.error("Error in deductJumbleLifeIfNotPlayed:", error);
      return {
        success: false,
        message: "Internal server error.",
      };
    }
  };
exports.getUserLife=async(req,res)=>{
    try {
        const lifeDetuct=await deductJumbleLifeIfNotPlayed(req)

        const {userId}=req.query;
       const data= await executeQuery('SELECT memory_life as life FROM users_data WHERE id = ?',[userId])

       res.status(200).json({
        success: true,
        data: data[0],
        lifeDetuct
    });
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error.message
        });
    }
}

