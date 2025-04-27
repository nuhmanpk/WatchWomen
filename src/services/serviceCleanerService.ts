import { Bot, Context } from 'grammy';

export function serviceMessageCleaner(bot: Bot<Context>) {
  bot.on('message', async (ctx,next) => {
    const serviceMessageTypes = [
      'new_chat_members',
      'left_chat_member',
      'new_chat_title',
      'new_chat_photo',
      'delete_chat_photo',
      'group_chat_created',
      'supergroup_chat_created',
      'channel_chat_created',
      'pinned_message',
    ];

    // Check if the message is a service message
    if (ctx.message && serviceMessageTypes.some((type) => (ctx.message as any)[type])) {
      const chatId = ctx.chat?.id;
      const messageId = ctx.message.message_id;

      if (!chatId || !messageId) return;

      try {
        await ctx.api.deleteMessage(chatId, messageId);
        console.log(`🧹 Deleted service message ${messageId} in chat ${chatId}`);
      } catch (err) {
        console.error('❌ Failed to delete service message:', err);
      }
    }
    return next();
  });
}
