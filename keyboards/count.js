import Markup from 'telegraf/markup';
import { COUNT, ADD_BASKET } from '../actions/types';

const buttons = (value, ctx) => [[
  Markup.callbackButton('➖', JSON.stringify({ action: COUNT, value, increment: -1 })),
  Markup.callbackButton(value, 'dummy'),
  Markup.callbackButton('➕', JSON.stringify({ action: COUNT, value, increment: 1 })),
], [
  Markup.callbackButton(ctx.t('addToBasket'), JSON.stringify({
    action: ADD_BASKET,
    quantity: value,
  })),
]];

const counterKeyboard = (value = 1, ctx) => Markup.inlineKeyboard(
  buttons(value, ctx),
).extra();

export { counterKeyboard as default, buttons };
