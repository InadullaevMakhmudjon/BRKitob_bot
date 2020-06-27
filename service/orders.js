import Api, { execute } from './index';

export default {
  create: (data) => execute(Api.post('orders', data)),
};
