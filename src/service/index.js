import Api from './Api';

// 로그인 관련
const Auth = {
  login: param => Api.post('login', param),
};

const Resume = {
  findAll: token => Api.get('resumes', token),
  findOne: url => Api.get(url),
  delete: url => Api.delete(url),
  insert: (url, param) => Api.post(url, param),
  update: (url, param) => Api.delete(url, param),
};

const api = {};

api.login = param => Auth.login(param);
api.getResume = token => Resume.findAll(token);

export default api;
