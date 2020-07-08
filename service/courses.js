import Api, { execute } from './index';

export default {
  getAll: () => execute(Api.get('courses')),
  getByTitle: (lang, title) => execute(Api.get(encodeURI(`courses?title_${lang}=${title}`))),
};
