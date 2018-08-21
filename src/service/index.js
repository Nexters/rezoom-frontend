import Api from './Api';

// 로그인 관련
const Auth = {
  login: param => Api.postLogin('login', param),
};

const Resume = {
  findAll: () => Api.get('resumes'),
  findOne: resumeId => Api.get(`resumes/${resumeId}`),
  delete: resumeId => Api.del(`resumes/${resumeId}`),
  insert: param => Api.post('resumes', param),
  update: (resumeId, param) => Api.put(`resumes/${resumeId}`, param),
};

const Question = {
  findAll: resumeId => Api.get(`questions?resumeId=${resumeId}`),
  findOne: questionId => Api.get(`questions/${questionId}`),
  insert: param => Api.post('questions', param),
};

const Search = {
  findResumes: companyName =>
    Api.get(`search/resumes?companyName=${companyName}`),
  findQuestionsKeyword: keyword =>
    Api.get(`search/questions?type=keyword&keyword=${keyword}`),
  findQuestionsHashTag: hashTag =>
    Api.get(`search/questions?type=hashTag&keyword=${hashTag}`),
};

const api = {};

api.login = param => Auth.login(param);

// resume api
api.getResumes = () => Resume.findAll();
api.getResume = resumeId => Resume.findOne(resumeId);
api.newResume = data => Resume.insert(data);
api.updateResume = (resumeId, resume) => Resume.update(resumeId, resume);
api.deleteResume = resumeId => Resume.delete(resumeId);

// question
api.getQuestions = resumeId => Question.findAll(resumeId);
api.insertQuestions = data => Question.insert(data);

// search
api.getSearchResumes = companyName => Search.findResumes(companyName);
api.getQuestionsKeyword = keyword => Search.findQuestionsKeyword(keyword);
api.getQuestionsHashTag = hashTag => Search.findQuestionsHashTag(hashTag);

export default api;
