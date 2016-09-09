var model = global.app.model,
    hash = global.app.security.hash,
    appDomain = require('../../../services/appDomain'),
    passwordGenerator = require('../../../services/passwordGenerator'),
    passwordEmail = require('../../../services/passwordEmail');

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.User.find({}, {password: 0}).exec().then(
            users => res.send(users),
            err => next(Error.create('An error occurred trying to fetch the users.', {}, err))
        )
    );

    router.get('/branches', (req, res, next) =>
        model.Branch.find().exec().then(
            branches => res.send(branches),
            err => next(Error.create('An error occurred trying to fetch the branches.', {}, err))
        )
    );

    router.get('/current', (req, res, next) =>
        model.User.findById(req.user._id).exec().then(
            user => res.send(user),
            err => next(Error.create('An error occurred trying to fetch the logged in user.', {_id: req.user._id}, err))
        )
    );

    router.get('/:id', (req, res, next) =>
        model.User.findById(req.params.id).exec().then(
            user => res.send(user),
            err => next(Error.create('An error occurred trying to fetch the user.', {_id: req.params.id}, err))
        )
    );

    router.post('/', (req, res, next) => {
        var user = new model.User(req.body.user);
        var password = passwordGenerator.generate();
        user.password = hash(password);
        user.disabled = false;
        user.save().then(
            user => passwordEmail.send(user, password, appDomain.get(req))
        ).then(
            () => res.sendStatus(200),
            err => next(Error.create('An error occurred trying to save the user.', {user: req.body.user}, err))
        );
    });

    router.post('/changePassword', (req, res, next) =>
        model.User.findById(req.user._id).exec().then(
            user => {
                if (user.password != hash(req.body.currentPassword)) {
                    return res.sendStatus(400);
                }
                user.password = hash(req.body.password);
                user.save().then(() => res.sendStatus(200));
            },
            err => next(Error.create('An error occurred trying to fetch the logged in user.', {_id: req.user._id}, err))
        )
    );

    router.put('/:id', (req, res, next) =>
        model.User.findOneAndUpdate({_id: req.params.id}, req.body.user).exec().then(
            () => res.sendStatus(200),
            err => next(Error.create('An error occurred trying to update the user.', {user: req.body.user}, err)))
    );

    return router;
};
