// import { TelegramClient } from 'telegram';
// import { StringSession } from 'telegram/sessions';

// const stringSession = ''; // leave this empty for now
// const BOT_TOKEN = process.env.NEXT_PUBLIC_TELE_APP_API_BOT_TOKEN; // put your bot token here
// const teleClient = async () => {
//   const client = new TelegramClient(
//     new StringSession(stringSession),
//     parseInt(process.env.NEXT_PUBLIC_TELE_APP_API_KEY),
//     process.env.NEXT_PUBLIC_TELE_APP_API_HASH,
//     { connectionRetries: 5 }
//   );
//   await client.start({
//     botAuthToken: BOT_TOKEN,
//   });
//   console.log(client.session.save());
// };
