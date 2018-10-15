const axios = require('axios');

class PullWord {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://api.pullword.com',
      timeout: 1000,
    });
  }
  get(word = '') {
    return this.client.get('/get.php', {
      source: word,
      param1: 0,
      param2: 0
    }).then(result => {
      let words = result.data.split(' ');
      return Promise.resolve(words);
    }, err => Promise.reject(err.message))
  }
}

module.exports = PullWord;
