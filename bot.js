const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text == "Hello" || msg.text == "hello")
    bot.sendMessage(chatId, "Hello there! 👋 ");
});

bot.onText(/\/notes/, (msg) => {
  const chatId = msg.chat.id;
  const notes = 'Here are the notes for your course:\n1. Topic 1: Link\n2. Topic 2: Link\n3. Topic 3: Link';
  bot.sendMessage(chatId, notes);
});

bot.onText(/\/syllabus/, (msg) => {
  const chatId = msg.chat.id;
  const syllabus = 'Here is the syllabus for your course:\n1. Topic 1\n2. Topic 2\n3. Topic 3';
  bot.sendMessage(chatId, syllabus);
});

bot.onText(/\/exam/, (msg) => {
  const chatId = msg.chat.id;
  const examTimetable = 'Here is the exam timetable:\n1. Date: Exam 1\n2. Date: Exam 2\n3. Date: Exam 3';
  bot.sendMessage(chatId, examTimetable);
});
