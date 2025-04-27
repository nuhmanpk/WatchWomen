import { Bot, Context } from 'grammy';

export function reportCommand(bot: Bot<Context>) {
    bot.command('report', async (ctx,next) => {
        if (!ctx.chat) {
            return ctx.reply('❌ This command can only be used in groups.');
        }

        const reportedUser = ctx.message?.reply_to_message?.from;
        if (!reportedUser) {
            await ctx.deleteMessage();
            return ctx.reply('❌ You must reply to a message to report the user.');
        }

        const reporter = ctx.from;
        const reportedUserId = reportedUser.id;
        const reportedUserName = reportedUser.first_name;
        const reporterName = reporter?.first_name;
        const reporterUserName = reporter?.username || 'N/A'; // In case the reporter doesn't have a username
        const reportTime = new Date().toISOString();
        const reportedMessage = ctx.message?.reply_to_message?.text || 'No message content';


        const reportText = `
🚨New Report🚨

👤Reported User: ${reportedUserName} (@${reportedUser.username || 'N/A'}, User ID: ${reportedUserId})
🧑‍💻Reported by: ${reporterName} (@${reporterUserName}, User ID: ${reporter?.id})
📅Reported at: ${reportTime}
📋Message Content:
${reportedMessage}
        `;


        const chatId = ctx.chat.id;
        const admins = await ctx.api.getChatAdministrators(chatId);
        const adminUsers = admins.filter(admin => !admin.user.is_bot);

        for (const admin of adminUsers) {
            try {
                await ctx.api.sendMessage(admin.user.id, reportText);
                console.log(`📝 Report sent to admin ${admin.user.id}`);
            } catch (error) {
                console.error(`❌ Failed to send report to admin ${admin.user.id}:`, error);
            }
        }

        await ctx.deleteMessage();

        await ctx.reply('✅ Your report has been sent to the group admins.');
        return next();
    });
}
