const { executeQuery } = require("../Db");
const { getAlphabet } = require("../utils/alphabet");


exports.getUnplayedQuestions = async (req, res) => {
        const {  level, day, language = 'english' } = req.query;
        const {userId,program_type}=req.user;
    if (!userId || !level || !day) return res.status(400).json({ message: "Invalid data" });

    try {
        const [user] = await executeQuery(`
            SELECT missing_life
            FROM users_data
            WHERE id = ?;
          `, [userId]);
          console.log(user)
          if (user.missing_life <= 0) {
            // Step 4: Return no life left response
            return res.status(200).json( {
              success: false,
              message: "No life left",
              remainingLife: 0
            });
          }
        // Tier 1: Try to get an UNPLAYED question in the requested language
        const query = `
            SELECT jq.*
            FROM missing_letters jq
            WHERE jq.level = ?
            AND jq.language = ?
            AND jq.day = ?
            AND jq.program_type = ?
            AND NOT EXISTS (
                SELECT 1 FROM user_played_questions upq
                WHERE jq.id = upq.question_id
                AND upq.user_id = ?
                AND upq.game_type = 'missing_letters'
                AND upq.program_type = ?
            )
            LIMIT 1`;

        let [results] = await executeQuery(query, [level, language, day, program_type, userId, program_type]);

        // Tier 2: Fallback to UNPLAYED in English if no matching language question is found
        if ((!results || (Array.isArray(results) && results.length === 0)) && language !== 'english') {
            const fallbackUnplayedQuery = `
                SELECT jq.*
                FROM missing_letters jq
                WHERE jq.level = ?
                AND jq.language = 'english'
                AND jq.day = ?
                AND jq.program_type = ?
                AND NOT EXISTS (
                    SELECT 1 FROM user_played_questions upq
                    WHERE jq.id = upq.question_id
                    AND upq.user_id = ?
                    AND upq.game_type = 'missing_letters'
                    AND upq.program_type = ?
                )
                LIMIT 1`;

            [results] = await executeQuery(fallbackUnplayedQuery, [level, day, program_type, userId, program_type]);
        }

        // Tier 3: If still no unplayed found, get ANY random question in the requested language (Repeat logic)
        if (!results || (Array.isArray(results) && results.length === 0)) {
            const repeatQuery = `
                SELECT * FROM missing_letters 
                WHERE level = ? AND language = ? AND day = ? AND program_type = ?
                ORDER BY RAND() LIMIT 1`;
            [results] = await executeQuery(repeatQuery, [level, language, day, program_type]);
        }

        // Tier 4: Finally, fallback to ANY random question in English if target language is empty
        if ((!results || (Array.isArray(results) && results.length === 0)) && language !== 'english') {
            const repeatFallbackQuery = `
                SELECT * FROM missing_letters 
                WHERE level = ? AND language = 'english' AND day = ? AND program_type = ?
                ORDER BY RAND() LIMIT 1`;
            [results] = await executeQuery(repeatFallbackQuery, [level, day, program_type]);
        }

        // Ensure we finally have a question
        if (!results || (Array.isArray(results) && results.length === 0)) {
            return res.status(200).json({
                success: false,
                message: "No questions found for today"
            });
        }


        const question = Array.isArray(results) ? results[0] : results; // Fetch the first question from the results
        const answer = question?.answer?.toUpperCase(); // Convert the answer to uppercase

        if (!answer) {
            return res.status(400).json({ message: "Invalid answer format" });
        }

        const answerArray = Array.from(answer); // Convert the answer to an array
        const replacedLetters = []; // To store letters replaced by '_'
        
        // Replace 50% of the letters with '_'
        const totalLetters = answerArray.length;
        const numToReplace = Math.floor(totalLetters / 2);
        const replacedIndices = new Set();

        while (replacedIndices.size < numToReplace) {
            const randomIndex = Math.floor(Math.random() * totalLetters); // Pick a random index
            if (answerArray[randomIndex] !== "_" && !replacedIndices.has(randomIndex)) {
                replacedLetters.push(answerArray[randomIndex]); // Keep track of replaced letters
                answerArray[randomIndex] = "_"; // Replace with '_'
                replacedIndices.add(randomIndex); // Mark index as replaced
            }
        }

        const modifiedAnswer = answerArray.join(""); // Recreate the modified answer string

        // Determine the number of letters for each level
        let totalLettersForLevel;
        if (level === "easy") {
            totalLettersForLevel = 54 * 3;
        } else if (level === "medium") {
            totalLettersForLevel = 54 * 2;
        } else if (level === "hard") {
            totalLettersForLevel = 54 * 1;
        }

        // Calculate the count of answer letters (75%) and random letters (25%)
        const replacedLetterCount = Math.floor(totalLettersForLevel * 0.90);
        const randomLetterCount = totalLettersForLevel - replacedLetterCount;

        // Select 75% replaced letters (repeat if necessary)
        const selectedReplacedLetters = [];
        for (let i = 0; i < replacedLetterCount; i++) {
            selectedReplacedLetters.push(replacedLetters[i % replacedLetters.length]);
        }

        // Generate 25% random letters
        const randomLetters = [];
        const alphabet = getAlphabet(language);

        for (let i = 0; i < randomLetterCount; i++) {
            const randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            randomLetters.push(randomChar);
        }

        // Combine and shuffle the letters
        const allLetters = [...selectedReplacedLetters, ...randomLetters];
        allLetters.sort(() => Math.random() - 0.5); // Shuffle the letters

        // Attach the letters array to the response data
        res.status(200).json({
            success: true,
            data: {
                ...question,
                modifiedAnswer,
                lettersArray: allLetters
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving unplayed questions",
            error: error.message
        });
    }
};




// When marking a question as played, first check if it exists in missing_letters:
exports.markQuestionAsPlayed = async (req, res) => {
     const {  questionId, answer, language = 'english' } = req.query;
      const {userId,program_type}=req.user;
    try {
        console.log(userId, questionId, answer);

        // Step 1: Check if question exists and retrieve the correct answer
        const checkQuestionQuery = "SELECT id, answer,day,level FROM missing_letters WHERE id = ?";
        const [question] = await executeQuery(checkQuestionQuery, [questionId]);

        if (!question || question.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Question does not exist"
            });
        }

        // Step 2: Check if the provided answer matches the correct answer
        console.log(answer,"------ ",question?.answer.toUpperCase())
        if (answer.toUpperCase() !==  question.answer.toUpperCase()) {
            return res.status(400).json({
                success: false,
                message: "Incorrect answer"
            });
        }

        // Step 3: Insert into user_played_questions table if answer is correct
        const insertQuery = `
            INSERT IGNORE INTO user_played_questions (user_id, question_id, date_played, level, game_type, day, program_type, language)
            VALUES (?, ?, CURDATE(), ?, 'missing_letters', ?, ?, ?);
        `;
        await executeQuery(insertQuery, [userId, questionId, question?.level, question?.day, program_type, language]);


        //Step 3: Provide reward to the user
        await executeQuery('UPDATE users_data SET token_balance = token_balance + 160 WHERE id = ?', [userId]);
        const passbookQuery =
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
      await executeQuery(passbookQuery, [
        userId,
        "Missing Letter",
        "Missing Letter Bonus credited",
        160,
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
        [userId, questionId, "missing_letters", program_type]
      );
      console.log("Data  ",playedData)
  
      if (!playedData) {
        // Step 2: Check the current jumble_life of the user
        const [user] = await executeQuery(
          `
          SELECT missing_life 
          FROM users_data 
          WHERE id = ?;
          `,
          [userId]
        );

        console.log("User    ",user)
        if (user && user.missing_life > 0) {
          // Step 3: Deduct 1 from jumble_life
          await executeQuery(
            `
            UPDATE users_data
            SET missing_life = missing_life - 1
            WHERE id = ?;
            `,
            [userId]
          );
  
  
          return {
            success: true,
            message: "missing_life  deducted and question logged successfully.",
          };
        } else {
          return {
            success: false,
            message: "Insufficient missing_life.",
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
       const data= await executeQuery('SELECT missing_life as life FROM users_data WHERE id = ?',[userId])

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
