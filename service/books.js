import Api, { execute } from './index';

export default {
  getAll: () => execute(Api.get('books')),
  getByTitle: (lang, title) => execute(Api.get(encodeURI(`books/${lang}?title=${title}`))),
};
