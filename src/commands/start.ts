import { Bot, Context, InputFile } from 'grammy';
import { join } from 'path';

export const startCommand = (bot: Bot<Context>) => {
    return async (ctx: Context) => {
        if (!ctx.chat || !ctx.from) return;

        const userName = ctx.from?.first_name || 'there';

        const imagePath = join(__dirname, '../../assets/logo.png');
        await ctx.replyWithPhoto(new InputFile(imagePath), { caption: `Hello ${userName}, welcome to WatchWomenBot! I'm here to keep your group safe from scams and spam. Type /help to get started.` });
    };
};
