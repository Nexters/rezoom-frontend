import axios from 'axios';
import { isEmpty } from 'lodash';
import { environment } from '../environment/Environment';

export default class Api {
  static baseUrl = environment.API_SERVER;

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
            Authorization: `${token}`,
          }),
        ),
      );
    }

    return config;
  }

  static async post(url, data) {
    // const config = this.setConfig(token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const apiPost = await axios
      .post(`${this.baseUrl}/${url}`, data, config)
      .then(res => {
        console.log(res);
        // console.log(res.headers['Authorization']);
        // console.log(res.headers.Authorization);
        return res;
      })
      .catch(e => console.log(e));
    return apiPost;
  }

  static async get(url, token) {
    const config = this.setConfig(token);
    // const config = {
    //   headers: {
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // };
    const apiGet = await axios
      .get(`${this.baseUrl}/${url}`, config)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(e => console.log(e));
    return apiGet;
  }

  static async put(url, data) {
    const config = this.setConfig('');
    const apiPut = await axios
      .put(`${url}`, data, config)
      .then(res => console.log(res))
      .catch(e => console.log(e));
    return apiPut;
  }

  static async del(url) {
    const config = this.setConfig('');
    const apiDel = await axios
      .delete(`${url}`, config)
      .then(res => console.log(res))
      .catch(e => console.log(e));
    return apiDel;
  }
}
