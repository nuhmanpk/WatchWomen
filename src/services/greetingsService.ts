import { Bot, Context } from 'grammy';

export function greetingsService(bot: Bot<Context>) {
    bot.on('message:new_chat_members', async (ctx) => {
        const members = ctx.message.new_chat_members;

        for (const member of members) {
            if (member.id === ctx.me.id) {
                // bot as a new memeber
                continue;
            }

            await ctx.reply(`👋 Welcome, ${member.first_name}!`);
        }
    });

    bot.on('message:left_chat_member', async (ctx) => {
        const member = ctx.message.left_chat_member;

        if (member.id === ctx.me.id) {
            // removed bot from chat
            await ctx.reply('👋 Adios asthala pista');
            return;
        }

        await ctx.reply(`👋 Goodbye, ${member.first_name}!`);
    });
}
