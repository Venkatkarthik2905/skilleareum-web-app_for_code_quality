const { executeQuery } = require("../Db");
const { getAlphabet } = require("../utils/alphabet");


function fisherYatesShuffle(arr) {
    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}



exports.getUnplayedQuestions = async (req, res) => {
  const { level, day, language = "english" } = req.query;
  const { userId, program_type } = req.user;

  console.log("level",level,"day",day,"language",language,"userId",userId,"program_type",program_type);

  if (!userId || !level || !day) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    // -------------------------
    // Check life
    // -------------------------
    const [user] = await executeQuery(
      `SELECT perfectmatch_life FROM users_data WHERE id = ?`,
      [userId]
    );

    if (!user || user.perfectmatch_life <= 0) {
      return res.status(200).json({
        success: false,
        message: "No life left",
        remainingLife: 0,
      });
    }

    // Tier 1: Try to get an UNPLAYED question in the requested language
    const query = `
      SELECT jq.*
      FROM perfect_match jq
      WHERE jq.level = ?
        AND jq.language = ?
        AND jq.day = ?
        AND jq.program_type = ?
        AND NOT EXISTS (
          SELECT 1 FROM user_played_questions upq 
          WHERE jq.id = upq.question_id 
            AND upq.user_id = ?
            AND upq.game_type = 'perfect_match'
            AND upq.program_type = ?
        )
      LIMIT 1
    `;

    let [results] = await executeQuery(query, [
      level,
      language,
      day,
      program_type,
      userId,
      program_type,
    ]);

    // Tier 2: Fallback to UNPLAYED in English if no matching language question is found
    if (
      (!results || (Array.isArray(results) && results.length === 0)) &&
      language !== "english"
    ) {
      const fallbackUnplayedQuery = `
        SELECT jq.*
        FROM perfect_match jq
        WHERE jq.level = ?
          AND jq.language = 'english'
          AND jq.day = ?
          AND jq.program_type = ?
          AND NOT EXISTS (
            SELECT 1 FROM user_played_questions upq 
            WHERE jq.id = upq.question_id 
              AND upq.user_id = ?
              AND upq.game_type = 'perfect_match'
              AND upq.program_type = ?
          )
        LIMIT 1
      `;

      [results] = await executeQuery(fallbackUnplayedQuery, [
        level,
        day,
        program_type,
        userId,
        program_type,
      ]);
    }

    // Tier 3: If still no unplayed found, get ANY random question in the requested language (Repeat logic)
    if (!results || (Array.isArray(results) && results.length === 0)) {
      const repeatQuery = `
        SELECT * FROM perfect_match 
        WHERE level = ? AND language = ? AND day = ? AND program_type = ?
        ORDER BY RAND() LIMIT 1`;
      [results] = await executeQuery(repeatQuery, [level, language, day, program_type]);
    }

    // Tier 4: Finally, fallback to ANY random question in English if target language is empty
    if ((!results || (Array.isArray(results) && results.length === 0)) && language !== "english") {
      const repeatFallbackQuery = `
        SELECT * FROM perfect_match 
        WHERE level = ? AND language = 'english' AND day = ? AND program_type = ?
        ORDER BY RAND() LIMIT 1`;
      [results] = await executeQuery(repeatFallbackQuery, [level, day, program_type]);
    }

    // Ensure we finally have a question
    if (!results || (Array.isArray(results) && results.length === 0)) {
      return res.status(200).json({
        success: false,
        message: "No questions found for today",
      });
    }

    const question = Array.isArray(results) ? results[0] : results;

    if (!question) {
      return res.status(200).json({
        success: false,
        message: "No unplayed questions found",
      });
    }

    // -------------------------
    // Defensive answer check
    // -------------------------
    if (!question.answer || typeof question.answer !== "string") {
      return res.status(500).json({
        success: false,
        message: "Invalid question answer format",
      });
    }

    const answer = question.answer.toUpperCase().trim();
    const answerLetters = answer.split("");
    const alphabet = getAlphabet(language);


    // -------------------------
    // Grid size
    // -------------------------
    let totalTiles;
    if (level === "easy") totalTiles = 162;
    else if (level === "medium") totalTiles = 108;
    else totalTiles = 54;

    // -------------------------
    // Density tuning
    // -------------------------
    let density;
    if (level === "easy") density = 0.90;
    else if (level === "medium") density = 0.90;
    else density = 0.90;

    const targetAnswerTiles = Math.floor(totalTiles * density);
    const minCopiesPerLetter = 4;

    const letters = [];
    const uniqueLetters = [...new Set(answerLetters)];

    const perLetterTarget = Math.max(
      minCopiesPerLetter,
      Math.ceil(targetAnswerTiles / uniqueLetters.length)
    );

    // guarantee each required letter exists many times
    for (const char of uniqueLetters) {
      for (let i = 0; i < perLetterTarget; i++) {
        if (letters.length < targetAnswerTiles) {
          letters.push(char);
        }
      }
    }

    // fill remaining answer tiles
    while (letters.length < targetAnswerTiles) {
      letters.push(
        answerLetters[Math.floor(Math.random() * answerLetters.length)]
      );
    }

    // controlled noise
    const answerSet = new Set(answerLetters);

    while (letters.length < totalTiles) {
      let randomChar;
      do {
        randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      } while (answerSet.has(randomChar) && Math.random() < 0.65);

      letters.push(randomChar);
    }

    // balanced shuffle (CRITICAL)
    function balancedShuffle(arr, bucketSize = 12) {
      const shuffled = fisherYatesShuffle(arr);
      const result = [];

      for (let i = 0; i < shuffled.length; i += bucketSize) {
        const chunk = shuffled.slice(i, i + bucketSize);
        result.push(...fisherYatesShuffle(chunk));
      }

      return result;
    }

    const shuffledLetters = balancedShuffle(
      letters,
      Math.max(10, answerLetters.length * 2)
    );

    return res.status(200).json({
      success: true,
      data: {
        ...question,
        lettersArray: shuffledLetters,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getUnplayedQuestions_old = async (req, res) => {
      const {  level,language,day } = req.query;
          const {userId,program_type}=req.user;

    if (!userId || !level || !day) return res.status(400).json({ message: "Invalid data" });

    try {
        const [user] = await executeQuery(`
            SELECT perfectmatch_life
            FROM users_data 
            WHERE id = ?;
          `, [userId]);
          
          if (user.perfectmatch_life <= 0) {
            
            // Step 4: Return no life left response
            return res.status(200).json( { 
              success: false, 
              message: "No life left", 
              remainingLife: 0 
            });
          }
        // Query to get the unplayed question for the specified level
        const query = `
        SELECT jq.*
        FROM perfect_match jq
        LEFT JOIN user_played_questions upq 
            ON jq.id = upq.question_id 
            AND upq.user_id = ? 
            
            AND upq.game_type = 'perfect_match' 
            AND upq.level = ?
            AND upq.program_type = ?
         WHERE upq.question_id IS NULL 
                   AND jq.level = ?
                   AND jq.language = ?
                   AND jq.day = ?
                   AND jq.program_type = ?`;  // Filter by language
               
               const [results] = await executeQuery(query, [userId, level,program_type, level, language,day,program_type]);
       
        // Ensure we have an unplayed question
        if (!results) {
            return res.status(200).json({
                success: false,
                message: "No unplayed questions found for today"
            });
        }
       
console.log(results)
        const question = results; // Fetch the question from the results
        const answer = question?.answer?.toUpperCase();  // Convert the answer to uppercase
        const answerLetters = answer?.split('');        // Convert answer to an array of letters

        // Determine the number of letters for each level
        let totalLetters;
        if (level === "easy") {
            totalLetters = 54 * 3;
        } else if (level === "medium") {
            totalLetters = 54 * 2;
        } else if (level === "hard") {
            totalLetters = 54 * 1;
        }

        // Calculate the count of answer letters (75%) and random letters (25%)
        const answerLetterCount = Math.floor(totalLetters * 0.75);
        const randomLetterCount = totalLetters - answerLetterCount;

        // Select 75% answer letters (repeat if necessary)
        const selectedAnswerLetters = [];
        for (let i = 0; i < answerLetterCount; i++) {
            selectedAnswerLetters.push(answerLetters[i % answerLetters?.length]);
        }

        // Generate 25% random letters
        const randomLetters = [];
        const alphabet = getAlphabet(language);

        for (let i = 0; i < randomLetterCount; i++) {
            const randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            randomLetters.push(randomChar);
        }

        // Combine and shuffle the letters
        const allLetters = [...selectedAnswerLetters, ...randomLetters];
        allLetters.sort(() => Math.random() - 0.5); // Shuffle the letters
        console.log(allLetters.length)
        // Attach the letters array to the response data
        res.status(200).json({
            success: true,
            data: {
                ...question,
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



// When marking a question as played, first check if it exists in perfect_match:
exports.markQuestionAsPlayed = async (req, res) => {
      const {  questionId, answer } = req.query;
      const {userId,program_type}=req.user;
    try {
        console.log(userId, questionId, answer);
        
        // Step 1: Check if question exists and retrieve the correct answer
        const checkQuestionQuery = "SELECT id, answer,level,day FROM perfect_match WHERE id = ?";
        const [question] = await executeQuery(checkQuestionQuery, [questionId]);

        if (!question || question.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Question does not exist"
            });
        }
        console.log(question)

        // Step 2: Check if the provided answer matches the correct answer
        if (answer.toUpperCase() !== question.answer.toUpperCase()) {
            return res.status(400).json({
                success: false,
                message: "Incorrect answer"
            });
        }

        // Step 3: Insert into user_played_questions table if answer is correct
        const insertQuery = `
            INSERT IGNORE INTO user_played_questions (user_id, question_id,date_played,level,game_type,day,program_type)
            VALUES (?, ?, CURDATE(),?,?,?,?);
        `;
        await executeQuery(insertQuery, [userId, questionId,question?.level,"perfect_match",question?.day,program_type]);


        //Step 3: Provide reward to the user
        await executeQuery('UPDATE users_data SET token_balance = token_balance + 200 WHERE id = ?', [userId]);
        const passbookQuery =
        "INSERT INTO passbook (user_id, action, description, amount) VALUES (?,?, ?, ?)";
      await executeQuery(passbookQuery, [
        userId,
        "Perfect Match",
        "Perfect MatchBonus credited",
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
        [userId, questionId, "perfect_match", program_type]
      );
      console.log("Data  ",playedData)
  
      if (!playedData) {
        // Step 2: Check the current jumble_life of the user
        const [user] = await executeQuery(
          `
          SELECT perfectmatch_life 
          FROM users_data 
          WHERE id = ?;
          `,
          [userId]
        );

        console.log("User    ",user)
        if (user && user.perfectmatch_life > 0) {
          // Step 3: Deduct 1 from jumble_life
          await executeQuery(
            `
            UPDATE users_data
            SET perfectmatch_life = perfectmatch_life - 1
            WHERE id = ?;
            `,
            [userId]
          );
  
  
          return {
            success: true,
            message: "perfectmatch_life deducted and question logged successfully.",
          };
        } else {
          return {
            success: false,
            message: "Insufficient perfectmatch_life.",
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
       const data= await executeQuery('SELECT perfectmatch_life as life FROM users_data WHERE id = ?',[userId])

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

