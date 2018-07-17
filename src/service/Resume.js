import axios from 'axios';
import Api from './Api';

export default class Resume {
  static postResume(data, config) {
    return axios
      .post('', data, config)
      .catch()
      .then();
  }

  static getTest() {
    return Api.get(
      'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
    );
  }
}
