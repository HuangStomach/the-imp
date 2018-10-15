const config = require('../util/config')('tokenizer');
const logger = require('../util/logger').get('tokenizer');

class Tokenizer {
  handles = [];

  constructor(handles = []) {
    for (let handle of handles) {
      if (!Reflect.has(config.tokenizers, handle)
      || Reflect.get(config.tokenizers, handle) == false) {
        logger.warn(`${handle}服务尚未开启或支持`);
        continue;
      }
      
      let tokenizer = Reflect.construct(require(`./tokenizer/${handle}`));
      this.handles.push(tokenizer);
    }
  }

  get(word = '') {
    if (this.handles.length == 0) return Promise.reject(`无任何可用的服务`);
    const queue = [];
    for (let tokenizer of this.handles) {
      queue.push(tokenizer.get(word));
    }

    Promise.all(queue)
    .then();
  }
}

module.exports = Tokenizer;
