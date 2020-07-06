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

export default (ctx, fullName, phone, dType, products) => `
${ctx.t('agreementFullName')}: ${fullName}
${ctx.t('agreementPhone')}: ${phone}
${ctx.t('agreementType')}: ${dType}
~~~~~~~~~~~~~~~~~~~
${
  products.map((product) => getProduct(product, ctx.session.lang)).join('')
}
~~~~~~~~~~~~~~~~~~~
${ctx.t('agreementTotal')}: ${getTotal(products)}
${ctx.t('agreementDeliveryPrice')}: 15 000 ${ctx.t('aggrimentPriceUnit')}
${ctx.t('agreementTotalWithout')}: ${getTotal(products)}
`;
