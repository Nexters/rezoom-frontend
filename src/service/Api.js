import axios from 'axios';
import { isEmpty } from 'lodash';

export default class Api {
  static baseUrl = 'http://localhost:3001';

  static config(headers, anyParam) {
    return {
      headers: this.headers(headers),
      ...anyParam,
    };
  }

  static headers(headerParams) {
    return {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      ...headerParams,
    };
  }

  static setConfig(token) {
    let config = this.config();

    if (!isEmpty(token)) {
      config = Object.assign(
        {},
        this.config(
          this.headers({
            Authorization: `JWT ${token}`,
          }),
        ),
      );
    }

    return config;
  }

  static async post(url, data, token) {
    const config = this.setConfig(token);
    const apiPost = await axios
      .post(`${this.baseUrl}/${url}`, data, config)
      .then(res)
      .catch(e => console.log(e));
    return apiPost;
  }

  static async get(url) {
    const config = this.setConfig('');
    const apiGet = await axios
      .get(`${url}`, config)
      .then(res)
      .catch(e => console.log(e));
    return apiGet;
  }

  static async put(url, data) {
    const config = this.setConfig('');
    const apiPut = await axios
      .put(`${url}`, data, config)
      .then(res)
      .catch(e => console.log(e));
    return apiPut;
  }

  static async del(url) {
    const config = this.setConfig('');
    const apiDel = await axios
      .delete(`${url}`, config)
      .then(res)
      .catch(e => console.log(e));
    return apiDel;
  }
}
