import Api from './Api';

// 로그인 관련
const Auth = {
  login: param => Api.postLogin('login', param),
};

const Resume = {
  findAll: token => Api.get('resumes'),
  findOne: url => Api.get(url),
  delete: url => Api.delete(url),
  insert: param => Api.post('resumes', param),
  update: (url, param) => Api.delete(url, param),
};

const api = {};

api.login = param => Auth.login(param);

// resume api
api.getResume = () => Resume.findAll();
api.newResume = data => Resume.insert(data);

export default api;
