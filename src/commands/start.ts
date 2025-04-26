import { logo } from '../assets/logo';
import { Bot, Context, InputFile, InlineKeyboard } from 'grammy';

export const startCommand = (bot: Bot<Context>) => {
    return async (ctx: Context) => {
        if (!ctx.chat || !ctx.from) return;

        const userName = ctx.from?.first_name || 'there';

        const keyboard = new InlineKeyboard()
            .url('🌟 Add me to your group', `https://t.me/${bot.botInfo.username}?startgroup=true`) // Real group add link
            .row()
            .text('📖 Help', 'help_callback') // Callback, not URL
            .text('⚙️ Settings', 'settings_callback')
            .row()
            .url('🛡️ Support Group', 'https://t.me/bughunterbots')
            .url('👤 Owner', 'https://t.me/bughunter0');

        await ctx.replyWithPhoto(
            new InputFile(logo),
            {
                caption: `Hello ${userName}, welcome to WatchWomenBot!\n\nI help protect your groups from scams, spam, and bad actors. 🚫`,
                reply_markup: keyboard
            }
        );
    };

};
