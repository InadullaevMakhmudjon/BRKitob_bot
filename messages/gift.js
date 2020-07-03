import moment from 'moment';

export default (ctx) => `
**SOVG'A YETKAZISH**

**MIJOZ**: ${ctx.session.user.phone_number}, ${ctx.session.user.first_name}

**SOVG'A NOMI**: ${ctx.session.gift.name}
**SOVG'A BALLI**: ${ctx.session.gift.point}

**VAQT**: ${moment().format('DD.MM.YYYY HH:mm')}
`;
