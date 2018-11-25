const express = require('express');
const Tokenizer = require('./tokenizer');
const config = require('../util/config')('tokenizer');
const logger = require('../util/logger').get('server');

module.exports = {
  start() {
    const app = express();
    const tokenizer = new Tokenizer(Object.keys(config.tokenizers));

    // 仪器list连接状态查询
    app.get('/segment', async (req, res) => {
      let word = req.query.word;
      let handles = req.query.handles ? req.query.handles : Object.keys(config.tokenizers);

      let words = await tokenizer.get(handles,word);
      res.send(words).end();
    })

    app.listen(4000, () => { logger.info(`接口服务开启 监听端口: 80`) })
  }
}