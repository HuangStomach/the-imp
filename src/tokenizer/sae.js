const axios = require('axios');
const logger = require('../util/logger').get('tokenizer');

class Sae {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://segment.sae.sina.com.cn',
      timeout: 1000,
    });
  }
  get(word = '') {
    return this.client.post('/urlclient.php?', { context: word }, {
      params: {
        encoding: 'UTF-8',
        word_tag: 0,
      }
    }).then(result => {
      console.log(result);
      //let words = result.data.split('\r\n').filter(i => i);
      return Promise.resolve('');
    }, err => {
      logger.warn(`sae服务出现错误: ${err.message}`);
      return Promise.resolve([])
    })
  }
}

module.exports = Sae;
