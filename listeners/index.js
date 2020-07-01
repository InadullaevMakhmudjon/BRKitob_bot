import shopping from './shopping';
import contact from './contact';
import location from './location';
import payed from './payed';

export default (bot) => {
  bot.on('text', shopping);
  bot.on('contact', contact);
  bot.on('location', location);
  bot.on('pre_checkout_query', (ctx) => { ctx.answerPreCheckoutQuery(true); });
  bot.on('successful_payment', () => { /** Payed Success */ });
};
