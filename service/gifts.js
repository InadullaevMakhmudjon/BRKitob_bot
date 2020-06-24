import Api, { execute } from './index';

export default {
  getAll: () => execute(Api.get('gifts')),
  getByTitle: (lang, title) => execute(Api.get(encodeURI(`gifts?title_${lang}=${title}`))),
};
