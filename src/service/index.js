export const Resume = {
  findAll: url => Api.get(url),
  findOne: url => Api.get(url),
  delete: url => Api.delete(url),
  insert: (url, param) => Api.post(url, param),
  update: (url, param) => Api.delete(url, param),
};

const api = {};

api.getResume = url => Resume.findAll(url);

export default api;
