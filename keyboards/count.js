import Markup from 'telegraf/markup';
import { COUNT, ADD_BASKET } from '../actions/types';

const buttons = (value, ctx) => [[
  Markup.callbackButton(`${value * ctx.session.book.price} UZS`, JSON.stringify({ action: 'dummyTotal' })),
], [
  Markup.callbackButton('➖', JSON.stringify({ action: COUNT, value, increment: -1 })),
  Markup.callbackButton(value, JSON.stringify({ action: 'dummyCount' })),
  Markup.callbackButton('➕', JSON.stringify({ action: COUNT, value, increment: 1 })),
], [
  Markup.callbackButton(ctx.t('addToBasket'), JSON.stringify({
    action: ADD_BASKET,
    quantity: value,
  })),
]];

const isAddedButton = (ctx) => [
  [Markup.callbackButton(ctx.t('addedToBasket'), JSON.stringify({ action: 'dummyIsAdded' }))],
];

const counterKeyboard = (value = 1, ctx) => Markup.inlineKeyboard(
  buttons(value, ctx),
).extra();

export { counterKeyboard as default, buttons, isAddedButton };
