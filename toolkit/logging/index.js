var winston = require('winston');

module.exports = winston;
require('./mongodbLogger')(winston);
require('./mailLogger')(winston);
