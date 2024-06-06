const TelegramBot = require('node-telegram-bot-api');

 
const token = '6888212612:AAF40uZy1BMbpUOkaILRseBpPou0IjMNSWY';

const bot = new TelegramBot(token, {polling: true});

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
 
  if(msg.text=="Hello"||msg.text=="hello")
  bot.sendMessage(chatId, "Hello there! 👋 What's on your mind today?");
  
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
   
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/notes/, (msg) => {
  const chatId = msg.chat.id;
  const notes = 'Here are the notes for your course:\n1. Topic 1: Link\n2. Topic 2: Link\n3. Topic 3: Link';
  bot.sendMessage(chatId, notes);
});

// Handle "/syllabus" command
bot.onText(/\/syllabus/, (msg) => {
  const chatId = msg.chat.id;
  const syllabus = 'Here is the syllabus for your course:\n1. Topic 1\n2. Topic 2\n3. Topic 3';
  bot.sendMessage(chatId, syllabus);
});

// Handle "/exam" command
bot.onText(/\/exam/, (msg) => {
  const chatId = msg.chat.id;
  const examTimetable = 'Here is the exam timetable:\n1. Date: Exam 1\n2. Date: Exam 2\n3. Date: Exam 3';
  bot.sendMessage(chatId, examTimetable);
});

 