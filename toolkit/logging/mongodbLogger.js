module.exports = logger => logger.add(require('winston-mongodb').MongoDB, global.app.config.winston.mongodb);
