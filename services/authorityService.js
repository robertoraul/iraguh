let model = global.app.model;

module.exports = (req, callback) => {
    model.User.findById(req.user._id).exec().then(
        user => {
            let authority = user.codGL || '';
            callback(null, authority);
        },
        err => {
            callback(err, null)
        }
    )
};