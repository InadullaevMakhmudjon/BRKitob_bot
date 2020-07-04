import Api, { execute } from './index';

export default {
  getAll: () => execute(Api.get('users')),
  get: (id) => execute(Api.get(`users/${id}`)),
  getGift: (id, giftId) => execute(Api.post(`users/${id}/getGift`, { giftId })),
  create: (user) => execute(Api.post('users', user)),
};
