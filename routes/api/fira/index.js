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

    router.get('/:id', (req, res, next) => {
            model.Registro.findById(req.params.id).populate('variables').exec().then(
            registro => res.send(registro),
            err => next(Error.create('Error al buscar el registro.', {_id: req.params.id}, err))
           )
    });

    return router;
};
