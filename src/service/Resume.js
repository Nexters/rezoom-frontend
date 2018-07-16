import axios from 'axios';

export class Resume {
  static postResume(data, config) {
    return axios
      .post('', data, config)
      .catch()
      .then();
  }

  static getTest() {
    // return axios
    //   .get(
    //     'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
    //     {
    //       headers: {
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //     },
    //   )
    //   .then();
    const config = {
      headers: {
        Authorization: '',
      },
      withCredentials: true,
    };

    return axios(
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      config,
    )
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }
}
