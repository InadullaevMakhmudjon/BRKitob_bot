import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

export default (ctx) => Extra.markup(Markup.keyboard([
  Markup.contactRequestButton(ctx.t('byPhone')),
]).resize());
