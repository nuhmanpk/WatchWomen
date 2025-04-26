import { Bot, Context } from 'grammy';
import { config } from './config';
import { startCommand } from './commands/start';
// import { helpCommand } from './commands/help';

// Create a bot instance
const bot = new Bot(config.BOT_TOKEN);

// Register commands
bot.command('start', startCommand(bot));
// bot.command('help', helpCommand(bot));

// Start the bot
bot.start().then(() => {
    console.log('Bot is running...');
}).catch((err) => {
    console.error('Error starting bot:', err);
});
