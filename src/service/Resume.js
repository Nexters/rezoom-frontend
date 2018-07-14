import axios from 'axios';

export default class Resume {
  postResume(data, config) {
    return axios
      .post('', data, config)
      .catch()
      .then();
  }

  getTest() {
    return axios.get('https://openapi.naver.com/v1/search/news');
  }
}
