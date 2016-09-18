var model = global.app.model;

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.Registro.find({}).populate('variables').exec().then(
            registros => res.send(registros),
            err => next(Error.create('Error al intentar obtener los registros', {}, err))
        )
    );

    router.get('/variables', (req, res, next) =>
        model.Variable.find({}).exec().then(
            variables => res.send(variables),
            err => next(Error.create('Error al intentar obtener las variables', {}, err))
        )
    );

    router.get('/variables/search/:value', (req, res, next) => {
        var filter = {nombreVariable: {$regex: req.params.value, $options: 'i'}, deleted: {$ne: true}};
        if (req.query.soloActivos) {
            filter.activo = true;
        }
        return model.Variable.find(filter).limit(15).exec().then(
            variables => res.send(variables),
            err => next(Error.create('Error al buscar las publicaciones.', {searchTerm: req.params.value}, err))
        )
    });

    router.get('/:id', (req, res, next) => {
        model.Registro.findById(req.params.id).populate('variables').exec().then(
            registro => res.send(registro),
            err => next(Error.create('Error al buscar el registro.', {_id: req.params.id}, err))
        )
    });

    router.get('/variable/:id', (req, res, next) => {
        model.Variable.findById(req.params.id).exec().then(
            variable => res.send(variable),
            err => next(Error.create('Error al buscar la variable.', {_id: req.params.id}, err))
        )
    });

    return router;
};