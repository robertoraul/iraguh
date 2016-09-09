var express = require('express'),
    winston = require('winston');

module.exports = router => {
    router.get('/', global.app.security.authenticate(), (req, res) => res.render('index'));

    router.get('/signin', (req, res) => res.render('signin'));

    router.get('/signout', (req, res) => {
        delete req.session.user;
        res.redirect(global.app.config.auth.loginPage);
    });

    winston.info('Loading public-api...');
    router.use('/public-api', require('./public-api')(express.Router()));

    router.use('/api', require('./api')(express.Router().use(global.app.security.authenticate())));
};
