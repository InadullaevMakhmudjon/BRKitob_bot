import main from './main';

const getLang = (match) => {
  if (match.includes('Русский')) return 'kr';
  if (match.includes('O\'zbekcha')) return 'lat';
  return 'kr';
};

export default (ctx, next) => {
  ctx.session.lang = getLang(ctx.match);
  main(ctx, next);
};
