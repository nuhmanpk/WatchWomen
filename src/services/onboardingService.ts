import { Bot, Context, InputFile, InlineKeyboard } from 'grammy';
import { logo } from '../assets/logo';

export function onboardingService(bot: Bot<Context>) {
  bot.on('my_chat_member', async (ctx) => {
    const status = ctx.myChatMember.new_chat_member.status;
    const oldStatus = ctx.myChatMember.old_chat_member.status;
    const chatId = ctx.chat?.id;

    if (!chatId) return;

    // Check if bot was added to a group
    if (['member', 'administrator'].includes(status) && oldStatus === 'left') {
      console.log(`✅ Bot added to new group: ${chatId}`);

      let warning = '';

      try {
        const chatMember = await ctx.api.getChatMember(chatId, ctx.me.id);

        if (!chatMember) {
          warning = '\n⚠️ *Warning:* Could not verify bot permissions.';
        } else if (chatMember.status === 'administrator' && 'can_delete_messages' in chatMember) {
          const adminRights = chatMember as any; // Casting since types are tricky

          if (!adminRights.can_send_messages) {
            warning += '\n⚠️ *Warning:* I need permission to send messages.';
          }
          if (!adminRights.can_delete_messages) {
            warning += '\n⚠️ *Warning:* I need permission to delete messages.';
          }
        } else {
          warning += '\n⚠️ *Warning:* Please make me an admin with "Send Messages" and "Delete Messages" permissions.';
        }
      } catch (error) {
        console.error('❌ Failed to fetch bot permissions:', error);
        warning += '\n⚠️ *Warning:* Could not check my permissions.';
      }

      const keyboard = new InlineKeyboard()
        .url('🌟 Add me to your group', `https://t.me/${bot.botInfo.username}?startgroup=true`)
        .row()
        .url('🛡️ Support Group', 'https://t.me/bughunterbots')
        .url('👤 Owner', 'https://t.me/bughunter0');

      await ctx.api.sendPhoto(chatId, new InputFile(logo), {
        caption: `Hello everyone, I'm WatchWomenBot! 👋\n\nI'll help you protect this group from scams, spam, and bad actors. 🚫${warning}`,
        reply_markup: keyboard,
        parse_mode: 'Markdown', // To format the warning
      });
    }
  });
}
