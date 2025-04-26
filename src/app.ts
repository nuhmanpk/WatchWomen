import 'dotenv/config';
import { Bot, GrammyError, HttpError } from 'grammy';
import { config } from './config';
import { startCommand } from './commands/start';

async function main() {
  // 1. Ensure token is present
  if (!config.BOT_TOKEN) {
    console.error('❌ Error: BOT_TOKEN is not defined in your environment.');
    process.exit(1);
  }

  // 2. Initialize bot
  const bot = new Bot(config.BOT_TOKEN);

  // 3. Register /start command
  bot.command('start', startCommand(bot));

  // 4. Global error handler
  bot.catch((err) => {
    const { error, ctx } = err;
    console.error(`⚠️ Error handling update ${ctx.update.update_id}:`);
    if (error instanceof GrammyError) {
      console.error('• Telegram API Error:', error.description);
    } else if (error instanceof HttpError) {
      console.error('• HTTP Error:', error);
    } else {
      console.error('• Unexpected Error:', error);
    }
  });

  // 5. Remove any existing webhook (ignore 404)
  try {
    await bot.api.deleteWebhook();
    console.log('✅ Existing webhook (if any) deleted.');
  } catch (e: any) {
    if (e.error_code === 404) {
      console.warn('⚠️ No webhook to delete; proceeding with long polling.');
    } else {
      console.error('❌ Failed to delete webhook:', e);
      process.exit(1);
    }
  }

  // 6. Start long polling
  try {
    await bot.start();
    console.log('🤖 Bot started with long polling.');
  } catch (err) {
    console.error('❌ Error starting bot:', err);
    process.exit(1);
  }
}

main();
