const winston = require('winston');
const mkdirp = require('mkdirp');
const path = require('path');
const config = require('./config');

log_dir = path.dirname(__dirname) + '/logs';
mkdirp.sync(log_dir);

module.exports = {
  loggers: {},
  get(type) {
    if (Reflect.has(this.loggers, type)) return Reflect.get(this.loggers, type);

    let log_file = `${log_dir}/${type}.log`;
    let logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          level: 'debug',
          colorize: true,
          timestamp: Math.floor(Date.now() / 1000),
          silent: config.console_quiet // 生产环境需要 silent: true
        }),
        new (winston.transports.File)({
          json: false,
          level: config.log_level,
          timestamp: Math.floor(Date.now() / 1000),
          filename: log_file
        })
      ]
    });

    Reflect.set(this.loggers, type, logger);
    return Reflect.get(this.loggers, type);
  }
}
