let model = global.app.model,
    _ = require('lodash');

module.exports = router => {
    router.get('/:id', (req, res, next) =>
        model.UnidadMedida.findById(req.params.id).exec().then(
            measure => res.send(measure),
            err => next(Error.create('Error al intentar obtener la unidad de medida.', {_id: req.params.id}, err))
        )
    );

    router.get('/search/:value', (req, res, next) =>
        model.UnidadMedida.find({unidadMedida: {$regex: req.params.value, $options: 'i'} }).limit(15).exec().then(
            measures => {
                console.log(measures);
                res.send(measures)
            },
            err => next(Error.create('Error al intentar obtener las unidades de medida.', {searchTerm: req.params.value}, err))
        )
    );

    return router;
};