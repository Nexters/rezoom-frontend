import Api from './Api';

// 로그인 관련
const Auth = {
  login: (url, param) => Api.post(url, param),
};

const Resume = {
  findAll: url => Api.get(url),
  findOne: url => Api.get(url),
  delete: url => Api.delete(url),
  insert: (url, param) => Api.post(url, param),
  update: (url, param) => Api.delete(url, param),
};

const api = {};

api.login = (url, param) => Auth.login(url, param);
api.getResume = url => Resume.findAll(url);

export default api;
