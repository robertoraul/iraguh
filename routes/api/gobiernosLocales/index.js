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
                    let codDpe = gl.codGL.substr(0, 2);
                    console.log(codDpe);
                    return model.Dpe.findOne({ codigo: codDpe }).exec().then(
                        glt => {
                            let gobiernoLocal = new model.GobiernoLocal({
                                codGL: gl.codGL,
                                nombreGL: gl.nombreGL,
                                pob2010: gl.pob2010,
                                fechaSistema: gl.fechaSistema,
                                dpe: glt._id,
                                gobiernolocaltipo: gl.gobiernolocaltipo
                            });
                            console.log(glt._id);
                            gobiernoLocal.save().then(
                                () => { return gl.delete() }
                            );

                        }
                    );
/*
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
*/
                }
            )).then(
                () => res.sendStatus(200),
                err => next(Error.create('no pude actualizar los gobiernos locales <=( ', {}, err))
            )
        ));

    return router;
};