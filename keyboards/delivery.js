import Markup from 'telegraf/markup';

// Markup.button(locale.byPhoneKey[lang])
export default (ctx) => [
  [Markup.locationRequestButton(ctx.t('byLocation'))],
  // [Markup.button(ctx.t('skip'))],
  [Markup.button(ctx.t('back'))],
];
