import { Context } from 'grammy';

export async function helpCallback(ctx: Context) {
  await ctx.answerCallbackQuery(); // just to remove the loading spinner
  await ctx.reply('📖 *Help Section*\n\nHere\'s how I can assist you:', {
    parse_mode: 'Markdown',
  });
}