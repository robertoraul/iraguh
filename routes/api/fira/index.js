var model = global.app.model;

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.Registro.find({}).populate('variable').exec().then(
            registros => res.send(registros),
            err => next(Error.create('nada', {}, err))
        )
    );

    router.get('/:id', (req, res, next) => {
            model.Registro.findById(req.params.id).exec().then(
            registro => res.send(registro),
            err => next(Error.create('No encontrado!!.', {_id: req.params.id}, err))
           )
    });
    return router;
};
