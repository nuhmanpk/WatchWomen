import { Bot, Context } from 'grammy';
import { greetingsService } from './greetingsService';
import { onboardingService } from './onboardingService';
import { serviceMessageCleaner } from './serviceCleanerService';

export function setupServices(bot: Bot<Context>) {
    onboardingService(bot);
    greetingsService(bot);
    serviceMessageCleaner(bot);
}