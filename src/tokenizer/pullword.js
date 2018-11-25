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
      params: {
        source: word,
        param1: 0,
        param2: 0
      }
    }).then(result => {
      let words = result.data.split('\r\n').filter(i => i);
      return Promise.resolve(words);
    }, err => {
      logger.warn(`pullword服务出现错误: ${err.message}`);
      return Promise.resolve([])
    })
  }
}

module.exports = PullWord;
