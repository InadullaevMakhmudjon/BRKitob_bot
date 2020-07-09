const total = (product) => Number(product.quantity) * Number(product.price);

function getProduct(product, lang) {
  return `
${product[`title_${lang}`]}: 
    ${product.quantity} X ${product.price} = ${total(product)}
`;
}

function getTotal(products) {
  return products.map((product) => total(product)).reduce((a, b) => a + b, 0);
}

export const agreementCourse = (ctx, fullName, phone, course) => `
${ctx.t('agreementFullName')}: ${fullName}
${ctx.t('agreementPhone')}: ${phone}

${ctx.t('type')}: Kurs sotib olish

~~~~~~~~~~~~~~~~~~~
${course[`title_${ctx.session.lang}`]} = ${course.price} UZS
~~~~~~~~~~~~~~~~~~~
`;

export default (ctx, fullName, phone, dType, products) => `
${ctx.t('agreementFullName')}: ${fullName}
${ctx.t('agreementPhone')}: ${phone}
${ctx.t('agreementType')}: ${dType ? ctx.t('typePickUp') : ctx.t('typeCourier')}
~~~~~~~~~~~~~~~~~~~
${
  products.map((product) => getProduct(product, ctx.session.lang)).join('')
}
~~~~~~~~~~~~~~~~~~~
${ctx.t('agreementTotal')}: ${getTotal(products)}
${ctx.t('agreementDeliveryPrice')}: ${dType ? ctx.t('agreementDeliveryMessage') : ctx.t('aggrimentPriceUnit')}
${ctx.t('agreementTotalWithout')}: ${getTotal(products) + (!dType && 15000)}
`;
