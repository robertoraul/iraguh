let model = global.app.model;

module.exports = (req, callback) => {
    model.User.findById(req.user._id).exec().then(
        user => {
            let query = {}, error = '';
            switch (user.permission) {
                case 'admin':
                    callback(error, query);
                    break;
                default:
                    query = {forbidden: {$exists: true}};
                    error = '-2 - Nivel de usuario no autorizado.';
                    callback(error, query);
                    break;
            }
        },
        err => {
            callback(err, {forbidden: {$exists: true}});
        }
    )
};