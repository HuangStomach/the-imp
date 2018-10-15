const express = require('express');

module.exports = {
  start() {
    const app = express();

    // 仪器list连接状态查询
    app.get('/status', (req, res) => {
      let word = req.query.word;
    })

    app.listen(80, () => { logger.info(`接口服务开启 监听端口: ${port}`) })
  }
}