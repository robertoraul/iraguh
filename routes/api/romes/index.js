var model = global.app.model,
    romesService = require('../../../services/romesService'),
    _ = require('lodash');

module.exports = router => {
    router.get('/', (req, res, next) =>
        romesService(req, (error, query) => {
            if (error) {
                next(Error.create('Error de validación de usuario nro. ' + error, {}, error));
                return router;
            }
            query = req.query.dpe ? _.merge(query, {dpe: req.query.dpe}) : query;
            console.log(query);
            model.Rome.find(query).populate('tipo').exec().then(
                romes => {
                    res.send(romes);
                },
                err => next(Error.create('Error al intentar obtener las romes', {}, err))
            )
        })
    );
    return router;
};