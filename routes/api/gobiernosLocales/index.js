var model = global.app.model,
    _ = require('lodash');

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.GobiernoLocal.find({}).populate('gobiernolocaltipo').exec().then(
            gobiernos => res.send(gobiernos),
            err => next(Error.create('Error al intentar obtener los gobiernos locales', {}, err))
        )
    );

    router.get('/:code', (req, res, next) => {
        model.GobiernoLocal.findOne({codGL: req.params.code}).populate('gobiernolocaltipo').exec().then(
            gobierno => {
                res.send(gobierno)
            },
            err => next(Error.create('Error al buscar el gobierno local.', {codGL: req.params.code}, err))
        )
    });

    router.post('/indexed', (req, res, next) =>
        model.GobiernoLocal.find().exec().then(gls =>
            Promise.all(_.map(gls, gl => {
                    return model.GobiernoLocalTipo.findOne({tipoGL: gl.tipoGL}).exec().then(
                        glt => {
                            let gobiernoLocal = new model.GobiernoLocal({
                                codGL: gl.codGL,
                                nombreGL: gl.nombreGL,
                                pob2010: gl.pob2010,
                                fechaSistema: gl.fechaSistema,
                                gobiernolocaltipo: glt._id
                            });
                            console.log(gobiernoLocal);
                            return gobiernoLocal.save();
                        }
                    )
                }
            )).then(
                () => res.sendStatus(200),
                err => next(Error.create('no pude actualizar los gobiernos locales <=( ', {}, err))
            )
        ));

    return router;
};