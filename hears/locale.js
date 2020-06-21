import main from './main';

const getLang = (match) => {
  if (match.includes('🇺🇿 ')) return 'kr';
  if (match.includes('🇷🇺 ')) return 'ru';
  return 'kr';
};

export default (ctx, next) => {
  ctx.session.lang = getLang(ctx.match);
  main(ctx, next);
};
