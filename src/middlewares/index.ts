import { Bot } from "grammy";
import scamFilter from "./scamFilters";

export function setupMiddlewares(bot: Bot) {
    bot.use(scamFilter);

}