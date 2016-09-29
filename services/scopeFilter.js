let model = global.app.model;

module.exports = () =>
    (req, res, next) =>
        model.User.findById(req.user._id, {_id: 0, dpe: 1, rome: 1, permission: 1}).exec().then(
            user => {
                switch (user.permission) {
                    case 'admin':
                        req.scopeFilter = {};
                        break;
                    case 'dpe':
                        req.scopeFilter = {dpe: user.dpe};
                        break;
                    case 'rome':
                        req.scopeFilter = {idGL: user.rome};
                        break;
                    default:
                        req.scopeFilter = {_id: {$exists: false}};
                        break;
                }
                next();
            },
            err => next(err)
        );
