import Telegraf from 'telegraf';
import RedisSession from 'telegraf-session-redis';
import { lazy, hears as lazyHears } from 'telegraf/composer';
import actions from './actions';
import commands from './commands';
import hears from './hears';
import customHears, { translate } from './utils/match';
import listener from './listeners';
import Back from './events/Back';
import Hook from './server';

require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);

const session = new RedisSession({
  store: {
    host: process.env.TELEGRAM_SESSION_HOST || '127.0.0.1',
    port: process.env.TELEGRAM_SESSION_PORT || 6379,
  },
});

bot.use(session.middleware());

bot.use(async (ctx, next) => {
  ctx.t = (key) => translate(key, ctx.session.lang || 'kr');
  ctx.trace = (callBack) => { Back.instance.back = callBack; };
  ctx.back = Back.instance.back;
  next();
});
// bot.on('message', (ctx) => ctx.telegram.sendMessage(123, 'asd', { parse_mode }))
actions(bot);
commands(bot);
hears(
  (key, callBack) => customHears(key, bot, callBack),
  (key, callBack) => bot.on('text', lazy(() => lazyHears(key, callBack))),
);

listener(bot);
Hook(bot);
bot.use((ctx, next) => {
  next().then(() => session.saveSession(session.options.getSessionKey(ctx), ctx.session))
    .catch((err) => ctx.reply(err.message));
});

bot.launch().then(() => {
  console.log('\x1b[34m', 'Started', '\x1b[0m');
});
