import Api, { execute } from './index';

export default {
  create: (data, id) => execute(Api.post(id ? `userCourses/${id}` : 'userCourses', data)),
};
