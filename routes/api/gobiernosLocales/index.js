var model = global.app.model;

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.GobiernoLocal.find({}).populate('gobiernolocaltipo').exec().then(
            gobiernos => res.send(gobiernos),
            err => next(Error.create('Error al intentar obtener los gobiernos locales', {}, err))
        )
    );

    router.get('/:code', (req, res, next) => {
        console.log(req.params.code);
        model.GobiernoLocal.findOne({codGL: req.params.code}).populate('gobiernolocaltipo').exec().then(
            gobierno => {
                console.log(gobierno);
                res.send(gobierno)
            },
            err => next(Error.create('Error al buscar el gobierno local.', {codGL: req.params.code}, err))
        )
    });

    return router;
};