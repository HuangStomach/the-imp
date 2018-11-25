const nodejieba = require('nodejieba');

class Jieba {
  constructor() {
    nodejieba.load({
      userDict: `${__dirname}/../../dict/jieba/user.utf8`,
    });
  }
  get(word = '') {
    let result = nodejieba.cut(word);
    return Promise.resolve(result);
  }
}

module.exports = Jieba;
