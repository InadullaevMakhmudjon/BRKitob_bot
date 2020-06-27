const bookCaption = (book, ctx) => `
<strong>${ctx.t('bookName')}: </strong>${book[`title_${ctx.session.lang}`]}

${book[`description_${ctx.session.lang}`]}

🏷 <strong>${ctx.t('price')}: </strong>${book.price} UZS`;

const giftCaption = (gift, ctx) => `
<strong>${ctx.t('giftName')}: </strong>${gift[`title_${ctx.session.lang}`]}

${gift[`description_${ctx.session.lang}`]}

🏷 <strong>${ctx.t('price')}: </strong>${gift.point} points`;

export { bookCaption as default, giftCaption };
