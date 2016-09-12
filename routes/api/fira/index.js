/**
 * Created by rcard on 09/09/2016.
 */
var model = global.app.model,
    appDomain = require('../../../services/appDomain');

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.Registro.find({}).populate('variable').exec().then(
            registros => res.send(registros),
            err => next(Error.create('nada', {}, err))
        )
  );
    return router;
};
