import Markup from 'telegraf/markup';

export default Markup.inlineKeyboard([
  Markup.callbackButton('Telegram', 'telegram'),
  Markup.callbackButton('payme', 'payme'),
]);
