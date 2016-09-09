/**
 * Created by rcard on 09/09/2016.
 */
let model = global.app.model;

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.Registro.find({}).populate('variable').exec().then(
            registros => {
                console.log(registros);
                res.send(registros)},

            err => next(Error.create('nada', {}, err))
        )
  );
    return router;
};
