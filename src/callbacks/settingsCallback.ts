import { Context } from 'grammy';

export async function settingsCallback(ctx: Context) {
  await ctx.answerCallbackQuery();
  await ctx.reply('⚙️ *Settings*\n\nFeature coming soon! Stay tuned.', {
    parse_mode: 'Markdown',
  });
}
