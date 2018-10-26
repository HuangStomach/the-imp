const nodejieba = require('nodejieba');

class Jieba {
  constructor() {
    
  }
  get(word = '') {
    console.log(word);
    let result = nodejieba.cut(word);
    return Promise.resolve(result);
  }
}

module.exports = Jieba;
