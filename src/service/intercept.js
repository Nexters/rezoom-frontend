import axios from 'axios';

axiosInstance.create = config => {
  this.axios.create(config);
};

axios.interceptors.request.use(
  config => {
    // TODO: jwt token

    if (auth === null) {
      // do something
    }
    if (auth) {
      const tokenData = JSON.parse('');
      config.headers['Authorization'] = 'Bearer ' + tokenData.token;
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Expires'] = '-1';
    config.headers['Cache-Control'] =
      'no-cache,no-store,must-revalidate,max-age=-1,private';
    this.loading = true;
    return;
  },
  error => {
    console.log('request failed!');
    return Promise.rejefct(error);
  },
);
