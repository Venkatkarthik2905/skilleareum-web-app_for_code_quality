            -- Table alteration data

ALTER TABLE ai_facts ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE ai_blogs ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE ai_learning ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE ai_learning_assessments ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE ai_space_mission ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE emoji_games ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE perfect_match ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE missing_letters ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE memory_game ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE jumbled_words ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
  ALTER TABLE ai_learning_progress DROP FOREIGN KEY ai_learning_progress_ibfk_2;
ALTER TABLE ai_learning DROP INDEX day;
ALTER TABLE ai_learning ADD UNIQUE INDEX unique_day_program_type (day, program_type);
ALTER TABLE jumbled_words DROP INDEX unique_day_level_lang;
ALTER TABLE perfect_match DROP INDEX unique_day_level_lang;
ALTER TABLE missing_letters DROP INDEX unique_day_level_lang;
ALTER TABLE user_ai_mission_progress DROP INDEX user_id;
ALTER TABLE ai_learning_progress ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE user_emoji_progress ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE user_ai_blog_progress ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE user_played_questions ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE user_ai_mission_progress ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE aifact_user_visit ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE rewards ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE answer_set ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE question_banks ADD COLUMN program_type ENUM('apprentice', 'genesis') DEFAULT 'apprentice';
ALTER TABLE users_data ADD COLUMN current_program ENUM('apprentice', 'genesis') DEFAULT 'apprentice';


  
            -- DATA TO INSERT (UPLOADED till day=4)
            -- DAY=1

 INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'In 1959, Arthur Samuel coined the term "Machine Learning" while developing a program that learned to play checkers better than its creator.',
  'Netflix saves over $1 billion a year using machine learning to recommend shows users are likely to watch.',
  'Machine learning will power autonomous AI agents that can learn and adapt in real time without human input.',
  'Google’s Gemini AI models integrate advanced machine learning for multimodal tasks across text, images, and code.',
  1,
  'genesis'
);



INSERT INTO ai_blogs (
  day, image_url, title, explanation, examples, fun_fact, program_type
) VALUES (
  1,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/BlogDay8.png',
  'What is Machine Learning and How It Impacts Everyday Life',
  '<p>Have you ever noticed how your phone learns to autocomplete your texts or how spam emails get filtered automatically? That’s <strong>machine learning</strong> at work!</p>

  <p><strong>Machine learning (ML)</strong> is a part of Artificial Intelligence where computers are trained to learn from data—just like humans learn from experience. Instead of being told exactly what to do, machines look at patterns in data and make their own decisions.</p>

  <p>Imagine teaching a computer to recognize pictures of cats. You don’t give it a step-by-step guide; you show it thousands of cat pictures, and it learns what a cat looks like. That’s ML!</p>

  <p>Machine learning helps in facial recognition, language translation, fraud detection, and even self-driving cars. It’s making our digital world smarter every day.</p>',
  
  '<ul>
    <li><strong>Email Spam Filters:</strong> Learn what looks like spam and filter it out.</li>
    <li><strong>Voice Assistants:</strong> Like Siri or Alexa get better with use by learning your speech patterns.</li>
    <li><strong>E-commerce:</strong> Sites like Amazon recommend products based on your shopping behavior.</li>
  </ul>',

  'Machine learning can even help doctors detect diseases from X-rays faster than a human doctor in some cases!',

  'genesis'
);





INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  'Machine Learning',
  'Training computers to learn from data and improve their performance over time without being explicitly programmed. Machine learning is used in spam detection, voice recognition, recommendation systems, and predictive analytics.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai_Learning_Day_8.mp4',
  1,
  'genesis'
);

  INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  1,
  'What is machine learning?',
  'A set of rules programmed by humans',
  'Computers learning from data and experience',
  'A type of hardware for computers',
  'Programming languages for AI',
  'B',
  'genesis'
),
(
  1,
  'Which of the following is NOT an example of machine learning in daily life?',
  'Email spam filtering',
  'Voice assistants like Siri or Alexa',
  'Watching a movie on TV',
  'Product recommendations on Amazon',
  'C',
  'genesis'
),
(
  1,
  'How do machines learn in machine learning?',
  'By following fixed instructions step-by-step',
  'By analyzing patterns in large amounts of data',
  'By guessing randomly',
  'By asking humans for answers every time',
  'B',
  'genesis'
),
(
  1,
  'What is a common application of machine learning in healthcare?',
  'Printing prescriptions',
  'Diagnosing diseases from X-rays',
  'Scheduling appointments manually',
  'Filing patient paperwork',
  'B',
  'genesis'
);

   -- AI SPACE MISSIONS
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  1,
  'Train Your First Machine Learning Model',
  'Image Generation and Editing',
  'Photopea',
  'Use Photopea to train a simple image classification model. Upload images of two categories (e.g., cats and dogs), train the model, and test it by showing new images.\n\nObserve how the model learns from the examples you provided. Write a short summary explaining how the model identifies different images based on the training data.\n\nEarn 50 Skill Points for completing this mission successfully.',
  'https://www.photopea.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/icon512.png',
  'genesis'
);




    --EMOJI GAME

INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
(
  1,
  1,
  '🤖',
  '📈',
  '🧠',
  'Machine Learning',
  'Data Entry',
  'Cloud Computing',
  'Software Testing',
  'a',
  'Teaching computers 🤖 to learn from data 📈 and improve automatically using algorithms 🧠.',
  'Voice assistants like Siri get better at understanding you over time with machine learning.',
  'genesis'
),
(
  1,
  2,
  '🐱',
  '🖼️',
  '📊',
  'Image Classification',
  'Text Translation',
  'Speech Synthesis',
  'Data Backup',
  'a',
  'Using machine learning to recognize and categorize images 🐱🖼️ by analyzing patterns in data 📊.',
  'Facebook automatically tagging friends in photos using image classification models.',
  'genesis'
);



               -- JUMBLE WORD

INSERT INTO jumbled_words (
  day,
  level ,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language ,
  program_type
) VALUES (
  1,
  'easy',
  'What do we call the process where computers learn patterns from data?',
  'Machine learning lets computers improve by finding patterns in data without explicit programming.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/JumbledEasy1.png',
  'LEARNING',
  'Machine Learning is a method where computers learn from data and improve their performance automatically.',
  'english',
  'genesis'
);


INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'medium',
  'What do you call the step where important information is selected from raw data to help a machine learn better?',
  'Feature extraction identifies key parts of data, helping the machine focus on useful signals.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/JumbledMed1.png',
  'FEATURE',
  'Feature Extraction is the process of selecting and transforming relevant data attributes for better machine learning results.',
  'english',
  'genesis'
);

INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'hard',
  'What is the term for a type of machine learning that learns by trial and error through rewards and penalties?',
  'Reinforcement learning uses feedback from actions to learn the best strategy in dynamic environments.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/JumbledHard1.png',
  'REINFORCEMENT',
  'Reinforcement Learning is a machine learning approach where agents learn to make decisions by receiving rewards or penalties.',
  'english',
  'genesis'
);


-- MISSING LETTERS
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'easy',
  'What is the term for machines improving their performance by learning from experience and data?',
  'Machine learning is about computers getting better at tasks by recognizing patterns in data without explicit instructions.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MissingletterEasy1.png',
  'LEARNING',
  'AI Definition: Learning lets machines improve automatically by analyzing data and past results.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'medium',
  'What process helps reduce the number of data inputs by choosing only the most useful information for training?',
  'Dimensionality reduction simplifies data to improve machine learning efficiency and reduce noise.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MissingletterMed1.png',
  'REDUCTION',
  'AI Definition: Dimensionality reduction helps focus on the most important data features for better learning.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'hard',
  'Which method involves models that mimic the human brain’s neural connections to solve complex problems?',
  'Neural networks consist of layers of interconnected nodes that process data in sophisticated ways for tasks like image recognition.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MissingletterHard1.png',
  'NEURAL',
  'AI Definition: Neural networks simulate brain neurons to enable deep learning and complex pattern recognition.',
  'english',
  'genesis'
);

-- PERFECT MATCH
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'easy',
  'What is the term for the process where a machine uses examples to predict outcomes on new data?',
  'Supervised learning trains models using labeled examples to make predictions on unseen data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/PerfectMatchEasy1.png',
  'SUPERVISED',
  'Supervised learning involves training a model on labeled data so it can predict outputs for new inputs.',
  'english',
  'genesis'
);

INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'medium',
  'What do you call the technique that groups similar data points together without predefined labels?',
  'Clustering finds natural groupings in data, useful in market segmentation or image analysis.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/PerfectMatchMed1.png',
  'CLUSTERING',
  'Clustering is an unsupervised learning technique that organizes data into meaningful groups.',
  'english',
  'genesis'
);

INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  1,
  'hard',
  'What is the name of the technique used to reduce the number of input variables while retaining important information?',
  'Dimensionality reduction helps simplify complex datasets and improves model efficiency.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/PerfectMatchHard1.png',
  'PCA',
  'Principal Component Analysis (PCA) is a popular dimensionality reduction method that transforms features into fewer uncorrelated variables.',
  'english',
  'genesis'
);


-- MEMORY GAME

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  1,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryEasy6.png" }
  ]',
  'This memory game helps players recognize and match AI-related images, enhancing visual recall and pattern recognition skills.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  1,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryMed8.png" }
  ]',
  'This medium-level memory challenge improves attention to detail and memory retention using AI-themed visual pairs.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  1,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/MemoryHard10.png" }
  ]',
  'This advanced memory game challenges users with a larger set of AI-related images, boosting cognitive focus and long-term retention.',
  'genesis'
);



--AI SKILL QUEST

INSERT INTO question_banks (
  DAY,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES
-- Question 1
(1, 'options', 
 'What is the main goal of machine learning?', 
 'To write code manually for every task', 
 'To let machines learn patterns from data', 
 'To replace all human jobs immediately', 
 'To store large amounts of data only', 
 'To let machines learn patterns from data', 
 30,
 'genesis'),

-- Question 2
(1, 'options', 
 'Which of the following is an example of supervised learning?', 
 'Teaching a model with labeled images of cats and dogs', 
 'Randomly guessing answers', 
 'Learning without any data', 
 'Using data with no clear outcome', 
 'Teaching a model with labeled images of cats and dogs', 
 30,
 'genesis'),

-- Question 3
(1, 'options', 
 'What is overfitting in machine learning?', 
 'When the model performs well on training data but poorly on new data', 
 'When the model learns too slowly', 
 'When the model ignores all data', 
 'When the model is trained on too little data', 
 'When the model performs well on training data but poorly on new data', 
 30,
 'genesis'),

-- Question 4
(1, 'options', 
 'What is the role of a training dataset in machine learning?', 
 'To test the model’s accuracy', 
 'To teach the model patterns and features', 
 'To delete unwanted data', 
 'To evaluate user satisfaction', 
 'To teach the model patterns and features', 
 30,
 'genesis');







                                                                     --DAY=2






INSERT INTO ai_blogs (
  day, image_url, title, explanation, examples, fun_fact, program_type
) VALUES (
  2,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay9.png ',
  'What is Deep Learning and Why It’s a Game Changer',
  '<p>Have you ever wondered how your phone can unlock just by looking at your face? Or how YouTube recommends the next perfect video? That’s <strong>deep learning</strong> at work!</p>

  <p><strong>Deep Learning</strong> is a special kind of machine learning. It mimics how the human brain works—using something called <em>neural networks</em>—to learn from massive amounts of data.</p>

  <p>Think of it like this: If machine learning is teaching a computer to recognize a cat with a few steps, deep learning is like giving the computer super-vision to see tiny details—fur, eyes, ears—and figure out it\'s a cat, even in tricky photos.</p>

  <p>Deep learning powers amazing tech like face recognition, chatbots, smart translators, and even driverless cars. It’s behind the scenes, making machines understand the world more like humans do.</p>',
  
  '<ul>
    <li><strong>Face ID Unlocking:</strong> Your phone uses deep learning to recognize your unique face, even with glasses or a new haircut!</li>
    <li><strong>Virtual Assistants:</strong> Chatbots use deep learning to understand and reply like humans.</li>
    <li><strong>Self-Driving Cars:</strong> These vehicles use deep learning to detect traffic signs, pedestrians, and other cars in real-time.</li>
  </ul>',

  'The term "deep learning" was first coined in 1986, but it wasn’t until the 2010s—thanks to big data and powerful GPUs—that it truly started changing the world.',

  'genesis'
);



  INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
 
  'The concept of deep learning dates back to the 1980s, but it became powerful only after computers got fast enough and data became huge in the 2010s.',
  'Deep learning models like GPT and DALL·E can generate text and images that look like they were made by humans!',
  'In the future, deep learning will help create fully autonomous machines that can think, learn, and interact just like humans.',
  'OpenAI’s GPT-4o and Google’s Gemini rely on deep learning to handle complex tasks across text, speech, images, and even emotions.',
  2,
  'genesis'
);


-- Insert for Day 2 Topic
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  'Deep Learning',
  'A subset of machine learning that uses artificial neural networks with many layers (hence “deep”) to process and learn from massive amounts of data. Deep learning powers technologies like facial recognition, language translation, and self-driving cars by mimicking how the human brain learns and makes decisions.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+9+(What+is+Deep+Learning).mp4',
  2,
  'genesis'
);

-- Insert assessments for Day 2
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  2,
  'What is Deep Learning?',
  'A way to build physical robots',
  'A programming language for AI',
  'A subset of machine learning using layered neural networks',
  'A tool to write AI code',
  'C',
  'genesis'
),
(
  2,
  'Which of the following is a key feature of deep learning?',
  'Pre-programmed decision trees',
  'Shallow learning from small data sets',
  'Use of neural networks with multiple layers',
  'Manual rule-based systems',
  'C',
  'genesis'
),
(
  2,
  'Which real-world application uses deep learning?',
  'Internet search history',
  'Calendar syncing',
  'Face recognition on smartphones',
  'Manual email replies',
  'C',
  'genesis'
),
(
  2,
  'Why is it called “deep” learning?',
  'Because it uses deep sea data',
  'Because it requires deep thinking',
  'Because it involves deep storage devices',
  'Because it uses multiple layers in neural networks',
  'D',
  'genesis'
);


INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  2,
  'Explore Visual Patterns with Deep Learning',
  'Image Generation and Editing',
  'Pine Tools',
  'Use Pine Tools to create or edit images of two or more visual categories (e.g., animals vs. fruits, smiling vs. neutral faces).\n\nSelect tools like Image Splitter, Brightness Adjustment, or Overlay Text from Pine Tools to prepare a custom dataset.\n\nCreate 2–3 image sets with obvious visual differences (e.g., different shapes, colours, or patterns).\n\nSave and label the images clearly.\n\nUpload them into Google Teachable Machine or TensorFlow Playground and train a classifier model.\n\n📌 Final Task:\nWrite a short summary explaining:\n\n🧠 How the neural network detected differences in the edited images\n📈 How model accuracy changed after training\n🧐 How the final predictions were made based on the features you created\n\n🏅 Earn 50 Skill Points for completing the mission and submitting your visual experiment summary!',
  'https://pinetools.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/pinetools.webp',
  'genesis'
);



INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
(
  2,
  1,
  '🧠',
  '🧬',
  '🔍',
  'Deep Learning',
  'Data Analysis',
  'Algorithm Testing',
  'Web Development',
  'a',
  'Mimicking the brain 🧠 using neural networks 🧬 to analyse complex patterns 🔍 in large data sets.',
  'Self-driving cars use deep learning to identify roads, pedestrians, and signs in real time.',
  'genesis'
),
(
  2,
  2,
  '👁️',
  '📷',
  '🧠',
  'Image Recognition',
  'Speech Synthesis',
  'Data Collection',
  'Spam Filtering',
  'a',
  'Deep learning helps machines "see" 👁️ and understand photos 📷 using neural networks 🧠.',
  'Your phone unlocking with Face ID uses deep learning for image recognition.',
  'genesis'
),
(
  2,
  3,
  '🎧',
  '🗣️',
  '🧠',
  'Audio Engineering',
  'Speech Recognition',
  'Video Editing',
  'Manual Translation',
  'b',
  'Deep learning is used in recognizing speech 🗣️ from audio 🎧 by mimicking brain functions 🧠.',
  'Virtual assistants like Alexa understand your voice using deep learning speech models.',
  'genesis'
);


-- Day 2 - Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'easy',
  'What do we call the special type of neural network used in deep learning to process images?',
  'These networks are great at recognising patterns in visual data, like shapes and colours.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn61.png',
  'CONVOLUTION',
  'Convolutional Neural Network (CNN): A type of deep learning model designed to analyse visual images by mimicking how the brain processes visual input.',
  'english',
  'genesis'
);

-- Day 2 - Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'medium',
  'What do we call the deep learning technique where models are trained with massive data but no labels?',
  'This helps the model learn patterns and features from raw data without human guidance.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn62.png',
  'UNSUPERVISED',
  'Unsupervised Learning: A learning method where the model finds hidden patterns or groupings in unlabeled data.',
  'english',
  'genesis'
);

-- Day 2 - Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'hard',
  'What is the name of the multi-layer architecture used in most deep learning models today?',
  'This architecture allows information to flow across many layers, capturing deep features of the data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn63.png',
  'TRANSFORMER',
  'Transformer Architecture: A deep learning model architecture designed for handling sequential data, used in models like GPT and BERT.',
  'english',
  'genesis'
);



-- Day 2 - Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'easy',
  'What is the term for a model with multiple layers that can learn complex patterns from data?',
  'These models allow AI to go beyond basic learning and understand deeper, more abstract features.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn67.png',
  'DEEP',
  'AI Definition: Deep learning uses many layers of neural networks to detect complex patterns in data like images or language.',
  'english',
  'genesis'
);

-- Day 2 - Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'medium',
  'What word describes the model type that imitates how human brains work, using layers of connected nodes?',
  'These are at the core of deep learning, designed to process data like our neurons do.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn68.png',
  'NEURAL',
  'AI Definition: Neural models simulate the brain’s structure to process and learn from complex data in deep learning systems.',
  'english',
  'genesis'
);

-- Day 2 - Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'hard',
  'What architecture has replaced older RNN models and now powers modern AI tools like GPT and Gemini?',
  'It uses attention layers to process sequences more efficiently, even in very large data sets.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn69.png',
  'TRANSFORMER',
  'AI Definition: Transformer models have revolutionized deep learning by enabling fast, parallel processing for tasks like translation, summarisation, and image understanding.',
  'english',
  'genesis'
);



-- Day 2 - Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'easy',
  'What do we call the type of neural network often used in image recognition tasks?',
  'These networks can detect patterns like edges, textures, and objects in visual data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn64.png',
  'CNN',
  'Convolutional Neural Networks (CNN): A deep learning model architecture highly effective for processing and classifying images.',
  'english',
  'genesis'
);

-- Day 2 - Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'medium',
  'Which type of neural network is best for processing sequential data like text or speech?',
  'These networks retain memory of previous inputs, making them ideal for language-related tasks.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn65.png',
  'RNN',
  'Recurrent Neural Networks (RNN): A deep learning model that uses loops to remember past inputs when making predictions about sequences.',
  'english',
  'genesis'
);

-- Day 2 - Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  2,
  'hard',
  'What do we call the advanced architecture that replaced RNNs in most deep learning applications today?',
  'It uses attention mechanisms to process entire sequences at once, enabling faster and more accurate results.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/TaptoLearn/Taptolearn66.png',
  'TRANSFORMER',
  'Transformer: A deep learning model architecture revolutionising NLP and computer vision by enabling parallel processing of sequence data.',
  'english',
  'genesis'
);



INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  2,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy1.jpg" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy1.jpg" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy3.jpg" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy3.jpg" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy4.jpg" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy4.jpg" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy6.png" }
  ]',
  'This Day 2 memory game introduces deep learning visuals to help players improve recognition and association of neural concepts.',
  'genesis'
);


INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  2,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed1.jpg" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed1.jpg" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemMed8.png" }
  ]',
  'This memory game deepens understanding of deep learning icons, boosting pattern recognition and memory accuracy.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  2,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard1.jpg" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard1.jpg" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard2.jpg" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard2.jpg" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard3.jpg" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard3.jpg" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard4.jpg" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard4.jpg" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard5.jpg" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard5.jpg" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard6.jpg" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard6.jpg" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard7.jpg" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard7.jpg" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard8.jpg" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard8.jpg" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard9.jpg" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard9.jpg" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard10.jpg" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/day9MemHard10.jpg" }
  ]',
  'This hard-level memory game engages users with intricate deep learning visuals, testing memory precision and cognitive speed.',
  'genesis'
);




INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES
-- Question 1
(2, 'options',
 'What is deep learning mostly based on?',
 'Decision trees',
 'Handwritten logic rules',
 'Neural networks with many layers',
 'Data backups',
 'Neural networks with many layers',
 30,
 'genesis'),

-- Question 2
(2, 'options',
 'What is a CNN mostly used for?',
 'Image recognition',
 'Spreadsheet automation',
 'Translating legal documents manually',
 'None of the above',
 'Image recognition',
 30,
 'genesis'),

-- Question 3
(2, 'options',
 'What makes a deep learning model "deep"?',
 'Use of big screens',
 'Having many layers of neurons',
 'Human programming',
 'Fast typing skills',
 'Having many layers of neurons',
 30,
 'genesis'),

-- Question 4
(2, 'options',
 'Which of the following is a deep learning application?',
 'Face recognition',
 'Manual data entry',
 'Coding in HTML',
 'Email forwarding',
 'Face recognition',
 30,
 'genesis'
 );



                                                                 --DAY=3





INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  3,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay10.png',
  'Supervised Learning: How AI Learns with Answers',
  '<p>Have you ever thought about how your email app knows which messages are spam? Or how Netflix recommends movies based on what you like?</p>
  <p>The magic behind this is <strong>Supervised Learning</strong> – one of the most widely used methods in artificial intelligence.</p>
  <p>In simple terms, supervised learning is like teaching a student using a textbook with answers. We give the AI both the input (like a photo or email) and the correct output (like “cat” or “spam”), and the AI learns the pattern. Over time, it gets better at predicting the output for new, unseen inputs.</p>
  <p>This technique helps machines understand labeled data to make smart decisions and predictions.</p>',
  '<ul>
    <li><strong>Spam Detection:</strong> Email systems like Gmail use supervised learning to flag unwanted messages.</li>
    <li><strong>Face Unlock:</strong> Your phone learns to recognize your face by training on labeled images of you.</li>
    <li><strong>Recommendation Systems:</strong> Netflix and Spotify use past ratings (input) and user preferences (output) to suggest content you’ll love.</li>
  </ul>',
  'Supervised learning works like giving AI the questions and the correct answers — and it learns to solve similar questions on its own!',
  'genesis'
);



INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'In the 1950s, the first perceptron algorithm was introduced as a foundational model for supervised learning. It could classify inputs based on learned labels.',
  'Some AI systems today are trained on billions of labeled examples—from cats to cancer cells!',
  'Supervised Learning will be enhanced with synthetic data and AI-labeled datasets to overcome the need for expensive human labeling.',
  'OpenAI, Google, and Meta use supervised learning to fine-tune language and vision models, improving their real-world accuracy.',
  3,
  'genesis'
);



-- Insert for Day 3 Topic
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  'Supervised Learning',
  'A machine learning technique where models are trained on labeled data—where each input has a corresponding correct output. It helps AI systems learn to predict or classify new data. Common use cases include spam detection, facial recognition, and medical diagnosis.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+10+(Supervision+learning).mp4',
  3,
  'genesis'
);

-- Insert assessments for Day 3
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  3,
  'What is Supervised Learning?',
  'A method that uses unlabeled data only',
  'A method that requires no data',
  'A method that learns from labeled input-output pairs',
  'A method to program robots',
  'C',
  'genesis'
),
(
  3,
  'Which is a real-world example of Supervised Learning?',
  'Writing emails manually',
  'Identifying spam emails',
  'Searching on Google',
  'Changing fonts in Word',
  'B',
  'genesis'
),
(
  3,
  'What is labeled data?',
  'Data collected from social media',
  'Data with correct answers provided',
  'Data that is anonymous',
  'Data stored in a library',
  'B',
  'genesis'
),
(
  3,
  'Why is Supervised Learning effective?',
  'It can think like a human',
  'It creates data automatically',
  'It learns patterns from examples with known outcomes',
  'It doesn’t require training',
  'C',
  'genesis'
);


INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  3,
  'Prepare and Augment Labeled Image Data',
  'Image Editing & Dataset Preparation',
  'Photopea',
  'Visit Photopea and create image data for two labeled categories.\n\nDesign or edit images for 2 different classes. For example:\n“Circle” vs. “Square” or “Red Object” vs. “Blue Object”.\n\nCreate or modify at least 10–15 images per category. Use tools in Photopea to:\n- Crop and resize images for consistency\n- Add or remove backgrounds\n- Apply filters, adjust brightness, or change color tones\n\nSave each image with a clear filename indicating its label (e.g., Circle_01.jpg, Square_02.jpg).\n\nThen, observe how image changes (e.g., lighting or background) could affect how well a machine learning model might classify them when used in tools like Teachable Machine.\n\n📌 Final Task:\nWrite a short summary explaining:\n- How the model learned to recognize the difference between the two categories\n- How the accuracy changed with more or better-quality images\n- What the model struggled with (e.g., misclassifying similar items)\n\n🏅 Earn 50 Skill Points for completing the experiment and submitting your summary!',
  'https://www.photopea.com',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/icon512.png',
  'genesis'
);


INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
(
  3,
  1,
  '🧑‍🏫',
  '🏷️',
  '🧠',
  'Supervised Learning',
  'Web Development',
  'Data Scraping',
  'Clustering',
  'a',
  'Just like a teacher 🧑‍🏫 guides students with answers 🏷️, supervised learning teaches models to learn patterns 🧠 from labeled data.',
  'Email spam filters are trained on messages marked as spam or not spam.',
  'genesis'
),
(
  3,
  2,
  '🧪',
  '📊',
  '🎯',
  'Testing Phase',
  'Model Evaluation',
  'Unsupervised Clustering',
  'Random Prediction',
  'b',
  'After training, the model is tested 📊 on unseen data 🧪 to measure how close it is to the expected output 🎯.',
  'Testing a trained image classifier on new photos.',
  'genesis'
),
(
  3,
  3,
  '🤖',
  '🧠',
  '🏷️',
  'Reinforcement Learning',
  'Unsupervised Learning',
  'Classification',
  'Self-Supervised',
  'c',
  'Supervised learning is often used to classify data 🤖 by learning from labeled examples 🏷️ and generalizing with intelligence 🧠.',
  'Classifying handwritten digits (0–9) using the MNIST dataset.',
  'genesis'
);


-- Day 3 - Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'easy',
  'Unscramble the word: L E B A L',
  'This is the known output provided to a model during training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10JumbledEasy.png',
  'LABEL',
  'Labels are the actual answers used to train a supervised learning model, guiding it to learn correct outputs from inputs.',
  'english',
  'genesis'
);

-- Day 3 - Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'medium',
  'Unscramble the word: S E T T S E T',
  'This is the data used to evaluate how well a trained model performs.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10JumbledMed.png',
  'TESTSET',
  'A test set is a separate dataset from training data that assesses how well the model has generalized and learned.',
  'english',
  'genesis'
);

-- Day 3 - Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'hard',
  'Unscramble the word: R O P S U I V E D S',
  'This is the type of learning where labeled data is used to train the model.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10JumbledHard.png',
  'SUPERVISED',
  'Supervised learning uses labeled data to teach models to predict outputs based on given inputs.',
  'english',
  'genesis'
);




-- Day 3 - Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'easy',
  'Which model is best for binary classification tasks like spam vs. not spam?',
  'It’s a statistical method used when the target variable is binary.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10PerfectMatchEasy.png',
  'Logistic Regression',
  'Logistic Regression estimates the probability of a binary outcome using a logistic function.',
  'english',
  'genesis'
);

-- Day 3 - Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'medium',
  'What algorithm combines multiple decision trees to increase accuracy?',
  'It reduces overfitting by aggregating multiple trees.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10PerfectMatchMed.png',
  'Random Forest',
  'Random Forest is an ensemble method that uses many decision trees and combines their predictions for better accuracy.',
  'english',
  'genesis'
);

-- Day 3 - Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'hard',
  'Which algorithm finds the best boundary to separate different classes?',
  'It works by identifying a hyperplane that maximizes the margin between data classes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10PerfectMatchHard.png',
  'Support Vector Machine (SVM)',
  'SVMs classify data by finding the optimal decision boundary (or hyperplane) that best separates classes.',
  'english',
  'genesis'
);


-- Day 3 - Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'easy',
  'What kind of data contains both inputs and outputs? (_ A _ E _ E _)',
  'This kind of data is used in supervised learning, where each input is paired with the correct output.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MissingEasy.png',
  'LABELED',
  'Labeled data is essential for supervised learning as it allows models to learn from known outcomes.',
  'english',
  'genesis'
);

-- Day 3 - Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'medium',
  'A task where the model learns to assign categories. (_ L _ S _ _ _ _ _ _ _ N)',
  'Supervised learning models often perform this task to group data into specific labeled classes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MissingMed.png',
  'CLASSIFICATION',
  'Classification is a core task in supervised learning, where data is assigned to predefined categories.',
  'english',
  'genesis'
);

-- Day 3 - Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  3,
  'hard',
  'A supervised learning algorithm for numeric prediction. (_ E _ _ _ _ _ _ _)',
  'This algorithm is used when the output variable is a continuous numeric value.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MissingHard.png',
  'REGRESSION',
  'Regression helps predict continuous outcomes like prices, temperatures, or scores based on input features.',
  'english',
  'genesis'
);




INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  3,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day9MemEasy6.png" }
  ]',
  'Match supervised learning visuals and concepts. This game builds early familiarity with AI classification elements.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  3,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemMed8.png" }
  ]',
  'Players strengthen their understanding of supervised learning categories and relationships through engaging visual pairs.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  3,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard10.png" }
  ]',
  'Challenge your memory and knowledge of supervised learning models, tools, and concepts with this advanced matching game.',
  'genesis'
);



INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(3, 'options',
 'What does supervised learning require to train a model?',
 'Random data',
 'Human feedback',
 'Labeled data',
 'Reinforcement',
 'Labeled data',
 30,
 'genesis'),

-- Question 2
(3, 'options',
 'Which of the following is a classification problem?',
 'Predicting weather temperature',
 'Categorizing emails as spam or not spam',
 'Estimating house prices',
 'Calculating monthly expenses',
 'Categorizing emails as spam or not spam',
 30,
 'genesis'),

-- Question 3
(3, 'options',
 'What is the goal of regression in supervised learning?',
 'Predicting categories',
 'Finding patterns',
 'Predicting numerical values',
 'Grouping similar items',
 'Predicting numerical values',
 30,
 'genesis'),

-- Question 4
(3, 'options',
 'Which algorithm is commonly used for classification tasks?',
 'Linear Regression',
 'Decision Tree',
 'K-Means Clustering',
 'PCA',
 'Decision Tree',
 30,
 'genesis'
 );




                                      --DAY=4


INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  4,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay11.png',
  'Unsupervised Learning: AI That Finds Patterns on Its Own',
  '<p>Have you ever wondered how Spotify groups similar songs without tags? Or how retailers segment customers without knowing their preferences?</p>
  <p>This is the power of <strong>Unsupervised Learning</strong> — AI discovering patterns from <em>unlabeled</em> data. Without teacher-provided answers, the model identifies structure like clusters, anomalies, or dimensionality reductions.</p>
  <p>It’s like giving a puzzle to an AI without the final picture — it figures out the patterns all by itself!</p>',
  '<ul>
    <li><strong>Customer Segmentation:</strong> Retailers group buyers based on their shopping behaviors.</li>
    <li><strong>Anomaly Detection:</strong> Banks use it to detect unusual credit card transactions.</li>
    <li><strong>Image Compression:</strong> Techniques like PCA and t-SNE reduce image data dimensions while preserving structure.</li>
  </ul>',
  'Unsupervised learning is like a toddler sorting toys by shape or color—AI learns to group things naturally!',
  'genesis'
);




INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Techniques like k-means and PCA date back to the mid‑20th century—early attempts to find structure without labels.',
  'Some AI vision systems cluster millions of unlabeled images, finding consistent themes like shapes or textures on their own!',
  'Hybrid models—mixing synthetic data with clustering and dimensionality reduction—will reduce labeling costs further.',
  'Tools like self-organizing maps (SOMs), spectral clustering, and Isomap are used in advanced analytics and unsupervised feature learning.',
  4,
  'genesis'
);


-- Insert for Day 4 Topic
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  'Unsupervised Learning',
  'Models discover hidden patterns from unlabeled data. They group similar inputs (clustering) or simplify feature space (dimensionality reduction). Common Use Cases: Clustering (k‑means, hierarchical, DBSCAN), Dimensionality Reduction (PCA, t‑SNE, UMAP, SOM), and Anomaly Detection (Autoencoders, isolation forests).',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+11+(Unsupervised+learning).mp4',
  4,
  'genesis'
);

-- Insert assessments for Day 4
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  4,
  'What is Unsupervised Learning?',
  'Learning without labels from raw inputs',
  'Learning with labeled input-output pairs',
  'Learning without any data',
  'Training robots',
  'A',
  'genesis'
),
(
  4,
  'Which is a real-world example of Unsupervised Learning?',
  'Identifying spam emails',
  'Grouping customers by shopping patterns',
  'Translating languages',
  'Grammar correction',
  'B',
  'genesis'
),
(
  4,
  'What is clustering?',
  'A type of supervised regression',
  'Grouping similar data points',
  'Reducing dataset size with pruning',
  'Assigning labels to images',
  'B',
  'genesis'
),
(
  4,
  'Why is unsupervised learning useful?',
  'Needs no labels',
  'Finds hidden patterns',
  'Both A and B',
  'Always perfectly accurate',
  'C',
  'genesis'
);


INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  4,
  'Explore and Group Visual Patterns Without Labels',
  'Generative AI & Pattern Discovery',
  'Artbreeder',
  'Visit Artbreeder and generate a collection of AI-created images using the Portraits or General category.\n\nCreate 20+ unique images by adjusting genes/sliders such as age, gender, color, facial features, or style.\n\nOnce you have created your set:\n- Download all the generated images\n- Visually analyze them for patterns (e.g., similar backgrounds, facial expressions, color schemes)\n- Group the images into clusters based on similarities you observe — without using any labels\n\nExamples of clusters might be:\n- “Bright Backgrounds” vs. “Dark Backgrounds”\n- “Young Faces” vs. “Old Faces”\n- “Fantasy Style” vs. “Realistic Style”\n\nAfter grouping, reflect on:\n- What patterns helped you form each group?\n- How might a machine group these images using clustering (like K-Means or t-SNE)?\n\nThis mission introduces you to the core idea of unsupervised learning — discovering hidden structures or patterns in unlabeled data.\n\n🏅 Earn 50 Skill Points for completing the experiment and submitting your summary!',
  'https://www.artbreeder.com',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/artbreeder.png',
  'genesis'
);

INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  4,
  1,
  '🧑‍🔬',
  '🔍',
  '📦',
  'Supervised Learning',
  'Web Development',
  'Data Scraping',
  'Clustering',
  'd',
  'Just like a scientist 🧑‍🔬 exploring raw data 🔍 and grouping items 📦 by similarity, unsupervised learning finds hidden clusters without labels.',
  'Grouping customers by purchase behavior.',
  'genesis'
),
-- Game 2
(
  4,
  2,
  '🧩',
  '📉',
  '🌐',
  'Regression',
  'Dimensionality Reduction',
  'Reinforcement Learning',
  'Classification',
  'b',
  'Unsupervised methods like PCA reduce many features 🧩 into fewer dimensions to make visualization 📉 and structure discovery 🌐 easier.',
  'Using PCA to project high-dimensional data into 2D for analysis.',
  'genesis'
),
-- Game 3
(
  4,
  3,
  '🧠',
  '🗺️',
  '🌀',
  'Self‑Organizing Map (SOM)',
  'Clustering',
  'Regression',
  'Testing Phase',
  'a',
  'Like an AI brain 🧠 organizing itself into a map 🗺️ of input patterns 🌀, SOMs uncover topology in data without labels.',
  'Using SOM to visualize customer behavior on a 2D grid.',
  'genesis'
);


-- Day 4 - Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'easy',
  'Unscramble the word: R L S U T E C',
  'This technique groups similar data points based on features, without any labels.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11JumbledEasy.png',
  'CLUSTER',
  'Clustering organizes unlabeled data into groups based on similarity—an unsupervised learning core task.',
  'english',
  'genesis'
);

-- Day 4 - Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'medium',
  'Unscramble the word: A C P',
  'This method reduces high-dimensional data into a few principal components—ideal for visualization or noise reduction.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11JumbledMed.png',
  'PCA',
  'Principal Component Analysis (PCA) projects data onto principal axes to reduce dimensionality while preserving variance.',
  'english',
  'genesis'
);

-- Day 4 - Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'hard',
  'Unscramble the word: M O S',
  'A neural-network style technique mapping high-dimensional data into a 2D grid while preserving topology.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11JumbledHard.png',
  'SOM',
  'Self‑Organizing Map (SOM) learns a 2D representation of input space, clustering similar data while preserving topology.',
  'english',
  'genesis'
);


-- Day 4 - Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'easy',
  '_ L U S T E R',
  'Finds groups of similar items in data without any labels.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MissingEasy.png',
  'CLUSTER',
  'Clustering is an unsupervised technique that automatically groups data points based on similarity—key to exploring unknown data structures.',
  'english',
  'genesis'
);

-- Day 4 - Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'medium',
  '_ C A',
  'A tool that reduces many features into a few components to simplify and visualize data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MissingMed.png',
  'PCA',
  'Principal Component Analysis (PCA) transforms data into orthogonal principal axes, compressing complexity while preserving key variance.',
  'english',
  'genesis'
);

-- Day 4 - Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'hard',
  '_ O M',
  'Neural-network method that maps data into a structured 2D grid, preserving topology.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MissingHard.png',
  'SOM',
  'A Self‑Organizing Map (SOM) organizes high-dimensional unlabeled data onto a 2D lattice, where similar inputs activate nearby nodes—revealing hidden structure in data.',
  'english',
  'genesis'
);

-- Day 4 - Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'easy',
  'Which algorithm is used to group similar data points based entirely on their features, without any labels?',
  'It clusters data by assigning it to the nearest of k centroids.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11PerfectMatchEasy.png',
  'K‑Means Clustering',
  'K‑Means is a centroid-based method that partitions unlabeled data into k clusters by iteratively assigning points to the nearest cluster center and updating those centers.',
  'english',
  'genesis'
);

-- Day 4 - Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'medium',
  'Which technique reduces the number of features in high-dimensional data while preserving the most important variance?',
  'It helps simplify data for visualization and analysis by projecting it onto key axes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11PerfectMatchMed.png',
  'Principal Component Analysis (PCA)',
  'PCA projects high-dimensional data onto orthogonal principal components that capture the majority of variation, simplifying the dataset for analysis and visualization.',
  'english',
  'genesis'
);

-- Day 4 - Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  4,
  'hard',
  'Which unsupervised method builds a grid-based map where similar data points activate nearby nodes, preserving topological relationships?',
  'It preserves the spatial relationships between high-dimensional input data points.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11PerfectMatchHard.png',
  'Self‑Organizing Map (SOM)',
  'SOMs use competitive neural learning to map high-dimensional inputs onto a 2D grid where nearby neurons represent similar input patterns, preserving the topology of the data space.',
  'english',
  'genesis'
);




INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  4,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemEasy6.png" }
  ]',
  'Match unsupervised learning visuals to build intuition around clustering, reduction, and pattern discovery.',
  'genesis'
);



INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  4,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemMed8.png" }
  ]',
  'Build pattern recognition skills by matching concepts like PCA, clusters, and unsupervised learning techniques.',
  'genesis'
);



INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  4,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day11MemHard10.png" }
  ]',
  'Challenge learners to identify advanced unsupervised learning tools and match them with visual clues to reinforce understanding.',
  'genesis'
);


INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(4, 'options',
 'What is the key characteristic of unsupervised learning?',
 'It uses labeled data',
 'It predicts future outcomes',
 'It learns from unlabeled data',
 'It needs human feedback after every step',
 'It learns from unlabeled data',
 30,
 'genesis'),

-- Question 2
(4, 'options',
 'Which of the following is an example of unsupervised learning?',
 'Classifying images of animals',
 'Predicting tomorrow’s stock price',
 'Grouping customers by buying behavior',
 'Calculating body mass index',
 'Grouping customers by buying behavior',
 30,
 'genesis'),

-- Question 3
(4, 'options',
 'What is the goal of clustering in unsupervised learning?',
 'Assign a label to new data',
 'Predict a numerical value',
 'Find hidden patterns or groupings',
 'Improve reinforcement scores',
 'Find hidden patterns or groupings',
 30,
 'genesis'),

-- Question 4
(4, 'options',
 'Which algorithm is most suitable for clustering tasks?',
 'Decision Tree',
 'K-Means',
 'Linear Regression',
 'Q-Learning',
 'K-Means',
 30,
 'genesis'
);







                                   --DAY=5

INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  5,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay12.png',
  'Reinforcement Learning: How AI Learns by Trial and Error',
  '<p>Imagine training a dog to sit by giving it a treat every time it obeys. That’s the essence of <strong>Reinforcement Learning (RL)</strong> — AI learns by interacting with its environment and receiving rewards or penalties based on actions taken.</p>
  <p>RL agents improve their strategies through feedback over time, optimizing for long-term success.</p>',
  '<ul>
    <li><strong>Game Playing:</strong> AlphaGo mastering the game of Go using trial and error.</li>
    <li><strong>Robotics:</strong> Robots learning to walk, grip, or climb through feedback.</li>
    <li><strong>Self-Driving Cars:</strong> Adjusting driving strategy based on environment rewards.</li>
  </ul>',
  'Reinforcement learning is like training a pet — reward good behavior, ignore the bad, and let learning happen!',
  'genesis'
);


INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'RL traces its roots back to behaviorist psychology and was formalized in the 1980s with concepts like Q-learning and dynamic programming.',
  'RL was behind DeepMind’s victory when their agent beat world champions in Atari games — just from pixel input and score!',
  'RL will shape personalized AI assistants that adapt to your behavior and goals in real time.',
  'RL is being tested in autonomous stock trading, warehouse automation, and even protein folding.',
  5,
  'genesis'
);

INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  'Reinforcement Learning',
  'An agent learns optimal actions by interacting with an environment and receiving feedback (rewards or penalties). It learns policies that maximize long-term cumulative reward.\n\nCore Components:\nAgent: Learner or decision-maker\nEnvironment: Where it interacts\nAction: What the agent can do\nState: Current situation of the agent\nReward: Feedback signal\n\nPopular Algorithms:\nQ-Learning, Deep Q Networks (DQN), SARSA, Policy Gradient, Proximal Policy Optimization (PPO)\n\nCommon Use Cases:\nGame AI, Robotics, Real-time Strategy Optimization, Smart Traffic Systems, Industrial Control Systems.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/AI_Learning_DAY12.mp4',
  5,
  'genesis'
);


INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  5,
  'What is Reinforcement Learning?',
  'Learning with labeled data',
  'Learning by interaction with feedback',
  'Learning without data',
  'Passive rule following',
  'B',
  'genesis'
),
(
  5,
  'Which is a real-world application of Reinforcement Learning?',
  'Detecting spam emails',
  'Classifying documents',
  'A robot learning to walk',
  'Sorting data in Excel',
  'C',
  'genesis'
),
(
  5,
  'What is a “reward” in RL?',
  'A gift card',
  'A metric showing how good an action was',
  'An error value',
  'A set of features',
  'B',
  'genesis'
),
(
  5,
  'Which algorithm is commonly used in RL?',
  'Decision Tree',
  'Q-Learning',
  'PCA',
  'K-Means',
  'B',
  'genesis'
);


INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  5,
  '🎼 Compose & Improve: Learn Music Through Feedback!',
  'Creative AI + Interactive Trial-and-Error Learning',
  'BeepBox',
  'You are now a Music Agent, and your goal is to compose a melody that improves with each attempt — just like a reinforcement learning model improves with rewards.\n\n🧠 Step-by-Step:\n\nOpen BeepBox and explore the melody blocks.\nCreate your first tune (no need to be perfect!).\nPlay it back and reflect:\n- Did it sound rhythmic or chaotic?\n- Was it pleasing or harsh?\n\nTry again:\nModify the melody based on what sounded “better.”\nThink of each new version as an “action.”\nYour “reward” is how much more you like the sound.\nRepeat this process 5–7 times, adjusting notes, instruments, or tempo each time.\n\n🔍 Reflect On:\n- How did your own feedback guide your decisions?\n- Did your music get better after each trial?\n- In what ways was this like an RL agent learning over episodes?\n\n🎓 Key Takeaway:\nLike reinforcement learning, BeepBox composition teaches improvement via feedback — you adjust actions (notes) to maximize a reward (your satisfaction with the music).\n\n🪙 Earn 50 Skill Points for completing the experiment and submitting your summary!',
  'https://beepbox.co/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/beepbox.png',
  'genesis'
);


INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  5,
  1,
  '🤖',
  '🗺️',
  '🧍‍♂️',
  'Environment',
  'Agent',
  'Dataset',
  'Trainer',
  'b',
  'In RL, the agent 🤖 is the decision-maker that explores the environment 🗺️ and interacts as a learner 🧍‍♂️ to reach goals.',
  'A robot learning to navigate a maze.',
  'genesis'
),
-- Game 2
(
  5,
  2,
  '🧭',
  '🔁',
  '👣',
  'Reward',
  'Exploration',
  'Policy',
  'Reinforcement',
  'c',
  'A policy 🧭 in RL is the strategy the agent uses to decide its actions 🔁 based on past steps 👣.',
  'The decision rule used by an AI to choose the next move in a game.',
  'genesis'
),
-- Game 3
(
  5,
  3,
  '🎁',
  '🧠',
  '➕',
  'Reward',
  'Model',
  'Feedback',
  'Punishment',
  'a',
  'A reward 🎁 is the positive feedback an agent 🧠 receives for doing well ➕ — it motivates learning in RL.',
  'Getting +10 points in a game for reaching a checkpoint.',
  'genesis'
);



-- Day 5 - Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'easy',
  'Unscramble the word: R E W D A R',
  'This is the positive signal that an agent receives when it performs a desired action.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12JumbledEasy.png',
  'REWARD',
  'In reinforcement learning, the agent receives a reward for correct actions, which helps it learn the optimal behavior over time.',
  'english',
  'genesis'
);

-- Day 5 - Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'medium',
  'Unscramble the word: C Y L I P O',
  'This determines the strategy an agent uses to decide the next action based on current state.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12JumbledMed.png',
  'POLICY',
  'A policy defines the agent’s behavior by mapping states to actions, guiding learning and performance in the environment.',
  'english',
  'genesis'
);

-- Day 5 - Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'hard',
  'Unscramble the word: E X P L R T A I O O N',
  'This essential part of learning lets agents try new actions to discover better rewards.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12JumbledHard.png',
  'EXPLORATION',
  'Exploration helps the agent to discover new strategies by testing different actions, avoiding local optima and improving long-term performance.',
  'english',
  'genesis'
);


-- Day 5 - Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'easy',
  '_ G E N T',
  'The decision-maker in reinforcement learning that takes actions in an environment.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MissingEasy.png',
  'AGENT',
  'In RL, the agent interacts with the environment, learning which actions yield the best rewards.',
  'english',
  'genesis'
);

-- Day 5 - Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'medium',
  '_ N V I R O N M E N T',
  'Where the agent operates, receives feedback, and learns from the outcomes of its actions.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MissingMed.png',
  'ENVIRONMENT',
  'The environment in RL provides the context for learning—it gives states, rewards, and responds to the agent’s actions.',
  'english',
  'genesis'
);

-- Day 5 - Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'hard',
  '_ P I S O D E',
  'A full sequence of interactions from the beginning to the end of a task or game round.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MissingHard.png',
  'EPISODE',
  'In RL, an episode is a complete set of interactions from the initial state to a terminal state, helping to structure learning.',
  'english',
  'genesis'
);


-- Day 5 - Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'easy',
  'What is the core signal that an agent receives from the environment to learn which actions are good or bad?',
  'It helps the agent decide whether its actions are leading to success or failure.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12PerfectEasy.png',
  'Reward Signal',
  'In reinforcement learning, the reward signal tells the agent how well it is doing, guiding it toward actions that maximize long-term success.',
  'english',
  'genesis'
);

-- Day 5 - Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'medium',
  'Which component of reinforcement learning defines the strategy that maps states to actions?',
  'It is a function that helps determine the next move based on the current situation.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12PerfectMed.png',
  'Policy',
  'A policy is a decision-making function that helps an agent choose the next action based on its current state.',
  'english',
  'genesis'
);

-- Day 5 - Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  5,
  'hard',
  'What concept in reinforcement learning balances choosing the best-known option with trying new possibilities?',
  'It ensures the agent doesn’t miss better solutions by always sticking to familiar choices.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12PerfectHard.png',
  'Exploration vs. Exploitation',
  'This trade-off helps the agent decide whether to exploit known rewards or explore new actions to potentially discover better outcomes in the future.',
  'english',
  'genesis'
);


INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  5,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemEasy6.png" }
  ]',
  'Match core reinforcement learning concepts like agent, reward, and environment to build strong foundational intuition.',
  'genesis'
);


INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  5,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemMed8.png" }
  ]',
  'Deepen understanding of reinforcement learning terms like policy, actions, and state transitions through visual pairing.',
  'genesis'
);


INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  5,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day12MemHard10.png" }
  ]',
  'Reinforce mastery of complex RL topics like Q-learning, episodes, and the exploration–exploitation tradeoff through advanced visual matching.',
  'genesis'
);

INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(5, 'options',
 'What is the primary goal of reinforcement learning?',
 'To label data',
 'To reduce feature dimensions',
 'To maximize cumulative rewards through actions',
 'To group similar data',
 'To maximize cumulative rewards through actions',
 30,
 'genesis'),

-- Question 2
(5, 'options',
 'Which of the following best represents a real-world application of reinforcement learning?',
 'Grouping news articles by topic',
 'Training a robot to walk',
 'Classifying handwritten digits',
 'Forecasting weather',
 'Training a robot to walk',
 30,
 'genesis'),

-- Question 3
(5, 'options',
 'In reinforcement learning, what is an "agent"?',
 'The dataset used for training',
 'The environment in which learning happens',
 'The decision-maker that interacts with the environment',
 'A label assigned to data',
 'The decision-maker that interacts with the environment',
 30,
 'genesis'),

-- Question 4
(5, 'options',
 'What is a "reward" in reinforcement learning?',
 'A punishment for wrong predictions',
 'A random number assigned to an agent',
 'Feedback that tells the agent how good its action was',
 'A label used for classification',
 'Feedback that tells the agent how good its action was',
 30,
 'genesis'
);


                -- DAY = 6



INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  6,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay13.png',
  'Data Science: Turning Raw Data into Powerful Insights',
  '<p>Data Science is the field that helps us make sense of large amounts of data. It combines statistics, programming, and real-world knowledge to find patterns, trends, and insights.</p>
   <p>Think of it like this: companies and organizations collect huge amounts of data every day — from websites, apps, sensors, and more. But raw data is messy and confusing. That’s where data scientists come in.</p>
   <p>They clean the data, analyze it, and build models that can predict what might happen next or help make better decisions.</p>',
  '<ul>
    <li><strong>E-commerce:</strong> Recommending products you might like.</li>
    <li><strong>Healthcare:</strong> Detecting early signs of disease from patient records.</li>
    <li><strong>Finance:</strong> Spotting unusual transactions to prevent fraud.</li>
    <li><strong>Entertainment:</strong> Netflix and Spotify suggesting what to watch or listen to.</li>
  </ul>',
  'Data Science turns data into useful knowledge. It’s all around us — helping apps, doctors, and companies make smarter choices every day.',
  'genesis'
);


INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The term “Data Science” gained popularity in the early 2000s but dates back to the 1960s when it was called “Data Analysis.”',
  '90% of the world’s data was created in just the last two years! Also, data scientists spend 70–80% of their time cleaning and preparing data — not modeling!',
  'Data science will become more automated through AutoML and integrated deeply into every business domain.',
  'Data scientists are critical in climate modeling, pandemic prediction, and AI bias detection today.',
  6,
  'genesis'
);


INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  'Data Science',
  'Data Science combines domain expertise, programming, and statistics to extract meaningful patterns and make decisions based on data.\n\nCore Components:\n- Data Collection: Gathering raw data from different sources\n- Data Cleaning: Fixing errors and handling missing values\n- Exploratory Data Analysis (EDA): Visualizing and understanding trends\n- Modeling: Using machine learning to predict or classify\n- Deployment: Putting models into real-world use\n\nPopular Tools:\nPython (Pandas, NumPy, Scikit-learn), R Language, Jupyter Notebook, Tableau / Power BI, SQL\n\nCommon Use Cases:\nCustomer Segmentation, Sales Forecasting, Product Recommendation, Social Media Analytics.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/AI_Learning_DAY13.mp4',
  6,
  'genesis'
);


INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  6,
  'What is the first step in any data science project?',
  'Modeling',
  'Deployment',
  'Data Collection',
  'Data Visualization',
  'C',
  'genesis'
),
(
  6,
  'Which tool is commonly used for data analysis in Python?',
  'Photoshop',
  'Pandas',
  'Node.js',
  'Canva',
  'B',
  'genesis'
),
(
  6,
  'What is the purpose of Exploratory Data Analysis (EDA)?',
  'Create machine learning models',
  'Clean raw data',
  'Understand and visualize data patterns',
  'Code user interfaces',
  'C',
  'genesis'
),
(
  6,
  'Which of the following is not a data visualization tool?',
  'Matplotlib',
  'Power BI',
  'Tableau',
  'WordPress',
  'D',
  'genesis'
);


INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  6,
  '🔍 Data Detective: Extract Key Insights from Raw Text!',
  'NLP Tool + Summarization AI',
  'Resoomer',
  'You are now a Data Detective. Your job is to take a huge amount of information and find only the important insights — just like a data scientist extracts value from raw data!\n\n🧠 Step-by-Step:\n\n1. Choose a long article (500+ words) — from Wikipedia, a blog, or news site.\n2. Go to Resoomer.com\n3. Paste the article into the summarizer.\n4. Click “Summarize.”\n\n💡 Resoomer will instantly turn the article into concise key points.\n\nRead the summary and write down 3 major insights you learned.\n\n🔍 Reflect On:\n- Was it easier to understand the topic after using Resoomer?\n- How does summarizing help in learning?\n- How is this similar to how data scientists extract insights from raw data?\n\n🎓 Key Takeaway:\nJust like a data scientist works with large datasets to find trends and summaries, you used AI (Resoomer) to filter the noise and extract value. That’s data science in action!\n\n🪙 Earn 50 Skill Points for completing the experiment and submitting your summary!',
  'https://resoomer.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/resoomer.png',
  'genesis'
);



INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  6,
  1,
  '📊',
  '🧹',
  '🧮',
  'Data Modeling',
  'Data Cleaning',
  'Feature Engineering',
  'A/B Testing',
  'b',
  'Cleaning messy data 🧹 is essential before analyzing 📊 or calculating anything 🧮.',
  'Removing missing or duplicated values from a dataset.',
  'genesis'
),
-- Game 2
(
  6,
  2,
  '👁️',
  '🔍',
  '📈',
  'Predictive Modeling',
  'Data Engineering',
  'Exploratory Data Analysis',
  'Deployment',
  'c',
  'EDA lets you explore 👁️ and investigate 🔍 data visually 📈 to uncover patterns.',
  'Plotting age vs. income to detect trends.',
  'genesis'
),
-- Game 3
(
  6,
  3,
  '🤖',
  '📚',
  '⚙️',
  'Machine Learning',
  'Data Mining',
  'Business Intelligence',
  'Rule-based Automation',
  'a',
  'Data Science uses ML 🤖 built on data 📚 and optimized using algorithms ⚙️ to make predictions.',
  'A model predicting customer churn.',
  'genesis'
);


-- Day 6 - Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'easy',
  'Unscramble the word: A T A D',
  'This is the raw material that data scientists work with.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13JumbledEasy.png',
  'DATA',
  'Data is the foundation of data science. It can be structured or unstructured, and all analysis starts with it.',
  'english',
  'genesis'
);

-- Day 6 - Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'medium',
  'Unscramble the word: A L A Y N S I A',
  'This process helps in examining data to find useful patterns and insights.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13JumbledMed.png',
  'ANALYSIS',
  'Data analysis involves exploring, cleaning, and interpreting data to support decision-making.',
  'english',
  'genesis'
);

-- Day 6 - Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'hard',
  'Unscramble the word: G L M R T A H I O I A N',
  'This field combines math, coding, and domain knowledge to extract meaning from data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13JumbledHard.png',
  'ALGORITHMIC',
  'Algorithms are core to data science, powering predictions, classifications, and pattern recognition.',
  'english',
  'genesis'
);
-- Day 6 - Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'easy',
  'D _ T A',
  'Raw facts and figures used in data science.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MissingEasy.png',
  'DATA',
  'Data is the starting point for any data science process — collected, cleaned, and analyzed.',
  'english',
  'genesis'
);

-- Day 6 - Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'medium',
  'A _ A L Y S I S',
  'The step where data is examined for insights and meaning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MissingMed.png',
  'ANALYSIS',
  'Analysis helps discover trends and correlations to guide decision-making.',
  'english',
  'genesis'
);

-- Day 6 - Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'hard',
  '_ E G R E S S I O N',
  'A statistical method used to predict continuous outcomes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MissingHard.png',
  'REGRESSION',
  'Regression helps data scientists predict values like prices, temperatures, or scores using patterns in the data.',
  'english',
  'genesis'
);


-- Day 6 - Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'easy',
  'What is the primary source that drives all data science work?',
  'Everything in data science starts with this foundational input.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13PerfectEasy.jpg',
  'Data',
  'Data is collected from various sources and is the base input for any analysis, modeling, or prediction task.',
  'english',
  'genesis'
);

-- Day 6 - Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'medium',
  'Which phase involves visual tools like graphs and dashboards to understand data?',
  'It allows for clearer communication and discovery of insights using visual methods.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13PerfectMed.jpg',
  'Data Visualization',
  'Data visualization turns numbers into stories — helping people understand trends and patterns clearly.',
  'english',
  'genesis'
);

-- Day 6 - Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  6,
  'hard',
  'What is the process of using data to predict future outcomes?',
  'It leverages patterns in past data to estimate what might happen next.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13PerfectHard.png',
  'Predictive Modeling',
  'Predictive modeling uses historical data to forecast what’s likely to happen, often using ML algorithms.',
  'english',
  'genesis'
);


INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  6,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemEasy6.png" }
  ]',
  'Match essential data science elements like data, charts, and basic operations to develop strong intuition.',
  'genesis'
);


INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  6,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemMed8.png" }
  ]',
  'Strengthen your grasp on processes like data cleaning, visualization, and basic EDA operations through visual reinforcement.',
  'genesis'
);



INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  6,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day13MemHard10.png" }
  ]',
  'Master complex data science processes like predictive modeling, feature selection, and advanced data handling through visual pairing challenges.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(6, 'options',
 'What is the main goal of data science?',
 'To draw pictures from data',
 'To create random predictions',
 'To extract insights and knowledge from data',
 'To delete unnecessary files',
 'To extract insights and knowledge from data',
 30,
 'genesis'),

-- Question 2
(6, 'options',
 'Which of the following is a real-world application of data science?',
 'Editing photos',
 'Predicting customer churn in a telecom company',
 'Formatting text in a document',
 'Drawing a comic strip',
 'Predicting customer churn in a telecom company',
 30,
 'genesis'),

-- Question 3
(6, 'options',
 'What is a “dataset” in data science?',
 'A group of websites',
 'A collection of labeled folders',
 'A structured set of data used for analysis',
 'A code file with random text',
 'A structured set of data used for analysis',
 30,
 'genesis'),

-- Question 4
(6, 'options',
 'What is “data cleaning” in the data science process?',
 'Deleting all old files',
 'Correcting or removing incorrect, incomplete, or irrelevant data',
 'Saving data into a cloud',
 'Encrypting a dataset',
 'Correcting or removing incorrect, incomplete, or irrelevant data',
 30,
 'genesis'
);


                     --DAY=7

INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  7,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay14.png',
  'Predictive Analytics: How AI Foresees the Future',
  '<p>Imagine being able to forecast which customers will leave your service next month — that’s the power of <strong>Predictive Analytics</strong>. It uses historical data, statistical models, and machine learning to predict future outcomes.</p>
   <p>By spotting patterns in past data, predictive models help businesses make smarter, faster decisions — from marketing to risk management.</p>',
  '<ul>
    <li><strong>Banking:</strong> Predicting loan default risks</li>
    <li><strong>Retail:</strong> Forecasting product demand</li>
    <li><strong>Healthcare:</strong> Predicting chances of disease relapse</li>
    <li><strong>Sports:</strong> Anticipating player performance or injuries</li>
  </ul>',
  'Predictive analytics was used by Target to predict pregnancies based on shopping habits — sometimes before families even knew!',
  'genesis'
);



INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Predictive modeling dates back to the 1600s with actuarial science, but it became a data-driven science in the early 2000s with machine learning.',
  'Netflix’s recommendation engine, driven by predictive analytics, saves the company over $1 billion annually in customer retention.',
  'Predictive analytics will drive hyper-personalization — from real-time shopping recommendations to tailored healthcare plans.',
  'Used in fraud detection, climate forecasting, and smart cities for traffic and energy optimization.',
  7,
  'genesis'
);


INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  'Predictive Analytics',
  'A technique that uses historical data, statistical algorithms, and machine learning to predict future outcomes.\n\nCore Components:\n- Historical Data: Basis for prediction\n- Predictive Model: Algorithm that forecasts future outcomes\n- Features: Input variables used for prediction\n- Target Variable: The outcome being predicted\n- Model Evaluation: Accuracy, precision, recall\n\nPopular Algorithms:\nLinear Regression, Decision Trees, Random Forest, Logistic Regression, XGBoost\n\nCommon Use Cases:\nCustomer Churn Prediction, Stock Price Forecasting, Disease Risk Prediction, Marketing Campaign Targeting, Equipment Failure Prediction.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/AI_Learning_DAY14.mp4',
  7,
  'genesis'
);


INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  7,
  'What is Predictive Analytics?',
  'A way to store large data',
  'Predicting future outcomes using data',
  'Manual spreadsheet calculations',
  'Only used in retail',
  'B',
  'genesis'
),
(
  7,
  'Which of these is a real-world use of Predictive Analytics?',
  'Designing logos',
  'Forecasting sales trends',
  'Sorting emails',
  'Setting timers',
  'B',
  'genesis'
),
(
  7,
  'What is a “feature” in predictive modeling?',
  'A movie detail',
  'A visual design element',
  'An input variable used for prediction',
  'A software bug',
  'C',
  'genesis'
),
(
  7,
  'Which algorithm is commonly used in Predictive Analytics?',
  'Bubble Sort',
  'K-Means',
  'Linear Regression',
  'Naive Bayes (only for classification)',
  'C',
  'genesis'
);


INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  7,
  '🔮 Forecast & Fine-Tune: Predict the Future with Data!',
  'Data Analysis + AI Prediction Support',
  'Smodin',
  'You are now a Data Predictor Agent, tasked with forecasting outcomes using patterns in existing information.\n\n🧠 Step-by-Step:\n\n1. Collect or input sample data into Smodin’s tool.\n2. Identify key features (e.g., sales numbers, weather stats).\n3. Ask the tool to analyze trends and generate predictions.\n\n🔍 Reflect:\n- Was the outcome expected or surprising?\n- What patterns did the tool rely on?\n- Repeat with modified inputs and observe new predictions.\n\n🎯 Reflect On:\n- How did changing inputs affect the predictions?\n- What was the model most sensitive to?\n- How might this apply to real businesses?\n\n🎓 Key Takeaway:\nLike predictive models, AI tools can identify hidden patterns to forecast future events — but the quality of input matters!\n\n🪙 Earn 50 Skill Points for uploading your prediction summary!',
  'https://smodin.io/writer',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/smodin.png',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  7,
  1,
  '📊',
  '⏱️',
  '🔮',
  'Analytics',
  'Real-Time Reports',
  'Predictive Analytics',
  'Automation',
  'c',
  'Predictive analytics (📊) uses past data over time (⏱️) to forecast future outcomes (🔮).',
  'Using sales history to forecast next month’s demand.',
  'genesis'
),
-- Game 2
(
  7,
  2,
  '🧮',
  '🧠',
  '🎯',
  'Guesswork',
  'Machine Learning',
  'Model Accuracy',
  'Manual Processing',
  'c',
  'Accurate predictions (🎯) depend on strong models (🧠) built on calculations and features (🧮).',
  'Evaluating model precision for predicting loan defaults.',
  'genesis'
),
-- Game 3
(
  7,
  3,
  '🛍️',
  '🧾',
  '🚨',
  'Customer Feedback',
  'Churn Prediction',
  'Return Policy',
  'Inventory Logging',
  'b',
  'By analyzing purchase history (🧾) and behavior (🛍️), predictive analytics can forecast if a customer is about to leave (🚨).',
  'Using shopping data to identify likely customer drop-offs.',
  'genesis'
);
-- Day 7 - Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'easy',
  'Unscramble the word: E T A D A',
  'This is the raw material used in predictive analytics to train models and make forecasts.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14JumbledEasy.png',
  'DATA',
  'In predictive analytics, data is essential — it is the foundation upon which models identify patterns and predict future outcomes.',
  'english',
  'genesis'
);

-- Day 7 - Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'medium',
  'Unscramble the word: T A R E G T',
  'This is the outcome or variable the predictive model is trying to forecast.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14JumbledMed.png',
  'TARGET',
  'The target is the result the model aims to predict, such as whether a customer will buy a product or default on a loan.',
  'english',
  'genesis'
);

-- Day 7 - Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'hard',
  'Unscramble the word: L G R S I T O C C I N R E E',
  'A popular algorithm used to predict binary outcomes like yes/no or spam/not spam.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14JumbledHard.png',
  'LOGISTIC REGRESSION',
  'Logistic Regression is used when the target variable is binary. It estimates probabilities and makes predictions based on input features.',
  'english',
  'genesis'
);
-- Day 7 - Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'easy',
  'What is the basic input used to train predictive models?',
  'Predictive analytics depends on past data to uncover patterns and make accurate forecasts.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14PerfectEasy.png',
  'Historical Data',
  'Predictive analytics depends on past data to uncover patterns and make accurate forecasts.',
  'english',
  'genesis'
);

-- Day 7 - Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'medium',
  'What is the term for the variable the model tries to forecast?',
  'The target variable is what the model aims to predict — like customer churn, disease likelihood, or sales volume.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14PerfectMed.png',
  'Target Variable',
  'The target variable is what the model aims to predict — like customer churn, disease likelihood, or sales volume.',
  'english',
  'genesis'
);

-- Day 7 - Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'hard',
  'What’s the name of the model’s ability to identify the most important features that influence the target variable?',
  'Feature importance measures how much each input (feature) contributes to the final prediction, helping refine and optimize models.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14PerfectHard.png',
  'Feature Importance',
  'Feature importance measures how much each input (feature) contributes to the final prediction, helping refine and optimize models.',
  'english',
  'genesis'
);
-- Day 7 - Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'easy',
  '_ A T A',
  'It’s the foundation of any predictive analytics model.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MissingEasy.png',
  'DATA',
  'Without data, predictive models cannot learn or make forecasts.',
  'english',
  'genesis'
);

-- Day 7 - Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'medium',
  '_ E A T U R E S',
  'These are the input variables used to make predictions.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MissingMed.png',
  'FEATURES',
  'Features are measurable properties used to train the model and predict outcomes.',
  'english',
  'genesis'
);

-- Day 7 - Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  7,
  'hard',
  '_ C C U R A C Y',
  'A key metric used to evaluate how well a predictive model performs.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MissingHard.png',
  'ACCURACY',
  'Accuracy measures the proportion of correct predictions, helping to assess the model’s reliability.',
  'english',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  7,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemEasy6.png" }
  ]',
  'Match visuals related to foundational predictive analytics concepts like data, trends, and outcomes to reinforce basic forecasting ideas.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  7,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemMed8.png" }
  ]',
  'Enhance your understanding of input-output relationships, target variables, and metrics used in predictive analytics.',
  'genesis'
);


INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  7,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day14MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day10MemHard10.png" }
  ]',
  'Challenge your predictive analytics mastery by recalling key processes like regression, model tuning, and risk prediction.',
  'genesis'
);

INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(7, 'options',
 'What is the main objective of predictive analytics?',
 'To classify data into clusters',
 'To describe past events',
 'To forecast future outcomes based on historical data',
 'To visualize data trends',
 'To forecast future outcomes based on historical data',
 30,
 'genesis'),

-- Question 2
(7, 'options',
 'Which of the following is a real-world application of predictive analytics?',
 'Creating pie charts from a dataset',
 'Segmenting customers into groups',
 'Forecasting product demand for the next quarter',
 'Encrypting sensitive data',
 'Forecasting product demand for the next quarter',
 30,
 'genesis'),

-- Question 3
(7, 'options',
 'In predictive analytics, what is a “predictor variable”?',
 'A feature used to make future predictions',
 'The result we want to forecast',
 'A type of noise in the dataset',
 'The software used to generate predictions',
 'A feature used to make future predictions',
 30,
 'genesis'),

-- Question 4
(7, 'options',
 'What role does historical data play in predictive analytics?',
 'It is not used',
 'It helps define labels only',
 'It is used to train models to forecast future outcomes',
 'It is replaced by random data to avoid bias',
 'It is used to train models to forecast future outcomes',
 30,
 'genesis'
);


               -- DAY=8


INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  8,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay15.png',
  '🎯 Classification: Teaching AI to Make Smart Decisions',
  '<p>Imagine a machine that can tell if an email is spam, or if a tumor is benign or malignant — that’s <strong>Classification</strong> in action. It’s a key part of supervised learning, where AI models learn from labeled examples to make decisions.</p>
   <p>In classification, AI assigns data into specific categories or “classes.” Whether it’s filtering social media content or diagnosing diseases, this approach powers countless intelligent systems.</p>',
  '<ul>
    <li><strong>Email:</strong> Spam vs. Not Spam</li>
    <li><strong>Healthcare:</strong> Malignant vs. Benign tumors</li>
    <li><strong>Banking:</strong> Fraudulent vs. Legitimate transactions</li>
    <li><strong>HR:</strong> Shortlist vs. Reject applicants</li>
  </ul>',
  'Facebook uses classification algorithms to detect hate speech, nudity, and fake accounts — processing billions of pieces of content every day!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Classification roots go back to Fisher’s Iris dataset (1936), one of the first real-world classification problems in data science.',
  'Spotify classifies songs into moods and genres using machine learning — which also powers your Discover Weekly playlist.',
  'AI classification will drive automated hiring, real-time content moderation, and personalized medical diagnoses.',
  'Used in autonomous vehicles, chat moderation, financial fraud detection, and disease outbreak alerts.',
  8,
  'genesis'
);


INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 Classification in AI',
  'A supervised learning method where the model learns to assign categories to input data based on historical examples.\n\nCore Components:\n- Labeled Data: Input examples with known outcomes\n- Target Classes: The different categories (e.g., spam vs. not spam)\n- Features: Inputs used for decision-making\n- Model Training: Learning the pattern from labeled data\n- Evaluation Metrics: Accuracy, Precision, Recall, F1-score\n\nPopular Algorithms:\nDecision Trees, Logistic Regression, K-Nearest Neighbors (KNN), Naive Bayes, Support Vector Machines (SVM), Random Forest, Neural Networks\n\nCommon Use Cases:\nEmail Filtering, Medical Diagnosis, Loan Approval, Customer Segmentation, Sentiment Analysis.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/AI_Learning_DAY15.mp4',
  8,
  'genesis'
);


INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  8,
  'What is classification in AI?',
  'A method to organize folders',
  'Grouping data into categories',
  'Drawing random samples',
  'Building websites',
  'B',
  'genesis'
),
(
  8,
  'Which algorithm is most used for binary classification?',
  'K-Means',
  'Logistic Regression',
  'Linear Regression',
  'Apriori',
  'B',
  'genesis'
),
(
  8,
  'Which of these is NOT a classification problem?',
  'Predicting whether a student will pass or fail',
  'Sorting photos by animal type',
  'Estimating the price of a house',
  'Diagnosing a disease',
  'C',
  'genesis'
),
(
  8,
  'What is "label" in classification?',
  'The name of a model',
  'The predicted score',
  'The correct category assigned to training data',
  'A keyword in a dataset',
  'C',
  'genesis'
);

INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  8,
  '🧠 Classify the World: AI Sorting Challenge!',
  'Image Editing + AI Classification Support',
  'Pixlr',
  'You are now an AI Classification Agent! Your mission is to classify different objects visually by tagging and labeling them using AI support. You''ll simulate the classification logic used in machine learning with real-world examples.\n\n🧠 Step-by-Step:\n- Open Pixlr\n- Upload 5–6 different images (e.g., animals, vehicles, facial expressions)\n- Use editing or text tools to label each image into classes (e.g., Cat, Dog, Car, Happy, Sad)\n- Create a collage that groups similar classes together\n- Save your final image\n- Optionally: Use Cartoonize or Remove.bg to enhance input variety\n\n🔍 Reflect On:\n- What visual clues helped you classify images correctly?\n- How do you think AI models detect these clues?\n- What happens when objects look similar (e.g., wolf vs. dog)?\n\n🎓 Key Takeaway:\nClassification trains AI to recognize patterns and categorize them accurately, much like our brains do — and tools like Pixlr simulate this with visual learning!\n\n🪙 BONUS CHALLENGE: Upload your final labeled image collage and earn 50 Skill Points!',
  'https://pixlr.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/pixlr.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  8,
  1,
  '📧',
  '🚫',
  '✔️',
  'Regression',
  'Spam Filtering',
  'Data Backup',
  'Email Scheduling',
  'b',
  'Classification helps identify spam (🚫) vs. legitimate emails (✔️) based on input data (📧).',
  'AI flagging unwanted emails in your inbox.',
  'genesis'
),
-- Game 2
(
  8,
  2,
  '🧪',
  '💉',
  '✅',
  'Disease Prevention',
  'Medical Testing',
  'Diagnosis Classification',
  'Health Insurance',
  'c',
  'Using test results (🧪) and symptoms (💉), AI classifies whether a patient is healthy or not (✅).',
  'Classifying tumor results as benign or malignant.',
  'genesis'
),
-- Game 3
(
  8,
  3,
  '🧑‍🎓',
  '📄',
  '❌',
  'Job Interview',
  'Exam Review',
  'Resume Screening',
  'Profile Editing',
  'c',
  'AI can classify resumes (📄) to shortlist candidates (🧑‍🎓) or reject (❌) based on job-fit features.',
  'Filtering job applications using AI.',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'easy',
  'Unscramble the word: S S A L C',
  'This refers to the group or category an item belongs to in a classification problem.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15JumbledEasy.png',
  'CLASS',
  'In classification, data is grouped into predefined classes like "spam" or "not spam," "cat" or "dog."',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'medium',
  'Unscramble the word: S T U E A F R E',
  'These are measurable properties used by the classification model to distinguish between different classes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15JumbledMed.png',
  'FEATURES',
  'Features are the input variables (like age, color, or shape) used by a model to decide how to classify something.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'hard',
  'Unscramble the word: C I F N O S I C A L T S A I',
  'This is the process of sorting data into categories based on features.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15JumbledHard.png',
  'CLASSIFICATION',
  'Classification is the supervised learning technique that predicts the category a data point belongs to based on input features.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'easy',
  'What is the label or category assigned to each data item in classification?',
  'Class labels identify which group each data point belongs to — like "Dog" or "Car."',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15PerfectEasy.png',
  'Class Label',
  'Class labels identify which group each data point belongs to — like "Dog" or "Car."',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'medium',
  'Which input values are used by a model to differentiate and classify data?',
  'Features like size, shape, or age help classification models distinguish between classes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15PerfectMed.png',
  'Features',
  'Features like size, shape, or age help classification models distinguish between classes.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'hard',
  'What performance metric shows how well the model separates classes?',
  'A confusion matrix summarizes the classification performance, showing correct and incorrect predictions across classes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15PerfectHard.png',
  'Confusion Matrix',
  'A confusion matrix summarizes the classification performance, showing correct and incorrect predictions across classes.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'easy',
  'C _ A _ S',
  'The output category in classification problems.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MissingEasy.png',
  'CLASS',
  'In classification, "class" refers to the label or category assigned to each data point.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'medium',
  '_ E A _ U R E',
  'Input variable used to make a classification decision.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MissingMed.png',
  'FEATURE',
  'Features are attributes used by AI to classify data correctly.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  8,
  'hard',
  'A _ C _ R _ C _',
  'A common metric used to measure classification model performance.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MissingHard.png',
  'ACCURACY',
  'Accuracy shows how many predictions the model got right overall.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  8,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemEasy6.png" }
  ]',
  'Match basic classification symbols and ideas like class labels, icons, and AI decisions for a solid foundation.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  8,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemMed8.png" }
  ]',
  'Practice identifying classification elements such as features, labels, models, and output categories.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  8,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day15MemHard10.png" }
  ]',
  'Master the deeper classification concepts like F1-score, confusion matrix, algorithm selection, and hyperparameter tuning.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(8, 'options',
 'What is the main goal of classification in machine learning?',
 'To group unlabeled data',
 'To predict continuous values',
 'To assign input data into predefined categories',
 'To reduce training time',
 'To assign input data into predefined categories',
 30,
 'genesis'),

-- Question 2
(8, 'options',
 'Which of the following is a real-world example of classification?',
 'Predicting house prices',
 'Identifying spam emails',
 'Clustering customer behavior',
 'Compressing an image',
 'Identifying spam emails',
 30,
 'genesis'),

-- Question 3
(8, 'options',
 'In classification, what is a "label"?',
 'A continuous output value',
 'An identifier used to reduce features',
 'The category assigned to an input instance',
 'A numeric feature in the dataset',
 'The category assigned to an input instance',
 30,
 'genesis'),

-- Question 4
(8, 'options',
 'What is a "feature" in classification tasks?',
 'The result predicted by the model',
 'The rule the model follows',
 'The input variable used for prediction',
 'The accuracy score of the model',
 'The input variable used for prediction',
 30,
 'genesis'
);

                  -- DAY=9 (16)


INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  9,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay16.png',
  '📈 Regression: Teaching AI to Predict the Future',
  '<p>Imagine if an AI could predict the price of a house or the future temperature in your city. That’s <strong>Regression</strong> in action. Unlike classification, where we predict categories, regression is about predicting continuous values based on historical data.</p>
   <p>Regression helps AI answer “how much?” or “how many?” by finding relationships between inputs (features) and a numeric outcome.</p>',
  '<ul>
    <li><strong>🏠 Housing:</strong> Predicting property prices</li>
    <li><strong>📊 Business:</strong> Forecasting sales or revenue</li>
    <li><strong>🌡️ Weather:</strong> Estimating future temperatures</li>
    <li><strong>📈 Stock Market:</strong> Predicting share prices</li>
    <li><strong>🚗 Insurance:</strong> Estimating claim amounts</li>
  </ul>',
  'Netflix uses regression models to predict how much you’ll like a show — assigning a personal rating score based on your viewing history.',
  'genesis'
);


INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The roots of regression trace back to Francis Galton in the 1800s, who used it to study the relationship between parents’ and children’s heights.',
  'Spotify uses regression to predict how long you’ll listen to a song or playlist based on your listening patterns.',
  'AI regression will drive personalized pricing, predictive healthcare, energy demand forecasting, and autonomous vehicle sensor predictions.',
  'Used in climate modeling, real estate platforms, business trend forecasting, and financial planning tools.',
  9,
  'genesis'
);

INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '📉 Regression in AI',
  'A supervised learning method where the model predicts a numeric output based on historical labeled data.\n\nCore Components:\n- Labeled Data: Numeric outcomes (e.g., price, temperature)\n- Features: Input variables (e.g., square footage, location)\n- Output: Continuous values\n- Model Training: Learning the relationship between inputs and output\n- Evaluation Metrics: MSE, RMSE, MAE, R² Score\n\nPopular Algorithms:\nLinear Regression, Polynomial Regression, Ridge and Lasso Regression, Decision Tree Regression, Random Forest Regression, Support Vector Regression (SVR), Neural Networks for Regression\n\nCommon Use Cases:\nSales Forecasting, Energy Consumption Prediction, Stock Price Forecasting, Budget Estimation, Life Expectancy Prediction.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/AI_Learning_DAY16.mp4',
  9,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  9,
  'What is regression in AI?',
  'Grouping items',
  'Predicting numeric outcomes',
  'Sorting data',
  'Detecting spam',
  'B',
  'genesis'
),
(
  9,
  'Which algorithm is commonly used for regression tasks?',
  'Logistic Regression',
  'Linear Regression',
  'K-Means',
  'Naive Bayes',
  'B',
  'genesis'
),
(
  9,
  'Which of these is a regression problem?',
  'Classifying emails as spam or not',
  'Estimating house prices',
  'Grouping students by interests',
  'Diagnosing a disease',
  'B',
  'genesis'
),
(
  9,
  'What does “mean squared error” (MSE) measure in regression?',
  'Accuracy',
  'Average difference between predicted and actual values',
  'Number of classes',
  'Label distribution',
  'B',
  'genesis'
);


INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  9,
  '📉 Predict the Price: AI Regression Explorer!',
  'Video + Chart Visualization for Predictive Analytics',
  'FlexClip',
  'You’re now an AI Regression Explorer! Use visual storytelling to simulate how AI predicts numeric outcomes like prices, temperatures, or scores using regression.\n\n🧠 Step-by-Step:\n- Open FlexClip\n- Choose a template with charts/graphs or start from scratch\n- Input a sample dataset (e.g., “Study Hours vs. Exam Score,” “Years of Experience vs. Salary”)\n- Create a visual chart or animation showing how the line of best fit predicts outcomes\n- Add text overlays to label axes, variables, and predictions\n- Export your video as your “AI Regression Forecast Clip”\n\n👉 Optional Enhancements:\n- Use Remove.bg or Photopea to add custom characters or avatars explaining the prediction\n- Use TextFX or Smodin.io to generate regression explanation text\n- Use Kapwing to polish your final clip with voice-over or subtitles\n\n🔍 Reflect On:\n- What variables did you choose to predict?\n- Was the relationship linear or nonlinear?\n- How accurate does your visual prediction seem?\n- What happens if you remove outliers or add more data?\n\n🎓 Key Takeaway:\nRegression lets AI learn from past data to make smart predictions about the future — and tools like FlexClip help you visualize and communicate those predictions!\n\n🪙 BONUS CHALLENGE: Upload your prediction video clip to the classroom hub and earn 50 Skill Points!',
  'https://www.flexclip.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/flexclip.jpg',
  'genesis'
);


INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1: House Price Estimation
(
  9,
  1,
  '🏠',
  '💲',
  '📈',
  'Real Estate Marketing',
  'House Price Estimation',
  'Mortgage Planning',
  'Renting Analysis',
  'b',
  'AI uses regression to predict numeric values like house prices (💲) based on features (🏠), resulting in forecasts (📈).',
  'Predicting the price of a house using regression models.',
  'genesis'
),
-- Game 2: Temperature Forecasting
(
  9,
  2,
  '🌡️',
  '📆',
  '📉',
  'Climate Change Classification',
  'Date Scheduling',
  'Temperature Forecasting',
  'Diary Entry',
  'c',
  'Regression models predict temperatures (🌡️) based on time series data (📆), helping with daily and seasonal forecasts (📉).',
  'Forecasting tomorrow’s temperature using regression.',
  'genesis'
),
-- Game 3: Predicting Business Revenue
(
  9,
  3,
  '📊',
  '🧾',
  '🧠',
  'Expense Categorization',
  'Predicting Business Revenue',
  'Memory Training',
  'Tax Filing',
  'b',
  'Regression allows AI (🧠) to analyze past business data (🧾) and predict future outcomes (📊).',
  'Using regression to estimate next quarter’s revenue.',
  'genesis'
);

INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'easy',
  'Unscramble the word: C E I R P',
  'The amount that’s being predicted in many regression tasks like real estate or retail.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16JumbledEasy.png',
  'PRICE',
  'Regression models often predict numeric values like the price of a product or house.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'medium',
  'Unscramble the word: E A R F T U E S',
  'These variables are used to make predictions in regression tasks.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16JumbledMed.png',
  'FEATURES',
  'Features are input data points (e.g., area, age, income) used by regression models to estimate numeric outcomes.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'hard',
  'Unscramble the word: G R R E E S I N S O',
  'This is the broader learning technique used to predict continuous numerical values.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16JumbledHard.png',
  'REGRESSION',
  'Regression is a supervised learning method used to predict continuous outputs like price, score, or demand.',
  'english',
  'genesis'
);

INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'easy',
  'What is the numeric value that the regression model tries to predict?',
  'In regression, the target value is a continuous number the model aims to predict, such as a score or price.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16PerfectEasy.png',
  'Target Value',
  'In regression, the target value is a continuous number the model aims to predict, such as a score or price.',
  'english',
  'genesis'
);

INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'medium',
  'What inputs are used to train the regression model and make predictions?',
  'Features like time, age, temperature, etc., help regression models predict outcomes.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16PerfectMed.png',
  'Features',
  'Features like time, age, temperature, etc., help regression models predict outcomes.',
  'english',
  'genesis'
);

INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'hard',
  'Which error metric is commonly used to measure the accuracy of regression predictions?',
  'MSE calculates the average squared difference between actual and predicted values in regression.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16PerfectHard.png',
  'Mean Squared Error',
  'MSE calculates the average squared difference between actual and predicted values in regression.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'easy',
  '_ R _ C _',
  'A common prediction in house pricing models.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MissingEasy.png',
  'PRICE',
  'Regression is used to predict prices in various domains like real estate and e-commerce.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'medium',
  '_ E A _ U R E',
  'Input variable used to make a regression decision.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MissingMed.png',
  'FEATURE',
  'Features are the input variables used by regression models to predict outcomes.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  9,
  'hard',
  'A _ S _ _ _ E',
  'A metric used to check how close the predictions are to actual values.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MissingHard.png',
  'AVERAGE',
  'In regression, average values and average error play a key role in performance metrics like MAE or RMSE.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  9,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemEasy6.png" }
  ]',
  'Match new classification elements and symbols to build early familiarity with core AI icons and meanings.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  9,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemMed8.png" }
  ]',
  'Sharpen classification understanding by pairing real-world AI features and label cues.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  9,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day16MemHard10.png" }
  ]',
  'Advance through expert-level classification logic including precision, recall, and AI tuning nuances.',
  'genesis'
);

INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(9, 'options',
 'What is the primary goal of regression in machine learning?',
 'To classify data into categories',
 'To group similar data points',
 'To predict continuous numeric values',
 'To clean noisy data',
 'To predict continuous numeric values',
 30,
 'genesis'),

-- Question 2
(9, 'options',
 'Which of the following is a real-world application of regression?',
 'Identifying spam emails',
 'Predicting a student’s final exam score based on study hours',
 'Categorizing news articles',
 'Grouping customers into clusters',
 'Predicting a student’s final exam score based on study hours',
 30,
 'genesis'),

-- Question 3
(9, 'options',
 'In regression, what is the "dependent variable"?',
 'The variable used as input for prediction',
 'The target variable we want to predict',
 'A fixed constant in the dataset',
 'The variable used to cluster data',
 'The target variable we want to predict',
 30,
 'genesis'),

-- Question 4
(9, 'options',
 'What is a "residual" in regression analysis?',
 'The difference between predicted and actual values',
 'A constant used in linear equations',
 'A label used in classification',
 'The average of all input features',
 'The difference between predicted and actual values',
 30,
 'genesis'
);


                -- DAY=10(17)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  10,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay17.png',
  '📊 Training Data: The Fuel Behind AI is Intelligence',
  '<p>Before AI can make smart decisions, it needs examples to learn from — this is called <strong>training data</strong>. It contains input-output pairs that teach the model what to do.</p><p>In supervised learning, training data includes features (inputs) and labels (correct answers). The model learns patterns and relationships from this data to make predictions.</p>',
  '<ul>
    <li>📷 AI learns from thousands of labeled photos to identify animals</li>
    <li>🗣️ Voice assistants are trained on hours of spoken commands</li>
    <li>🌐 Translation tools learn from bilingual texts</li>
    <li>🎯 Recommendation systems train on user behavior</li>
  </ul>',
  'Tesla’s self-driving system uses over 1.5 petabytes of training data — including millions of miles of road footage — to teach cars how to drive!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'In the early days, the MNIST dataset (handwritten digits) became the go-to training set for testing machine learning models.',
  'ChatGPT was trained on hundreds of billions of words from books, articles, and websites!',
  'Training data will come from wearable devices, IoT sensors, and real-time environments, enabling AI to learn continuously.',
  'Major tech companies are building privacy-preserving training datasets using techniques like federated learning.',
  10,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 What is Training Data in AI?',
  'Training data is the starting point of all machine learning models. It consists of examples the model uses to learn.\n\nCore Concepts:\n- Features: Inputs like images, text, or numbers\n- Labels: Correct outputs (e.g., “cat,” “spam,” “positive”)\n- Supervised Learning: Learning from labeled data\n- Bias in Data: Training data must be diverse to avoid biased predictions\n\nPopular Training Datasets:\nMNIST (digits), CIFAR-10 (images), IMDB (movie reviews), COCO (object detection), Common Crawl (text)\n\nUse Cases:\nAI assistants, Face recognition, Stock prediction, Chatbots, Sentiment analysis',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+DAY+17(Training+data).mp4',
  10,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  10,
  'What is training data in AI?',
  'Output produced by a model',
  'Code written to build AI',
  'Labeled examples used for learning',
  'Results of a test run',
  'C',
  'genesis'
),
(
  10,
  'Which of the following is required for supervised learning?',
  'Random text',
  'Unlabeled data',
  'Training data with labels',
  'Encrypted files',
  'C',
  'genesis'
),
(
  10,
  'Which is an example of training data?',
  'A chart without any explanation',
  'A photo with a tag like "dog"',
  'A voice message with no context',
  'A blank Excel sheet',
  'B',
  'genesis'
),
(
  10,
  'Why is quality training data important?',
  'It shortens the code',
  'It improves prediction accuracy',
  'It reduces screen time',
  'It increases memory size',
  'B',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  10,
  '🚀 Fuel the Brain: Build Your Training Dataset!',
  '🎨 Image Editing + Label Creation',
  'Pixlr',
  'You are now an AI Data Curator Agent! Your job is to build a mini training dataset by preparing labeled image samples that help AI learn — just like flashcards help students!\n\n🪜 Step-by-Step Instructions:\n- Collect 5–6 sample images (e.g., 🐶 Dog, 🐱 Cat, 🚗 Car, 🍓 Strawberry, 😊 Happy)\n- Open Pixlr\n- Upload one image at a time\n- Crop or clean each image to focus on the main object\n- Add text labels directly on the image (e.g., “Dog”, “Car”)\n- Organize your labeled images in a simple collage inside Pixlr (drag and drop or arrange side-by-side)\n- Save your final collage – this is your training dataset!\n\n🔍 Reflect On:\n- How did labeling change how the image was understood?\n- How would an AI know what’s in each image without the labels?\n- What happens if one image is mislabeled?\n\n🎓 Key Takeaway:\nTraining data is how we “teach” AI systems to recognize patterns — just like giving examples to a student!\n\n🪙 BONUS CHALLENGE: Upload your labeled dataset collage and earn 50 Skill Points for completing your AI training mission!',
  'https://pixlr.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/pixlr.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1: Image Labeling
(
  10,
  1,
  '📸',
  '🐶',
  '🏷️',
  'Photography',
  'Meme Creation',
  'Image Labeling',
  'AI Drawing',
  'c',
  'A photo of a dog (🐶) with a tag (🏷️) is considered labeled training data for an image recognition model.',
  'Using images with labels like “Dog” to train AI to recognize animals.',
  'genesis'
),
-- Game 2: Learning from Training Data
(
  10,
  2,
  '🧠',
  '📚',
  '✅',
  'Quiz Maker',
  'Learning from Training Data',
  'Textbook Summary',
  'Memory Game',
  'b',
  'AI (🧠) learns from labeled information (📚✅), helping it make intelligent decisions.',
  'Teaching an AI model using datasets of input-output examples.',
  'genesis'
),
-- Game 3: Voice Command Dataset
(
  10,
  3,
  '🎧',
  '👂',
  '🗣️',
  'Podcast',
  'Voice Command Dataset',
  'Audiobook',
  'Meditation',
  'b',
  'Speech-based models are trained on input (👂) and spoken responses (🗣️), forming a voice dataset.',
  'Training Alexa or Siri using voice commands and responses.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'easy',
  'Unscramble the word: A T A D',
  'The raw material used to train AI models.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17JumbledEasy.png',
  'DATA',
  'Data is the core input from which AI learns — whether it’s text, images, or numbers.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'medium',
  'Unscramble the word: L A B E L',
  'This is the tag or category assigned to each data item in supervised learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17JumbledMed.png',
  'LABEL',
  'A label helps the AI understand what each data item represents (e.g., “Happy,” “Spam”).',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'hard',
  'Unscramble the word: A I N R T G I N A D A T',
  'This is the dataset used to teach the model by example.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17JumbledHard.png',
  'TRAINING DATA',
  'Training data consists of labeled examples that help the AI model learn patterns and make predictions.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'easy',
  'What does AI learn from during model training?',
  'Training data provides the examples from which the AI learns patterns and behaviors.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17PerfectMatchEasy.png',
  'Training Data',
  'Training data provides the examples from which the AI learns patterns and behaviors.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'medium',
  'What is the tag that describes each training sample?',
  'Labels define what each training sample represents — key for supervised learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17PerfectMatchMed.png',
  'Label',
  'Labels define what each training sample represents — key for supervised learning.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'hard',
  'What is the process of preparing images/text to make them suitable for AI training?',
  'Preprocessing improves data quality by cleaning, labeling, and formatting it for model training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17PerfectMatchHard.png',
  'Data Preprocessing',
  'Preprocessing improves data quality by cleaning, labeling, and formatting it for model training.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'easy',
  'D _ _ A',
  'What the AI learns from.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MissingEasy.png',
  'DATA',
  'Data is the foundational element of AI training.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'medium',
  '_ A _ E _',
  'The word that tells what something is in training data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MissingMed.png',
  'LABEL',
  'A label is how we tell the AI what each item in the training set represents.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  10,
  'hard',
  'T _ _ _ N _ _ G D _ _ _',
  'What we give to AI models to help them learn.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MissingHard.png',
  'TRAINING DATA',
  'Training data consists of labeled examples that teach the model how to make decisions.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  10,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemEasy6.png" }
  ]',
  'Pair basic training data concepts like labeled samples and input images to reinforce visual learning in AI.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  10,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemMed8.png" }
  ]',
  'Improve AI literacy by connecting image-label relationships and understanding diverse types of training inputs.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  10,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day17MemHard10.png" }
  ]',
  'Challenge advanced learners by matching nuanced AI concepts like preprocessing, tokenization, and training noise.',
  'genesis'
);

INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(10, 'options',
 'What is training data in machine learning?',
 'Data used to evaluate the final model',
 'Data used to fine-tune the hyperparameters',
 'Data the model learns from during training',
 'Data that is completely random',
 'Data the model learns from during training',
 30,
 'genesis'),

-- Question 2
(10, 'options',
 'Why is training data important in machine learning?',
 'It helps store the final outputs',
 'It defines the algorithm to be used',
 'It provides examples the model uses to learn patterns',
 'It visualizes the accuracy of the model',
 'It provides examples the model uses to learn patterns',
 30,
 'genesis'),

-- Question 3
(10, 'options',
 'Which of the following best describes a good training dataset?',
 'Very small but highly accurate',
 'Large, diverse, and well-labeled',
 'Mostly unlabeled with missing values',
 'Randomized without context',
 'Large, diverse, and well-labeled',
 30,
 'genesis'),

-- Question 4
(10, 'options',
 'What happens if the training data is biased?',
 'The model will make unbiased decisions',
 'The model will learn and replicate the bias',
 'The model becomes more accurate',
 'The model stops learning',
 'The model will learn and replicate the bias',
 30,
 'genesis'
);
-- Day=11(18)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  11,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy2.png',
  '🧠 AI Models: The Brain of Machine Learning',
  '<p>An AI model is like a trained brain — a mathematical system that has learned from examples. It’s the core engine that powers smart decisions in AI systems.</p>
  <p>Imagine you’re learning how to recognize fruits. If someone shows you enough apples and bananas and tells you which is which, your brain starts learning the patterns. That’s what an AI model does — it learns from training data.</p>
  <p>In machine learning, we give the model:</p>
  <ul>
    <li>Inputs (called features, like color or size)</li>
    <li>Outputs (called labels, like “apple” or “banana”)</li>
  </ul>
  <p>Over time, the model learns the relationship between them and adjusts each time it makes a mistake — until it gets really good at predicting.</p>
  <p>Once trained, it can generalize — meaning it performs well even on new data it hasn’t seen before.</p>',
  '<ul>
    <li>📧 Spam Detection – Models learn to spot spam using keywords and behavior.</li>
    <li>📸 Face Recognition – Your phone uses models trained on your face for secure unlock.</li>
    <li>🎬 Netflix – Recommendations based on viewing habits are driven by AI models.</li>
    <li>🏦 Credit Scoring – Banks use models to predict loan risks using financial history.</li>
  </ul>',
  'GPT models like ChatGPT have over 175 billion parameters — the building blocks of intelligence learned from vast training data.',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The first perceptron model (1958) was one of the earliest neural networks, inspired by human brain cells.',
  'ImageNet models can detect over 20,000 different objects after being trained on millions of photos.',
  'AI models will become self-improving, adjusting themselves based on real-time feedback without retraining.',
  'Foundation models (like GPT, BERT, and Claude) are reshaping how AI works across multiple industries.',
  11,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🧠 What is an AI Model?',
  'An AI model is the core logic system that processes input, applies learned knowledge, and produces intelligent output.\n\nCore Concepts:\n- Model Training: Learning from labeled examples\n- Parameters & Weights: Internal values the model adjusts\n- Predictions: Outputs based on what it learned\n- Generalization: Performing well on new data\n- Types of Models: Linear regression, decision trees, SVM, neural networks\n\nUse Cases:\n- Spam Filtering\n- Fraud Detection\n- Voice Assistants\n- Recommendation Systems\n- Image Classification',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+18(AI+blog+model).mp4',
  11,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  11,
  'What is an AI model?',
  'A robot body',
  'A data file',
  'A system that learns from data to make predictions',
  'A website plugin',
  'C',
  'genesis'
),
(
  11,
  'What happens during model training?',
  'Model is deleted',
  'Model memorizes input only',
  'Model learns from data',
  'Model copies code',
  'C',
  'genesis'
),
(
  11,
  'Which is a type of AI model?',
  'HTML',
  'Neural Network',
  'GIF',
  'CSV',
  'B',
  'genesis'
),
(
  11,
  'Why are AI models important?',
  'They store user data',
  'They replace browsers',
  'They enable decision-making from data',
  'They provide internet connection',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  11,
  '🧠 Build the Brain: Model Architect Mission',
  '🎨 AI Art Generator + Pattern Recognition Simulation',
  'NeuralBlender or Deep Dream',
  'You are now an AI Model Engineer! Simulate what a neural network might visualize when learning to recognize objects or patterns.\n\n🪜 Step-by-Step Instructions:\n1. Go to NeuralBlender (https://neuralblender.com/)\n2. Type prompts like “What a neural network sees when looking at a dog” or “AI visual of a spam email”\n3. Generate 3–4 visuals and save them\n4. Arrange them in a visual storyline of how models transform input to output\n5. Reflect on: What patterns are emphasized? What noise gets removed?\n\n🎓 Key Takeaway:\nAI models interpret and extract meaning from data through learned patterns.',
  'https://neuralblender.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/neuralblender.png',
  'genesis'
);

 INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES (
  11,
  1,
  '🧱',
  '🧠',
  '🎯',
  'Factory Blueprint',
  'Model Training',
  'Website Development',
  'Online Ad',
  'b',
  'A model is like a brain being built brick-by-brick (🧱🧠) to make accurate predictions (🎯).',
  'AI models are trained with data and tuned to make decisions like predicting spam or recognizing faces.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'easy',
  'Unscramble the word: D E L O M',
  'This is the machine learning brain that makes predictions.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18JumbledEasy.png',
  'MODEL',
  'The model is the system trained on data that predicts or classifies new inputs.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'medium',
  'Unscramble the word: E L R A N I N G  M O D',
  'This is the fully trained system after it’s built and optimized.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18JumbledMed.png',
  'TRAINED MODEL',
  'Once a model has been trained with data, it becomes a trained model ready for real-world tasks.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'hard',
  'Unscramble the word: N N O A R E M T A D E I L M',
  'A type of model that mimics how the brain works using layers of neurons.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18JumbledHard.png',
  'NEURAL MODEL',
  'Neural models are inspired by the human brain and are used for complex tasks like image or speech recognition.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'easy',
  'What makes predictions after learning from data?',
  'A model learns from input-output examples and applies that learning to make predictions.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18PerfectEasy.png',
  'Model',
  'A model learns from training data and is used to make predictions.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'medium',
  'What do we call the result after model training is finished and the system is ready to predict?',
  'A trained model is the final version that can make predictions on new, unseen data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18PerfectMed.png',
  'Trained Model',
  'Once a model is trained, it can be deployed to solve real-world problems.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'hard',
  'What is the name for models made of layered neurons that solve complex tasks like face recognition?',
  'Neural networks are built with layers of artificial neurons and can learn deep patterns in data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18PerfectHard.png',
  'Neural Network Model',
  'Neural networks are advanced models used for deep learning tasks involving vision, speech, and more.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'easy',
  'M _ _ E L',
  'The system that makes predictions in machine learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MissingEasy.png',
  'MODEL',
  'Models are trained systems that convert inputs to useful outputs using learned rules.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'medium',
  'T _ _ _ N _ D   M _ _ _ L',
  'This is what we get after training a model on data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MissingMed.png',
  'TRAINED MODEL',
  'After learning from data, the AI becomes a trained model ready to make predictions.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  11,
  'hard',
  'N _ _ _ _ L   _ _ _ _ _ K   _ _ _ _ L',
  'A complex model with multiple layers for deep learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MissingHard.png',
  'NEURAL NETWORK MODEL',
  'This advanced model mimics how our brain works and is widely used in deep learning.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  11,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemEasy6.png" }
  ]',
  'Match introductory memory pairs about learning basics and associations effectively.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  11,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemMed8.png" }
  ]',
  'Reinforce conceptual links through moderate-difficulty matching tasks.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  11,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day18MemHard10.png" }
  ]',
  'Advance your understanding by matching abstract logic terms and patterns under challenge.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(11, 'options',
 'What is an AI model?',
 'A type of dataset',
 'A program that makes predictions after learning from data',
 'A visual representation of data',
 'A hyperparameter tuner',
 'A program that makes predictions after learning from data',
 30,
 'genesis'),

-- Question 2
(11, 'options',
 'When is an AI model considered well-trained?',
 'When it memorizes the training data',
 'When it predicts outputs for new data accurately',
 'When it stops training',
 'When it uses more hyperparameters',
 'When it predicts outputs for new data accurately',
 30,
 'genesis'),

-- Question 3
(11, 'options',
 'What is the primary purpose of an AI model?',
 'To store raw input data',
 'To define the architecture of the dataset',
 'To learn from data and make decisions or predictions',
 'To create image labels',
 'To learn from data and make decisions or predictions',
 30,
 'genesis'),

-- Question 4
(11, 'options',
 'What type of AI model is used in classification problems?',
 'Unsupervised model',
 'Regression model',
 'Classification model',
 'Clustering algorithm',
 'Classification model',
 30,
 'genesis');

-- Day=12(19)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  12,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay19.png',
  '🧩 Features: What AI Looks At to Make Decisions',
  '<p><strong>What Are Features in AI?</strong><br>Think of features as the input clues that help an AI model make decisions. Just like a detective uses clues to solve a mystery, an AI model uses features to understand patterns and predict outcomes.</p>
  <p>For example:</p>
  <ul>
    <li>📷 In an image: color, shape, or edges</li>
    <li>📝 In text: keywords, tone, or sentiment</li>
    <li>📊 In numbers: age, income, or credit score</li>
  </ul>
  <p><strong>Why Are Features Important?</strong><br>Better features = smarter decisions. Features help AI models learn faster and predict more accurately.</p>',
  '<ul>
    <li>🏦 Loan Approval App: Age, income, credit score</li>
    <li>🐶 Image Recognition: Colors, edges, shapes</li>
    <li>🗣️ Speech AI: Voice pitch, tone, speed</li>
    <li>💬 Sentiment Analysis: Words like “great”, “terrible”, “happy”</li>
  </ul>',
  '📊 The famous Titanic dataset uses features like passenger class, age, and gender to predict survival!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Early AI systems required manual feature selection. Today’s deep learning models extract features automatically through hidden layers.',
  'A spam detector might analyze over 1,000 features per email!',
  'Future AI systems will use real-time features from wearable devices to deliver personalized healthcare.',
  'Feature engineering remains one of the most time-consuming yet crucial parts of modern ML workflows.',
  12,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🔍 What Are Features in AI?',
  'Features are the data points or clues that an AI model uses to make decisions.\n\nCore Concepts:\n- Numerical: e.g., height, income\n- Categorical: e.g., gender, location\n- Textual: e.g., keywords, sentiment\n- Image-based: e.g., pixel intensity, color\n\nUse Cases:\n- Health risk predictions\n- Text classification\n- Visual recognition\n- Customer segmentation',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+19+(Features).mp4',
  12,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  12,
  'What are features in machine learning?',
  'Background music',
  'Input data points used to train models',
  'Graphs of output',
  'Layers of a website',
  'B',
  'genesis'
),
(
  12,
  'Which is a valid feature?',
  'Dog emoji',
  'Salary amount',
  'HTML file',
  'YouTube video',
  'B',
  'genesis'
),
(
  12,
  'Why are features important?',
  'They design the UI',
  'They hold the labels',
  'They help models understand the input',
  'They contain passwords',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  12,
  '🔍 Spot the Clues: Feature Finder Mission',
  '🖼️ Image Annotation Tool',
  'Photopea or Pixlr',
  'You’re on a mission to think like an AI! Your goal is to identify and label features in real-world images, just like an AI model would.\n\n🪜 Step-by-Step Instructions:\n1. Upload 3–5 images (e.g., animals, people, vehicles) into Photopea or Pixlr.\n2. Use arrows or highlight tools to mark features such as “Tail,” “Ears,” “Wheels,” or “Smile.”\n3. Add text labels to explain what each feature represents.\n4. Create a collage or poster showing the link: Feature ➝ Label ➝ Prediction.\n5. Save and share your final creation.\n\n🎓 Key Takeaway:\nAI models rely on clear, consistent features (just like visual clues) to make decisions and predictions.\n\n🪙 BONUS CHALLENGE:\nTag 5+ features across multiple objects and explain how they help an AI system recognize or classify images. Completing this earns you 50 Skill Points and the badge: "Feature Detective - Level 1"!',
  'https://www.photopea.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/icon512.png',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES (
  12,
  1,
  '🐶',
  '🔍',
  '👁️',
  'Vet Clinic',
  'AI Feature Detection',
  'Pet Grooming',
  'DNA Test',
  'b',
  'Zooming in on pet features like ears and tail represents how AI detects input features.',
  'AI models analyze visible traits like edges or shapes to make predictions or classifications.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'easy',
  'Unscramble the word: A E F T U R E',
  'This is an input characteristic used by a model to learn.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19JumbledEasy.png',
  'FEATURE',
  'Features are measurable properties or inputs used by the model to make decisions.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'medium',
  'Unscramble the word: R A E L T U E S',
  'These are multiple inputs like color, height, or speed that describe the data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19JumbledMed.png',
  'FEATURES',
  'Features (plural) are data points that define and differentiate the inputs for AI models.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'hard',
  'Unscramble the word: I U A N F F I G T E R E S',
  'This is the process of selecting only the most useful features for training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19JumbledHard.png',
  'FEATURE SELECTION',
  'Feature selection involves picking only the most important inputs to improve model performance.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'easy',
  'What is the name of the input value used by a model to classify or predict?',
  'A feature is any attribute or variable that helps the model learn from the data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19PerfectEasy.png',
  'Feature',
  'A feature is an input variable that gives meaningful information to the model for learning.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'medium',
  'What do we call the group of all input variables used for learning?',
  'Together, all input attributes form the features that drive model training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19PerfectMed.png',
  'Features',
  'The collection of features is used by the AI model to understand and learn patterns in data.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'hard',
  'What is the process of removing less important or redundant features?',
  'Removing unnecessary features improves efficiency and reduces overfitting.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19PerfectHard.png',
  'Feature Selection',
  'Feature selection improves model accuracy and performance by using only the most relevant features.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'easy',
  'F _ _ _ U _ E',
  'An input variable used by the model.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MissingEasy.png',
  'FEATURE',
  'A feature is an individual measurable property or characteristic used in training.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'medium',
  'F _ _ _ _ _ E _',
  'Multiple inputs used to train the model.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MissingMed.png',
  'FEATURES',
  'Features are the set of input values that help in decision-making.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  12,
  'hard',
  'F _ _ _ _ _ _ _ _ _ _ _ _ _',
  'The process of keeping only useful input variables.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MissingHard.png',
  'FEATURE SELECTION',
  'Feature selection is vital for model accuracy and reducing noise in the data.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  12,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemEasy6.png" }
  ]',
  'Identify visual representations of features such as ears, tail, eyes, or wheels used by AI to detect patterns.',
  'genesis'
);

-- Medium Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  12,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemMed8.png" }
  ]',
  'Pair features with the objects they represent — like eyes on faces, wheels on vehicles, or fur patterns on animals.',
  'genesis'
);

-- Hard Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  12,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day19MemHard10.png" }
  ]',
  'Challenge your observation by matching complex image features like symmetry, shape clustering, or region patterns used in vision AI.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(12, 'options',
 'What is a feature in machine learning?',
 'The final prediction made by a model',
 'A descriptive input variable used to train the model',
 'A type of training error',
 'A hyperparameter value',
 'A descriptive input variable used to train the model',
 30,
 'genesis'),

-- Question 2
(12, 'options',
 'Why are features important?',
 'They determine the model’s type',
 'They allow the model to differentiate between classes or outputs',
 'They reduce the model’s performance',
 'They slow down training',
 'They allow the model to differentiate between classes or outputs',
 30,
 'genesis'),

-- Question 3
(12, 'options',
 'What is an example of a feature?',
 'A predicted output',
 'A labeled category',
 'The height of a person in a dataset',
 'A final accuracy score',
 'The height of a person in a dataset',
 30,
 'genesis'),

-- Question 4
(12, 'options',
 'What can happen if irrelevant features are included in training?',
 'The model becomes more accurate',
 'The model ignores them automatically',
 'It can decrease the model’s performance',
 'It improves the speed of training',
 'It can decrease the model’s performance',
 30,
 'genesis');

--Day=15(20)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  13,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay20.png',
  '🔁 Cross-Validation: Testing AI Like a Pro',
  '<p><strong>What is Cross-Validation?</strong><br>Imagine you’re preparing for a big quiz. Would you just study one chapter? No — you’d test across all chapters. That’s what cross-validation does in AI.<br>Instead of testing a model once, we test it several times using different parts of the dataset to make sure it works well on unseen data.</p><p><strong>Why?</strong> Because we want models that generalize, not just memorize training data.</p><p><strong>K-Fold Cross-Validation</strong> (Most Popular Type):<br>• Divide data into <em>k</em> parts (e.g. 5 folds)<br>• In each round, use one part for testing and the other k-1 parts for training<br>• Repeat <em>k</em> times with different test sets<br>• Average all results to get one score</p><p>This gives a more honest picture of model performance.</p>',
  '<ul>
    <li>🏦 <strong>Banking:</strong> Fraud detection models are cross-validated before deployment</li>
    <li>🩺 <strong>Healthcare:</strong> Disease prediction models use it to prevent overfitting</li>
    <li>💬 <strong>Chatbots:</strong> Responses are tested with different user types via cross-validation</li>
  </ul>',
  '📺 Netflix and Amazon use cross-validation to ensure their recommendation engines work for all users — not just one group.',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Cross-validation was formalized in the 1970s and became a gold standard in machine learning.',
  'Even top AI researchers use 10-fold cross-validation to publish reliable results.',
  'Cross-validation will soon be automated and dynamic, adapting folds based on data quality.',
  'AI fairness evaluations now rely on cross-validation across different demographic groups to ensure unbiased performance.',
  13,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '📊 How Does Cross-Validation Work?',
  'Cross-validation is a technique used to evaluate the performance of AI models by splitting the dataset into training and testing sets multiple times.\n\nCore Concepts:\n- Data Splitting: Dividing the dataset into parts\n- Train/Test Rotation: Using different splits in each round\n- K-Fold Method: Dividing data into k subsets for repeated testing\n- Avoiding Overfitting: Ensures the model performs well on unseen data\n- Reliable Accuracy Measurement: Averages performance across folds\n\nUse Cases:\n- Medical diagnosis models\n- Financial risk scoring systems\n- Improving language translation accuracy\n- Object detection in computer vision',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+20+(Cross+validation).mp4',
  13,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  13,
  'What is cross-validation in machine learning?',
  'Uploading files',
  'Testing a model on random images',
  'Splitting data to check model performance',
  'Giving input twice',
  'C',
  'genesis'
),
(
  13,
  'Why use cross-validation?',
  'To confuse the model',
  'To make the data bigger',
  'To test reliability and avoid overfitting',
  'To change the algorithm',
  'C',
  'genesis'
),
(
  13,
  'What does k in k-fold cross-validation represent?',
  'Number of algorithms',
  'Number of models',
  'Number of data splits or folds',
  'Number of labels',
  'C',
  'genesis'
),
(
  13,
  'What benefit does cross-validation provide?',
  'Slows down training',
  'Makes AI memorize training data',
  'Gives a more realistic performance check',
  'Removes test data',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  13,
  '🔄 The Data Shuffle: Cross-Validate Your Model',
  '📋 Manual Simulation + Accuracy Tracker',
  'Smodin.io or EditPad',
  'You’re now a Data Validation Scientist! Your task is to simulate how AI checks its performance using cross-validation.\n\n📊 Mission Steps:\n1. Create or take a mini dataset (e.g., 10 rows of student scores or fruit prices).\n2. Manually split it into 5 equal parts.\n3. In each round:\n   - Use 4 parts to train (simulate learning)\n   - Use 1 part to test (simulate prediction)\n   - Rotate the test fold each time (total 5 rounds)\n4. After each round, record an “accuracy” score (make it up or simulate).\n5. Calculate the average accuracy — that’s your cross-validation result!\n\n💡 Reflect:\n- Why is accuracy changing across folds?\n- What if we only tested once?\n- Which fold gave the best/worst result?\n\n🎓 Key Takeaway:\nCross-validation helps avoid overfitting by ensuring your model works well on different slices of data.\n\n🪙 BONUS CHALLENGE:\nWrite your results in a mini table and explain your findings. Earn 50 Skill Points and the badge: “Validation Voyager”!',
  'https://smodin.io/writer',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/smodin.png',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1: Cross-Validation Process
(
  13,
  1,
  '🔁',
  '🧪',
  '📊',
  'File Upload',
  'Cross-Validation',
  'Email Test',
  'Music Shuffle',
  'b',
  'The process of testing a model multiple times (🔁) with varied test data (🧪) and checking performance (📊).',
  'K-fold cross-validation divides data into folds to evaluate model accuracy repeatedly.',
  'genesis'
),
-- Game 2: Data Folding
(
  13,
  2,
  '📂',
  '➗',
  '🧠',
  'Folder Sorting',
  'Random Splitting',
  'Data Folding in ML',
  'Model Guessing',
  'c',
  'Data (📂) is divided (➗) and used to train/test the model (🧠) in rotation.',
  'Cross-validation helps ensure fairness by rotating which data is used for training and testing.',
  'genesis'
),
-- Game 3: Accuracy Check Loop
(
  13,
  3,
  '📈',
  '🔄',
  '🧪',
  'One-Time Testing',
  'Validation Skip',
  'Accuracy Check Loop',
  'Model Storage',
  'c',
  'Model performance (📈) is verified repeatedly (🔄) through testing phases (🧪).',
  'Helps avoid overfitting by measuring how the model performs across different data splits.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'easy',
  'Unscramble the word: S S O R C',
  'A part of the model validation process where data is split.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20JumbledEasy.png',
  'CROSS',
  '“Cross” comes from the term “cross-validation” where training and testing are alternated.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'medium',
  'Unscramble the word: I A L V D A O I T N A',
  'The method of evaluating a model\'s performance on unseen data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20JumbledMed.png',
  'VALIDATION',
  'Validation is the step where the model\'s accuracy is checked using a separate set of data.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'hard',
  'Unscramble the word: S S O R C _ _ _ _ _ _ _ _ _',
  'A technique that splits data into several folds for robust evaluation.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20JumbledHard.png',
  'CROSS-VALIDATION',
  'Cross-validation ensures the model performs well across multiple data segments, not just one.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'easy',
  'What technique splits data into train and test groups to evaluate a model?',
  'This method helps check if the model is overfitting or generalizing well.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20PerfectEasy.png',
  'Cross-Validation',
  'Cross-validation helps ensure a model performs well on different segments of data by alternating train-test roles.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'medium',
  'What is the name of the set used to check a model’s performance?',
  'The validation set is used during training to evaluate the model’s performance on unseen data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20PerfectMed.png',
  'Validation Set',
  'The validation set helps determine if the model is learning general patterns or just memorizing training data.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'hard',
  'What is the process of dividing data into multiple subsets and rotating training/testing roles?',
  'This technique enhances evaluation by rotating through multiple combinations of training and testing sets.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20PerfectHard.png',
  'K-Fold Cross-Validation',
  'K-Fold Cross-Validation allows every part of the dataset to be tested, providing a more robust model performance estimate.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'easy',
  'C _ _ _ _',
  'The term often paired with "validation."',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MissingEasy.png',
  'CROSS',
  '“Cross” is the first part of "cross-validation", a key evaluation technique in AI.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'medium',
  '_ A _ _ D _ _ _ O _',
  'Used to test model accuracy before final deployment.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MissingMed.png',
  'VALIDATION',
  'Validation data checks if the model works on unseen inputs, ensuring generalization.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  13,
  'hard',
  'C _ _ _ _ – _ _ _ _ _ _ _ _ _',
  'A process of model testing using data folds.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MissingHard.png',
  'CROSS-VALIDATION',
  'Cross-validation helps build models that perform well on various data segments.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  13,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemEasy6.png" }
  ]',
  'Match simple cross-validation elements like test splits, data folds, training samples, and reliability.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  13,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemMed8.png" }
  ]',
  'Match concepts like K-fold splits, validation set, model accuracy, and generalization for deeper cross-validation understanding.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  13,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day20MemHard10.png" }
  ]',
  'Challenge your understanding by pairing advanced elements like overfitting, model validation cycles, variance, and fold strategies.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(13, 'options',
 'What is cross-validation in machine learning?',
 'Using the same data for training and testing',
 'Randomizing data inputs',
 'A technique to evaluate model performance on unseen data',
 'A way to clean features',
 'A technique to evaluate model performance on unseen data',
 30,
 'genesis'),

-- Question 2
(13, 'options',
 'Why is cross-validation important?',
 'It helps tune datasets',
 'It ensures the model is not overfitting to the training data',
 'It improves image quality',
 'It reduces the number of features',
 'It ensures the model is not overfitting to the training data',
 30,
 'genesis'),

-- Question 3
(13, 'options',
 'What does k in “k-fold cross-validation” represent?',
 'The number of outputs',
 'The learning rate',
 'The number of data splits used for training and validation',
 'The number of errors',
 'The number of data splits used for training and validation',
 30,
 'genesis'),

-- Question 4
(13, 'options',
 'Which of the following is a benefit of cross-validation?',
 'It always improves accuracy',
 'It helps check model performance on different subsets',
 'It avoids training altogether',
 'It creates more hyperparameters',
 'It helps check model performance on different subsets',
 30,
 'genesis');

-- Day=14(21)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  14,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay21.png',
  '⚙️ Optimization: The Engine That Makes AI Smarter',
  '<p>AI models don’t become accurate by chance — they get smarter through a process called <strong>optimization</strong>. This is how AI learns to reduce errors and improve predictions by adjusting its internal settings (like weights and biases).</p><p>Optimization is like practice for AI. After each mistake, the model tweaks itself to do better next time.</p>',
  '<ul>
    <li>🛍️ AI in e-commerce optimizes product recommendations for each user</li>
    <li>🚕 Ride-hailing apps optimize driver routes to reduce wait time</li>
    <li>📬 AI in email apps optimizes spam filters by learning from errors</li>
    <li>🖼️ Photo enhancement tools optimize image quality with minimal noise</li>
  </ul>',
  'DeepMind’s AlphaGo used advanced optimization techniques to master the game of Go — defeating world champions!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'In the 1960s, early optimization algorithms like Stochastic Gradient Descent paved the way for training large AI systems.',
  'Some AI models use thousands of tiny optimization steps per second to reach the best performance.',
  'AI systems will soon perform real-time optimization during live interactions using continuous feedback.',
  'Today’s AI models use reinforcement learning with optimization to improve robotics, healthcare predictions, and even self-driving cars.',
  14,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 What is Optimization in AI?',
  'Optimization is the process that fine-tunes an AI model’s performance. It helps reduce mistakes and maximize accuracy.\n\nCore Concepts:\n- Loss Function: Measures how wrong the model’s prediction is\n- Weights and Biases: Internal settings the model adjusts during training\n- Gradient Descent: A method for minimizing the loss step-by-step\n- Learning Rate: How big a step the AI takes to adjust itself\n\nCommon Optimization Algorithms:\nStochastic Gradient Descent (SGD), Adam Optimizer, RMSprop, Adagrad\n\nUse Cases:\nAI in weather prediction, Language translation apps, Stock market trend forecasting, Medical image analysis',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+21+(Hyperparameters).mp4 ',
  14,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  14,
  'What is the purpose of optimization in AI?',
  'To display training results',
  'To randomize model outputs',
  'To reduce prediction errors',
  'To visualize datasets',
  'C',
  'genesis'
),
(
  14,
  'What part of the AI model is adjusted during optimization?',
  'Dataset names',
  'Image quality',
  'Weights and biases',
  'Server speed',
  'C',
  'genesis'
),
(
  14,
  'Which technique is most commonly used for optimization in AI?',
  'Decision Trees',
  'Image Segmentation',
  'Gradient Descent',
  'Auto Encoding',
  'C',
  'genesis'
),
(
  14,
  'Why is optimization critical for model accuracy?',
  'It helps clean datasets',
  'It fixes bugs in the code',
  'It fine-tunes model performance',
  'It shortens training time',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  14,
  '🧠 Sharpen the Mind: Optimize Like an AI!',
  '📝 Text Feedback + Optimization Simulator',
  'Hemingway Editor',
  'You’re now an AI Optimization Engineer! Your goal is to simulate how an AI model improves its performance over time — by reducing "loss" and making better predictions. Today, you are optimizing a paragraph just like AI tunes itself for better accuracy!\n\n🪜 Step-by-Step Instructions:\n- Write or paste a 4–5 sentence paragraph (try a topic like “Why exercise is important” or “My favorite food”) into Hemingway Editor.\n- Look at the feedback:\n  • See which sentences are hard to read (yellow/red)\n  • Note passive voice or complex words\n- Now optimize by:\n  • Rewriting long sentences\n  • Replacing complex words\n  • Using active voice\n- Check the new Readability Grade — did it improve?\n- Save your final version and compare with the original — just like an AI checks model performance before and after optimization.\n\n🔍 Reflect On:\n- How did small changes improve clarity?\n- How does this mimic AI reducing its loss?\n- What happens if feedback is ignored (like AI ignoring errors)?\n\n🎓 Key Takeaway:\nOptimization in AI means making small, smart adjustments to improve results — just like editing a paragraph into a clearer version.\n\n🪙 BONUS CHALLENGE:\nSubmit original and optimized versions side-by-side. If your Hemingway score improves by 2+ points, you earn 50 Skill Points and the title: "Optimization Agent - Level 1"!',
  'https://hemingwayapp.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/hemingway.png',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1: Optimization Process
(
  14,
  1,
  '📉',
  '🧠',
  '🔧',
  'Brainstorming',
  'Problem Solving',
  'Optimization Process',
  'Hardware Upgrade',
  'c',
  'The brain (🧠) improves using feedback (📉), adjusting itself (🔧).',
  'AI adjusts its inner settings after analyzing prediction errors.',
  'genesis'
),
-- Game 2: Targeted Optimization
(
  14,
  2,
  '🔄',
  '📊',
  '🎯',
  'Repetitive Work',
  'Data Cleaning',
  'Targeted Optimization',
  'Decision-Making Game',
  'c',
  'AI updates itself (🔄), tracks performance (📊), and aims for accuracy (🎯).',
  'Fine-tuning AI to get closer to the target outcome.',
  'genesis'
),
-- Game 3: Optimizing AI Model
(
  14,
  3,
  '🧠',
  '📉',
  '⚙️',
  'Hardware Maintenance',
  'Neural Network',
  'Optimizing AI Model',
  'Memory Training',
  'c',
  'The AI brain uses error signals (📉) and logic operations (⚙️) to improve its performance.',
  'Gradient Descent in neural networks adjusting weights after evaluating loss.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'easy',
  'Unscramble the word: T M I I Z O P E',
  'The act of improving AI performance by reducing errors.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21JumbledEasy.png',
  'OPTIMIZE',
  'To optimize means to make something better — AI optimizes to improve accuracy and reduce mistakes.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'medium',
  'Unscramble the word: S S O L',
  'What AI tries to minimize during training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21JumbledMed.png',
  'LOSS',
  'The loss tells the AI how far off its predictions are from the correct answer — less loss = better performance.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'hard',
  'Unscramble the word: D G R I A N T E T N S C E E',
  'A method AI uses to reduce loss and update weights.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21JumbledHard.png',
  'GRADIENT DESCENT',
  'Gradient Descent is a fundamental optimization algorithm that adjusts AI model weights to minimize loss.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'easy',
  'What is the process used to reduce errors in AI?',
  'Optimization helps AI reduce errors and make better predictions by improving its internal settings.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21PerfectEasy.png',
  'Optimization',
  'Optimization improves AI results by adjusting model parameters to reduce mistakes.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'medium',
  'What is the numerical value showing how wrong an AI model is?',
  'This value guides how much the AI needs to adjust during training to improve.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21PerfectMed.png',
  'Loss',
  'AI tries to minimize the loss — the measure of how far off its predictions are from the correct answer.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'hard',
  'What technique allows the AI to minimize the loss function?',
  'This algorithm helps AI learn by adjusting weights step-by-step to reduce error.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21PerfectHard.png',
  'Gradient Descent',
  'Gradient Descent is a key algorithm in machine learning that helps reduce the loss function during training.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'easy',
  '_ P _ _ M _ Z _',
  'What AI does to perform better.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MissingEasy.png',
  'OPTIMIZE',
  'AI improves through optimization.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'medium',
  '_ _ S S',
  'AI wants to reduce this during learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MissingMed.png',
  'LOSS',
  'Lower loss = better model.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  14,
  'hard',
  'G _ _ _ _ _ _ T D _ _ _ _ _ T',
  'Optimization method that updates weights using slope direction.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MissingHard.png',
  'GRADIENT DESCENT',
  'Guides AI step-by-step toward accuracy.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  14,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemEasy6.png" }
  ]',
  'Match basic concepts related to optimization like improvement, accuracy, feedback, and better predictions.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  14,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemMed8.png" }
  ]',
  'Match terms like loss function, weights, feedback, and gradient steps to reinforce understanding of optimization logic.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  14,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day21MemHard10.png" }
  ]',
  'Master optimization mechanisms by matching terms like gradient descent, backpropagation, learning rate, and optimizers.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(14, 'options',
 'What is the main goal of optimization in machine learning?',
 'To make the dataset larger',
 'To randomize predictions',
 'To reduce errors and improve accuracy',
 'To increase model complexity',
 'To reduce errors and improve accuracy',
 30,
 'genesis'),

-- Question 2
(14, 'options',
 'What does the model update during the optimization process?',
 'Its training data',
 'The programming code',
 'The weights and biases',
 'The dataset labels',
 'The weights and biases',
 30,
 'genesis'),

-- Question 3
(14, 'options',
 'What is the role of the loss function in optimization?',
 'It cleans the input data',
 'It shows how accurate the predictions are',
 'It guides the model on how far off its predictions are',
 'It stores previous predictions',
 'It guides the model on how far off its predictions are',
 30,
 'genesis'),

-- Question 4
(14, 'options',
 'Which of the following is a common algorithm used in optimization?',
 'Random Forest',
 'Gradient Descent',
 'K-Means Clustering',
 'Principal Component Analysis',
 'Gradient Descent',
 30,
 'genesis'),

-- Question 5
(14, 'options',
 'What can happen if the optimization step size (learning rate) is too large?',
 'The model will learn faster and better',
 'The model may overshoot and never converge',
 'The dataset will get corrupted',
 'The accuracy will immediately improve',
 'The model may overshoot and never converge',
 30,
 'genesis');

                     --DAY=15(22)

INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  15,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay22.png',
  '🔍 EDA: The AI Detective is First Step',
  '<p>Exploratory Data Analysis (EDA) is the crucial first step before building any AI or ML model. It’s like being a data detective — observing, cleaning, and visualizing to understand the story your dataset is trying to tell.</p><p>With EDA, we spot missing values, outliers, patterns, and relationships. Instead of blindly feeding data into a model, EDA helps us ask better questions — and prepare cleaner, smarter data for training.</p>',
  '<ul>
    <li>👨‍⚕️ A doctor reviewing lab test trends before diagnosis</li>
    <li>🏦 A banker checking if age affects loan approval</li>
    <li>🌍 A climate researcher visualizing temperature changes over decades</li>
  </ul>',
  '📊 The “boxplot,” one of the most famous EDA tools, was invented by John Tukey in the 1970s — and it’s still widely used today!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'EDA was pioneered by statistician John Tukey in 1977. He argued that exploring data visually was just as important as mathematical modeling — and he was right!',
  'Today, tools like Seaborn, Plotly, and Tableau allow AI engineers to perform EDA in seconds — turning raw tables into insight-rich visuals.',
  'Soon, AI tools will automatically run EDA and highlight key patterns, anomalies, and even suggest preprocessing steps — making human-AI collaboration even faster.',
  'In finance and healthcare, automated EDA is being used to detect risks, fraud, and disease outbreaks by spotting unusual patterns early on.',
  15,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🔎 What is EDA in AI?',
  'EDA stands for Exploratory Data Analysis. It’s the process of understanding and preparing your dataset before feeding it into a model. You identify trends, outliers, missing values, and relationships among variables.\n\nCore Concepts:\n- EDA: Exploring and summarizing data visually and statistically\n- Histogram: A plot that shows how values are distributed\n- Boxplot: A visual that helps detect outliers and spread\n- Correlation: Measures how two variables are related\n- Missing Data: Blank or null entries that need to be handled before modeling\n\n📌 Why It Matters:\n✅ Helps detect errors or anomalies\n✅ Identifies patterns, relationships, and trends\n✅ Guides proper preprocessing (like imputation, encoding)\n✅ Makes models more accurate and trustworthy\n\n📌 Use Cases:\n✅ Predicting student performance\n✅ Analyzing customer churn\n✅ Detecting anomalies in weather patterns\n✅ Healthcare diagnosis analysis\n✅ Social media engagement prediction',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+22+(EDA).mp4',
  15,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  15,
  'What is the purpose of EDA?',
  'To build neural networks',
  'To predict outcomes directly',
  'To understand and visualize data',
  'To encode text into numbers',
  'C',
  'genesis'
),
(
  15,
  'Which of the following is a common EDA tool?',
  'Backpropagation',
  'Confusion matrix',
  'Boxplot',
  'Tokenization',
  'C',
  'genesis'
),
(
  15,
  'What is meant by “missing values” in EDA?',
  'Data entries that are blank or null',
  'Values that are incorrect',
  'Duplicated data points',
  'Extra columns in a dataset',
  'A',
  'genesis'
),
(
  15,
  'Why is correlation important in EDA?',
  'It always predicts output',
  'It detects overfitting',
  'It shows how two variables relate',
  'It adds new features',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  15,
  '🎯 OPTIMIZER QUEST: Guide the AI to the Best Answer',
  '📉 Loss Minimization & Model Training',
  'Kapwing (for animation/video creation)',
  'Explain how Optimization helps AI learn by minimizing errors. Use visual storytelling to describe how models adjust to find the best solution.\n\n🪜 Instructions:\nOpen Kapwing and create a short explainer video or animated presentation.\n\nBreak it into 3–4 scenes:\n- Scene 1: What is Optimization in AI?\n  “It’s like helping the AI take the shortest path to the correct answer.”\n- Scene 2: Visualize a loss curve (e.g., a ball rolling down a hill to reach the lowest point — the optimal solution).\n- Scene 3: Mention Gradient Descent (the most common optimization technique) briefly.\n- Scene 4: Real-world example (e.g., AI adjusting weights to correctly recognize handwritten numbers).\n\nUse text animations, image uploads (optional), and a clean, concise script (voiceover or text-based).\n\n🔍 Reflection Questions:\n- What does “optimization” mean in simple terms?\n- How does minimizing error affect predictions?\n- What challenges might arise during optimization (e.g., stuck at local minima)?\n\n🎓 Key Takeaway:\nOptimization is the brain of learning. It ensures that every mistake teaches the AI how to get better, step by step.\n\n🪙 Bonus Challenge:\n📤 Submit your Kapwing video explaining AI Optimization\n🏆 Earn 50 Skill Points and the “Loss Slayer” Badge!',
  'https://www.kapwing.com/ai',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/9XE-logo-small.webp',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  15,
  1,
  '🧠',
  '📉',
  '🎯',
  'Goal Setting',
  'Performance Drop',
  'Optimization',
  'Data Strategy',
  'c',
  'Optimization helps AI (🧠) reduce error (📉) and reach the best possible performance (🎯).',
  'Fine-tuning improves accuracy by reducing loss.',
  'genesis'
),
-- Game 2
(
  15,
  2,
  '🔧',
  '📊',
  '⬆️',
  'Data Cleaning',
  'Optimization',
  'Graph Scaling',
  'Data Tuning',
  'b',
  'Optimization involves tweaking (🔧) the model to improve performance metrics (📊⬆️).',
  'Like adjusting weights to increase prediction accuracy.',
  'genesis'
),
-- Game 3
(
  15,
  3,
  '🪜',
  '📈',
  '🏁',
  'Progress Bar',
  'Model Testing',
  'Optimization',
  'Result Tracking',
  'c',
  'Optimization is the step-by-step process (🪜) of improving model results (📈) until reaching the goal (🏁).',
  'Just like training AI one epoch at a time.',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'easy',
  'Unscramble the word: M T I I Z E O O P N',
  'The goal of training — improving model performance by minimizing loss.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22JumbledEasy.png',
  'OPTIMIZATION',
  'Optimization is the process of adjusting weights and parameters to improve the model’s performance.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'medium',
  'Unscramble the word: S O L S',
  'What optimization tries to reduce.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22JumbledMed.png',
  'LOSS',
  'Loss measures the difference between predicted and actual values — optimization works to minimize it.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'hard',
  'Unscramble the word: G R D T A N E I E D T S C E N',
  'A common optimization algorithm used in AI.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22JumbledHard.png',
  'GRADIENT DESCENT',
  'Gradient descent is the most widely used optimization algorithm in machine learning.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'easy',
  'What is the process of improving a machine learning model called?',
  'Optimization fine-tunes the model by adjusting parameters to improve performance.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22PerfectEasy.png',
  'Optimization',
  'Optimization improves model performance by reducing errors through parameter tuning.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'medium',
  'What function does the model try to minimize during training?',
  'The loss function measures error — optimizing the model means reducing this loss.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22PerfectMed.png',
  'Loss Function',
  'AI models minimize the loss function to improve accuracy — it shows how wrong predictions are.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'hard',
  'Which algorithm updates model weights by moving in the direction of steepest loss reduction?',
  'Gradient Descent reduces loss by adjusting weights in small steps toward the minimum.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22PerfectHard.png',
  'Gradient Descent',
  'Gradient Descent is a key optimization algorithm that adjusts weights based on the loss function gradient.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'easy',
  'O _ _ _ _ _ _ _ _ _ N',
  'The process of making the model perform better.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MissingEasy.png',
  'OPTIMIZATION',
  'Optimization is a key part of training, improving model accuracy over time.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'medium',
  'L _ _ _',
  'What optimization aims to minimize.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MissingMed.png',
  'LOSS',
  'Loss tells us how far off our predictions are — the lower, the better.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  15,
  'hard',
  'G _ _ _ _ _ _ D _ _ _ _ _ T',
  'Algorithm used to reduce error and improve performance.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MissingHard.png',
  'GRADIENT DESCENT',
  'This algorithm is used to optimize parameters and reduce loss step by step.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  15,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemEasy6.png" }
  ]',
  'Match basic EDA concepts like trends, outliers, missing values, and relationships to reinforce learning.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  15,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemMed8.png" }
  ]',
  'Match visuals representing boxplots, histograms, correlation, missing values, and other EDA insights.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  15,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day22MemHard10.png" }
  ]',
  'Match deeper EDA tools like multivariate plots, heatmaps, boxplots, imputation icons, and data profiling symbols.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(15, 'options',
 'What is the main goal of Exploratory Data Analysis (EDA)?',
 'To build predictive models',
 'To clean the data only',
 'To summarize and visualize data to uncover patterns',
 'To test model accuracy',
 'To summarize and visualize data to uncover patterns',
 30,
 'genesis'),

-- Question 2
(15, 'options',
 'Which tool is commonly used during EDA for visualization?',
 'Jupyter Lab',
 'Matplotlib or Seaborn',
 'TensorFlow',
 'PyTorch',
 'Matplotlib or Seaborn',
 30,
 'genesis'),

-- Question 3
(15, 'options',
 'What kind of insights does EDA help to discover?',
 'Learning rates',
 'Data storage formats',
 'Missing values, outliers, trends, and relationships',
 'Model weights',
 'Missing values, outliers, trends, and relationships',
 30,
 'genesis'),

-- Question 4
(15, 'options',
 'What is a box plot used for in EDA?',
 'Displaying network layers',
 'Visualizing text data',
 'Showing data distribution and detecting outliers',
 'Reducing dimensionality',
 'Showing data distribution and detecting outliers',
 30,
 'genesis');



-- Day=16(23)

INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  16,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay23.png',
  '📉 Gradient Descent: The Engine of AI Learning',
  '<p>Gradient Descent is a fundamental optimization algorithm used in machine learning. It helps models learn by reducing error step by step. Think of it like a ball rolling downhill to reach the lowest point — the place of least error.</p><p>In AI training, the model uses gradient descent to adjust its internal settings (weights) so that predictions become more accurate with each step.</p>',
  '<ul>
    <li>🔁 AI fine-tuning predictions after seeing each example</li>
    <li>🗺️ Google Maps optimizing routes by minimizing travel time</li>
    <li>🤖 ChatGPT improving responses by reducing prediction error during training</li>
    <li>📺 Recommendation engines adjusting based on feedback</li>
  </ul>',
  '📐 The idea behind Gradient Descent is over 150 years old and originally came from calculus!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Gradient Descent was formalized in 1847 by mathematician Augustin-Louis Cauchy — making it one of the oldest algorithms still powering modern AI.',
  'Even the largest models like GPT and BERT rely on mini-batch gradient descent to learn billions of parameters!',
  'Future AI may combine gradient descent with reinforcement learning to optimize in real-time environments like robotics and autonomous driving.',
  'New versions of gradient descent like Adam, RMSprop, and AdaGrad are being developed to accelerate training in massive neural networks.',
  16,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 How Does Gradient Descent Work?',
  'Gradient Descent is an iterative process to minimize the model’s error by adjusting weights and biases based on the direction and size of error.\n\nCore Concepts:\n- Loss Function: Measures how wrong the prediction is\n- Gradient: The slope or direction the model should move in\n- Learning Rate: How big a step the model takes each time\n- Epochs: Full passes over the data to refine the model\n- Variants: Batch, Mini-Batch, Stochastic Gradient Descent\n\n📌 Use Cases:\n✅ Training neural networks\n✅ Logistic and linear regression\n✅ Natural language processing\n✅ Real-time personalization engines\n✅ Financial forecasting models',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+DAY+23+(Gradient+descent).mp4',
  16,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  16,
  'What is the main purpose of gradient descent in machine learning?',
  'Display visual outputs',
  'Choose datasets randomly',
  'Minimize the loss function',
  'Maximize error for learning',
  'C',
  'genesis'
),
(
  16,
  'What does gradient descent update in a model?',
  'Dataset size',
  'Learning objective',
  'Weights and biases',
  'Data features',
  'C',
  'genesis'
),
(
  16,
  'What is a gradient in gradient descent?',
  'A fixed number of layers',
  'The slope of the loss function',
  'A training dataset',
  'The number of input features',
  'B',
  'genesis'
),
(
  16,
  'What happens if the learning rate is too high?',
  'The model learns faster with no problems',
  'The model may overshoot the minimum and never converge',
  'The loss reduces more accurately',
  'The model skips training altogether',
  'B',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  16,
  '🚀 Climb Down the Slope: Visualize Gradient Descent!',
  '📊 Data Plotting + Visualization',
  'Pine Tools – Graph Generator',
  'You are now an AI Training Scientist! Your mission is to simulate how a model learns by visualizing steps of Gradient Descent using a simple curve.\n\n🪜 Step-by-Step Instructions:\n- Open Pine Tools > Graph Generator\n- Plot a quadratic equation (e.g., y = x² + 2) to simulate a loss function\n- Select 3–4 points along the curve (e.g., x = -2, -1, 0, 1)\n- Mark how each step “descends” towards the lowest point (the minimum)\n- Download your graph and annotate it as “Gradient Descent Path”\n\n🔍 Reflect On:\n- What does each step on the graph represent in learning?\n- Why is moving in small steps better than jumping to the bottom?\n- How would the model behave if it had too large of a step size?\n\n🎓 Key Takeaway:\nGradient Descent helps AI \"learn\" by slowly adjusting and moving towards the lowest error — like walking downhill step by step.\n\n🪙 BONUS CHALLENGE:\nExplain your curve and upload your annotated graph to earn 50 AI Skill Points!',
  'https://pinetools.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/pinetools.webp',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  16,
  1,
  '📉',
  '🧠',
  '🔁',
  'Stock Forecasting',
  'Model Training',
  'Gradient Descent',
  'AI Feedback Loop',
  'c',
  'Gradient Descent helps AI (🧠) learn by repeating updates (🔁) to reduce error or loss (📉) during training.',
  'The model updates weights step-by-step during each iteration.',
  'genesis'
),
-- Game 2
(
  16,
  2,
  '🪜',
  '🎯',
  '📉',
  'Goal Setting',
  'Training Steps',
  'Gradient Descent',
  'Progress Tracking',
  'c',
  'Gradient Descent moves step-by-step (🪜) toward a goal (🎯) by reducing loss (📉) in each iteration.',
  'Similar to taking stairs down a hill to reach the lowest error.',
  'genesis'
),
-- Game 3
(
  16,
  3,
  '📊',
  '📍',
  '⬇️',
  'Chart Analysis',
  'Data Drop',
  'Gradient Descent',
  'Graph Trends',
  'c',
  'Gradient Descent finds the best direction (⬇️) by calculating the slope (📍) of a loss graph (📊) and adjusting the model accordingly.',
  'Like tracing the lowest slope to improve AI accuracy.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'easy',
  'Unscramble the word: T N E C D E S',
  'The direction an AI model moves to reduce error during training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23JumbledEasy.png',
  'DESCENT',
  'Gradient descent moves "downhill" on a loss curve to find the lowest point.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'medium',
  'Unscramble the word: R A G D I E N T',
  'The slope or direction used to update model weights.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23JumbledMed.png',
  'GRADIENT',
  'A gradient shows the rate of change of the loss with respect to weights — guiding updates.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'hard',
  'Unscramble the word: T N E I A R D G D C S E E N T',
  'The optimization algorithm used to minimize loss in model training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23JumbledHard.png',
  'GRADIENT DESCENT',
  'Gradient descent is used to minimize a model’s loss by updating parameters iteratively.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'easy',
  'What is the method called that helps a model minimize error over time?',
  'Gradient descent reduces error by adjusting weights in small steps over iterations.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23PerfectEasy.png',
  'Gradient Descent',
  'Gradient descent reduces error by moving step-by-step down a loss curve.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'medium',
  'What provides the direction in which model parameters are updated?',
  'A gradient shows the direction of steepest loss reduction, guiding weight updates.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23PerfectMed.png',
  'Gradient',
  'A gradient shows which way to adjust weights to decrease the loss.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'hard',
  'What term describes the difference between the model is prediction and actual value that gradient descent tries to reduce?',
  'The loss tells how wrong the prediction is — the model reduces it to improve.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23PerfectHard.png',
  'Loss',
  'Loss measures prediction errors — gradient descent minimizes this over time.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'easy',
  '_ E _ _ E N _',
  'A direction that moves toward minimizing error.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MissingEasy.png',
  'DESCENT',
  'Descent refers to moving downward — key to reducing error in gradient descent.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'medium',
  'G _ _ _ I _ _ T',
  'This tells the model how to change weights.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MissingMed.png',
  'GRADIENT',
  'Gradients are derivatives that show the steepest descent direction.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  16,
  'hard',
  'G _ _ _ _ _ _ D _ _ _ _ _ T',
  'Optimization algorithm that helps reduce loss.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MissingHard.png',
  'GRADIENT DESCENT',
  'This core algorithm helps optimize neural networks by minimizing the loss function.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  16,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemEasy6.png" }
  ]',
  'Match basic gradient descent elements such as slope, steps, and training indicators.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  16,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemMed8.png" }
  ]',
  'Match visual concepts like error reduction, step size, learning curves, and loss plots.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  16,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day23MemHard10.png" }
  ]',
  'Match advanced visuals like learning rate decay, loss function curvature, convergence paths, and batch updates.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(16, 'options',
 'What is gradient descent used for in machine learning?',
 'To increase dataset size',
 'To reduce the model accuracy',
 'To minimize the loss function',
 'To store training data',
 'To minimize the loss function',
 30,
 'genesis'),

-- Question 2
(16, 'options',
 'What does the gradient represent in gradient descent?',
 'The number of epochs',
 'The direction and rate of steepest increase',
 'The direction and rate of steepest decrease',
 'The total loss',
 'The direction and rate of steepest decrease',
 30,
 'genesis'),

-- Question 3
(16, 'options',
 'What is a potential issue with a very small learning rate?',
 'Overshooting the minimum',
 'Slower convergence',
 'Model underfitting',
 'Increased accuracy',
 'Slower convergence',
 30,
 'genesis'),

-- Question 4
(16, 'options',
 'Which variation of gradient descent uses the entire dataset for one update?',
 'Mini-batch gradient descent',
 'Stochastic gradient descent',
 'Batch gradient descent',
 'Randomized descent',
 'Batch gradient descent',
 30,
 'genesis');

-- Day=17(24)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  17,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay24.png',
  '🔁 Epoch: The Learning Cycle of AI Models',
  '<p>In machine learning, an Epoch is one full pass through the entire training dataset. Every time an AI model sees all the training data once and updates itself, that counts as one epoch.</p><p>AI doesn’t learn everything in one go — just like students revise topics multiple times to understand better, AI needs multiple epochs to spot patterns and reduce error.</p>',
  '<ul>
    <li>📝 A handwriting recognition model sees 10,000 digit images once = 1 epoch</li>
    <li>💬 A chatbot training on conversations does 20 epochs to improve response accuracy</li>
    <li>👁️ A face detection model refines itself over 50 epochs to get precise outputs</li>
  </ul>',
  '📚 Most deep learning models are trained over 50 to 100 epochs, depending on complexity. More epochs = better learning… to a point!',
  'genesis'
);

INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The term “epoch” comes from the Greek word “epochē,” meaning a fixed point in time — perfect for marking a single training cycle!',
  'Training models like GPT use hundreds of epochs with billions of words, improving slightly with each pass.',
  'Future AI models might adjust epoch counts automatically based on real-time performance instead of fixed numbers.',
  'AutoML and cloud platforms now optimize epoch count dynamically to avoid underfitting (too few epochs) and overfitting (too many epochs).',
  17,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 What Is an Epoch in Machine Learning?',
  'An epoch is one round of training where the AI model sees all of the training data once and adjusts its internal parameters (like weights and biases) to reduce error.\n\nCore Concepts:\n🔄 Epoch: One full cycle through the training dataset\n📉 Loss Reduction: Models aim to reduce error a bit more each epoch\n⏳ Training Time: More epochs = longer training time\n🚨 Overfitting Risk: Too many epochs can cause the model to memorize instead of generalize\n\nRelated Terms:\n- Batch Size: Number of data samples the model sees at once\n- Iterations: Total number of batch updates in one epoch\n- Early Stopping: A technique to stop training when improvement stalls\n\n📌 Use Cases:\n✅ Image classification\n✅ Sentiment analysis\n✅ Stock prediction\n✅ Virtual assistants\n✅ Fraud detection',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+DAY+24+(Epoch).mp4',
  17,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  17,
  'What is an epoch in machine learning?',
  'One update to the model weights',
  'One forward pass for a single input',
  'One full pass through the training data',
  'A function used to measure error',
  'C',
  'genesis'
),
(
  17,
  'Why do AI models train over multiple epochs?',
  'To increase dataset size',
  'To improve learning and reduce errors',
  'To delete irrelevant data',
  'To reset weights each time',
  'B',
  'genesis'
),
(
  17,
  'What can happen if the number of epochs is too high?',
  'The model trains faster',
  'The model learns better',
  'The model overfits the training data',
  'The dataset becomes larger',
  'C',
  'genesis'
),
(
  17,
  'If a dataset has 10,000 samples and batch size is 1, how many iterations per epoch?',
  '10',
  '100',
  '1,000',
  '10,000',
  'D',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  17,
  '🔁 Loop it Right: One Epoch at a Time!',
  '✍️ Text Monitoring + Analytics',
  'Slick Write – Writing Analyzer',
  'You’re now a Text AI Trainer. Imagine you are training an AI on grammar and clarity — and one full pass through the text is called one epoch!\n\n🪜 Step-by-Step Instructions:\n- Choose a short 100-word paragraph\n- Run it through Slick Write (1st pass = Epoch 1)\n- Edit the errors based on suggestions (1st learning step)\n- Run the edited version again (Epoch 2), and repeat\n- Save all versions to observe improvement after each "epoch"\n\n🔍 Reflect On:\n- What changed from Epoch 1 to Epoch 2?\n- Did the system improve at each stage?\n- What if we stopped after just 1 epoch?\n\n🎓 Key Takeaway:\nAn epoch is one full cycle of learning through all data. Repeating epochs helps models improve over time!\n\n🪙 BONUS CHALLENGE:\nUpload your paragraph edits across 3 epochs and earn 50 Skill Points!',
  'https://www.slickwrite.com/#!home',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/slick-write_53189.webp',
  'genesis'
);

INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  17,
  1,
  '⏱️',
  '📊',
  '🔁',
  'Stopwatch Loop',
  'Epoch',
  'Time Series',
  'Cycle Testing',
  'b',
  'An Epoch is one full cycle (🔁) through the entire dataset (📊), often measured in time (⏱️) during training.',
  'Each epoch completes one full pass of training data.',
  'genesis'
),
-- Game 2
(
  17,
  2,
  '🧠',
  '👣',
  '📈',
  'Learning Curve',
  'Step-by-Step Training',
  'Epoch',
  'Practice Rounds',
  'c',
  'In each epoch, the model (🧠) takes steps (👣) to improve its performance (📈) on the training data.',
  'Training progresses step-by-step in each epoch.',
  'genesis'
),
-- Game 3
(
  17,
  3,
  '🔁',
  '📚',
  '📦',
  'Looping Dataset',
  'Repetition Memory',
  'Epoch',
  'Iteration Box',
  'c',
  'An epoch means looping (🔁) over all the training data (📚📦) once to adjust the model.',
  'A complete pass through a dataset defines an epoch.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'easy',
  'Unscramble the word: C H O P E',
  'One full pass through the entire training dataset.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24JumbledEasy.png',
  'EPOCH',
  'An epoch is one complete cycle through the training data, during which the model learns and updates.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'medium',
  'Unscramble the word: N I R A E T T A O I',
  'Data shown again after each epoch.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24JumbledMed.png',
  'ITERATION',
  'Iterations are the steps within an epoch — one update per batch of data.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'hard',
  'Unscramble the word: G N N R I A A E E T I L',
  'When the model keeps improving over time with more epochs.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24JumbledHard.png',
  'GENERALIZATION',
  'Generalization means the model is learning well enough to perform accurately on unseen data — improved through good training over epochs.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'easy',
  'What do we call one complete pass through the entire training dataset?',
  'Each epoch allows the model to learn from all available data once.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24PerfectEasy.png',
  'Epoch',
  'Each epoch allows the model to learn from all available data once.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'medium',
  'What is a single update of weights using a small batch of data?',
  'Each iteration processes one batch of data, and multiple iterations make up one epoch.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24PerfectMed.png',
  'Iteration',
  'Each iteration processes one batch of data, and multiple iterations make up one epoch.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'hard',
  'What term describes how well a model performs on new, unseen data after training?',
  'Generalization shows that the model is not just memorizing — it’s actually learning patterns that apply to new data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24PerfectHard.png',
  'Generalization',
  'Generalization shows that the model is not just memorizing — it’s actually learning patterns that apply to new data.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'easy',
  '_ _ O _ H',
  'One complete round through the training dataset.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MissingEasy.png',
  'EPOCH',
  'An epoch is a full training cycle over the dataset.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'medium',
  '_ _ T _ _ A _ _ O _',
  'A smaller update step within an epoch.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MissingMed.png',
  'ITERATION',
  'Each iteration updates the model using a mini-batch, and multiple iterations make up an epoch.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  17,
  'hard',
  'G _ _ _ _ _ _ _ _ _ _ N',
  'The ability of a trained model to perform well on new data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MissingHard.png',
  'GENERALIZATION',
  'Generalization is the goal — training the model to work well beyond just the training data.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  17,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemEasy6.png" }
  ]',
  'Match visual clues related to epochs such as full training passes, loop symbols, and improvement cycles.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  17,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemMed8.png" }
  ]',
  'Match icons showing epochs, iteration updates, loop cycles, and training feedback representations.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  17,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day24MemHard10.png" }
  ]',
  'Match higher-level elements such as generalization curves, validation steps, loss tracking, and full training loops.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(17, 'options',
 'What does one epoch mean in machine learning?',
 'One step of gradient update',
 'One complete pass over the entire training dataset',
 'One batch of training samples',
 'One layer in the model',
 'One complete pass over the entire training dataset',
 30,
 'genesis'),

-- Question 2
(17, 'options',
 'How does increasing epochs generally affect training?',
 'Decreases learning rate',
 'Reduces dataset size',
 'Improves learning up to a point',
 'Removes overfitting',
 'Improves learning up to a point',
 30,
 'genesis'),

-- Question 3
(17, 'options',
 'What is early stopping related to epochs?',
 'Training is stopped after one epoch',
 'Training continues forever',
 'Stopping training when performance on validation data stops improving',
 'Stopping when loss reaches 0',
 'Stopping training when performance on validation data stops improving',
 30,
 'genesis'),

-- Question 4
(17, 'options',
 'What could happen with too few epochs?',
 'Overfitting',
 'Underfitting',
 'Model convergence',
 'Biased sampling',
 'Underfitting',
 30,
 'genesis');

-- Day=18(25)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  18,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay25.png',
  '📚 Dataset: The Foundation of AI Learning',
  '<p>A dataset is a collection of data used to train or test an AI model. It’s the raw material that feeds the AI — just like a textbook for a student.</p><p>Each dataset usually has multiple examples (rows) and features (columns). Datasets can include images, text, numbers, audio, or a mix of all — depending on what the AI model is trying to learn.</p>',
  '<ul>
    <li>✅ A folder of labeled cat and dog photos</li>
    <li>✅ A spreadsheet of movie reviews with ratings</li>
    <li>✅ A CSV file of customer purchases with age, amount, and location</li>
    <li>✅ A transcript of chatbot conversations</li>
  </ul>',
  '📦 The ImageNet dataset has over 14 million images across 20,000+ categories — it played a huge role in training deep learning models!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The Iris dataset (1936) is one of the first known datasets used for classification problems in statistics and ML — still used today for learning!',
  'GPT models like ChatGPT are trained on text datasets with over 300 billion words!',
  'Datasets will soon include real-time sensory data from IoT, wearables, and smart devices — feeding AI models as they evolve live.',
  'AI ethics discussions now focus on curating clean, unbiased, and consent-based datasets to avoid discrimination and misinformation.',
  18,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 What is a Dataset in Machine Learning?',
  'A dataset is a structured collection of examples that an AI model uses to learn or validate its performance. Datasets are at the heart of every machine learning system.\n\nCore Concepts:\n📂 Dataset: A group of data points (rows) and features (columns)\n🔖 Labeled Dataset: Contains correct outputs (e.g., "spam" or "not spam")\n🔍 Unlabeled Dataset: Only has inputs — used in unsupervised learning\n🧪 Test Dataset: Used to evaluate the model after training\n📊 Training Dataset: Used to teach the model\n\nPopular AI Datasets:\n- MNIST – Handwritten digits (images)\n- COCO – Object detection\n- CIFAR-10 – Tiny labeled image dataset\n- IMDB – Movie review sentiments\n- Common Crawl – Massive web text dataset\n\nUse Cases:\n✅ Face recognition\n✅ Language translation\n✅ Stock forecasting\n✅ Chatbots\n✅ Disease detection',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+learning+Day+26+(Samplin).mp4',
  18,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  18,
  'What is a dataset in machine learning?',
  'The final output of a model',
  'A single image or number',
  'A collection of training/testing examples',
  'A block of code',
  'C',
  'genesis'
),
(
  18,
  'What is a labeled dataset?',
  'A dataset with hidden data',
  'A dataset used in unsupervised learning',
  'A dataset with correct outputs provided',
  'A dataset with no features',
  'C',
  'genesis'
),
(
  18,
  'Why are datasets important in AI?',
  'They shorten training time',
  'They help design user interfaces',
  'They allow the AI to learn from examples',
  'They reduce storage needs',
  'C',
  'genesis'
),
(
  18,
  'What type of dataset is used after model training to measure accuracy?',
  'Training dataset',
  'Test dataset',
  'Source dataset',
  'Noise dataset',
  'B',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  18,
  '📚 Curate It Right: Build Your Dataset of Texts!',
  '🧾 Text Curation',
  'Edit Pad – Online Notepad',
  'Become a Dataset Curator Agent. You’ll build a mini-text dataset for training a text-based AI.\n\n🪜 Step-by-Step Instructions:\n- Pick a theme (e.g., Animals, Space, Food)\n- Gather 5 short texts (2–3 lines each) related to that theme\n- Paste them into Edit Pad\n- Add labels to each (e.g., "Fact," "Question," "Story")\n- Save or copy your final mini-dataset\n\n🔍 Reflect On:\n- What types of data did you include?\n- How can labeling help an AI learn?\n- What happens if you mix themes randomly?\n\n🎓 Key Takeaway:\nA dataset is a collection of examples used to train models — organizing and labeling them is key to smart learning!\n\n🪙 BONUS CHALLENGE:\nSubmit your labeled dataset and earn 50 Skill Points for completing the dataset mission!',
  'https://www.editpad.org/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/editpadlogo.png',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  18,
  1,
  '📁',
  '🖼️',
  '🏷️',
  'File Tags',
  'Dataset',
  'Gallery Archive',
  'Image Metadata',
  'b',
  'A dataset is a collection (📁) of labeled images (🖼️🏷️) used to train AI.',
  'A dataset is a collection of labeled images used to train AI.',
  'genesis'
),
-- Game 2
(
  18,
  2,
  '📦',
  '📑',
  '📊',
  'Report Box',
  'Data Inventory',
  'Dataset',
  'Labeling Tool',
  'c',
  'A dataset includes stored (📦), structured (📑), and measurable data (📊) for machine learning.',
  'A dataset is stored, structured, measurable data used for AI training.',
  'genesis'
),
-- Game 3
(
  18,
  3,
  '🧠',
  '📚',
  '📥',
  'Data Download',
  'Dataset',
  'Knowledge Upload',
  'Digital Library',
  'b',
  'A dataset is the input (📥) that trains the AI brain (🧠) using structured knowledge (📚).',
  'A dataset is the input that trains AI using structured knowledge.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'easy',
  'Unscramble the word: T A D A S E',
  'A collection of data used to train or evaluate AI models.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25JumbledEasy.png',
  'DATASET',
  'A dataset is a structured collection of data used for machine learning, like training and testing sets.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'medium',
  'Unscramble the word: G I N T S T E',
  'A dataset used to evaluate model performance.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25JumbledMed.png',
  'TESTING',
  'A testing dataset is separate from training data and is used to evaluate how well the model performs on unseen data.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'hard',
  'Unscramble the word: V D A A I A A L T I N O',
  'A dataset used to fine-tune model hyperparameters.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25JumbledHard.png',
  'VALIDATION DATA',
  'Validation data helps monitor the model during training and is used to tune parameters without overfitting.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'easy',
  'What is the collection of examples that machine learning models learn from?',
  'A dataset is the input source for training, validation, and testing in AI development.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25PerfectEasy.png',
  'Dataset',
  'A dataset is the input source for training, validation, and testing in AI development.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'medium',
  'What dataset is used to evaluate a model’s performance on unseen data?',
  'A test set helps determine how well the model generalizes to data it hasn’t seen before.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25PerfectMed.png',
  'Test Set',
  'A test set helps determine how well the model generalizes to data it hasn’t seen before.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'hard',
  'Which dataset is used to tune model hyperparameters during training?',
  'A validation set is used to tweak model settings while keeping the test set untouched.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25PerfectHard.png',
  'Validation Set',
  'A validation set is used to tweak model settings while keeping the test set untouched.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'easy',
  'D _ _ A _ _',
  'What we give to a model to learn from.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MissingEasy.png',
  'DATASET',
  'A dataset contains the structured examples for training, validating, or testing AI models.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'medium',
  '_ _ S _ _ _ G',
  'Dataset used to measure model performance after training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MissingMed.png',
  'TESTING',
  'The testing set helps determine how well the model performs on new, unseen examples.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  18,
  'hard',
  '_ _ _ _ _ _ _ _ _ _ _ _ _',
  'A dataset used to tune and monitor model performance during training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MissingHard.png',
  'VALIDATION DATA',
  'Validation data is used during training to tune the model without touching the final test set.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  18,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemEasy6.png" }
  ]',
  'Match visual clues related to datasets such as folders, labels, and structured data collections.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  18,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed8.png" }
  ]',
  'Match intermediate dataset concepts such as labeled data, data structure, and evaluation tools.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  18,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed7.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed7.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed8.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemMed8.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day25MemHard10.png" }
  ]',
  'Match advanced dataset concepts like data labeling, testing vs training data, and data organization visuals.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(18, 'options',
 'What is a dataset in machine learning?',
 'A model evaluation tool',
 'A structured collection of data samples',
 'A random number generator',
 'A set of algorithms',
 'B',
 30,
 'genesis'),

-- Question 2
(18, 'options',
 'What type of dataset is used to evaluate model performance?',
 'Training dataset',
 'Testing dataset',
 'Raw dataset',
 'Validation dataset',
 'B',
 30,
 'genesis'),

-- Question 3
(18, 'options',
 'What is an important feature of a good dataset?',
 'High randomness',
 'Uniform labels only',
 'Accuracy, relevance, and sufficient size',
 'Noise and outliers',
 'C',
 30,
 'genesis'),

-- Question 4
(18, 'options',
 'What is the role of labels in supervised learning datasets?',
 'To reduce training time',
 'To speed up sampling',
 'To provide target outputs the model learns to predict',
 'To create new models',
 'C',
 30,
 'genesis');


-- Day=19(26)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  19,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay26.png',
  'Sampling: Picking Smart Subsets for AI Training',
  '<p>Sampling is the process of selecting a subset of data from a large dataset. This smaller sample is used to train or test an AI model when using the full dataset is too costly or unnecessary.</p><p>It helps AI models train faster, reduces memory needs, and can improve generalization — if done correctly!</p>',
  '<ul>
    <li>✅ A company picks 10,000 out of 1 million product reviews for sentiment analysis</li>
    <li>✅ A face recognition model is trained on 1,000 randomly selected faces</li>
    <li>✅ A survey bot is trained on sampled user feedback instead of full logs</li>
  </ul>',
  'You don’t always need the whole dataset — with smart sampling, just 10% of the data can sometimes give 90% of the model’s performance!',
  'genesis'
);

INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Statistical sampling was widely used long before AI — dating back to the 1800s in population surveys!',
  'In machine learning, Mini-Batch Gradient Descent is a form of sampling — it updates the model using small samples at a time.',
  'AI systems may soon use adaptive sampling — choosing data in real time based on what the model still needs to learn.',
  'Sampling is critical for privacy-preserving AI — systems can train on anonymized, sampled data instead of full datasets.',
  19,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 What is Sampling in Machine Learning?',
  'Sampling means selecting a smaller group (subset) of data from a larger dataset to make training more efficient, manageable, and still effective.\n\nCore Concepts:\n\n📊 Random Sampling: Selecting data points randomly from the full dataset\n📌 Stratified Sampling: Sampling while maintaining the proportions of categories (e.g., same number of positive/negative labels)\n🔁 Systematic Sampling: Picking every k-th item in the list\n📈 Sampling Bias: Choosing data poorly can lead to unfair or inaccurate models\n\nWhy Use Sampling?\n\n✅ Speeds up training\n✅ Saves memory/computation\n✅ Allows quick model prototyping\n✅ Helps avoid overfitting (when done well)\n\nUse Cases:\n\n✅ Real-time ML on edge devices\n✅ Training with limited resources\n✅ A/B testing AI features\n✅ Crowdsourced data labeling\n✅ Simulations and forecasting',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+learning+Day+26+(Samplin).mp4',
  19,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  19,
  'What is sampling in machine learning?',
  'Writing new code for a model',
  'Selecting a smaller portion of data from a larger dataset',
  'Encrypting training data',
  'Testing the model on new data',
  'B',
  'genesis'
),
(
  19,
  'Why do we use sampling in AI?',
  'To create longer training times',
  'To increase model size',
  'To make training faster and more efficient',
  'To remove features from datasets',
  'C',
  'genesis'
),
(
  19,
  'Which of the following is a type of sampling?',
  'Layered learning',
  'Stratified sampling',
  'Label smoothing',
  'Feature shifting',
  'B',
  'genesis'
),
(
  19,
  'What happens if your sample is not representative of the full dataset?',
  'Training gets faster',
  'The model becomes biased',
  'The dataset becomes encrypted',
  'The model performs better',
  'B',
  'genesis'
);

INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  19,
  '🧪 Smart Selection: Create a Sample Set!',
  '📄 Smart Selection + Content Reduction',
  'Smodin.io – AI Summarizer & Text Picker',
  'You’re now a Data Scientist Agent! Your task is to sample a large dataset (text) and extract only the most important parts.\n\n🪜 Step-by-Step Instructions:\n- Find a long article or paragraph (150–200 words)\n- Paste it into Smodin’s summarizer\n- Choose to summarize it into just 5 lines\n- Label each summary point with keywords (e.g., "Intro", "Fact", "Insight")\n- Compare the summary with the original\n\n🔍 Reflect On:\n- What data was kept in the sample?\n- What got left out — and did it matter?\n- How would this affect model learning?\n\n🎓 Key Takeaway:\nSampling is about selecting the right examples, not all examples — it makes training fast and focused!\n\n🪙 BONUS CHALLENGE:\nUpload your summary and labels to collect 50 Skill Points!',
  'https://smodin.io/writer',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/smodin.png',
  'genesis'
);

INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  19,
  1,
  '🎯',
  '🎲',
  '🧪',
  'Testing Accuracy',
  'Experiment Setup',
  'Sampling',
  'Random Game',
  'c',
  'Sampling means selecting (🎯) random (🎲) subsets for experimentation (🧪) from a dataset.',
  'Sampling means selecting random subsets for experimentation.',
  'genesis'
),
-- Game 2
(
  19,
  2,
  '🧺',
  '📊',
  '🔍',
  'Data Collection',
  'Sampling',
  'Chart Sorting',
  'Targeted Search',
  'b',
  'Sampling is picking a small batch (🧺) from the dataset (📊) for close analysis (🔍).',
  'Sampling is picking a small batch from the dataset for analysis.',
  'genesis'
),
-- Game 3
(
  19,
  3,
  '📦',
  '✂️',
  '🎯',
  'Data Editing',
  'Precision Split',
  'Sampling',
  'Model Pruning',
  'c',
  'Sampling is slicing (✂️) a portion (📦) of data to focus on a specific goal (🎯) in training or testing.',
  'Sampling is slicing a portion of data to focus on a goal.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'easy',
  'Unscramble the word: P M A L S I G N',
  'The process of selecting a subset of data from a larger dataset.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26JumbledEasyMed.png',
  'SAMPLING',
  'Sampling is used to reduce data size or balance datasets by selecting representative portions.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'medium',
  'Unscramble the word: M O N A R D U',
  'A sampling method where every item has an equal chance of being chosen.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26JumbledEasyMed.png',
  'RANDOM',
  'Random sampling selects data points unpredictably and without bias, improving generalization.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'hard',
  'Unscramble the word: R T I I A S F E D',
  'Sampling where certain categories or classes are proportionally represented.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26JumbledHard.png',
  'STRATIFIED',
  'Stratified sampling ensures that each class or group in the data is proportionally included.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'easy',
  'What do we call the process of choosing a smaller group from a large dataset?',
  'Sampling lets us use a smaller but representative portion of the data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26PerfectMacthEasy.png',
  'Sampling',
  'Sampling lets us use a smaller but representative portion of the data.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'medium',
  'What kind of sampling gives every data point an equal chance of being picked?',
  'Random sampling is unbiased and helps create diverse, balanced datasets.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26PerfectMacthMed.png',
  'Random Sampling',
  'Random sampling is unbiased and helps create diverse, balanced datasets.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'hard',
  'Which sampling method ensures all classes are proportionally represented?',
  'Stratified sampling maintains the distribution of different categories, useful in classification tasks.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26PerfectMacthHard.png',
  'Stratified Sampling',
  'Stratified sampling maintains the distribution of different categories, useful in classification tasks.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'easy',
  '_ _ _ P _ _ _ G',
  'Selecting a portion of a dataset for training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MissingEasy.png',
  'SAMPLING',
  'Sampling helps reduce data load while maintaining representation.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'medium',
  'R _ _ _ _ M',
  'Unbiased way to pick data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MissingMed.png',
  'RANDOM',
  'Random sampling helps avoid patterns and ensures fairness in data selection.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  19,
  'hard',
  '_ _ _ _ _ _ _ _ D',
  'Ensures balanced class representation in your data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MissingHard.png',
  'STRATIFIED',
  'Stratified sampling is useful when you want to preserve class balance across data splits.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  19,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy3.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy6.png" }
  ]',
  'Match visual representations of sampled data, including selections and subsets from datasets.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  19,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed8.png" }
  ]',
  'Match images demonstrating sampling strategies such as random, systematic, and stratified sampling.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  19,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemHard10.png" }
  ]',
  'Match complex sampling ideas, like balancing datasets, preserving class proportions, and applying summarization methods.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(19, 'options',
 'What is sampling in the context of machine learning?',
 'Generating new features',
 'Selecting a representative subset of data',
 'Removing labels from data',
 'Duplicating all data points',
 'B',
 30,
 'genesis'),

-- Question 2
(19, 'options',
 'What is the benefit of random sampling?',
 'Increases training speed',
 'Reduces variance',
 'Avoids selection bias',
 'Ensures underfitting',
 'C',
 30,
 'genesis'),

-- Question 3
(19, 'options',
 'What is stratified sampling used for?',
 'To sample only random values',
 'To overfit the model',
 'To maintain the proportion of classes',
 'To sample sequentially',
 'C',
 30,
 'genesis'),

-- Question 4
(19, 'options',
 'Which sampling method selects data points based on a fixed interval?',
 'Random sampling',
 'Systematic sampling',
 'Stratified sampling',
 'Cluster sampling',
 'B',
 30,
 'genesis');

-- Day=20(27)

INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  20,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay27.png',
  'Distribution: How Data is Spread in AI',
  '<p>In AI and Machine Learning, distribution refers to how values in a dataset are spread out or arranged. Knowing the data’s distribution helps us choose the right models, preprocessing steps, and evaluation methods.</p><p>The most common one? The normal distribution, also known as the bell curve, where most values are around the average, and fewer values appear as we move away from the center.</p>',
  '<ul>
    <li>✅ Student test scores often follow a normal distribution</li>
    <li>✅ Clicks on ads may follow a skewed distribution (most people don’t click)</li>
    <li>✅ Daily temperatures have seasonal distributions</li>
  </ul>',
  'Over 68% of the data in a normal distribution lies within one standard deviation of the mean — that’s why it’s called the "68-95-99.7 rule!"',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The concept of normal distribution was developed by Carl Gauss in the early 1800s — it’s also called the Gaussian distribution in his honor.',
  'AI models like Naive Bayes assume certain feature distributions — that’s what makes them so fast and lightweight.',
  'AI systems will increasingly use real-time distribution tracking to adjust learning dynamically as the data shifts (called concept drift).',
  'Understanding data distribution shifts is a key part of AI fairness — many biases emerge when distributions change over time.',
  20,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🎓 What is Distribution in AI?',
  'A distribution in AI refers to the shape and pattern of how data values are spread. Understanding this helps in model selection, normalization, and avoiding bias.\n\nCore Concepts:\n\n📊 Normal Distribution: Symmetric bell curve — common in natural phenomena\n↘️ Skewed Distribution: More values on one side (left/right)\n🔼 Uniform Distribution: All values occur equally\n📉 Outliers: Data points far from the main group — affect the distribution\n⚠️ Distribution Shift: When the model sees new data that doesn’t match training data\n\nWhy It Matters:\n✅ Choosing the right algorithm\n✅ Better predictions\n✅ Smarter preprocessing (e.g., normalization or transformation)\n✅ Detecting anomalies or bias\n\nUse Cases:\n✅ Predictive analytics\n✅ Fraud detection\n✅ Stock market trends\n✅ Health monitoring systems\n✅ Customer segmentation',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+learning+Day+27+(Distribution).mp4',
  20,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  20,
  'What is data distribution in AI?',
  'A model’s accuracy chart',
  'The layout of UI in an AI dashboard',
  'The pattern in which data values are spread',
  'A pie chart of predictions',
  'C',
  'genesis'
),
(
  20,
  'What does a “normal distribution” look like?',
  'A straight line',
  'A bell-shaped curve',
  'A zigzag line',
  'A pie chart',
  'B',
  'genesis'
),
(
  20,
  'What is the problem if data distribution shifts between training and real-world data?',
  'The model adapts perfectly',
  'The accuracy improves',
  'The model may perform poorly',
  'The model stores more data',
  'C',
  'genesis'
),
(
  20,
  'Which of the following is NOT a type of data distribution?',
  'Normal',
  'Uniform',
  'Irregular',
  'Circular',
  'D',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  20,
  '📊 Know the Spread: Simulate a Data Distribution',
  '🔣 Random Pattern/Text Distribution',
  'TextFX – Pattern Generator Tool',
  'Act as an AI Data Analyst Agent and simulate a simple distribution using random word frequencies.\n\n🪜 Step-by-Step Instructions:\n- Open TextFX > Random Text Generator\n- Choose 3–4 words and generate random sentences using those\n- Count how many times each word appears\n- Plot a simple chart or bar using those counts\n- Label your bar chart: this is your word distribution!\n\n🔍 Reflect On:\n- Which word had the highest frequency?\n- Was the distribution uniform or skewed?\n- How can this shape AI decisions?\n\n🎓 Key Takeaway:\nA distribution shows how data values spread — it guides model assumptions, normalizations, and fairness checks.\n\n🪙 BONUS CHALLENGE:\nUpload your word count chart and earn 50 Skill Points for mastering distribution!',
  'https://textfx.co/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/textfx.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  20,
  1,
  '📈',
  '📊',
  '📦',
  'Statistics Class',
  'Data Analytics',
  'Distribution',
  'Boxed Reports',
  'c',
  'A distribution shows how data (📦) is spread across values (📈📊) in a dataset.',
  'Distribution is about how values are spread in a dataset.',
  'genesis'
),
-- Game 2
(
  20,
  2,
  '🌈',
  '📏',
  '📍',
  'Range of Values',
  'Statistical Tools',
  'Distribution',
  'Gradient Scale',
  'c',
  'A distribution shows a full range (🌈) of data, measured (📏) and plotted (📍) on a graph.',
  'Distribution includes the range and spread of data values.',
  'genesis'
),
-- Game 3
(
  20,
  3,
  '🧪',
  '🎲',
  '📉',
  'Data Simulation',
  'Experiment Drop',
  'Distribution',
  'Random Analysis',
  'c',
  'Distribution describes how outcomes (🎲) vary in experiments (🧪) and how they’re visualized (📉).',
  'Distribution helps visualize how data varies in experiments.',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'easy',
  'Unscramble the word: T I S B U R I T O N D',
  'Describes how data points are spread across values or categories.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27JumbledEasy.png',
  'DISTRIBUTION',
  'A distribution shows how data is spread — essential for understanding patterns in datasets.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'medium',
  'Unscramble the word: A R O M L N',
  'The most frequent value in a dataset.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27JumbledMed.png',
  'NORMAL',
  'A normal distribution is the classic “bell curve” where most values cluster around the mean.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'hard',
  'Unscramble the word: G A U S S N I A',
  'The technical name for a normal distribution.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27JumbledHard.png',
  'GAUSSIAN',
  'A Gaussian distribution is another name for the bell-shaped normal distribution used in statistics and ML.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'easy',
  'What term refers to how values are spread out in a dataset?',
  'Distribution helps us understand the shape, spread, and patterns in the dataset.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27PerfectMatchEasy.png',
  'Distribution',
  'Distribution helps us understand the shape, spread, and patterns in the dataset.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'medium',
  'What is the most common type of distribution seen in statistics and ML?',
  'The normal (or Gaussian) distribution is symmetric and centered around the mean.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27PerfectMatchMed.png',
  'Normal Distribution',
  'The normal (or Gaussian) distribution is symmetric and centered around the mean.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'hard',
  'Which distribution assumes most values fall near the mean with fewer extremes?',
  'Gaussian (normal) distributions are widely used because many real-world datasets follow this pattern.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27PerfectMatchHard.png',
  'Gaussian Distribution',
  'Gaussian (normal) distributions are widely used because many real-world datasets follow this pattern.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'easy',
  'D _ _ _ _ _ _ _ _ _ N',
  'The spread or arrangement of values in a dataset.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MissingEasy.png',
  'DISTRIBUTION',
  'A distribution tells us how often different values appear in data.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'medium',
  '_ _ _ _ _ L',
  'Common symmetric distribution in ML.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MissingMed.png',
  'NORMAL',
  'Normal distribution appears often in nature and ML tasks, centered around the mean.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  20,
  'hard',
  'G _ _ _ _ _ _ N',
  'The mathematical name for a normal distribution.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MissingHard.png',
  'GAUSSIAN',
  'Gaussian distribution is a statistical term for the common bell curve, used heavily in machine learning.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  20,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemEasy6.png" }
  ]',
  'Match visual clues related to the spread of data like bar charts and pattern plots.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  20,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemMed8.png" }
  ]',
  'Match images representing normal, uniform, and skewed distributions along with outliers and histogram visuals.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  20,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day27MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed1.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemMed1.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy3.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day26MemEasy3.png" }
  ]',
  'Match complex distribution representations including Gaussian curves, outlier patterns, and real-world skewed datasets.',
  'genesis'
);

INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(20, 'options',
 'What does distribution describe in machine learning?',
 'The storage format of data',
 'The layout of neural networks',
 'How data values are spread or arranged',
 'The number of algorithms used',
 'C',
 30,
 'genesis'),

-- Question 2
(20, 'options',
 'What is a key feature of a normal distribution?',
 'Flat curve',
 'Skewed shape',
 'Bell-shaped curve centered at the mean',
 'Multiple peaks',
 'C',
 30,
 'genesis'),

-- Question 3
(20, 'options',
 'Why is understanding data distribution important before training?',
 'To reduce the dataset size',
 'To modify the loss function',
 'To choose suitable models and preprocessing steps',
 'To remove labels',
 'C',
 30,
 'genesis'),

-- Question 4
(20, 'options',
 'What type of distribution is shown when most data points lie far from the mean?',
 'Normal distribution',
 'Uniform distribution',
 'Skewed distribution',
 'Gaussian distribution',
 'C',
 30,
 'genesis');

-- Day=21(28)

INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  21,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay28.png',
  'Outliers: The Unusual Points That Matter in AI',
  '<p>In AI and Machine Learning, outliers are data points that are significantly different from the rest of the dataset. They may occur due to errors, rare events, or unique conditions — but whether they are noise or gold depends on the context.</p><p>Ignoring them can make models inaccurate, but sometimes keeping them reveals important truths.</p>',
  '<ul>
    <li>✅ A credit card transaction in Paris while the user is in Delhi → could signal fraud</li>
    <li>✅ A student who scored 100 when most scored 60–70 → could be exceptionally gifted</li>
    <li>✅ A sudden spike in hospital admissions → might indicate an outbreak</li>
  </ul>',
  'Outliers can pull the average — one extreme value can change the mean significantly. That’s why median is often used instead of mean when data has outliers.',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The term “outlier” was first used in statistics in the 1800s — but it gained huge importance in modern AI when researchers noticed how much outliers impacted model performance.',
  'AI algorithms like Isolation Forest and DBSCAN are designed to detect outliers automatically in large datasets.',
  'In the future, AI systems will learn to flag outliers in real-time, especially in healthcare, finance, and cybersecurity — where anomalies are critical.',
  'Outliers in facial recognition datasets have caused biases — rare features or demographics being underrepresented often lead to misidentification.',
  21,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🧠 What are Outliers in AI?',
  'An outlier is a data point that lies far away from the rest of the dataset. These points can result from data entry errors, unusual events, or meaningful rare cases. Detecting and managing them is essential for building robust AI models.\n\nCore Concepts:\n\n🔹 Outliers: Unusual values that stand apart from the dataset\n📏 Z-score: A statistical method to detect outliers\n📊 Boxplot: A visual tool to spot outliers using quartiles\n⚠️ Influence on Models: Outliers can skew results, increase error, or reveal insights\n🛠️ Handling Methods: Removal, transformation, or modeling separately\n\nWhy It Matters:\n✅ Helps improve model accuracy\n✅ Identifies fraud, disease outbreaks, or defects\n✅ Prevents bias or overfitting\n✅ Leads to more trustworthy insights\n\nUse Cases:\n✅ Fraud detection in banking\n✅ Outbreak spotting in healthcare\n✅ Anomaly detection in servers or networks\n✅ Quality control in manufacturing\n✅ Identifying errors in data entry',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+learning+Day+28(Outliers+).mp4',
  21,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  21,
  'What is an outlier in AI?',
  'A type of neural network',
  'A data point that lies far from others',
  'A perfectly accurate prediction',
  'A repetitive pattern in data',
  'B',
  'genesis'
),
(
  21,
  'Why are outliers important in AI?',
  'They always make models faster',
  'They make the data prettier',
  'They can indicate important anomalies',
  'They’re never used in training',
  'C',
  'genesis'
),
(
  21,
  'Which is a common method to detect outliers?',
  'Dropout regularization',
  'Z-score calculation',
  'Cross-validation',
  'Tokenization',
  'B',
  'genesis'
),
(
  21,
  'How can outliers affect AI models?',
  'Always make them faster',
  'Can reduce accuracy',
  'Never impact results',
  'Help explain missing data',
  'B',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  21,
  '🕵️‍♂️ Find the Odd One: Outlier Detective Challenge',
  '📈 Data Visualization & Outlier Detection',
  '📊 Google Sheets / Excel / Any Scatter Plot Tool',
  'Become an AI Forensic Analyst. Spot and visualize outliers in a small dataset and uncover their meaning.\n\n🪜 Instructions:\n- Prepare a list of 10–15 numerical values (e.g., test scores)\n- Create a scatter plot or bar graph of the values\n- Calculate the mean and standard deviation\n- Identify data points that are far away from the average\n- Highlight 1–2 outliers in a different color\n- Write 2–3 lines on why these points might be different\n\n🔍 Reflection Questions:\n- What made those values stand out?\n- Were they mistakes or meaningful signals?\n- How should an AI model handle them?\n\n🎓 Key Takeaway:\nOutliers are not just noise — they could be errors, fraud alerts, or breakthroughs. Detecting them improves AI accuracy, trust, and performance.\n\n🪙 BONUS CHALLENGE:\n📤 Share your chart with the marked outliers\n🏆 Earn 50 Skill Points for completing this data detective mission!',
  'https://docs.google.com/spreadsheets/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/textfx.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  21,
  1,
  '📊',
  '🔴',
  '👀',
  'Highlighted Data',
  'Outliers',
  'Data Labeling',
  'Graph Analysis',
  'b',
  'Outliers are unusual data points (🔴) that stand out (👀) from the rest of the chart (📊).',
  'Outliers are the anomalies that catch our eye in a graph.',
  'genesis'
),
-- Game 2
(
  21,
  2,
  '📈',
  '⚠️',
  '🔍',
  'Data Spike',
  'Warning Point',
  'Outliers',
  'Accuracy Check',
  'c',
  'Outliers are detected (🔍) as warning signs (⚠️) in graphs (📈) because they don’t follow the usual pattern.',
  'AI must detect such ⚠️ points to maintain accuracy.',
  'genesis'
),
-- Game 3
(
  21,
  3,
  '📦',
  '❓',
  '🚫',
  'Missing Data',
  'Data Cleanup',
  'Outliers',
  'Data Deletion',
  'c',
  'Outliers are strange (❓) or invalid entries (🚫) within a dataset (📦) that may need attention or removal.',
  'Even one strange 📦 can throw off an entire model.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'easy',
  'Unscramble the word: L I R T E U O',
  'A data point that is significantly different from the rest.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28JumbledEasy.png',
  'OUTLIER',
  'Outliers are unusual values that can affect model performance and skew analysis.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'medium',
  'Unscramble the word: N T E R X M E E',
  'A data point far outside the expected range of values.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28JumbledMed.png',
  'EXTREME',
  'Extreme values often act as outliers and may require special handling.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'hard',
  'Unscramble the word: C I D T E E T E T N O I',
  'The process of identifying unusual or extreme data points.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28JumbledHard.png',
  'OUTLIER DETECTION',
  'Outlier detection is essential in data cleaning to improve model accuracy.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'easy',
  'What do we call a data point that is far from other values in the dataset?',
  'Outliers are values that don’t follow the general pattern and may indicate noise or rare events.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard7.png',
  'Outlier',
  'Outliers are values that don’t follow the general pattern and may indicate noise or rare events.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'medium',
  'What can outliers often be considered due to their deviation from the norm?',
  'Anomalies are unusual or suspicious data points — another term for outliers in many ML contexts.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28PerfectMed.png',
  'Anomaly',
  'Anomalies are unusual or suspicious data points — another term for outliers in many ML contexts.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'hard',
  'What is the process of locating and handling unusual values in data called?',
  'Detecting outliers is crucial to clean data and prevent bias or errors in training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28PerfectHard.png',
  'Outlier Detection',
  'Detecting outliers is crucial to clean data and prevent bias or errors in training.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'easy',
  'O _ _ _ _ _ R',
  'A value far from the rest of the data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MissingEasy.png',
  'OUTLIER',
  'Outliers can be due to measurement error, rare events, or natural variation.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'medium',
  'A _ _ _ _ _ Y',
  'Another term often used for a surprising or rare data point.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MissingMed.png',
  'ANOMALY',
  'Anomalies may signal something meaningful or may be noise — they often overlap with outliers.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  21,
  'hard',
  'O _ _ _ _ _ D _ _ _ _ _ _ _ N',
  'The process of finding data points that don’t fit.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MissingHard.png',
  'OUTLIER DETECTION',
  'Outlier detection helps prevent skewed learning and is often part of data preprocessing.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  21,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemEasy6.png" }
  ]',
  'Match basic visuals showing clear outliers in charts, dots, and unusual data points.',
  'genesis'
);

-- Medium Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  21,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemMed8.png" }
  ]',
  'Match medium-level visuals of scatter plots, boxplots, and clear statistical anomalies.',
  'genesis'
);

-- Hard Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  21,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day28MemHard10.png" }
  ]',
  'Match complex visuals of outlier detection methods, statistical graphs, and real-world anomalies in AI datasets.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(21, 'options',
 'What is an outlier in a dataset?',
 'A value that occurs most frequently',
 'A missing data point',
 'A data point far from the rest of the values',
 'A duplicate entry in the dataset',
 'C',
 30,
 'genesis'),

-- Question 2
(21, 'options',
 'Why are outliers important in machine learning?',
 'They speed up training time',
 'They help with class balancing',
 'They can skew results and impact model accuracy',
 'They are always ignored by algorithms',
 'C',
 30,
 'genesis'),

-- Question 3
(21, 'options',
 'Which of the following can be used to detect outliers?',
 'Scatter plot and box plot',
 'Line graph and pie chart',
 'Confusion matrix',
 'Correlation heatmap',
 'A',
 30,
 'genesis'),

-- Question 4
(21, 'options',
 'What might be a reason to remove an outlier?',
 'It improves data labeling',
 'It causes redundancy',
 'It may be a result of error or noise',
 'It reduces dataset dimensionality',
 'C',
 30,
 'genesis');

-- Day=22(29)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  22,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29PerfectMed.png',
  'EDA: Exploring Data Before AI Makes Decisions',
  '<p>Before any AI model is trained, there\'s a step called Exploratory Data Analysis (EDA) — like being a data detective. EDA helps us understand what the data says: what’s normal, what’s missing, and what’s surprising.</p><p>It reveals patterns, relationships, and problems that must be addressed before model building. Think of EDA as a flashlight that shows what\'s hidden in raw data.</p>',
  '<ul>
    <li>✅ A dataset on student marks shows many missing values in rural districts</li>
    <li>✅ A rise in website traffic after 10 PM → unusual but real behavior</li>
    <li>✅ Sales drop in April for 3 years → seasonal pattern found via EDA</li>
  </ul>',
  'Exploring data visually helps humans spot trends faster than algorithms — even just using scatter plots or bar charts. That’s why EDA often involves a lot of visual tools.',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'EDA was coined by John Tukey in the 1970s — he emphasized the power of using simple graphs before jumping into complex statistics or models.',
  'Tools like pandas, seaborn (Python), Excel, and Power BI are some of the most-used EDA tools in the world — even by top AI companies.',
  'AI systems will soon perform automatic EDA — detecting outliers, missing values, and patterns, and suggesting visualizations instantly.',
  'During COVID-19, EDA helped governments visualize infection trends across districts using case data, helping direct emergency medical resources.',
  22,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🔍 What is Exploratory Data Analysis (EDA)?',
  'EDA is the process of exploring and summarizing a dataset to discover useful insights, identify problems, and prepare data for modeling.\n\nCore Concepts:\n\n🔹 EDA: The process of making sense of data before modeling\n📊 Distributions: Patterns in how data values are spread\n⚠️ Outliers & Missing Data: Key elements to identify and handle\n🧪 Visual Tools: Histograms, scatter plots, boxplots, heatmaps\n🔗 Correlation: Understanding how variables relate\n\nWhy It Matters:\n✅ Reveals data errors or surprises\n✅ Helps pick the right algorithm\n✅ Improves model performance\n✅ Builds trust in AI decisions\n\nUse Cases:\n✅ Predictive modeling in education\n✅ Sales forecasting with seasonality\n✅ Health monitoring with patient vitals\n✅ Social media sentiment tracking\n✅ Preparing clean data for ML models',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+learing+Day+29+(EDA+).mp4',
  22,
  'genesis'
);
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  22,
  'What is the purpose of EDA?',
  'Create a machine learning model',
  'Understand and clean data',
  'Train a neural network',
  'Save the data to the cloud',
  'B',
  'genesis'
),
(
  22,
  'Which tool is commonly used in EDA?',
  'Flask',
  'Boxplot',
  'YOLO',
  'ReactJS',
  'B',
  'genesis'
),
(
  22,
  'What can be identified through EDA?',
  'Data centers',
  'API speeds',
  'Missing values and trends',
  'Binary code errors',
  'C',
  'genesis'
),
(
  22,
  'What does correlation in EDA mean?',
  'Two variables are equally random',
  'Values are missing',
  'Variables show a relationship',
  'One variable deletes another',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  22,
  '🧭 EDA Explorer: Decode the Data Story',
  '📊 Data Preparation & Visualization',
  '📈 Google Sheets / Excel / Python (pandas, seaborn)',
  'Become a data detective. Dive into a dataset and reveal hidden patterns, problems, and trends that raw data might be hiding.\n\n📋 Streamlined Instructions:\n- Pick a small dataset (e.g., student marks or temperature readings)\n- Check for missing or empty values\n- Create at least 2 plots (histogram, boxplot, etc.)\n- Calculate mean, median, and mode\n- Spot any outliers or patterns\n- Write a 2–3 line summary of your findings\n\n🔎 Reflection Questions:\n- What unexpected insights did you discover?\n- Were the values clean or messy?\n- How would you prep this data for an AI model?\n\n🎯 Key Takeaway:\n"Good AI starts with clean, well-understood data. EDA builds that foundation."\n\n🎁 BONUS CHALLENGE:\n📤 Submit your chart visuals + a paragraph of insights\n🏆 Earn 50 Skill Points as an official Data Explorer!',
  'https://docs.google.com/spreadsheets/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/textfx.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  22,
  1,
  '📊',
  '🔍',
  '💡',
  'Final Report',
  'Exploratory Data Analysis',
  'Data Cleaning',
  'Dashboard',
  'b',
  'EDA involves exploring data (📊), investigating patterns (🔍), and discovering insights (💡) before modeling begins.',
  'EDA is the crucial first step to understand data before building models.',
  'genesis'
),
-- Game 2
(
  22,
  2,
  '🧠',
  '🗂️',
  '📈',
  'File Sorting',
  'Pattern Recognition',
  'Exploratory Data Analysis',
  'Visualization Tools',
  'c',
  'EDA helps your brain (🧠) make sense of organized datasets (🗂️) using visualizations (📈) to uncover trends.',
  'EDA connects thinking and plotting to discover hidden patterns.',
  'genesis'
),
-- Game 3
(
  22,
  3,
  '🧪',
  '📉',
  '🔢',
  'A/B Testing',
  'Exploratory Data Analysis',
  'Data Monitoring',
  'Statistical Modeling',
  'b',
  'EDA is the exploration phase (🧪) where we use stats (🔢) and graphs (📉) to understand our dataset before modeling.',
  'Before AI makes decisions, EDA helps us see what the numbers really mean.',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'easy',
  'Unscramble the word: D A T A',
  'The raw content we explore in EDA.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29JumbledEasy.png',
  'DATA',
  'All EDA starts with data — numbers, text, or categories — ready to be explored.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'medium',
  'Unscramble the word: G I H S T R O M A',
  'A common EDA chart that shows how data is distributed.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29JumbledMed.png',
  'HISTOGRAM',
  'Histograms help us visualize the frequency of values within data ranges.',
  'english',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'hard',
  'Unscramble the word: Y A R L O T P A D R A X A E I L S N',
  'The process of investigating data before building models.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29JumbledHard.png',
  'EXPLORATORY DATA ANALYSIS',
  'EDA helps uncover patterns, spot outliers, and prepare data for machine learning.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'easy',
  'What is the process of visually and statistically investigating data before modeling?',
  'EDA is a critical step before training models — it builds understanding and ensures quality.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29PerfectEasy.png',
  'Exploratory Data Analysis',
  'EDA is a critical step before training models — it builds understanding and ensures quality.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'medium',
  'Which chart type is used to observe data distribution in numerical columns?',
  'Histograms are perfect for checking skewness, spread, and peaks in numeric data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29PerfectMed.png',
  'Histogram',
  'Histograms are perfect for checking skewness, spread, and peaks in numeric data.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'hard',
  'What visualization helps identify correlation between two numeric variables?',
  'Scatter plots are ideal in EDA to study relationships between two features.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29PerfectHard.png',
  'Scatter Plot',
  'Scatter plots are ideal in EDA to study relationships between two features.',
  'english',
  'genesis'
);

INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'easy',
  'D _ _ A',
  'What we explore in EDA.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MissingEasy.png',
  'DATA',
  'All insights in EDA come from examining the raw data closely.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'medium',
  'H _ _ _ _ _ _ M',
  'This graph helps understand frequency distribution.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MissingMed.png',
  'HISTOGRAM',
  'A histogram is commonly used in EDA to explore how data is distributed.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  22,
  'hard',
  'E _ _ _ _ _ _ _ _ D _ _ _ A _ _ _ _ _ _',
  'Full term for investigating and understanding data before modeling.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MissingHard.png',
  'EXPLORATORY DATA ANALYSIS',
  'EDA helps identify patterns, issues, and insights that inform model development.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  22,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemEasy6.png" }
  ]',
  'Match simple visuals showing raw data, chart types, and distribution elements in EDA.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  22,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemMed8.png" }
  ]',
  'Match visuals of histograms, boxplots, and trends often explored during EDA.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  22,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day29MemHard10.png" }
  ]',
  'Match advanced visuals including heatmaps, correlation matrices, and EDA-based variable investigations.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(22, 'options',
 'What is the main goal of Exploratory Data Analysis (EDA)?',
 'To build a machine learning model',
 'To summarize and understand data before modeling',
 'To deploy the final algorithm',
 'To create a user interface',
 'B',
 30,
 'genesis'),

-- Question 2
(22, 'options',
 'Which of the following is commonly used during EDA?',
 'API documentation',
 'Neural networks',
 'Data visualization tools like histograms and box plots',
 'Encryption algorithms',
 'C',
 30,
 'genesis'),

-- Question 3
(22, 'options',
 'What does a box plot help identify in a dataset?',
 'Neural connections',
 'Distribution of categorical variables',
 'Outliers and spread of numerical data',
 'Model accuracy',
 'C',
 30,
 'genesis'),

-- Question 4
(22, 'options',
 'Why is EDA important in the machine learning pipeline?',
 'It replaces model training',
 'It removes the need for feature engineering',
 'It helps detect patterns, anomalies, and insights before modeling',
 'It automates algorithm selection',
 'C',
 30,
 'genesis');

-- Day=23(30)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  23,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay30.png ',
  '🧠 Perceptron: The First Brain Cell of AI',
  '<p>Before deep neural networks, there was the Perceptron — the simplest form of an artificial neuron.</p><p>The Perceptron mimics a brain cell. It takes in inputs, multiplies them by weights, sums them up, and decides whether to “fire” or not (binary output).</p><p>It’s the building block of AI models — the core idea behind modern neural networks.</p><p>Even though it seems basic, understanding the Perceptron helps us grasp how machines learn step by step.</p>',
  '<ul>
    <li>✅ Spam or not spam? Perceptron can classify emails</li>
    <li>✅ Is this image a cat or not? Early models used Perceptrons</li>
    <li>✅ Predicting if a customer will buy or not based on basic inputs</li>
  </ul>',
  'The Perceptron was created in 1958 by Frank Rosenblatt — inspired by how the human brain works with neurons. It’s like the baby step of AI learning to walk!',
  'genesis'
);

INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The original Perceptron machine was the size of a refrigerator and ran on punch cards — but it laid the foundation for deep learning used in today’s AI like ChatGPT or facial recognition.',
  'The Perceptron can only solve problems that are linearly separable — like drawing a straight line between cats and dogs. For more complex tasks, we need multi-layer Perceptrons (MLPs).',
  'Neural networks built on Perceptron logic will continue to evolve — soon, ultra-lightweight models could run advanced AI on tiny devices like wearables or IoT gadgets.',
  'Modern neural networks used in GPT, autonomous driving, and voice assistants all evolved from the original Perceptron logic — with added depth, layers, and complexity.',
  23,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🤖 What is a Perceptron in AI?',
  'A Perceptron is the simplest model of a neuron in AI. It receives inputs, processes them with weights, and outputs a binary result — like YES/NO or 1/0.\n\nIt learns by adjusting the weights during training, aiming to reduce error over time.\n\nCore Concepts:\n\n🔹 Perceptron: A single-layer neuron for binary classification\n🔹 Weights: Numbers assigned to inputs to determine importance\n🔹 Bias: A value added to shift the output threshold\n🔹 Activation Function: A step function that decides the output\n🔹 Linear Separability: Only works when data can be separated by a straight line\n🔹 Learning Rule: Adjusts weights using error correction\n\nInfluence on Models:\n✅ Perceptrons paved the way for modern neural networks.\n✅ They taught AI how to learn from mistakes and adapt.\n\nHandling Techniques:\n✅ Initialize weights randomly\n✅ Use labeled data to train\n✅ Adjust weights based on prediction error\n✅ Repeat until accuracy improves\n\nWhy It Matters:\n✅ Explains how neural networks think\n✅ Foundation of deep learning\n✅ Helps in binary decision-making AI\n✅ A beginner-friendly intro to machine learning\n\nUse Cases:\n✅ Email classification (spam vs not spam)\n✅ Image recognition (object vs background)\n✅ Customer churn prediction (leave or stay)\n✅ Fraud detection (fraudulent or safe)\n✅ Sentiment analysis (positive or negative)',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+learing+Day+30+(Perceptron).mp4',
  23,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  23,
  'What is a Perceptron in AI?',
  'A type of robot',
  'A simple neural unit that classifies data',
  'A data encryption tool',
  'A speech translator',
  'B',
  'genesis'
),
(
  23,
  'What does a Perceptron use to make decisions?',
  'Only raw input',
  'Input weights and activation function',
  'Code length',
  'Time delay',
  'B',
  'genesis'
),
(
  23,
  'What is a limitation of the Perceptron?',
  'It uses too much data',
  'It only works on linearly separable data',
  'It runs too fast',
  'It cannot be trained',
  'B',
  'genesis'
),
(
  23,
  'Who invented the Perceptron?',
  'Alan Turing',
  'Frank Rosenblatt',
  'Andrew Ng',
  'Yann LeCun',
  'B',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  23,
  '🧠 Perceptron Lab: Learn Like a Neuron',
  '🧪 Neural Networks & Binary Classification',
  '🎥 FlexClip',
  'Create a short visual explainer showing how a Perceptron makes decisions using weights, bias, and input data — like a mini digital brain.\n\n🪜 Mission Steps:\n- Open FlexClip and create a new project\n- Add three text slides to explain:\n  🔹 What is a Perceptron?\n  🔹 How does it work? (Use this formula: output = 1 if (w1*x1 + w2*x2 + bias > 0) else 0)\n  🔹 Real-life example (like classifying spam vs. not spam)\n- Add simple icons or animations (e.g., brain, toggle switch, binary outputs like 0/1)\n- Record or add voiceover/text explaining the classification process\n- Export your video and keep it under 60 seconds\n\n🔍 Reflection Questions:\n- Did the Perceptron behave like you expected?\n- What role did weights and bias play in the output?\n- How would adding more inputs change the decision?\n\n🎓 Key Takeaway:\nThe Perceptron is the simplest form of AI thinking — just like a digital “yes or no” switch that learns from data.\n\n🪙 Bonus Challenge:\n📤 Share your FlexClip video\n🏆 Earn 50 Skill Points and a Neuron Starter Badge!',
  'https://www.flexclip.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/perceptron_mission.jpg',
  'genesis'
);

INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  23,
  1,
  '🧠',
  '⚖️',
  '🔢',
  'Perceptron neuron',
  'Weight balancing',
  'Random numbers',
  'Binary code',
  'a',
  'The Perceptron is a simple neuron (🧠) that uses weights (⚖️) and sums inputs (🔢) to decide outputs.',
  'Perceptron mimics brain neurons by weighing inputs to classify data.',
  'genesis'
),
-- Game 2
(
  23,
  2,
  '🔢',
  '➕',
  '0️⃣',
  'Linear function',
  'Activation function',
  'Data input',
  'Output label',
  'b',
  'The activation function (➕) in a Perceptron determines the binary output (0️⃣) based on weighted sums (🔢).',
  'Activation function acts as a threshold to decide final output in Perceptron.',
  'genesis'
),
-- Game 3
(
  23,
  3,
  '🚫',
  '➗',
  '📉',
  'Non-linear data',
  'Linearly separable data',
  'Fast training',
  'Multiple layers',
  'b',
  'Perceptrons only solve problems where data is linearly separable (🚫 means cannot solve non-linear).',
  'Perceptrons are limited to linear boundaries in classification tasks.',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'easy',
  'Unscramble the word: N R U E',
  'A perceptron’s decision output — either 0 or 1.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30JumbledEasy.png',
  'TRUE',
  'A perceptron outputs TRUE (1) or FALSE (0) based on input weights and bias.',
  'english',
  'genesis'
);

INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'medium',
  'Unscramble the word: R P E T R C E N O',
  'A basic computational unit that mimics a brain cell.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30JumbledMed.png',
  'PERCEPTRON',
  'The perceptron is the simplest type of neural network — it classifies inputs using weights, bias, and an activation function.',
  'english',
  'genesis'
);

INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'hard',
  'Unscramble the word: I W E G H T S',
  'These numbers decide how important each input is in a perceptron.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30JumbledHard.png',
  'WEIGHTS',
  'Weights are multiplied with inputs — they guide the learning process by adjusting over time.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'easy',
  'What is the simplest type of neural network unit called?',
  'The perceptron takes inputs, multiplies them by weights, adds bias, and passes the result through an activation function.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30PerfectEasy.png',
  'Perceptron',
  'The perceptron takes inputs, multiplies them by weights, adds bias, and passes the result through an activation function.',
  'english',
  'genesis'
);

INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'medium',
  'What decides the strength of each input signal in a perceptron?',
  'Weights assign importance to each input and are adjusted during learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30PerfectMed.png',
  'Weights',
  'Weights assign importance to each input and are adjusted during learning.',
  'english',
  'genesis'
);

INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'hard',
  'What term describes the extra constant added in a perceptron’s computation?',
  'Bias allows the activation function to shift, improving learning flexibility.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30PerfectHard.png',
  'Bias',
  'Bias allows the activation function to shift, improving learning flexibility.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'easy',
  '_ E _ _ _ _ _ _ N',
  'The basic unit of a neural network.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MissingEasy.png',
  'PERCEPTRON',
  'A perceptron is the fundamental logic unit of an artificial neural network.',
  'english',
  'genesis'
);

INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'medium',
  'W _ _ _ _ _ S',
  'These decide the influence of each input in a perceptron.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MissingMed.png',
  'WEIGHTS',
  'Weights are core to how a perceptron "learns" from data.',
  'english',
  'genesis'
);

INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  23,
  'hard',
  'B _ _ _',
  'The value that shifts the activation threshold.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MissingHard.png',
  'BIAS',
  'Bias lets the perceptron make better decisions by shifting the output threshold.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  23,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemEasy6.png" }
  ]',
  'Match simple visuals demonstrating perceptron concepts like neurons, activation, and binary output.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  23,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemMed8.png" }
  ]',
  'Match images representing perceptron components such as input weights, activation function, and bias.',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  23,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day30MemHard10.png" }
  ]',
  'Match advanced visuals including neural network diagrams, activation graphs, and bias examples.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(23, 'options',
 'What is a perceptron in machine learning?',
 'A type of loss function',
 'A deep learning optimizer',
 'A basic unit of a neural network that mimics a biological neuron',
 'A data cleaning tool',
 'C',
 30,
 'genesis'),

-- Question 2
(23, 'options',
 'What are the main components of a perceptron?',
 'Input data, kernel, loss function',
 'Activation function, backpropagation, learning rate',
 'Weights, bias, activation function, inputs',
 'Epochs, optimizers, target values',
 'C',
 30,
 'genesis'),

-- Question 3
(23, 'options',
 'What is the role of the activation function in a perceptron?',
 'To store the model parameters',
 'To calculate the cost',
 'To determine the output based on input and weights',
 'To reset the neuron',
 'C',
 30,
 'genesis'),

-- Question 4
(23, 'options',
 'When does a perceptron update its weights during training?',
 'Only after the final epoch',
 'When the prediction matches the label',
 'When there is an error between predicted and actual output',
 'Randomly after each input',
 'C',
 30,
 'genesis');




-- Day=24(31)
 -- AI Blog Entry for Day 24
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  24,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay31.png',
  '🧠 Backpropagation: The Brain Behind AI Learning',
  '<p>Backpropagation is the secret engine that helps AI learn from its mistakes. It’s a technique used in neural networks to adjust weights by minimizing the error between predicted and actual outputs.</p>
  <p>Whenever a model gives a wrong answer, backpropagation works like a teacher: it calculates the error, sends that error backward through the network, and updates the system so it gets better next time.</p>
  <p>It’s how AI improves over time — like practicing again and again until it gets it right!</p>',
  '<ul>
    <li>✅ Your phone’s voice assistant improving speech recognition</li>
    <li>✅ AI getting better at identifying your face in selfies</li>
    <li>✅ Recommender systems learning your movie preferences</li>
  </ul>',
  'The idea behind backpropagation came from the chain rule in calculus — a math trick that lets AI learn layer by layer!',
  'genesis'
);

-- AI Facts Entry for Day 24
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Backpropagation was first explored in the 1970s, but it gained fame in 1986 when Geoffrey Hinton and his team proved its power in training deep neural networks.',
  'Even though backpropagation was discovered decades ago, it became practical only after computing power caught up in the 1980s.',
  'Future AI systems will use more advanced variations of backpropagation (like reinforcement learning or neuroevolution) to learn faster and better.',
  'Backpropagation is at the heart of cutting-edge AI tools like GPT and image generators — they rely on this technique to learn from billions of examples.',
  24,
  'genesis'
);
-- AI Learning Entry for Day 24
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '💡 What is Backpropagation?',
  'Backpropagation is a training algorithm used in neural networks. It compares predicted output with actual output, computes error, and updates the model by moving the error backward to improve the next prediction.\n\n📚 Core Concepts:\n\n🔹 Error Function: Measures how far off predictions are\n🔹 Gradient Descent: Optimization technique to minimize error\n🔹 Weights & Biases: Parameters that are adjusted\n🔹 Chain Rule: A calculus rule used to propagate error backward\n🔹 Epochs: Iterations through the dataset for learning\n\n🎯 Why It Matters:\n✅ Enables deep learning\n✅ Helps AI learn complex patterns\n✅ Improves accuracy through continuous feedback\n✅ Used in all modern neural networks\n\nUse Cases:\n✅ Image and speech recognition\n✅ Chatbots and language models\n✅ Fraud detection\n✅ Self-driving cars\n✅ Game-playing AI',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+32+(Weights+in+AI).mp4',
  24,
  'genesis'
);

-- AI Learning Assessments for Day 24
INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  24,
  'What is the purpose of backpropagation in AI?',
  'Predict data types',
  'Adjust weights by minimizing error',
  'Generate synthetic data',
  'Store AI memory',
  'B',
  'genesis'
),
(
  24,
  'What mathematical rule is used in backpropagation?',
  'Z-score',
  'T-test',
  'Chain Rule',
  'Matrix Multiplication',
  'C',
  'genesis'
),
(
  24,
  'In what type of AI model is backpropagation most used?',
  'Decision trees',
  'Neural networks',
  'KNN',
  'Naïve Bayes',
  'B',
  'genesis'
),
(
  24,
  'What is typically minimized during backpropagation?',
  'Speed of training',
  'Number of layers',
  'Error/Loss function',
  'Input features',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  24,
  '🎯 Neural Network Fixer: Trace the Error',
  '🧠 Neural Network Learning & Optimization',
  '🎬 FlexClip',
  'Create a mini animation to show how backpropagation updates weights in an AI system.\n\n🪜 Instructions:\n- Use FlexClip to create a 45–60 second video\n- Include 3 scenes:\n  1. A simple input → output prediction\n  2. Error is calculated and sent backward\n  3. Weights are adjusted to improve prediction next time\n- Add text or voiceover to explain steps like “forward pass”, “error calculation”, “gradient descent”, and “update weights”\n\n🔍 Reflection Questions:\n- What causes the error in AI’s prediction?\n- How does sending the error backward help learning?\n- Why do we use gradient descent in this process?\n\n🎓 Key Takeaway:\nBackpropagation turns errors into learning fuel — the smarter the AI gets, the better its predictions become.\n\n🪙 Bonus Challenge:\n📤 Submit your FlexClip animation\n🏆 Earn 50 Skill Points and the title: "Error Whisperer"',
  'https://www.flexclip.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/flexclip.png',
  'genesis'
);

INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  24,
  1,
  '🧠',
  '↩️',
  '📉',
  'Brain Loop',
  'Model Testing',
  'Backpropagation',
  'Error Logging',
  'c',
  'Backpropagation helps the model (🧠) go backward (↩️) to reduce errors (📉) and adjust internal weights.',
  'Backpropagation uses feedback from output error to tune the model’s parameters.',
  'genesis'
),
-- Game 2
(
  24,
  2,
  '🧮',
  '🔄',
  '🎯',
  'Prediction Cycle',
  'Model Accuracy',
  'Backpropagation',
  'Weight Initialization',
  'c',
  'Backpropagation uses math (🧮) to repeatedly update (🔄) the model toward better results (🎯).',
  'The iterative process of weight adjustment improves prediction accuracy.',
  'genesis'
),
-- Game 3
(
  24,
  3,
  '🔍',
  '📈',
  '💥',
  'Graph Error',
  'Learning Failure',
  'Backpropagation',
  'Training Crash',
  'c',
  'Backpropagation finds where the model went wrong (💥), traces the error (🔍), and fixes it using gradient updates (📈).',
  'The model learns by locating errors and updating weights accordingly.',
  'genesis'
);

-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'easy',
  'Unscramble the word: C K A B',
  'The direction error moves during backpropagation.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31JumbledEasy.png',
  'BACK',
  'Backpropagation sends the error back through the network to update weights.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'medium',
  'Unscramble the word: R O R E R',
  'What backpropagation helps reduce.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31JumbledMed.png',
  'ERROR',
  'Backpropagation adjusts weights to minimize the prediction error of the model.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'hard',
  'Unscramble the word: B A C K G T R P A P I O A O N',
  'The algorithm used to calculate and send the error backward.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31JumbledHard.png',
  'BACKPROPAGATION',
  'Backpropagation is the core algorithm used in training deep learning models.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'easy',
  'What is the name of the process that moves error backward to update weights?',
  'Backpropagation allows neural networks to learn by adjusting weights layer by layer based on error.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31PerfectEasy.png',
  'Backpropagation',
  'Backpropagation allows neural networks to learn by adjusting weights layer by layer based on error.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'medium',
  'What gets adjusted during backpropagation to reduce error?',
  'Weights determine how much each input contributes to the output — backpropagation fine-tunes them.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31PerfectMed.png',
  'Weights',
  'Weights determine how much each input contributes to the output — backpropagation fine-tunes them.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'hard',
  'Which mathematical operation is used to calculate how much each weight contributed to the error?',
  'Gradients are computed during backpropagation to adjust weights in the right direction.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31PerfectHard.png',
  'Gradient',
  'Gradients are computed during backpropagation to adjust weights in the right direction.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'easy',
  'B _ _ _',
  'The direction the error flows in backpropagation.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MissingEasy.png',
  'BACK',
  'The “back” in backpropagation refers to sending error signals in reverse through the network.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'medium',
  '_ R _ _ R',
  'What the model tries to minimize using backpropagation.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MissingMed.png',
  'ERROR',
  'The model computes the error and uses it to adjust weights during training.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  24,
  'hard',
  'B _ _ _ _ _ _ _ _ _ _ _ _ N',
  'Key algorithm that updates weights by sending error backward.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MissingHard.png',
  'BACKPROPAGATION',
  'Backpropagation allows the model to learn from its mistakes and improve predictions.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  24,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemEasy6.png" }
  ]',
  'Match visuals showing the basics of backpropagation such as flow of error and simple network updates.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  24,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemMed8.png" }
  ]',
  'Match images depicting how gradients flow, how weights are updated, and feedback loops are formed.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  24,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day31MemHard10.png" }
  ]',
  'Match detailed concepts like gradient descent, chain rule visuals, weight update mechanics, and network error flow.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(24, 'options',
 'What is the main purpose of backpropagation in a neural network?',
 'To increase training data',
 'To update model weights by minimizing error',
 'To test the model accuracy',
 'To generate output predictions',
 'B',
 30,
 'genesis'),

-- Question 2
(24, 'options',
 'What does backpropagation use to adjust weights?',
 'Activation outputs',
 'Random sampling',
 'The gradient of the loss function',
 'The input size',
 'C',
 30,
 'genesis'),

-- Question 3
(24, 'options',
 'In backpropagation, which two passes are performed through the network?',
 'Sampling and validation',
 'Normalization and scaling',
 'Forward pass and backward pass',
 'Input pass and noise pass',
 'C',
 30,
 'genesis'),

-- Question 4
(24, 'options',
 'What happens during the backward pass in backpropagation?',
 'Outputs are predicted',
 'Data is shuffled',
 'Errors are propagated back and weights are updated',
 'Input features are transformed',
 'C',
 30,
 'genesis');


-- Day=25(32)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  25,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay32.png',
  '🎯 Weights: The Decision Makers Inside Neural Networks',
  '<p>In machine learning, weights are like adjustable knobs that help a model learn from data. Each weight controls how much influence an input has on the final decision.</p>
  <p>Imagine a neural network trying to identify a cat. It looks at various features—like ears, whiskers, or eyes—and assigns weights to each. These weights decide how important each feature is. Higher weight = more importance.</p>
  <p>As the model trains, it updates these weights using algorithms like gradient descent and backpropagation. The goal? Make the best possible predictions by learning which inputs matter most!</p>',
  '<ul>
    <li>✅ AI weighing features to detect cats, dogs, or objects in photos</li>
    <li>✅ Spam filters using weights to decide if an email is junk</li>
    <li>✅ Medical AI models weighing symptoms to predict diseases</li>
  </ul>',
  'The brain uses something similar to weights—called synaptic strength—to decide how strong signals are between neurons!',
  'genesis'
);

INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The concept of "weights" in neural networks dates back to the 1950s Perceptron model — one of the earliest AI algorithms.',
  'Weights start with random values, and the AI model tweaks them over time — just like a student adjusting their focus to learn better.',
  'AI models will soon learn weights in real-time, adapting instantly to new data in fields like finance and autonomous vehicles.',
  'AI models like ChatGPT use billions of trained weights to understand and respond to your questions accurately.',
  25,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '⚙️ What Are Weights in Machine Learning?',
  'Weights are numerical values that determine the strength of connections between neurons in a neural network. They help the model decide which input features are more important.\n\n📚 Core Concepts:\n\n🔹 Weights: Influence of input on the output\n🔹 Bias: Offset added to balance predictions\n🔹 Activation Function: Determines final output\n🔹 Weight Update: Changing weights to reduce error\n🔹 Optimization: Process of finding the best weights\n\n🎯 Why It Matters:\n✅ Weights help models learn patterns in data\n✅ They\ are adjusted during training to improve accuracy\n✅ The better the weights, the smarter the model\n\nUse Cases:\n✅ Image recognition\n✅ Voice assistants\n✅ Game-playing AI\n✅ Spam filtering\n✅ Medical diagnosis tools',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+32+(Weights+in+AI).mp4',
  25,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  25,
  'What is the purpose of weights in a neural network?',
  'To store training data',
  'To determine the importance of inputs',
  'To create visualizations',
  'To add noise to inputs',
  'B',
  'genesis'
),
(
  25,
  'What happens to weights during training?',
  'They are deleted',
  'They remain constant',
  'They are adjusted to reduce error',
  'They are converted to text',
  'C',
  'genesis'
),
(
  25,
  'Which algorithm is commonly used to update weights?',
  'Clustering',
  'KNN',
  'Gradient Descent',
  'PCA',
  'C',
  'genesis'
),
(
  25,
  'What kind of values do weights usually start with?',
  'Zero',
  'Random',
  'Ones',
  'Fixed constants',
  'B',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  25,
  '🛰️ Weight Wizard: Tune the Brain of AI',
  '🎨 Visual Understanding of Neural Networks',
  '🎬 Pixlr',
  'Use Pixlr to design a diagram showing how weights affect the output of a neural network.\n\n🪜 Instructions:\n- Open Pixlr and create a digital poster\n- Add 3 input nodes, 2 hidden layers, and 1 output node\n- Label weights between the nodes (use arrows)\n- Show how weights can be high or low (with different line thickness or color)\n- Add text boxes to explain:\n  - “Input importance is decided by weights”\n  - “Weights are adjusted during training”\n\n🔍 Reflection Questions:\n- How do weights influence AI decisions?\n- Why do models need to update weights?\n- What happens if the weights are wrong?\n\n🎓 Key Takeaway:\nWeights are the steering wheels of AI learning — guiding models toward better decisions by focusing on what matters most.\n\n🪙 Bonus Challenge:\n📤 Submit your Pixlr-designed neural network\n🏆 Earn 50 Skill Points and the title: “Weight Whisperer”',
  'https://pixlr.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/pixlr.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  25,
  1,
  '⚖️',
  '🔢',
  '🧠',
  'Balanced Thinking',
  'Weights',
  'Brain Load',
  'Model Average',
  'b',
  'Weights (⚖️) are numeric values (🔢) in AI models (🧠) that control how much influence each input has on the output.',
  'Each neuron input is multiplied by a weight to determine its impact.',
  'genesis'
),
-- Game 2
(
  25,
  2,
  '🎯',
  '📉',
  '⚙️',
  'Accuracy Control',
  'Tuning Gears',
  'Weights',
  'Model Settings',
  'c',
  'Weights (⚙️) are adjusted to minimize error (📉) and improve the model’s predictions (🎯).',
  'Training adjusts weights to hit prediction goals more accurately.',
  'genesis'
),
-- Game 3
(
  25,
  3,
  '➕',
  '➗',
  '➡️',
  'Math Path',
  'Data Flow',
  'Weights',
  'Signal Transfer',
  'c',
  'Inputs are combined using math operations (➕➗), and weights guide how strongly each input moves forward (➡️) in the model.',
  'Weights influence the flow and strength of signals through layers.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'easy',
  'Unscramble the word: G T H E I W',
  'These values determine how much influence an input has.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32JumbledEasy.png',
  'WEIGHT',
  'Weights assign importance to inputs and help the model make better predictions.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'medium',
  'Unscramble the word: T U P N I',
  'Data fed into the model.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32JumbledMed.png',
  'INPUT',
  'Inputs are multiplied by weights before being processed by the neuron.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'hard',
  'Unscramble the word: T G W S E A D J U N E T M',
  'What happens to weights during training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32JumbledHard.png',
  'WEIGHTS ADJUSTMENT',
  'Weights are continuously adjusted using algorithms like gradient descent during learning.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'easy',
  'What controls how much an input affects a prediction?',
  'Weights are numerical values that indicate how important each input is to the model.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32PerfectEasy.png',
  'Weights',
  'Weights are numerical values that indicate how important each input is to the model.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'medium',
  'What happens to weights during training?',
  'The model continuously tweaks weights to reduce error and improve accuracy.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32PerfectMed.png',
  'They are updated',
  'The model continuously tweaks weights to reduce error and improve accuracy.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'hard',
  'What do you call the process of modifying weights based on error?',
  'Backpropagation uses error to update the weights through gradient calculations.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32PerfectHard.png',
  'Backpropagation',
  'Backpropagation uses error to update the weights through gradient calculations.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'easy',
  'W _ _ _ _ _',
  'These values control the influence of inputs.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MissingEasy.png',
  'WEIGHT',
  'Weights are the heart of model learning — stronger weights = more influence.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'medium',
  'A _ _ _ _ T',
  'What happens to weights during learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MissingMed.png',
  'ADJUST',
  'The model adjusts weights to better map inputs to outputs.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  25,
  'hard',
  'W _ _ _ _ _ _ A _ _ _ _ _ _ _ _ T',
  'Happens when model learns from feedback.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MissingHard.png',
  'WEIGHTS ADJUSTMENT',
  'As training progresses, the model keeps refining weights to improve accuracy.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  25,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemEasy6.png" }
  ]',
  'Match visuals that highlight how weights influence decisions in simple neural network diagrams.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  25,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemMed8.png" }
  ]',
  'Match diagrams showing hidden layers, weight values, and how they affect prediction outcomes.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  25,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day32MemHard10.png" }
  ]',
  'Match visuals showing advanced weight tuning, training patterns, error feedback, and neural connection effects.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(25, 'options',
 'What is the main role of weights in a neural network?',
 'To store training data',
 'To determine the importance of each input',
 'To test the model accuracy',
 'To generate new datasets',
 'B',
 30,
 'genesis'),

-- Question 2
(25, 'options',
 'What happens to weights during model training?',
 'They stay fixed',
 'They are deleted after each epoch',
 'They are adjusted to reduce error',
 'They are used for predictions only',
 'C',
 30,
 'genesis'),

-- Question 3
(25, 'options',
 'Which algorithm is commonly used to update weights?',
 'K-means clustering',
 'Principal Component Analysis (PCA)',
 'Gradient Descent',
 'Random Forest',
 'C',
 30,
 'genesis'),

-- Question 4
(25, 'options',
 'Why do weights typically start with random values?',
 'To ensure all neurons learn the same features',
 'To avoid symmetry and help the model learn effectively',
 'To make predictions directly',
 'To increase training speed',
 'B',
 30,
 'genesis');


-- Day=26(33)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  26,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay33.png',
  '🎯 Bias in AI: The Hidden Push Behind Predictions',
  '<p>In AI, bias refers to systematic errors in the model’s predictions caused by incorrect assumptions, uneven data, or flawed algorithms.</p>
  <p>It’s not always about fairness or prejudice — even technical shortcuts during training can cause models to favor one pattern over another.</p>
  <p>If left unchecked, bias can make AI systems unreliable or unfair — affecting decisions in hiring, healthcare, or law enforcement.</p>',
  '<ul>
    <li>✅ A face recognition model trained mostly on lighter skin tones struggles with darker ones</li>
    <li>✅ A loan approval model favors applicants from a particular region because of historical trends in the data</li>
    <li>✅ A language model auto-corrects “nurse” to “she” and “doctor” to “he” – due to biased patterns in training texts</li>
  </ul>',
  'Even AI systems with high accuracy can be biased! A 90% accurate model can still fail a particular group consistently if trained on unbalanced data.',
  'genesis'
);

INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Bias in algorithms became a mainstream issue after incidents like Amazon’s AI hiring tool in 2018 that downgraded female candidates — because it learned from past biased hiring data.',
  'Even AI systems with high accuracy can be biased! A 90% accurate model can still fail a particular group consistently if trained on unbalanced data.',
  'AI of the future will have bias-monitoring layers — tools built into models to auto-detect and neutralize unfair influence during learning.',
  'Global organizations like the EU and IEEE are now building “AI Ethics Guidelines” to detect and eliminate biases in automated systems.',
  26,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🔬 Understanding Bias in Machine Learning',
  'Bias is a tendency of a model to consistently learn the wrong thing from data due to flawed assumptions or limited examples. It can be technical (like underfitting) or ethical (like discrimination).\n\n📚 Core Concepts:\n\n🔹 Bias (Technical): Simplistic models that fail to capture complexity (e.g., linear model for a non-linear task)\n🔹 Bias (Ethical): Models reflect human biases present in training data (e.g., gender/racial stereotypes)\n🔹 High Bias: Leads to underfitting – model performs poorly on both training and test data\n🔹 Data Bias: Uneven representation of groups in training data\n🔹 Mitigation: Use diverse data, fairness constraints, and regular audits\n\n🎯 Why It Matters:\n✅ Ensures fairness and accuracy\n✅ Protects users from harm\n✅ Builds trust in AI systems\n✅ Supports ethical AI development\n\nUse Cases:\n✅ Recruitment tools\n✅ Predictive policing systems\n✅ Credit scoring models\n✅ Healthcare diagnostics\n✅ Voice assistants recognizing accents fairly',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+lerning+Day+33+(Bias).mp4',
  26,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  26,
  'What is bias in an AI model?',
  'Random noise in predictions',
  'A consistent error due to flawed data or assumptions',
  'A step in model training',
  'A method of increasing accuracy',
  'B',
  'genesis'
),
(
  26,
  'What causes bias in AI models?',
  'Perfect datasets',
  'Imbalanced or skewed data',
  'Too many hidden layers',
  'Using GPUs',
  'B',
  'genesis'
),
(
  26,
  'Which of these is an example of biased AI?',
  'A facial recognition system that misidentifies minorities',
  'A chatbot that gives perfect grammar',
  'A random number generator',
  'A weather prediction model using radar data',
  'A',
  'genesis'
),
(
  26,
  'How can AI bias be reduced?',
  'Only test on the training data',
  'Use diverse and balanced datasets',
  'Remove all features',
  'Add more dropout layers',
  'B',
  'genesis'
);
-- AI Space Mission for Day 26 – Bias
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  26,
  '⚖️ Bias Buster: Fairness Analyzer',
  '🧠 Language & Pattern Bias Detection',
  '🧰 Slick Write',
  'Analyze a piece of text using Slick Write to detect biased patterns in language (gender, tone, assumptions). Learn how even words can reflect bias!\n\n🪜 Instructions:\n- Go to Slick Write\n- Input any short article (e.g., a news snippet or job ad)\n- Run the analysis\n- Look at word usage, sentence structure, tone\n- Identify any potential bias in tone or phrasing\n- Suggest 1–2 changes to improve neutrality\n\n🔍 Reflection Questions:\n- Were any gendered terms or assumptions present?\n- How can writing style affect reader perception?\n- How would biased text impact AI trained on it?\n\n🎓 Key Takeaway:\nBias isn’t always obvious — it hides in patterns, assumptions, and representation. Detecting it is the first step to building fair AI.\n\n🪙 Bonus Challenge:\n✍️ Rewrite the biased sentence using neutral language\n🏆 Earn 50 Skill Points for completing the Bias Buster Mission!',
  'https://www.slickwrite.com/#!home',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/slick-write_53189.webp',
  'genesis'
);

-- Emoji Games for Day 26 – Bias
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  26,
  1,
  '🎯',
  '📍',
  '📉',
  'Off-Target Error',
  'Bias',
  'Accuracy Loss',
  'Model Drift',
  'b',
  'Bias occurs when predictions (📍) consistently miss the true target (🎯), causing systematic errors (📉).',
  'Bias causes models to repeatedly make the same kind of mistake.',
  'genesis'
),
-- Game 2
(
  26,
  2,
  '🧠',
  '🔒',
  '🚫',
  'Locked Model',
  'Bias',
  'Training Limit',
  'Model Block',
  'b',
  'High bias happens when the model (🧠) is too restricted (🔒🚫) to learn properly, leading to underfitting.',
  'Bias limits a model’s ability to learn complex patterns.',
  'genesis'
),
-- Game 3
(
  26,
  3,
  '🔍',
  '🛣️',
  '↘️',
  'Shortcuts',
  'Bias',
  'Data Trail',
  'Downward Slope',
  'b',
  'Bias is like taking a shortcut (🛣️) in learning — the model overlooks data patterns (🔍) and simplifies too much (↘️).',
  'Bias can arise when a model generalizes too early or skips complexity.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'easy',
  'Unscramble the word: S I B A',
  'A constant value added to help the model make better predictions.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33JumbledEasy.png',
  'BIAS',
  'Bias allows the model to shift the activation function, improving its ability to learn.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'medium',
  'Unscramble the word: C N S O A T N T',
  'Bias is often added as this kind of value.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33JumbledMed.png',
  'CONSTANT',
  'Bias is typically a constant added to the weighted sum of inputs.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'hard',
  'Unscramble the phrase: T U P N I + W E T I H G + _ _ _ _',
  'The bias completes the formula before applying activation.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33JumbledHard.png',
  'BIAS',
  'The full linear equation is: Output = Input × Weight + Bias.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'easy',
  'What is added to the weighted sum before applying activation?',
  'Bias allows the model to output non-zero predictions even when all inputs are zero.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33PerfectEasy.png',
  'Bias',
  'Bias allows the model to output non-zero predictions even when all inputs are zero.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'medium',
  'How does bias affect the decision boundary of a neural model?',
  'Bias helps move the activation threshold to fit data better.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33PerfectMed.png',
  'It shifts the boundary',
  'Bias helps move the activation threshold to fit data better.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'hard',
  'Which parameter works with weights to help the neuron make better predictions?',
  'Weights and bias together define the output of a neuron — both are trained.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33PerfectHard.png',
  'Bias',
  'Weights and bias together define the output of a neuron — both are trained.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'easy',
  'B _ _ _',
  'Added constant in neural nets',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MissingEasy.png',
  'BIAS',
  'Bias helps control the output even when inputs are 0.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'medium',
  '_ O _ _ T _ _ T',
  'The nature of bias — it doesn’t change with input',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MissingMed.png',
  'CONSTANT',
  'Bias is a constant value — unlike weights, which multiply inputs.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  26,
  'hard',
  'B _ _ _ H _ _ _ S T _ _ _ _ _ _ _',
  'Bias affects this in classification',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MissingHard.png',
  'BIAS HELPS TUNE THRESHOLD',
  'Bias adjusts the model’s output threshold — improving its accuracy.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  26,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemEasy6.png" }
  ]',
  'Match visuals that represent various forms of bias in machine learning outputs.',
  'genesis'
);

-- Medium Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  26,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemMed8.png" }
  ]',
  'Match bias examples like language preference, tone misjudgment, and demographic imbalance in model predictions.',
  'genesis'
);

-- Hard Level
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  26,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day33MemHard10.png" }
  ]',
  'Match visuals related to ethical bias, fairness audits, regulatory compliance, and social impact of biased AI systems.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(26, 'options',
 'What is bias in a machine learning model?',
 'Random noise added to data',
 'An intentional error introduced in predictions',
 'A constant added to a neuron\ is weighted input',
 'The amount of training data',
 'C',
 30,
 'genesis'),

-- Question 2
(26, 'options',
 'What is the role of bias in a neural network?',
 'To store labels',
 'To reduce data size',
 'To shift the activation function and improve learning flexibility',
 'To delete irrelevant features',
 'C',
 30,
 'genesis'),

-- Question 3
(26, 'options',
 'What can high bias in a model lead to?',
 'Overfitting',
 'Perfect accuracy',
 'Underfitting and poor performance',
 'Increased memory usage',
 'C',
 30,
 'genesis'),

-- Question 4
(26, 'options',
 'How can bias in training data affect a model?',
 'It helps detect new trends',
 'It makes the model neutral',
 'It causes the model to learn and repeat the bias',
 'It improves validation accuracy',
 'C',
 30,
 'genesis');

  -- Day=27(34)
  INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  27,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay34.png',
  '🚦 Learning Rate: The Speed Dial of AI Training',
  '<p>The learning rate is like the speed control of an AI model during training. It decides how big the step should be when updating weights to reduce error.</p>
  <p>A high learning rate = big steps 🏃 (faster but risky)<br>A low learning rate = small steps 🐢 (slower but safer)</p>
  <p>A good learning rate helps AI reach the best solution faster without overshooting or getting stuck.</p>',
  '<ul>
    <li>✅ High learning rate may cause unstable training</li>
    <li>✅ Low learning rate leads to slower convergence but more stability</li>
    <li>✅ Adaptive optimizers (like Adam) adjust learning rate automatically</li>
  </ul>',
  '🤖 Did you know? If the learning rate is too high, the AI may never learn at all — just bouncing around the target like a pinball!',
  'genesis'
);

INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'The concept of learning rate dates back to the Perceptron (1958), where weight updates depended on fixed-rate steps.',
  'In training a neural network to recognize digits, adjusting the learning rate from 0.01 to 0.001 improved accuracy by 20%.',
  'AI models now use adaptive learning rates (like in Adam or RMSprop optimizers), which adjust automatically as training progresses.',
  'Large models like GPT or BERT use learning rate schedules — starting high, then gradually reducing to stabilize training.',
  27,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '📉 Understanding Learning Rate in Machine Learning',
  'The learning rate controls how much the model updates its parameters in response to the error it made.\n\n📚 Core Concepts:\n\n🔹 Too High: Training becomes unstable, never converges\n🔹 Too Low: Training is very slow, or may get stuck in sub-optimal points\n🔹 Optimal: Balances speed and stability\n🔹 Schedulers: Decrease learning rate over time for fine-tuning\n🔹 Adaptive Optimizers: Adjust learning rate for each parameter individually\n\n🎯 Why It Matters:\n✅ Controls how fast or well the model learns\n✅ Affects convergence and accuracy\n✅ Prevents underfitting or overfitting\n✅ Works with optimizers like SGD, Adam, RMSprop\n\nUse Cases:\n✅ Neural networks\n✅ Reinforcement learning\n✅ Fine-tuning large language models\n✅ Gradient descent-based algorithms',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+34+(Learning+Rate+).mp4',
  27,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  27,
  'What does the learning rate control in training?',
  'The number of epochs',
  'The size of the weight update steps',
  'The amount of memory used',
  'The dataset used',
  'B',
  'genesis'
),
(
  27,
  'What can happen if the learning rate is too high?',
  'Faster training',
  'Overshooting and unstable model',
  'Underfitting',
  'More data required',
  'B',
  'genesis'
),
(
  27,
  'A very low learning rate leads to:',
  'Fast convergence',
  'Model crashing',
  'Very slow training or stuck results',
  'More features',
  'C',
  'genesis'
),
(
  27,
  'Which optimizer adapts the learning rate during training?',
  'SGD',
  'Linear Regression',
  'Adam',
  'K-Means',
  'C',
  'genesis'
);

INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  27,
  '📊 Learning Rate Tuner: Master the Speed!',
  '🔁 Optimization in AI Training',
  '🎥 FlexClip',
  'Create a mini-animation or slideshow that shows how the learning rate affects model training. Show differences in high, low, and just-right learning rates.\n\n🪜 Instructions:\n- Use FlexClip to create a visual story with 3 scenarios:\n  - Learning Rate = High 🚀\n  - Learning Rate = Low 🐢\n  - Learning Rate = Optimal ✅\n- Use icons, emojis, or graphs to show training curves\n- Add short captions (1–2 lines each) explaining the outcome\n- Show how the error reduces (or doesn’t) in each case\n\n🔍 Reflection Questions:\n- Which learning rate gave the smoothest curve?\n- What did you notice in the error reduction?\n- How could this impact your AI model performance?\n\n🎓 Key Takeaway:\nThe learning rate is the brain’s speed controller in AI — set it right, and your model learns like a pro. Get it wrong, and it could crash or crawl.\n\n🪙 Bonus Challenge:\n🧪 Animate a bouncing ball showing high vs low learning rate\n🏆 Earn 50 Skill Points for completing the Learning Rate Tuner mission!',
  'https://www.flexclip.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/flexclip.png',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  27,
  1,
  '🐢',
  '⚡',
  '🧠',
  'Animal Speed',
  'Power Thinking',
  'Learning Rate',
  'Training Type',
  'c',
  'Learning Rate controls how fast (🐢 or ⚡) the model (🧠) learns and updates its weights during training.',
  'Choosing the right learning rate helps AI learn at the right pace.',
  'genesis'
),
-- Game 2
(
  27,
  2,
  '📉',
  '🚀',
  '🔁',
  'Speedy Loss',
  'Gradient Boost',
  'Learning Rate',
  'Model Loop',
  'c',
  'Learning Rate affects how quickly we reduce loss (📉), by adjusting during every update cycle (🔁) — fast or slow (🚀).',
  'Higher rates might reduce loss quickly but risk instability.',
  'genesis'
),
-- Game 3
(
  27,
  3,
  '⚙️',
  '🎚️',
  '📊',
  'Model Settings',
  'Training Control',
  'Learning Rate',
  'Data Adjustments',
  'c',
  'Learning Rate is a tuning knob (🎚️) that controls weight updates (⚙️) and affects how the model improves its performance (📊).',
  'Proper tuning helps achieve stable and accurate learning.',
  'genesis'
);

-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'easy',
  'Unscramble the word: R A T E',
  'This word represents how fast the model updates during training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34JumbledEasy.png',
  'RATE',
  'The learning rate controls how quickly the AI updates its parameters.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'medium',
  'Unscramble the word: N G R A L E I N',
  'It is what the model does during training — it improves!',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34JumbledMed.png',
  'LEARNING',
  'Learning is the process of improving performance over time using data.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'hard',
  'Unscramble the phrase: G N R I A N E L T A R E',
  'The speed at which the model learns — too high or low affects results.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34JumbledHard.png',
  'LEARNING RATE',
  'The learning rate defines how big each step is when updating weights during training.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'easy',
  'What controls how fast a model updates its weights?',
  'The learning rate decides how large each step is in training updates.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34PerfectEasy.png',
  'Learning Rate',
  'The learning rate decides how large each step is in training updates.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'medium',
  'What might happen if the learning rate is too high?',
  'Too high a learning rate can cause instability in training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34PerfectMed.png',
  'The model may not converge',
  'Too high a learning rate can cause instability in training.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'hard',
  'What must be tuned to balance training speed and accuracy?',
  'Tuning the learning rate ensures effective and stable model learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34PerfectHard.png',
  'Learning Rate',
  'Tuning the learning rate ensures effective and stable model learning.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'easy',
  '_ A _ E',
  'What determines the speed of learning',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MissingEasy.png',
  'RATE',
  'The rate controls how fast the model updates.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'medium',
  'L _ _ _ _ _ _',
  'The model does this with training data',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MissingMed.png',
  'LEARNING',
  'The model learns by updating weights from data.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  27,
  'hard',
  'L _ _ _ _ _ _ R _ _ _',
  'This parameter controls update speed during training',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MissingHard.png',
  'LEARNING RATE',
  'Learning rate is critical — too small = slow learning; too large = instability.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  27,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemEasy6.png" }
  ]',
  'Match icons showing speed changes and training effects due to learning rate adjustments.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  27,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemMed8.png" }
  ]',
  'Match intermediate visuals that demonstrate training instability, convergence delay, and adaptive learning behaviors.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  27,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day34MemHard10.png" }
  ]',
  'Match complex visuals explaining how optimizers like Adam use dynamic learning rates for deep learning convergence.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(27, 'options',
 'What is the learning rate in machine learning?',
 'The time taken to train a model',
 'A parameter that controls the size of weight updates during training',
 'The number of hidden layers in a model',
 'The final accuracy score',
 'B',
 30,
 'genesis'),

-- Question 2
(27, 'options',
 'What might happen if the learning rate is set too high?',
 'The model converges slowly',
 'The model memorizes the data',
 'The model may overshoot and fail to converge',
 'The data gets reshuffled',
 'C',
 30,
 'genesis'),

-- Question 3
(27, 'options',
 'What is the effect of a very small learning rate?',
 'The model skips training',
 'The training is fast and accurate',
 'The model converges slowly and may get stuck',
 'The model ignores errors',
 'C',
 30,
 'genesis'),

-- Question 4
(27, 'options',
 'How can the learning rate be optimized during training?',
 'By freezing the layers',
 'Using learning rate schedules or adaptive optimizers',
 'Removing outliers',
 'Reducing the number of epochs',
 'B',
 30,
 'genesis');

-- Day=28(35)
INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  28,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay35.png',
  '🧠 Dropout: Teaching Neural Networks to Forget (and Learn Better!)',
  '<p>In deep learning, <strong>dropout</strong> is a clever technique used during training to randomly "drop" (ignore) some neurons. This helps prevent the model from becoming too confident or overfitted on the training data.</p>
   <p>By skipping certain neurons temporarily, the network is forced to learn multiple paths and patterns — making it more adaptable and generalizable when facing new, unseen data.</p>
   <p><em>Real-world analogy:</em> Imagine you’re studying for a test, but each time you review, one or two pages are missing. This forces you to understand the topic in different ways and not rely on the same notes every time. That’s dropout for AI.</p>',
  '<ul>
    <li>✅ Voice assistants like Siri or Alexa generalize better using dropout</li>
    <li>✅ Image recognition models like Google Lens avoid overfitting</li>
    <li>✅ Fraud detection systems stay resilient to unusual data</li>
  </ul>',
  '💡 Dropout is like training a neural network in “hard mode.” By randomly turning off neurons, the model becomes stronger — just like exercising with ankle weights!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Dropout was introduced by Geoffrey Hinton in 2014 — a pioneer in deep learning — to solve the problem of overfitting in neural networks.',
  'The dropout rate is usually between 20%–50%. Too much dropout, and the model forgets everything — too little, and it still memorizes.',
  'Adaptive dropout methods are being explored — where the AI learns when and how much to forget dynamically!',
  'Used in most deep learning frameworks like TensorFlow and PyTorch, dropout remains a standard trick in every AI engineer’s toolkit.',
  28,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '🧠 Dropout in Neural Networks',
  'Dropout is a regularization technique where, during training, random neurons are temporarily ignored. This prevents the network from relying too much on any one feature and encourages it to learn more robust representations.\n\n📚 Core Concepts:\n\n🔹 Dropout: Randomly ignoring neurons during training\n🔹 Overfitting: When the model memorizes the training data\n🔹 Generalization: The model\is ability to work on new data\n🔹 Dropout Rate: % of neurons dropped per training round\n🔹 Training vs Testing: Dropout is only active during training\n\n🎯 Why It Matters:\n✅ Reduces overfitting\n✅ Improves generalization\n✅ Builds robust AI models\n✅ Essential for deep networks with many layers\n\nUse Cases:\n✅ Object detection in self-driving cars\n✅ Chatbots understanding diverse conversations\n✅ Financial models adapting to changing markets\n✅ Medical diagnosis systems handling unseen symptoms',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+35+(Dropout).mp4',
  28,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  28,
  'What is "dropout" in AI?',
  'A way to delete neurons permanently',
  'Randomly turning off neurons during training',
  'Removing labels from data',
  'A type of activation function',
  'B',
  'genesis'
),
(
  28,
  'What problem does dropout mainly address?',
  'Underfitting',
  'Overfitting',
  'Class imbalance',
  'Missing data',
  'B',
  'genesis'
),
(
  28,
  'When is dropout usually applied?',
  'During prediction',
  'During training',
  'During testing only',
  'During feature selection',
  'B',
  'genesis'
),
(
  28,
  'What happens if you apply dropout during testing?',
  'It improves performance',
  'It adds more noise',
  'It reduces accuracy and consistency',
  'It makes no difference',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  28,
  '🧠 Neural Gym: Train with Dropout!',
  '🎯 Neural Network Training & Generalization',
  '🎨 Pixlr',
  'Design a visual that compares a neural network with and without dropout — highlight how dropout prevents overfitting and improves performance.\n\n🪜 Instructions:\n- Go to Pixlr and open a new canvas\n- Draw or paste two simple diagrams of neural networks:\n  - Left: Normal network (all neurons active)\n  - Right: Dropout applied (some neurons grayed out or “X” marked)\n- Add text boxes:\n  “No Dropout: Overfitting Risk”\n  “Dropout Applied: Better Generalization”\n- Use colored arrows to show data flow\n- Save your image and reflect on your design\n\n🔍 Reflection Questions:\n- Which network looks more flexible or generalized?\n- What would happen if too many neurons were dropped?\n- How would this help an AI model in real-world data?\n\n🎓 Key Takeaway:\nDropout is like a workout routine for neural networks — removing random pieces forces the network to strengthen all areas and prevent dependence on any one path.\n\n🪙 Bonus Challenge:\n🖼️ Share your Pixlr design titled “The Power of Dropout”\n🏆 Earn 50 Skill Points and become a Neural Network Designer of the Day!',
  'https://pixlr.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/pixlr.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  28,
  1,
  '🧠',
  '❌',
  '🎯',
  'Brain Error',
  'Missed Target',
  'Dropout',
  'Forgetfulness',
  'c',
  'In dropout, parts of the neural network (🧠) are randomly turned off (❌) during training to prevent overfitting and sharpen the learning (🎯).',
  'Dropout encourages broader learning across the network.',
  'genesis'
),
-- Game 2
(
  28,
  2,
  '🛑',
  '🔌',
  '🔄',
  'Power Failure',
  'Dropout',
  'Restart Loop',
  'Pause and Resume',
  'b',
  'Dropout temporarily disconnects (🔌) parts of the model (🛑), encouraging the network to rely on different paths during each training cycle (🔄).',
  'It strengthens different neuron paths on each pass.',
  'genesis'
),
-- Game 3
(
  28,
  3,
  '🎲',
  '❓',
  '🤖',
  'Random AI',
  'Unpredictable Output',
  'Dropout',
  'Data Confusion',
  'c',
  'Dropout uses randomness (🎲❓) to improve generalization in AI models (🤖) by preventing any one path from dominating.',
  'This makes the model more flexible to unseen data.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'easy',
  'Unscramble the word: D R O P',
  'Part of the full term; it means to remove something temporarily.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35JumbledEasy.png',
  'DROP',
  '“Drop” refers to the act of temporarily ignoring certain neurons during training.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'medium',
  'Unscramble the word: U T O P R D O',
  'A regularization technique that randomly disables neurons during training.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35JumbledMed.png',
  'DROPOUT',
  'Dropout helps prevent overfitting by randomly dropping neurons.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'hard',
  'Unscramble the phrase: N R I A T N G I I W T H O U T A L L N E U R O N S',
  'What dropout simulates — the model doesn’t rely on all neurons.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35JumbledHard.png',
  'TRAINING WITHOUT ALL NEURONS',
  'Dropout forces the network to learn redundantly by not using all neurons at once.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'easy',
  'Which technique turns off random neurons during training?',
  'Dropout deactivates a portion of neurons in each training cycle.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35PerfectEasy.png',
  'Dropout',
  'Dropout deactivates a portion of neurons in each training cycle.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'medium',
  'What is the main purpose of using dropout in neural networks?',
  'Dropout forces the model to generalize by not depending on specific neurons.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35PerfectMed.png',
  'To prevent overfitting',
  'Dropout forces the model to generalize by not depending on specific neurons.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'hard',
  'How does dropout improve neural network performance on new data?',
  'By not letting the model memorize, dropout helps it perform better on unseen data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35PerfectHard.png',
  'It reduces overfitting',
  'By not letting the model memorize, dropout helps it perform better on unseen data.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'easy',
  'D _ _ P',
  'Remove temporarily',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MissingEasy.png',
  'DROP',
  'The model “drops” neurons to prevent over-reliance.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'medium',
  'D _ _ _ _ _ T',
  'Randomly turns off neurons',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MissingMed.png',
  'DROPOUT',
  'Dropout reduces the network’s dependency on any single neuron.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  28,
  'hard',
  'T _ _ _ _ _ _ W _ _ _ _ _ D _ _ _ _ _',
  'What dropout makes the model do',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MissingHard.png',
  'TRAINING WITHOUT DROPOUT',
  'Without dropout, a model may memorize instead of generalizing.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  28,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemEasy6.png" }
  ]',
  'Match basic dropout-related visuals showing neurons being turned off and generalization effects.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  28,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemMed8.png" }
  ]',
  'Match intermediate-level images showing dropout application, neuron skipping, and performance improvement patterns.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  28,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day35MemHard10.png" }
  ]',
  'Match advanced illustrations showing dropout’s long-term effects on model generalization, structure, and fairness.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(28, 'options',
 'What is dropout in neural networks?',
 'A method to increase model layers',
 'A technique to randomly deactivate neurons during training',
 'A data cleaning technique',
 'A step to label the dataset',
 'B',
 30,
 'genesis'),

-- Question 2
(28, 'options',
 'Why is dropout used during training?',
 'To overfit the training data',
 'To speed up testing',
 'To prevent overfitting and improve generalization',
 'To normalize the data',
 'C',
 30,
 'genesis'),

-- Question 3
(28, 'options',
 'When is dropout typically applied in training?',
 'Only during testing',
 'Only before training begins',
 'During each forward pass in training',
 'After evaluating the model',
 'C',
 30,
 'genesis'),

-- Question 4
(28, 'options',
 'What happens to dropout during the testing phase?',
 'It increases dropout rate',
 'It is turned off, and all neurons are used',
 'It deletes training data',
 'It adds noise to predictions',
 'B',
 30,
 'genesis');

-- Day=29(36)

INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  29,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay36.png',
  '🔍 Convolution: The Vision Behind AI’s Eyes',
  '<p>Convolution is the mathematical heart of how AI sees. In Convolutional Neural Networks (CNNs), it\ is used to extract features like edges, colors, and shapes from images. Instead of looking at the entire image at once, convolution scans small parts (patches) using filters to detect patterns.</p><p>It’s like giving AI a magnifying glass to examine every detail — from detecting faces to identifying cats in photos.</p>',
  '<ul>
    <li>✅ Face unlock on your phone uses convolution</li>
    <li>✅ Medical imaging detects tumors through CNNs</li>
    <li>✅ Autonomous cars "see" traffic signs and lanes</li>
    <li>✅ Instagram filters enhance images using convolution math</li>
  </ul>',
  '💡 Your phone doesn’t see your face as a whole — convolution helps it see edges and patterns, like a digital detective with a magnifying lens!',
  'genesis'
);
INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Convolution became a hot topic in AI with the introduction of LeNet-5 by Yann LeCun in the 1990s — one of the first CNNs that read handwritten digits.',
  'The same technique used to identify cats in pictures is also used to detect cracks in bridges or defects in products.',
  'In the near future, convolution-based models will go beyond vision — being used in audio processing, robotics, and even interpreting brain scans.',
  'Convolution powers AI tools that analyze satellite imagery to monitor deforestation, urban growth, and climate change impact in real-time.',
  29,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '📸 What is Convolution in AI?',
  'Convolution is a technique in image processing where small filters slide across the image to detect patterns or features. It forms the foundation of Convolutional Neural Networks (CNNs), crucial in computer vision tasks.\n\n📚 Core Concepts:\n\n🔹 Convolution: Operation to extract local features from data\n🔹 Filter (Kernel): Small matrix that slides over the input\n🔹 Stride: Steps the filter takes while moving\n🔹 Padding: Technique to control the output size\n🔹 Feature Map: The result after applying convolution\n\n🎯 Why It Matters:\n✅ Detects key patterns in images\n✅ Reduces computation compared to dense networks\n✅ Enables AI to \"see\" like a human\n✅ Boosts performance in image-heavy tasks\n\nUse Cases:\n✅ Facial recognition systems\n✅ Self-driving car vision\n✅ Medical scan analysis\n✅ Wildlife monitoring through drones\n✅ Product quality control in manufacturing',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+36+(Convolution).mp4',
  29,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  29,
  'What does convolution do in a CNN?',
  'Add noise to images',
  'Sort image pixels',
  'Extract important features',
  'Convert text to numbers',
  'C',
  'genesis'
),
(
  29,
  'What is a filter (or kernel) in convolution?',
  'A color changer',
  'A small matrix that detects features',
  'A data cleaner',
  'A compression tool',
  'B',
  'genesis'
),
(
  29,
  'Which type of data is convolution mostly used with?',
  'Images',
  'Tabular data',
  'Text files',
  'Time zones',
  'A',
  'genesis'
),
(
  29,
  'Why is convolution efficient for image data?',
  'It increases image resolution',
  'It reduces parameters while preserving features',
  'It compresses the image size',
  'It reshuffles pixel colors',
  'B',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  29,
  '🧠 Pattern Hunter: Vision with Convolution',
  '📷 Computer Vision & Neural Networks',
  '🎨 Cartoonize',
  'Simulate how AI “sees” an image by breaking it down using filters and detecting important features — just like convolution does in a CNN.\n\n🪜 Instructions:\n- Pick any image (e.g., a selfie or nature shot)\n- Use Cartoonize to apply an AI filter\n- Notice how edges and details are highlighted — this mimics what convolution does\n- Compare before and after versions\n- Write a short reflection (2–3 lines) on what patterns became clearer\n\n🔍 Reflection Questions:\n- What kind of features did the AI highlight?\n- How might a CNN use this info?\n- Would a model need this to make decisions?\n\n🎓 Key Takeaway:\nConvolution helps AI spot edges, textures, and objects — it’s the brain behind machines that can see and recognize.\n\n🪙 Bonus Challenge:\n📤 Share your \"Cartoonized\" image + short insight\n🏆 Earn 50 Skill Points for completing this AI vision quest!',
  'https://www.cartoonize.net/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/colorinch.png',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  29,
  1,
  '🖼️',
  '🔍',
  '📏',
  'Zooming Image',
  'Image Editing',
  'Convolution',
  'Graphic Design',
  'c',
  'Convolution scans (🔍) parts of an image (🖼️) using filters (📏) to detect patterns like edges or textures.',
  'This process helps AI recognize shapes and structures.',
  'genesis'
),
-- Game 2
(
  29,
  2,
  '📦',
  '🎛️',
  '➡️',
  'Package Filter',
  'Convolution',
  'Data Transfer',
  'Box Compression',
  'b',
  'In convolution, data (📦) is processed through a filter (🎛️) and moved forward (➡️) to extract meaningful features.',
  'This step is key in CNN pipelines.',
  'genesis'
),
-- Game 3
(
  29,
  3,
  '👁️',
  '📐',
  '🧠',
  'Visual Geometry',
  'Convolution',
  'Optical Illusion',
  'Data Estimation',
  'b',
  'Convolution helps AI (🧠) see (👁️) and understand shapes (📐) in visual data for tasks like image recognition.',
  'It mimics how humans process visual patterns.',
  'genesis'
);
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'easy',
  'Unscramble the word: V O N',
  'A core part of the full term — hints at overlapping or scanning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36JumbledEasy.png',
  'VON',
  '"Von" is inside convolution, which involves sliding filters over data.',
  'english',
  'genesis'
);

INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'medium',
  'Unscramble the word: C L V O N U T I O N O',
  'A technique used in CNNs to extract features from images.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36JumbledMed.png',
  'CONVOLUTION',
  'Convolution helps detect edges, patterns, and shapes by applying filters over input data.',
  'english',
  'genesis'
);

INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'easy',
  'Unscramble the word: V O N',
  'A core part of the full term — hints at overlapping or scanning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36JumbledEasy.png',
  'VON',
  '"Von" is inside convolution, which involves sliding filters over data.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'easy',
  'What operation is used in CNNs to extract image features like edges?',
  'Convolution helps neural networks understand spatial features of data.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36PerfectEasy.png',
  'Convolution',
  'Convolution helps neural networks understand spatial features of data.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'medium',
  'What is the name of the small matrix that moves over input data in convolution?',
  'A kernel or filter is applied repeatedly to extract features like textures or outlines.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36PerfectMed.png',
  'Kernel or Filter',
  'A kernel or filter is applied repeatedly to extract features like textures or outlines.',
  'english',
  'genesis'
);
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'hard',
  'What benefit does convolution provide in deep learning image tasks?',
  'Convolution reduces the number of parameters while preserving important spatial relationships.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36PerfectHard.png',
  'Parameter efficiency and spatial awareness',
  'Convolution reduces the number of parameters while preserving important spatial relationships.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'easy',
  'C _ _ _ _ _ _ _ _ N',
  'Used to scan images in CNNs.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MissingEasy.png',
  'CONVOLUTION',
  'A key operation that lets CNNs learn from pixel patterns.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'medium',
  'K _ _ _ _ _',
  'This small matrix helps identify patterns.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MissingMed.png',
  'KERNEL',
  'A kernel is the heart of the convolution operation.',
  'english',
  'genesis'
);
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  29,
  'hard',
  'S _ _ _ _ _ G W _ _ _ _ W',
  'How convolution applies filters',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MissingHard.png',
  'SLIDING WINDOW',
  'The sliding window technique enables localized pattern detection.',
  'english',
  'genesis'
);

INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  29,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemEasy6.png" }
  ]',
  'Match basic convolution-related visuals showing image scanning and feature extraction.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  29,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemMed8.png" }
  ]',
  'Match intermediate-level convolution visuals highlighting edge detection, filters, and feature maps.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  29,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day36MemHard10.png" }
  ]',
  'Match advanced convolution concepts including kernel strides, multiple feature maps, and channel depths.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(29, 'options',
 'What is convolution in the context of deep learning?',
 'A method to store labels',
 'A way to flatten the data',
 'A mathematical operation to extract features from input data',
 'A loss function',
 'C',
 30,
 'genesis'),

-- Question 2
(29, 'options',
 'Where is convolution mainly used in machine learning?',
 'Recurrent Neural Networks (RNNs)',
 'Decision Trees',
 'Convolutional Neural Networks (CNNs)',
 'Generative Adversarial Networks (GANs)',
 'C',
 30,
 'genesis'),

-- Question 3
(29, 'options',
 'What does a convolutional filter (kernel) do?',
 'Deletes unwanted data',
 'Highlights specific patterns like edges or textures',
 'Increases image size',
 'Removes labels from data',
 'B',
 30,
 'genesis'),

-- Question 4
(29, 'options',
 'How does convolution help reduce computation in image data?',
 'By shrinking the number of labels',
 'By processing raw pixels directly',
 'By focusing only on important spatial features',
 'By converting the data into text',
 'C',
 30,
 'genesis');

-- Day=30(37)

 INSERT INTO ai_blogs (
  day,
  image_url,
  title,
  explanation,
  examples,
  fun_fact,
  program_type
) VALUES (
  30,
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay37.png',
  '📉 Pooling in AI: Zooming Out to See the Bigger Picture',
  '<p>In AI and deep learning, pooling helps condense large images or data by summarizing features. Think of it like zooming out — instead of looking at every pixel, the model focuses on the most important parts.</p><p>Pooling is used in Convolutional Neural Networks (CNNs) to reduce dimensions and make computation faster, while still retaining key features like edges or patterns.</p>',
  '<ul>
    <li>✅ Facial recognition — capturing only key features like eyes, nose, lips</li>
    <li>✅ Object detection — pooling focuses on shapes, not background noise</li>
    <li>✅ Voice detection — used in audio feature reduction in speech systems</li>
  </ul>',
  '💡 Max Pooling is like the “highlight reel” of an image — it keeps only the most intense features from a section and discards the rest!',
  'genesis'
);

INSERT INTO ai_facts (
  Historical_Fact, 
  Fun_Fact, 
  Future_Prediction, 
  Current_Affair, 
  day_index, 
  program_type
) VALUES (
  'Pooling became standard in CNNs after the success of LeNet and AlexNet — revolutionizing image recognition by speeding up training.',
  'There are different types of pooling: Max Pooling, Average Pooling, and Global Pooling — each with its own strategy for summarizing features.',
  'Adaptive pooling layers in future models will be smart enough to decide the best pooling method based on the task — making AI models more intelligent and flexible.',
  'AI models in mobile apps like Google Lens use pooling layers to make real-time analysis fast, efficient, and accurate — even on low-power devices.',
  30,
  'genesis'
);
INSERT INTO ai_learning (
  topic_name,
  description,
  video_url,
  day,
  program_type
) VALUES (
  '📉 What is Pooling in AI?',
  'Pooling is a downsampling technique used in convolutional neural networks to reduce the size of the feature maps, helping models train faster without losing important data.\n\n📚 Core Concepts:\n\n🔹 Max Pooling: Keeps the highest value in a region (most common)\n🔹 Average Pooling: Averages the values in the region\n🔹 Stride: The step size for moving the pooling window\n🔹 Dimensionality Reduction: Less data, faster computation\n\n🎯 Why It Matters:\n✅ Reduces computation\n✅ Prevents overfitting\n✅ Focuses on important features\n✅ Works better on larger datasets\n\nUse Cases:\n✅ Image classification\n✅ Object detection\n✅ Gesture recognition\n✅ Medical imaging (X-rays, MRIs)',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/AI_Learning/Ai+Learning+Day+37+(Pooling).mp4',
  30,
  'genesis'
);

INSERT INTO ai_learning_assessments (
  day,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  program_type
) VALUES
(
  30,
  'What is the purpose of pooling in AI?',
  'Increase image resolution',
  'Reduce data dimensions while retaining key features',
  'Replace convolution layers',
  'Add new training data',
  'B',
  'genesis'
),
(
  30,
  'What does Max Pooling do?',
  'Sums all pixels',
  'Takes the maximum value in a region',
  'Averages all values',
  'Removes all background',
  'B',
  'genesis'
),
(
  30,
  'Which layer is pooling typically used with?',
  'Output layer',
  'Convolutional layer',
  'Activation layer',
  'Normalization layer',
  'B',
  'genesis'
),
(
  30,
  'Why is pooling useful in CNNs?',
  'Increases overfitting',
  'Removes accuracy',
  'Reduces computation and improves generalization',
  'Multiplies features',
  'C',
  'genesis'
);
INSERT INTO ai_space_mission (
  day,
  mission_name,
  tool_category,
  tool_to_use,
  mission_task,
  tool_link,
  img_link,
  program_type
) VALUES (
  30,
  '🧩 Feature Puzzle: Pool & Predict',
  '🧠 Visual Intelligence & Deep Learning',
  '🎨 Pixlr',
  'Simulate how pooling works on images. Use Pixlr to demonstrate how downsampling affects image clarity while retaining important features.\n\n🪜 Instructions:\n- Upload any high-quality image to Pixlr\n- Apply pixelation or mosaic blur filters to reduce detail (simulate pooling)\n- Save the new version and compare it side by side with the original\n- Analyze: Which features are still visible? What details are lost?\n\n🔍 Reflection Questions:\n- Did the image still retain the main shapes?\n- What was lost after the pixelation?\n- How does this help you understand pooling in CNNs?\n\n🎓 Key Takeaway:\nPooling teaches AI what to ignore and what to focus on. It\ is how machines “zoom out” and still make accurate decisions.\n\n🪙 Bonus Challenge:\n📤 Share both images (original vs. pooled) with a 2-line summary\n🏆 Earn 50 Skill Points for mastering the Pooling Perspective!',
  'https://pixlr.com/',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/pixlr.jpg',
  'genesis'
);
INSERT INTO emoji_games (
  day,
  game_number,
  svg1,
  svg2,
  svg3,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  detail,
  example,
  program_type
) VALUES
-- Game 1
(
  30,
  1,
  '🖼️',
  '🔽',
  '🔲',
  'Image Compression',
  'Pixel Art',
  'Pooling',
  'Image Zoom',
  'c',
  'Pooling reduces (🔽) the size of an image (🖼️) by summarizing pixel blocks (🔲), helping in faster and smarter processing.',
  'It simplifies data while keeping important features.',
  'genesis'
),
-- Game 2
(
  30,
  2,
  '📉',
  '🧠',
  '✨',
  'Data Loss',
  'Memory Boost',
  'Pooling',
  'Feature Spark',
  'c',
  'Pooling helps reduce data size (📉), making neural networks (🧠) learn key features more efficiently (✨).',
  'It improves learning speed and generalization.',
  'genesis'
),
-- Game 3
(
  30,
  3,
  '🔍',
  '🔢',
  '🚫',
  'Data Filtering',
  'Noise Reduction',
  'Pooling',
  'Input Block',
  'c',
  'Pooling selects key numbers (🔢) from an image while ignoring (🚫) less useful ones, like zooming into important details (🔍).',
  'It focuses learning on relevant visual patterns.',
  'genesis'
);
-- Easy Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'easy',
  'Unscramble the word: G N I L O O P',
  'A technique used in CNNs to reduce the dimensions of feature maps.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AIBlogDay37.png',
  'POOLING',
  'Pooling reduces the size of feature maps, improving computational efficiency.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'medium',
  'Unscramble the word: A X M P O O L',
  'This type of pooling selects the highest value in a region.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37JumbledMed.png',
  'MAX POOL',
  'Max Pooling picks the most dominant feature in each patch.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO jumbled_words (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'hard',
  'Unscramble the word: D W O S A N M G I L P O O',
  'A pooling process that reduces spatial resolution in CNNs.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37JumbledHard.png',
  'DOWNSAMPLING POOL',
  'Pooling is a form of downsampling to retain key data while reducing size.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'easy',
  'What technique reduces the feature map size in convolutional networks?',
  'Pooling compresses feature maps without losing key patterns.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37PerfectEasy.png',
  'Pooling',
  'Pooling compresses feature maps without losing key patterns.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'medium',
  'Which pooling type retains the highest pixel value from a patch?',
  'Max pooling keeps the strongest activation — the most important feature.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37PerfectMed.png',
  'Max Pooling',
  'Max pooling keeps the strongest activation — the most important feature.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO perfect_match (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'hard',
  'Why is pooling essential in convolutional networks?',
  'Pooling decreases complexity and increases generalization in deep learning.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37PerfectHard.png',
  'To reduce computation and avoid overfitting',
  'Pooling decreases complexity and increases generalization in deep learning.',
  'english',
  'genesis'
);
-- Easy Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'easy',
  '_ O _ _ I _ G',
  'It’s used to shrink CNN outputs while keeping key features.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MissingEasy.png',
  'POOLING',
  'Pooling compresses information efficiently in neural networks.',
  'english',
  'genesis'
);

-- Medium Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'medium',
  'M _ _ P _ _ _',
  'A pooling method that grabs only the strongest feature.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MissingMed.png',
  'MAX POOL',
  'Max pooling simplifies data by selecting maximum values.',
  'english',
  'genesis'
);

-- Hard Level
INSERT INTO missing_letters (
  day,
  level,
  question,
  explanation,
  hint_img,
  answer,
  answer_explanation,
  language,
  program_type
) VALUES (
  30,
  'hard',
  'D _ _ _ S _ _ _ _ _ _',
  'What pooling helps achieve: shrinking without major loss.',
  'https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MissingHard.png',
  'DOWNSAMPLING',
  'Pooling is a downsampling operation that condenses information.',
  'english',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  30,
  'easy',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemEasy6.png" }
  ]',
  'Match visual clues of pooling operations showing downsampling and pattern retention.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  30,
  'medium',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemMed8.png" }
  ]',
  'Match intermediate pooling patterns including max vs average pooling regions and feature emphasis.',
  'genesis'
);
INSERT INTO memory_game (
  day,
  level,
  image_pairs,
  summary,
  program_type
) VALUES (
  30,
  'hard',
  '[
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard1.png" },
    { "id": 1, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard1.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard2.png" },
    { "id": 2, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard2.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard3.png" },
    { "id": 3, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard3.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard4.png" },
    { "id": 4, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard4.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard5.png" },
    { "id": 5, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard5.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard6.png" },
    { "id": 6, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard6.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard7.png" },
    { "id": 7, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard7.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard8.png" },
    { "id": 8, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard8.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard9.png" },
    { "id": 9, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard9.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard10.png" },
    { "id": 10, "src": "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Day37MemHard10.png" }
  ]',
  'Match advanced pooling representations like stride size impacts, adaptive pooling, and deeper CNNs.',
  'genesis'
);
INSERT INTO question_banks (
  day,
  question_type,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  time,
  program_type
) VALUES

-- Question 1
(30, 'options',
 'What is pooling in a Convolutional Neural Network (CNN)?',
 'A step that flattens data into vectors',
 'A process to resize the training dataset',
 'A downsampling technique to reduce dimensions and retain features',
 'A method for weight initialization',
 'C',
 30,
 'genesis'),

-- Question 2
(30, 'options',
 'Why is pooling important in CNNs?',
 'It makes models slower',
 'It prevents model training',
 'It helps reduce computation and controls overfitting',
 'It increases the size of feature maps',
 'C',
 30,
 'genesis'),

-- Question 3
(30, 'options',
 'In which pooling technique is the largest value from the patch taken?',
 'Average Pooling',
 'Min Pooling',
 'Random Pooling',
 'Max Pooling',
 'D',
 30,
 'genesis'),

-- Question 4
(30, 'options',
 'What happens when you use average pooling?',
 'Only edges are detected',
 'Neurons are deactivated randomly',
 'The average of each region is taken as the pooled value',
 'Input size increases',
 'C',
 30,
 'genesis');
