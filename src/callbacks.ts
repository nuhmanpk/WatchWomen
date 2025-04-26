import { Bot, Context } from 'grammy';

export function registerCallbacks(bot: Bot<Context>) {
  // Help button handler
  bot.callbackQuery('help_callback', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('📖 *Help Section*\n\nHere’s how to use me:\n\n• Add me to your group.\n• I will protect from scams.\n• Use /settings to configure filters.', {
      parse_mode: 'Markdown',
    });
  });

  // Settings button handler
  bot.callbackQuery('settings_callback', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('⚙️ *Settings Panel*\n\nHere you can adjust:\n\n• Anti-Spam Protection\n• Anti-Link Blocking\n• Admin Only Settings', {
      parse_mode: 'Markdown',
    });
  });
}
