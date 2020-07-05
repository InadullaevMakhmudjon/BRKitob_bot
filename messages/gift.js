import moment from 'moment';
import escape from '../utils/escaper';

export default (ctx) => `
*SOVG'A YETKAZISH*

*MIJOZ*: ${escape(ctx.session.user.phone_number)}, ${escape(ctx.session.user.first_name)}

*SOVG'A NOMI*: ${escape(ctx.session.gift.title_lat)}
*SOVG'A BALLI*: ${ctx.session.gift.point}

*VAQT*: ${moment().format('DD.MM.YYYY HH:mm')}
`;
