let model = global.app.model;

module.exports = router => {
    router.get('/', (req, res, next) =>
        model.Event.find({deleted: {$ne: true}}).exec().then(
            events => res.send(events),
            err => next(Error.create('An error occurred trying to fetch the events.', {}, err))
        )
    );

    router.post('/', (req, res, next) => {
        let event = new model.Event(req.body.event);
        event.save().then(
            () => res.sendStatus(200),
            err => next(Error.create('An error occurred trying to save the event.', {event: req.body.event}, err))
        );
    });

    router.get('/:id', (req, res, next) =>
        model.Event.findById(req.params.id).then(
            event => res.send(event),
            err => next(Error.create('An error occurred trying to find the event.', {_id: req.params.id}, err))
        )
    );

    router.put('/:id', (req, res, next) =>
        model.Event.findByIdAndUpdate(req.params.id, req.body.event).then(
            () => res.sendStatus(200),
            err => next(Error.create('An error occurred trying to update the event', {}, err))
        )
    );

    router.delete('/:id', (req, res, next) =>
        model.Event.findById(req.params.id).then(event => {
            event.deleted = true;
            event.save();
        }).then(
            () => res.sendStatus(200),
            err => next(Error.create('An error occurred trying to delete the event', {_id: req.params.id}, err))
        )
    );

    return router;
};
