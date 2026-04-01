CREATE TABLE user_assessment_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,

  vark_completed TINYINT(1) DEFAULT 0,
  cps_completed TINYINT(1) DEFAULT 0,
  ai_completed TINYINT(1) DEFAULT 0,

  vark_result VARCHAR(5),
  archetype_id VARCHAR(50),

  vark_answers JSON,
  cps_answers JSON,
  ai_answers JSON,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE assessment_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,

  assessment_type ENUM('VARK','CPS','AI') NOT NULL,
  question_number INT NOT NULL,
  question_text VARCHAR(255) NOT NULL,

  options JSON NOT NULL,

  correct_option VARCHAR(5) NULL, 

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uq_type_qno (assessment_type, question_number)
);


ALTER TABLE user_assessment_progress
ADD CONSTRAINT uq_user UNIQUE (user_id);

ALTER TABLE user_assessment_progress
ADD ai_score INT DEFAULT 0;
ALTER TABLE user_assessment_progress
ADD ai_percentage INT DEFAULT 0;
ALTER TABLE user_assessment_progress
ADD cps_result JSON NULL;
ALTER TABLE user_assessment_progress
ADD seq VARCHAR(255);





CREATE TABLE IF NOT EXISTS ai_myth_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT NOT NULL,
  correct_answer VARCHAR(5) NOT NULL CHECK (correct_answer IN ('true', 'false')),
  explanation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS myth_submit_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  answers JSON NOT NULL,
  correct_count INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  result VARCHAR(10) NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


ALTER TABLE ai_myth_questions
ADD COLUMN day INT DEFAULT 1,
ADD COLUMN seq VARCHAR(255) NOT NULL,
ADD COLUMN assessment_type VARCHAR(50) DEFAULT 'ai_myth',
ADD COLUMN time INT DEFAULT 60;


ALTER TABLE myth_submit_answers
ADD COLUMN assessment_type VARCHAR(50) DEFAULT 'ai_myth',
ADD COLUMN user_id INT NOT NULL,
ADD COLUMN day INT NOT NULL;

ALTER TABLE myth_submit_answers
MODIFY COLUMN email VARCHAR(255) NULL DEFAULT NULL;


ALTER TABLE ai_myth_questions
MODIFY COLUMN seq VARCHAR(255) NOT NULL;


CREATE TABLE IF NOT EXISTS ai_failure_cases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day INT NOT NULL,
  seq VARCHAR(255) NOT NULL,
  title TEXT NOT NULL,
  description JSON NOT NULL,
  question TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer VARCHAR(5) NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS ai_failure_submit_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  day INT NOT NULL,
  answers JSON NOT NULL,
  correct_count INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  result VARCHAR(10) NOT NULL,
  assessment_type VARCHAR(50) DEFAULT 'ai_failure',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_day (user_id, day, assessment_type)
);



CREATE TABLE IF NOT EXISTS ai_tool_arena_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day INT NOT NULL,
  seq VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer VARCHAR(5) NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS ai_tool_arena_submit_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  day INT NOT NULL,
  answers JSON NOT NULL,
  correct_count INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  result VARCHAR(10) NOT NULL,
  assessment_type VARCHAR(50) DEFAULT 'ai_tool_arena',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_day (user_id, day, assessment_type)
);








INSERT INTO ai_tool_arena_questions (day, seq, question, options, correct_answer, explanation) VALUES
(1, 'SEQ-C', 'Create quick marketing captions for social media posts.',
 '[{"id":"A","text":"General-purpose text generator","icon":"fa-bolt"},{"id":"B","text":"Rule based Automation Script","icon":"fa-cog"}]',
 'A',
 'A general-purpose text generator is ideal for creating quick, creative marketing captions as it can understand context and generate engaging content tailored for social media.'),
(1, 'SEQ-C', 'Analyze customer feedback sentiment from product reviews.',
 '[{"id":"A","text":"Sentiment analysis model","icon":"fa-chart-line"},{"id":"B","text":"Image recognition system","icon":"fa-image"}]',
 'A',
 'A sentiment analysis model is specifically designed to understand and classify the emotional tone of text, making it perfect for analyzing customer feedback and reviews.'),
(1, 'SEQ-C', 'Automate repetitive data entry tasks with fixed rules.',
 '[{"id":"A","text":"Neural network model","icon":"fa-brain"},{"id":"B","text":"Rule-based automation script","icon":"fa-cog"}]',
 'B',
 'A rule-based automation script is most efficient for repetitive tasks with fixed rules, as it follows predetermined logic without requiring machine learning complexity.'),
(1, 'SEQ-C', 'Identify objects and people in surveillance camera footage.',
 '[{"id":"A","text":"Computer vision model","icon":"fa-eye"},{"id":"B","text":"Natural language processor","icon":"fa-comment"}]',
 'A',
 'A computer vision model is specifically trained to detect, recognize, and classify objects and people in images and video footage, making it ideal for surveillance applications.'),
(1, 'SEQ-C', 'Translate documents between multiple languages accurately.',
 '[{"id":"A","text":"Speech recognition system","icon":"fa-microphone"},{"id":"B","text":"Neural machine translation model","icon":"fa-language"}]',
 'B',
 'A neural machine translation model uses deep learning to understand context and nuances, providing accurate translations between multiple languages while maintaining meaning and tone.');





 INSERT INTO ai_failure_cases (day, seq, title, description, question, options, correct_answer, explanation) VALUES
(1, 'SEQ-C', 'Facial Recognition Misidentification in Public Surveillance', 
 '["A facial recognition system deployed in public spaces showed high accuracy in testing but caused repeated misidentifications in real-world use, particularly affecting specific demographic groups.", "The system had been trained primarily on datasets that lacked diversity, leading to significantly higher error rates when identifying individuals from underrepresented groups. This resulted in wrongful detentions and raised serious concerns about algorithmic bias in law enforcement applications."]',
 'Why did this AI fail?',
 '[{"id":"A","text":"The Algorithm was too slow"},{"id":"B","text":"Hardware malfunction"},{"id":"C","text":"biased and unrepresentative training data"},{"id":"D","text":"Lack of user instructions"}]',
 'C',
 'The system failed due to biased and unrepresentative training data, leading to unfair and inaccurate outcomes for specific demographic groups.'),
(1, 'SEQ-C', 'Medical Diagnosis System Failure', 
 '["An AI system designed to diagnose skin conditions performed well in laboratory settings but failed dramatically when deployed in diverse clinical environments.", "The training data predominantly featured lighter skin tones, causing the system to misdiagnose conditions in patients with darker skin. This highlighted the critical importance of representative datasets in medical AI applications."]',
 'Why did this AI fail?',
 '[{"id":"A","text":"Poor internet connectivity"},{"id":"B","text":"Insufficient training data diversity"},{"id":"C","text":"Outdated software version"},{"id":"D","text":"Too many features"}]',
 'B',
 'The system failed due to insufficient training data diversity, particularly lacking representation of diverse skin tones in the training dataset.'),
(1, 'SEQ-C', 'Automated Hiring System Bias', 
 '["A major tech company implemented an AI-powered resume screening system to streamline their hiring process, but discovered it was systematically discriminating against certain candidates.", "The AI had been trained on historical hiring data that reflected past biases in the company''s recruitment practices. It learned to penalize resumes containing certain keywords and attributes, perpetuating existing discrimination patterns rather than creating a fair evaluation process."]',
 'Why did this AI fail?',
 '[{"id":"A","text":"System processing limitations"},{"id":"B","text":"Learning from biased historical data"},{"id":"C","text":"Incompatible file formats"},{"id":"D","text":"Network security issues"}]',
 'B',
 'The system failed by learning from biased historical data, which caused it to replicate and amplify existing discrimination patterns in hiring decisions.');




 INSERT INTO ai_myth_questions 
(question_text, correct_answer, explanation, day, seq, assessment_type) 
VALUES
('AI systems can have biases based on their training data.', 'true', 
 'AI reflects the biases present in its training data and the decisions made during development. This is why diverse, representative data and oversight are crucial.',
 1,'SEQ-C', 'ai_myth'),

('Machine learning models always make perfect predictions.', 'false', 
 'Machine learning models are probabilistic and can make errors. They are tools that assist decision-making but are not infallible.',
 1, 'SEQ-C', 'ai_myth'),

('AI can replace all human jobs in the next 5 years.', 'false', 
 'While AI will automate some tasks, it will also create new jobs and augment human capabilities. Complete replacement of all jobs is unrealistic in such a short timeframe.',
 1, 'SEQ-C', 'ai_myth'),

('Deep learning requires large amounts of data to train effectively.', 'true', 
 'Deep learning models typically need substantial amounts of data to learn patterns effectively and avoid overfitting, though techniques like transfer learning can help with smaller datasets.',
 1, 'SEQ-C', 'ai_myth'),

('AI systems can understand context the same way humans do.', 'false', 
 'AI systems process patterns in data but lack human-like consciousness and contextual understanding. They can simulate understanding but do not experience it.',
 1, 'SEQ-C', 'ai_myth');


INSERT INTO assessment_questions 
(assessment_type, question_number, question_text, options, correct_option) VALUES

-- ================= AI =================
('AI',1,'What best describes Artificial Intelligence?',
 '[{"key":"A","text":"Systems that can perform tasks requiring human-like thinking"},{"key":"B","text":"Any computer program"},{"key":"C","text":"Machines that only store data"}]',
 'A'),

('AI',2,'Which of the following is an example of AI?',
 '[{"key":"A","text":"A calculator performing arithmetic"},{"key":"B","text":"A voice assistant answering questions"},{"key":"C","text":"A spreadsheet storing data"}]',
 'B'),

('AI',3,'Which field is most closely related to Artificial Intelligence?',
 '[{"key":"A","text":"Machine Learning"},{"key":"B","text":"Web Design"},{"key":"C","text":"Computer Hardware Repair"}]',
 'A'),

('AI',4,'What does AI primarily try to mimic?',
 '[{"key":"A","text":"Human intelligence"},{"key":"B","text":"Electrical circuits"},{"key":"C","text":"Database systems"}]',
 'A'),

('AI',5,'Which task is AI commonly used for?',
 '[{"key":"A","text":"Image recognition"},{"key":"B","text":"Manual typing"},{"key":"C","text":"Cable installation"}]',
 'A'),

('AI',6,'What is Machine Learning?',
 '[{"key":"A","text":"A subset of AI where systems learn from data"},{"key":"B","text":"A type of computer hardware"},{"key":"C","text":"A database management system"}]',
 'A'),

('AI',7,'Which algorithm type learns from labeled data?',
 '[{"key":"A","text":"Supervised Learning"},{"key":"B","text":"Unsupervised Learning"},{"key":"C","text":"Reinforcement Learning"}]',
 'A'),

('AI',8,'What is a training dataset used for?',
 '[{"key":"A","text":"To teach a model patterns"},{"key":"B","text":"To test hardware performance"},{"key":"C","text":"To deploy applications"}]',
 'A'),

('AI',9,'Which AI technique is inspired by the human brain?',
 '[{"key":"A","text":"Neural Networks"},{"key":"B","text":"Decision Tables"},{"key":"C","text":"Sorting Algorithms"}]',
 'A'),

('AI',10,'What is Natural Language Processing (NLP)?',
 '[{"key":"A","text":"AI that understands human language"},{"key":"B","text":"AI that processes images"},{"key":"C","text":"AI that controls hardware"}]',
 'A'),

('AI',11,'Which is an example of unsupervised learning?',
 '[{"key":"A","text":"Clustering customer data"},{"key":"B","text":"Email spam detection with labels"},{"key":"C","text":"Game-playing with rewards"}]',
 'A'),

('AI',12,'What does overfitting mean in machine learning?',
 '[{"key":"A","text":"Model performs well on training data but poorly on new data"},{"key":"B","text":"Model trains too slowly"},{"key":"C","text":"Model uses too much hardware"}]',
 'A'),

('AI',13,'What is reinforcement learning primarily based on?',
 '[{"key":"A","text":"Rewards and penalties"},{"key":"B","text":"Labeled datasets"},{"key":"C","text":"Static rules"}]',
 'A'),

('AI',14,'Which metric is commonly used to evaluate classification models?',
 '[{"key":"A","text":"Accuracy"},{"key":"B","text":"Compilation time"},{"key":"C","text":"Disk usage"}]',
 'A'),

('AI',15,'What is a neural network layer?',
 '[{"key":"A","text":"A group of neurons processing inputs"},{"key":"B","text":"A database table"},{"key":"C","text":"A CPU instruction"}]',
 'A'),

('AI',16,'What problem does backpropagation solve?',
 '[{"key":"A","text":"Adjusting weights to minimize error"},{"key":"B","text":"Storing training data"},{"key":"C","text":"Rendering graphics"}]',
 'A'),

('AI',17,'Which activation function helps handle non-linearity?',
 '[{"key":"A","text":"ReLU"},{"key":"B","text":"SUM"},{"key":"C","text":"SORT"}]',
 'A'),

('AI',18,'What is the purpose of model validation?',
 '[{"key":"A","text":"Evaluate model performance on unseen data"},{"key":"B","text":"Increase training speed"},{"key":"C","text":"Store model weights"}]',
 'A'),

('AI',19,'What is explainable AI (XAI)?',
 '[{"key":"A","text":"AI systems whose decisions can be understood by humans"},{"key":"B","text":"AI that only uses rules"},{"key":"C","text":"AI without data"}]',
 'A'),

('AI',20,'What is a major ethical concern in AI systems?',
 '[{"key":"A","text":"Bias in decision-making"},{"key":"B","text":"High electricity usage"},{"key":"C","text":"Slow internet speed"}]',
 'A'),

-- ================= VARK =================
('VARK',1,'When learning a new topic, I prefer to...',
 '[{"key":"A","text":"Look at diagrams, charts, or images","value":"V","category":"vark"},{"key":"B","text":"Listen to someone explain it","value":"A","category":"vark"},{"key":"C","text":"Read articles, books, or notes","value":"R","category":"vark"},{"key":"D","text":"Try things out myself and learn by doing","value":"K","category":"vark"}]',
 NULL),

('VARK',2,'To remember something better, I usually...',
 '[{"key":"A","text":"Create mental images or visualize the concept","value":"V","category":"vark"},{"key":"B","text":"Repeat it out loud or discuss with others","value":"A","category":"vark"},{"key":"C","text":"Write it down or read it again","value":"R","category":"vark"},{"key":"D","text":"Practice it or apply it in a real situation","value":"K","category":"vark"}]',
 NULL),

('VARK',3,'When revising for a quiz, I rely most on...',
 '[{"key":"A","text":"Color-coded notes, mind maps, or visual aids","value":"V","category":"vark"},{"key":"B","text":"Recorded explanations or verbal discussions","value":"A","category":"vark"},{"key":"C","text":"Written summaries and study guides","value":"R","category":"vark"},{"key":"D","text":"Practice problems or hands-on exercises","value":"K","category":"vark"}]',
 NULL),

('VARK',4,'If I don’t understand a concept, I prefer to...',
 '[{"key":"A","text":"Look at another visual example","value":"V","category":"vark"},{"key":"B","text":"Hear it explained differently","value":"A","category":"vark"},{"key":"C","text":"Read about it in detail","value":"R","category":"vark"},{"key":"D","text":"Experiment with it","value":"K","category":"vark"}]',
 NULL),

('VARK',5,'I enjoy learning most when...',
 '[{"key":"A","text":"The content is visually appealing","value":"V","category":"vark"},{"key":"B","text":"I can listen and reflect","value":"A","category":"vark"},{"key":"C","text":"I can read and think deeply","value":"R","category":"vark"},{"key":"D","text":"I can interact and do tasks","value":"K","category":"vark"}]',
 NULL),

('VARK',6,'While learning online, I spend more time on...',
 '[{"key":"A","text":"Visual cards or illustrations","value":"V","category":"vark"},{"key":"B","text":"Audio or spoken explanations","value":"A","category":"vark"},{"key":"C","text":"Text-based content","value":"R","category":"vark"},{"key":"D","text":"Games or interactive tools","value":"K","category":"vark"}]',
 NULL),

('VARK',7,'I understand tools better when...',
 '[{"key":"A","text":"I see how they work visually","value":"V","category":"vark"},{"key":"B","text":"Someone explains their usage","value":"A","category":"vark"},{"key":"C","text":"I read documentation","value":"R","category":"vark"},{"key":"D","text":"I try them directly","value":"K","category":"vark"}]',
 NULL),

('VARK',8,'Which best describes you?',
 '[{"key":"A","text":"Show me","value":"V","category":"vark"},{"key":"B","text":"Tell me","value":"A","category":"vark"},{"key":"C","text":"Let me read","value":"R","category":"vark"},{"key":"D","text":"Let me try","value":"K","category":"vark"}]',
 NULL),

-- ================= CPS =================
('CPS',1,'When learning AI concepts, I prefer:',
 '[{"key":"A","text":"Clear definitions with logical steps","value":"analytical","category":"processing"},{"key":"B","text":"Real-world examples and practical outcomes","value":"intuitive","category":"processing"}]',
 NULL),

('CPS',2,'I understand new ideas best when:',
 '[{"key":"A","text":"They are explained in a logical structure","value":"analytical","category":"processing"},{"key":"B","text":"I can see how they are applied in practice","value":"intuitive","category":"processing"}]',
 NULL),

('CPS',3,'I prefer learning when:',
 '[{"key":"A","text":"Topics follow a clear, fixed sequence","value":"sequential","category":"flow"},{"key":"B","text":"I can freely explore between topics","value":"exploratory","category":"flow"}]',
 NULL),

('CPS',4,'When I get stuck on a topic, I usually:',
 '[{"key":"A","text":"Work through it step by step","value":"sequential","category":"flow"},{"key":"B","text":"Explore related concepts for clarity","value":"exploratory","category":"flow"}]',
 NULL),

('CPS',5,'During quizzes, I prefer:',
 '[{"key":"A","text":"Fewer questions with deeper explanations","value":"accuracy","category":"pace"},{"key":"B","text":"Many quick questions","value":"speed","category":"pace"}]',
 NULL),

('CPS',6,'I feel most satisfied when I:',
 '[{"key":"A","text":"Fully understand the topic","value":"accuracy","category":"pace"},{"key":"B","text":"Complete tasks quickly","value":"speed","category":"pace"}]',
 NULL),

('CPS',7,'I stay motivated when:',
 '[{"key":"A","text":"I complete meaningful learning tasks","value":"task","category":"motivation"},{"key":"B","text":"I earn points, badges, or rewards","value":"reward","category":"motivation"}]',
 NULL),

('CPS',8,'What makes me return daily?',
 '[{"key":"A","text":"Clear goals and visible progress","value":"task","category":"motivation"},{"key":"B","text":"Streaks, badges, and rankings","value":"reward","category":"motivation"}]',
 NULL);


-- ================= AI Learning Language Support =================
-- Add language column to ai_learning (topics & videos)
ALTER TABLE ai_learning ADD COLUMN language VARCHAR(5) DEFAULT 'en';

-- Add language column to ai_learning_assessments (questions)
ALTER TABLE ai_learning_assessments ADD COLUMN language VARCHAR(5) DEFAULT 'en';

-- Add language column to ai_learning_progress (user progress per language)
ALTER TABLE ai_learning_progress ADD COLUMN language VARCHAR(5) DEFAULT 'en';



ALTER TABLE ai_learning_progress
DROP INDEX uniq_user_day_program_lang;

ALTER TABLE ai_learning_progress
ADD UNIQUE KEY uniq_user_day_program
(user_id, day, program_type);

-- Add language support to facts
ALTER TABLE ai_facts ADD COLUMN language VARCHAR(5) DEFAULT 'en';

-- Ensure only one progress record per (user_id, day, program_type)
ALTER TABLE aifact_user_visit
ADD UNIQUE KEY unique_user_day_program
(userId, day, program_type);

-- Add language support to AI Myth
ALTER TABLE ai_myth_questions ADD COLUMN language VARCHAR(10) DEFAULT 'en';
ALTER TABLE myth_submit_answers ADD COLUMN language VARCHAR(10) DEFAULT 'en';

-- Add language support to AI Failure Case
ALTER TABLE ai_failure_cases ADD COLUMN language VARCHAR(10) DEFAULT 'en';
ALTER TABLE ai_failure_submit_answers ADD COLUMN language VARCHAR(10) DEFAULT 'en';

-- Add language support to AI Tool Arena
ALTER TABLE ai_tool_arena_questions ADD COLUMN language VARCHAR(10) DEFAULT 'en';
ALTER TABLE ai_tool_arena_submit_answers ADD COLUMN language VARCHAR(10) DEFAULT 'en';

-- Add language support to Perfect Match
ALTER TABLE perfect_match ADD COLUMN language VARCHAR(5) DEFAULT 'en';
ALTER TABLE user_played_questions ADD COLUMN language VARCHAR(5) DEFAULT 'en';

-- Add language support to Missing Letters
ALTER TABLE missing_letters ADD COLUMN language VARCHAR(50) DEFAULT 'english';

-- Add language support to Jumbled Words
ALTER TABLE jumbled_words ADD COLUMN language VARCHAR(50) DEFAULT 'english';

-- Add language support to AI Skill Quest (Assessments)
ALTER TABLE question_banks ADD COLUMN language VARCHAR(10) DEFAULT 'en';
ALTER TABLE answer_set ADD COLUMN language VARCHAR(10) DEFAULT 'en';

-- Add language support to AI Emoji Game
ALTER TABLE emoji_games ADD COLUMN language VARCHAR(10) DEFAULT 'en';
ALTER TABLE user_emoji_progress ADD COLUMN language VARCHAR(10) DEFAULT 'en';

-- Add language support to AI Mission
ALTER TABLE ai_space_mission ADD COLUMN language VARCHAR(10) DEFAULT 'en';
-- Add language support to assessment_questions
ALTER TABLE assessment_questions ADD COLUMN language VARCHAR(5) DEFAULT 'en';
ALTER TABLE assessment_questions DROP INDEX uq_type_qno;
ALTER TABLE assessment_questions ADD UNIQUE KEY uq_type_qno_lang (assessment_type, question_number, language);
ALTER TABLE assessment_questions ADD INDEX idx_assessment_language (language);

-- Add language support to user_assessment_progress
ALTER TABLE user_assessment_progress ADD COLUMN language VARCHAR(5) DEFAULT 'en';
ALTER TABLE user_assessment_progress ADD INDEX idx_progress_language (language);
ALTER TABLE user_ai_mission_progress ADD COLUMN language VARCHAR(10) DEFAULT 'en';

-- Add language support to AI Blog
ALTER TABLE ai_blogs ADD COLUMN language VARCHAR(10) DEFAULT 'en';
-- ALTER TABLE ai_blogs ADD INDEX idx_blog_language (language);

ALTER TABLE user_ai_blog_progress ADD COLUMN language VARCHAR(10) DEFAULT 'en';
-- Ensure unique progress per day/user/program
ALTER TABLE user_ai_blog_progress DROP INDEX IF EXISTS unique_user_day_program;
ALTER TABLE user_ai_blog_progress ADD UNIQUE KEY unique_user_day_program (user_id, day, program_type);











ALTER TABLE ai_learning
DROP INDEX unique_day_program_type;



ALTER TABLE ai_learning
ADD UNIQUE KEY unique_day_program_type (
day,
program_type,
language
);











////mar 11

update perfect_match set program_type = "apprentice"  where id =58;



ALTER TABLE memory_game 
ADD COLUMN language VARCHAR(50) DEFAULT 'en';





ALTER TABLE ai_failure_cases
ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';


ALTER TABLE ai_myth_questions
ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';


ALTER TABLE ai_tool_arena_questions
ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';


ALTER TABLE user_played_questions
ADD COLUMN language VARCHAR(50) DEFAULT 'en';

ALTER TABLE rewards 
ADD COLUMN reward_value INT DEFAULT 0;

/////31 mar 2026

-- Add program_type to submit-answer tables so per-program progress is isolated
-- apprentice = 7-day program | genesis = 30-day program
ALTER TABLE myth_submit_answers
ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';

ALTER TABLE ai_failure_submit_answers
ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';

ALTER TABLE ai_tool_arena_submit_answers
ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';

-- Additional isolation sweep for all remaining progress tables
ALTER TABLE user_played_questions ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE user_emoji_progress ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE aifact_user_visit ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE user_ai_mission_progress ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE ai_learning_progress ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE rewards ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE answer_set ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';

-- Ensuring question tables also have program_type for specific challenge content
ALTER TABLE jumbled_words ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE missing_letters ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE memory_game ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE perfect_match ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';
ALTER TABLE tool_clicks ADD COLUMN program_type ENUM('apprentice','genesis') DEFAULT 'apprentice';






-- ================= Program Progression & Gating =================
-- current_program: apprentice = 7-day | genesis = 30-day
ALTER TABLE users_data 
ADD COLUMN current_program ENUM('apprentice','genesis') DEFAULT 'apprentice',
ADD COLUMN apprentice_completed TINYINT(1) DEFAULT 0, 
ADD COLUMN genesis_completed TINYINT(1) DEFAULT 0;

-- Retroactive Synchronization: 
-- Marks apprentice as completed for all existing users who have claimed the Day 7 reward.
UPDATE users_data ud
JOIN (
  SELECT DISTINCT user_id FROM rewards 
  WHERE description LIKE '%day 7%' AND program_type = 'apprentice'
) r ON ud.id = r.user_id
SET ud.apprentice_completed = 1;