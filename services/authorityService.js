let model = global.app.model;

module.exports = (req, callback) => {
    model.User.findById(req.user._id).exec().then(
        user => {
            switch (user.permission) {
                case 'admin':
                    callback(null, {});
                    break;
                case 'dpe':
                    callback(null, {dpe: user._id});
                    break;
                case 'rome':
                    callback(null, {idGL: user._id});
                    break;
                default:
                    callback(null, {_id: {$exists: false}});
                    break;
            }
        },
        err => {
            callback(err, {_id: {$exists: false}});
        }
    )
};