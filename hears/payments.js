const token = process.env.PAYMENT_TOKEN;

// for delivery, get by own
const withoutAddress = {
  title: 'This is title, with address required',
  description: 'This is description of product 1',
  provider_token: token,
  start_parameter: 'brkitob',
  currency: 'UZS',
  photo_url: 'https://www.wsfcu.org/wp-content/uploads/2017/09/blog-post-cash-credit-card.jpg',
  is_flexible: false,
  need_shipping_address: false,
  prices: [
    {
      label: 'kitob payment label 1',
      amount: 100 * 100,
    },
  ],
  payload: {},
};

export default (ctx) => {
  ctx.replyWithInvoice(withoutAddress);
};
