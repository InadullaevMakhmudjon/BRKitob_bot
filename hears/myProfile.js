import profileMessage from '../messages/profile';

export default (ctx) => {
  ctx.replyWithHTML(profileMessage(ctx));
};
