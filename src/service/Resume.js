import axios from 'axios';

export default class Resume {
  postResume(data, config) {
    axios
      .post('', data, config)
      .catch()
      .then();
  }
}
