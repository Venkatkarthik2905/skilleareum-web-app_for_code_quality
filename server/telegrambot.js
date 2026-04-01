const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const { executeQuery } = require("./Db"); // Assuming you have a Db.js file with executeQuery function

const token = process.env.TELEGRAM_BOT_TOKEN // Use environment variable for security
const channelId = "@skilleareumofficial"; // Your actual channel username

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/start" command with or without additional text

// bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const referralCode = match[1] ? match[1].trim() : null;

//   await sendWelcomeImage(chatId, referralCode);
// });

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;

  const startParam = match[1] ? match[1].trim() : null;
  console.log('startParam', startParam,"chatId :",chatId)

  if (startParam) {
    const parts = startParam.split('_');
    const referralCode = parts[0];
    let source;
    if (referralCode && parts[1]) {
      source = parts[1];
    } else if (referralCode && !parts[1]) {
      source = 'SKLR';
    }
    console.log("source", source, "referralCode", referralCode, "parts", parts,"chatId :",chatId)

    await sendWelcomeImage(chatId, referralCode, source);
  } else {
    await sendWelcomeImage(chatId, null, null);
  }
});

// Handle all other text messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text ? msg.text.trim() : null;

  // Check if the incoming message is a command to avoid duplicates
  if (msg.entities && msg.entities.some(entity => entity.type === 'bot_command')) {
    return; // If it's a command, do nothing
  }

  // If the text contains a referral code, extract it
  const referralCode = text && text.length > 0 ? text : null;

  if (startParam) {
    const parts = startParam.split('_');
    const referralCode = parts[0];
    let source;
    if (referralCode && parts[1]) {
      source = parts[1];
    } else if (referralCode && !parts[1]) {
      source = 'SKLR';
    }
    console.log("source", source, "referralCode", referralCode, "parts", parts)

    await sendWelcomeImage(chatId, referralCode, source);
  } else {
    await sendWelcomeImage(chatId, null, null);
  }
});

// Function to send the welcome image with buttons
async function sendWelcomeImage(chatId, referralCode, source) {
  try {
    // Define the options for the reply markup
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `💰 Start Play & Learn`,
              web_app: {
                url: referralCode
                  ? `${process.env.SITE_URL}/Homescreen/${chatId}/${referralCode}?src=${source}`
                  : `${process.env.SITE_URL}/Homescreen/${chatId}`,
              },
            },
          ],
          [
            {
              text: `👫 Join X Community`,
              web_app: { url: 'https://x.com/Skilleareum' },
            },
          ],
          [
            {
              text: `📣 Join Telegram Channel`,
              url: 'https://t.me/skilleareumofficial',
            },
          ],
        ],
      },
    };

    // Send the welcome image with buttons (no caption)
    await bot.sendPhoto(
      chatId,
      "https://skilleareum.s3.ap-south-1.amazonaws.com/Telegram+welcome+screen_Final.jpg",
      options // No caption, only buttons
    );
  } catch (error) {
    console.error("Error processing the message:", error);
    bot.sendMessage(chatId, "There was an error processing your request.");
  }
}

console.log("Telegram working");
