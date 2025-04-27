import { Composer } from "grammy";

const adminOnly = new Composer();

adminOnly.use(async (ctx, next) => {
  if (!ctx.message) return next();


  const chatId = ctx.chat?.id;
  if (!chatId) return next();

  const admins = await ctx.api.getChatAdministrators(chatId);
  const adminUsers = admins.filter(admin => !admin.user.is_bot).map(admin => admin.user.id);


  if (ctx.from && adminUsers.includes(ctx.from.id)) {
    await ctx.deleteMessage().catch(() => null);
    return next(); // User is an admin, continue processing
  }


  const unauthorizedMessage = await ctx.reply("🚫 You are not authorized to use this command.");
  
  setTimeout(() => {
    ctx.api.deleteMessage(chatId, unauthorizedMessage.message_id).catch(() => null);
  }, 2000);

  setTimeout(() => {
    ctx.api.deleteMessage(chatId, unauthorizedMessage.message_id).catch(() => null);
  }, 2000);

  return next();
});

export default adminOnly;
