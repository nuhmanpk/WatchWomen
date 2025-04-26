import { Bot, Context } from 'grammy';
import { helpCallback } from './helpCallback';
import { settingsCallback } from './settingsCallback';

export function registerCallbacks(bot: Bot<Context>) {
  bot.callbackQuery('help_callback', helpCallback);
  bot.callbackQuery('settings_callback', settingsCallback);
}
