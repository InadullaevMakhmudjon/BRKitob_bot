import Markup from 'telegraf/markup';

// Markup.button(locale.byPhoneKey[lang])
export default (ctx, type) => [
  [type ? Markup.contactRequestButton(ctx.t('byPhone')) : Markup.locationRequestButton(ctx.t('byLocation'))],
  [Markup.button(ctx.t('back'))],
];
