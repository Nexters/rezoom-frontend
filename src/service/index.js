import Api from './Api';

// 로그인 관련
const Auth = {
  login: param => Api.postLogin('login', param),
};

const Resume = {
  findAll: () => Api.get('resumes'),
  findOne: resumeId => Api.get(`resume/${resumeId}`),
  delete: resumeId => Api.del(`resume/${resumeId}`),
  insert: param => Api.post('resumes', param),
  update: (resumeId, param) => Api.put(`resume/${resumeId}`, param),
};

const Question = {
  findAll: resumeId => Api.get(`questions?resumeId=${resumeId}`),
  findOne: questionId => Api.get(`questions/${questionId}`),
  insert: param => Api.post('questions', param),
};

const api = {};

api.login = param => Auth.login(param);

// resume api
api.getResumes = () => Resume.findAll();
api.getResume = resumeId => Resume.findOne(resumeId);
api.newResume = data => Resume.insert(data);

// question
api.getQuestions = resumeId => Question.findAll(resumeId);
api.insertQuestions = data => Question.insert(data);

export default api;
