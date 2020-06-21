import Api, { execute } from './index';

export default {
  getAll: () => execute(Api.get('users')),
  get: (id) => execute(Api.get(`users/${id}`)),
  create: (user) => execute(Api.post('users', user)),
};
