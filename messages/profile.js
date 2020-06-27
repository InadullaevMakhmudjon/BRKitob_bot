import moment from 'moment';

export default (ctx) => `
<strong>${ctx.t('myProfile')}:</strong>

<strong>${ctx.t('bonuses')}: </strong>${ctx.session.user.point.value}
<strong>${ctx.t('orders')}: </strong>
${ctx.session.user.orders.length ? ctx.session.user.orders.map((order, index) => `
${index + 1}. ${moment(order.createdAt).format('DD.MM.YYYY HH:mm')}, ${order.price}
<strong>${ctx.t('status')}</strong>: ${order.status[`name_${ctx.session.lang}`]}`) : ctx.t('doesNotExist')}
`;
