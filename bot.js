const { Telegraf } = require('telegraf');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCHRHj59Z-Q-esM_cOwQ5NUUyD31nCfBw0',
  authDomain: 'note-nest-170f0.firebaseapp.com',
  projectId: 'note-nest-170f0',
  storageBucket: 'note-nest-170f0.appspot.com',
  messagingSenderId: '912118102807',
  appId: '1:912118102807:web:030071436f3cc644ca1552'
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const token = process.env.BOT_TOKEN;
// ✅ Correct Telegraf Bot Init
const bot = new Telegraf(token);


// === TYPE MAP ===
const typeMap = {
  note: 'note',
  qp: 'qp',
  solved_qp: 'solved-qp',
  other_note: 'other-note',
};

// === FETCH AND SEND FUNCTION ===
const fetchAndSendData = async (ctx, branch, type) => {
  try {
    const querySnapshot = await getDocs(collection(db, `lists/${branch}/${type}`));
    const items = [];

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      items.push({ id: docSnap.id, ...data });
    });

    if (items.length === 0) {
      await ctx.reply(`❌ No items found for "${branch}" in "${type}".`);
      return;
    }

    // Build a single message
    let message = `📚 *${type.toUpperCase()} for ${branch}*\n\n`;

    for (const item of items.slice(0, 10)) {
      message += `📄 *${item.title}*\n🔗 [Download File](${item.downloadURL})\n\n`;
    }

    await ctx.replyWithMarkdown(message);

  } catch (error) {
    console.error(error);
    await ctx.reply('⚠️ Error fetching data.');
  }
};


// === REGISTER COMMANDS ===
// === START AND HELLO COMMANDS ===
bot.start((ctx) => {
  ctx.reply(`
    👋 *Welcome to NoteNest Bot!*
    
    📚 Your one-stop hub for study materials.
    
    ✨ *These are notes available:*
    • Notes
    • Question Papers (QP)
    • Solved Question Papers (Solved QP)
    • Other Notes
    
    💡 *How to use me:*
    • Send commands like /note cd or /qp ccw
    • Get the materials you need instantly!
    
    📂 *Available types:*
    • /note
    • /qp
    • /solved_qp
    • /other_note
    
    Happy studying! 🚀
    `, { parse_mode: 'Markdown' });
    
});

bot.help((ctx) => {
  ctx.reply(`
ℹ️ *NoteNest Bot Help*

Use the following commands with your branch name:

• /note [Subject] - Get notes
• /qp [Subject] - Get question papers
• /solved_qp [Subject] - Get solved question papers
• /other_note [Subject] - Get other notes

Example: /note cd

If you need more help, just ask!
`, { parse_mode: 'Markdown' });
});

bot.hears(/^(hello|hi)$/i, (ctx) => {
  ctx.reply('Hello! 👋 How can I help you today?');
});


// === REGISTER DYNAMIC COMMANDS ===
Object.keys(typeMap).forEach(cmd => {
  bot.command(cmd, async (ctx) => {
    const input = ctx.message.text.split(' ');
    if (input.length < 2) {
      return ctx.reply(`Please provide a Subject. Example: /${cmd} cd`);
    }
    const branch = input[1].trim().toUpperCase();
    const type = typeMap[cmd];
    fetchAndSendData(ctx, branch, type);
  });
});


// === START BOT ===
bot.launch();
