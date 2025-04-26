import { Bot } from 'grammy';
import { startCommand } from './start';
import { purgeCommand } from './purge';
import { reportCommand } from './report';


export function setupCommands(bot: Bot) {
    bot.command('start', startCommand(bot));
    purgeCommand(bot);
    reportCommand(bot);
}
