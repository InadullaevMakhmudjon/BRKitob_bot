import shopping from './shopping';
import contact from './contact';
import location from './location';
import main from '../hears/main';

export default (bot) => {
  bot.on('text', shopping);
  bot.on('contact', contact);
  bot.on('location', location);
  bot.on('pre_checkout_query', (ctx) => { ctx.answerPreCheckoutQuery(true); });
  bot.on('successful_payment', (ctx, next) => { main(ctx, next); });
};
