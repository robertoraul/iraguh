var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    winston = require('winston');

var server = module.exports;

server.start = () => {
    var api = global.app.api = express();
    api.set('port', global.app.config.server.port);
    api.disable('x-powered-by');

    // view engine setup
    api.set('views', path.join(__dirname, '../../public/views'));
    api.set('view options', {layout: false});
    api.engine('html', require('justhtml').__express);
    api.set('view engine', 'html');

    api.use(require('compression')());
    api.use(require('serve-favicon')(path.join(__dirname, '../../public/favicon.ico')));

    // javascript and css libraries loaded using Bower.
    api.use(express.static(path.join(__dirname, '../../bower_components')));
    api.use(express.static(path.join(__dirname, '../../public')));

    api.use(require('morgan')(global.app.config.logger || (api.get('env') === 'development' ? 'dev' : 'combined')));

    api.use(bodyParser.json(global.app.config.server.request.bodyParser));
    api.use(bodyParser.urlencoded(global.app.config.server.request.bodyParser));
    api.use(require('cookie-parser')(global.app.config.auth.sessionSecret));
    api.use(require('cookie-session')({secret: global.app.config.auth.sessionSecret}));

    require('../../routes')(api);
    require('./notFoundHandler')(api);
    require('./errorHandler')(api);

    api.listen(api.get('port'), () => winston.info('%s started at port %s', global.app.name, api.get('port')));
};
