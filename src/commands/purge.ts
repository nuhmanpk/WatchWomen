import { Bot, Context } from 'grammy';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function purgeCommand(bot: Bot<Context>) {
  bot.command('purge', async (ctx) => {
    if (!ctx.chat || ctx.chat.type === 'private') {
      return ctx.reply('❌ Purge only works in groups.');
    }

    const repliedMessage = ctx.message?.reply_to_message;
    if (!repliedMessage) {
      return ctx.reply('❌ You must reply to a message to purge.');
    }

    const fromId = repliedMessage.message_id;
    const toId = ctx.message?.message_id;

    if (!fromId || !toId) {
      return ctx.reply('❌ Cannot find messages to purge.');
    }

    const chatId = ctx.chat.id;

    try {
      for (let messageId = fromId; messageId <= toId; messageId++) {
        try {
          await ctx.api.deleteMessage(chatId, messageId);
          console.log(`🧹 Deleted message ${messageId} in chat ${chatId}`);

          // Add a small delay between requests to prevent Telegram flood
          await delay(500);
        } catch (err) {
          // Ignore messages that can't be deleted 
          console.warn(`⚠️ Failed to delete message ${messageId}:`, err);
        }
      }

      console.log(`🧹 Purged messages from ${fromId} to ${toId} in chat ${chatId}`);
    } catch (error) {
      console.error('❌ Failed to purge messages:', error);
      await ctx.reply('❌ Failed to purge messages.');
    }
  });
}
