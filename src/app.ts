import 'dotenv/config';
import { Bot, GrammyError, HttpError } from 'grammy';
import { config } from './config';

import { registerCallbacks } from './callbacks';
import { setupServices } from './services';
import { setupCommands } from './commands';
async function main() {

  if (!config.BOT_TOKEN) {
    console.error('❌ BOT_TOKEN is not defined.');
    process.exit(1);
  }

  const bot = new Bot(config.BOT_TOKEN);

  setupCommands(bot)
  registerCallbacks(bot);
  setupServices(bot);

  bot.catch((err) => {
    const { error, ctx } = err;
    console.error(`⚠️ Error update ${ctx.update.update_id}:`);
    if (error instanceof GrammyError) {
      console.error('• Telegram API Error:', error.description);
    } else if (error instanceof HttpError) {
      console.error('• HTTP Error:', error);
    } else {
      console.error('• Unknown Error:', error);
    }
  });

  try {
    await bot.api.deleteWebhook();
    console.log('✅ Old webhook deleted.');
  } catch (e: any) {
    if (e.error_code === 404) {
      console.warn('⚠️ No webhook to delete, using long polling.');
    } else {
      console.error('❌ Failed to delete webhook:', e);
      process.exit(1);
    }
  }

  // Start with onStart callback
  await bot.start({
    onStart: (botInfo) => {
      console.log(`🤖 ${botInfo.username} is up and running! Visit: https://t.me/${botInfo.username}`);
    },
  });
}

main();
