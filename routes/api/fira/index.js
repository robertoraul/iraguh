let model = global.app.model,
    _ = require('lodash'),
    scopeFilter = require('../../../services/scopeFilter');

module.exports = router => {

    router.get('/', scopeFilter(), (req, res, next) => {
        let query = _.merge(req.scopeFilter, {idGL: req.query.rome});
        model.Registro.find(query).populate('variables.unidadMedida').exec().then(
            registros => res.send(registros),
            err => next(Error.create('Error al intentar obtener los registros', {}, err))
        );
    });

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
        model.Registro.findById(req.params.id).exec().then(
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

    router.post('/', (req, res, next) => {
        Promise.all(_.map(req.body.registro.variables, variable => {
            return {
                section: variable.section,
                name: variable.name,
                description: {
                    detail: variable.detail,
                    measure: variable.measure
                }
            }
        })).then( variables => {
            let registro = new model.Registro(req.body.registro);
            registro.variables = variables;
            registro.save().then(
                () => res.sendStatus(200),
                err => next(Error.create('Error al intentar guardar el registro.', {registro: req.body.registro}, err))
            )
        })
    });

    router.put('/:id', (req, res, next) => {
        model.Registro.findById(req.params.id).then(registro => {
            _.assign(registro, req.body.registro);
            return registro.save().then(
                () => res.sendStatus(200),
                err => next(Error.create('Error al intentar actualizar el registro.', {}, err))
            )
        })
    });

    return router;
};