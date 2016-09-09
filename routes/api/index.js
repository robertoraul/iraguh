var fs = require('fs'),
    express = require('express'),
    winston = require('winston');

function loadModules(folder, router) {
    // Loading modules dynamically
    fs.readdirSync(folder)
        .filter(file => file.indexOf('.') == -1)
        .forEach(module => {
            winston.info('Loading %s api...', module);
            router.use(`/${module}`, require(`./${module}`)(express.Router()));
        });
}

module.exports = router => {
    loadModules('./routes/api', router);
    return router;
};
