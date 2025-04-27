import { Composer } from "grammy";

const scamFilter = new Composer();


const FRAUD_KEYWORDS = [
    "free", "gift", "limited", "offer", "giveaway",
    "airdrop", "claim", "invite", "official", "bonus",
    "rewards", "upgrade", "premium", "early users",
    "p2p", "peer-to-peer", "crypto platform",
    "send dm", "dm me", "direct trade", "fast safe trade"
];


const keywordPattern = new RegExp(`\\b(${FRAUD_KEYWORDS.join("|")})\\b`, "i");
const urlPattern = /https?:\/\/\S+/i;
const ethAddressPattern = /(0x)?[0-9a-fA-F]{40}/i;
const scammyEmojisPattern = /🚀|🔥|💰|🎁/i;

scamFilter.use(async (ctx, next) => {
    const raw = ctx.message?.text ?? ctx.message?.caption;
    if (!raw) return next();
    const text = raw.toLowerCase();
    console.log('🛰️ ~ scamFilters.ts:23 -> text: ', text);


    let scamScore = 0;
    if (keywordPattern.test(text)) scamScore++;
    if (urlPattern.test(text)) scamScore++;
    if (ethAddressPattern.test(text)) scamScore++;
    if (scammyEmojisPattern.test(text)) scamScore++;

    if (scamScore >= 2) {
        try {
            await ctx.deleteMessage();
            console.log("⚡ Scam message deleted.");

            const warnMsg = await ctx.reply(
                "⚡ Not on my watch! You've been protected from scam crypto messages.",
            );

            const chatId = ctx.chat?.id;
            if (chatId) {
                setTimeout(() => {
                    ctx.api.deleteMessage(chatId, warnMsg.message_id).catch(() => null);
                }, 5000);
            }

        } catch (error) {
            console.error("Failed to delete scam or send warning:", error);
        }
        return next();
    }

});

export default scamFilter;
