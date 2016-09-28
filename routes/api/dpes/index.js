var model = global.app.model,
    dpesService = require('../../../services/dpesService'),
    _ = require('lodash');

module.exports = router => {
    router.get('/', (req, res, next) =>
        dpesService(req, (error, query) => {
            if (error) {
                next(Error.create('Error de validación de usuario nro. ' + error, {}, error));
                return router;
            }
            console.log(query);
            model.Dpe.find(query).exec().then(
                dpes => {
                    res.send(dpes);
                },
                err => next(Error.create('Error al intentar obtener las dpes.', {}, err))
            )
        })
    );

    router.get('/:dpe', (req, res, next) =>
        model.Dpe.findOne({codigo: req.params.dpe}).then(
            dpe => res.send(dpe),
            err => next(Error.create('Error al intentar obtener la Dpe.', {codigo: req.params.dpe}, err))
        )
    );

    return router;
};