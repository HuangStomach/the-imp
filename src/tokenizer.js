const config = require('../util/config')('tokenizer');
const logger = require('../util/logger').get('tokenizer');

class Tokenizer {
  constructor(handles = []) {
    this.handles = {};
    for (let handle of handles) {
      if (!Reflect.has(config.tokenizers, handle)
      || Reflect.get(config.tokenizers, handle) == false) {
        logger.warn(`${handle}服务尚未开启或支持`);
        continue;
      }
      
      let tokenizer = Reflect.construct(require(`./tokenizer/${handle}`), []);
      Reflect.set(this.handles, handle, tokenizer);
    }
  }

  get(handles, word = '') {
    if (this.handles.length == 0) return Promise.reject(`无任何可用的服务`);

    const queue = [];
    for (let handle of handles) {
      if (!Reflect.has(this.handles, handle)) continue;
      queue.push(Reflect.get(this.handles, handle).get(word));
    }

    return Promise.all(queue);
  }
}

module.exports = Tokenizer;
