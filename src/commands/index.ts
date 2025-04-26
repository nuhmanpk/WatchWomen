import { Bot } from 'grammy';
import { startCommand } from './start';
import { purgeCommand } from './purge';


export function setupCommands(bot: Bot) {
    bot.command('start', startCommand(bot));
    purgeCommand(bot);
}
