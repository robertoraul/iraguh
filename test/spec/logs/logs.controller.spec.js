'use strict';

describe('Controller: LogsController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        logs,
        logsService,
        logsController,
        logsDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function () {
        logs = [{
            _id: '564b7310a987b66c1778ce6e',
            message: 'An error occurred trying to authenticate the mobile user.',
            stack: ['Error: An error occurred trying to authenticate the mobile user.', '    at Function.Error.create (d:\\Sources\\eti-bo\\toolkit\\extensions\\errorExtensions.js:4:15)', '    at d:\\Sources\\eti-bo\\routes\\mobile.js:49:31', '    at newTickHandler (d:\\Sources\\eti-bo\\node_modules\\mpromise\\lib\\promise.js:229:18)', '    at doNTCallback0 (node.js:428:9)', '    at process._tickCallback (node.js:357:13)'],
            inner: {
                message: 'server 172.26.67.114:27017 received an error {\'name\':\'MongoError\',\'message\':\'read ECONNRESET\'}',
                stack: ['MongoError: server 172.26.67.114:27017 received an error {\'name\':\'MongoError\',\'message\':\'read ECONNRESET\'}', '    at null.<anonymous> (d:\\Sources\\eti-bo\\node_modules\\mongodb-core\\lib\\topologies\\server.js:259:47)', '    at g (events.js:260:16)', '    at emitTwo (events.js:87:13)', '    at emit (events.js:172:7)', '    at null.<anonymous> (d:\\Sources\\eti-bo\\node_modules\\mongodb-core\\lib\\connection\\pool.js:77:12)', '    at g (events.js:260:16)', '    at emitTwo (events.js:87:13)', '    at emit (events.js:172:7)', '    at Socket.<anonymous> (d:\\Sources\\eti-bo\\node_modules\\mongodb-core\\lib\\connection\\connection.js:121:49)', '    at Socket.g (events.js:260:16)', '    at emitOne (events.js:77:13)', '    at Socket.emit (events.js:169:7)', '    at emitErrorNT (net.js:1253:8)', '    at doNTCallback2 (node.js:450:9)', '    at process._tickCallback (node.js:364:17)'],
                name: 'MongoError'
            },
            data: {_id: 'admin'},
            when: '2015-11-17T18:33:28.021Z',
            createdAt: '2015-11-17T18:33:28.025Z'
        }, {
            _id: '564b24d3c29726f015fe07fb',
            message: 'An error occurred trying to authenticate the user.',
            stack: ['Error: An error occurred trying to authenticate the user.', '    at Function.Error.create (d:\\Sources\\eti-bo\\toolkit\\extensions\\errorExtensions.js:4:15)', '    at d:\\Sources\\eti-bo\\routes\\public-api\\index.js:28:24', '    at newTickHandler (d:\\Sources\\eti-bo\\node_modules\\mpromise\\lib\\promise.js:229:18)', '    at doNTCallback0 (node.js:428:9)', '    at process._tickCallback (node.js:357:13)'],
            inner: {
                message: 'Cast to ObjectId failed for value \'admin\' at path \'_id\'',
                stack: ['CastError: Cast to ObjectId failed for value \'admin\' at path \'_id\'', '    at MongooseError.CastError (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\error\\cast.js:19:11)', '    at ObjectId.cast (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\schema\\objectid.js:134:13)', '    at ObjectId.castForQuery (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\schema\\objectid.js:173:17)', '    at module.exports (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\cast.js:205:32)', '    at Query.cast (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\query.js:2531:10)', '    at Query.findOne (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\query.js:1237:10)', '    at d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\query.js:2132:21', '    at new Promise.ES6 (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\promise.js:45:3)', '    at Query.exec (d:\\Sources\\eti-bo\\node_modules\\mongoose\\lib\\query.js:2125:10)', '    at d:\\Sources\\eti-bo\\routes\\public-api\\index.js:17:12', '    at Layer.handle [as handle_request] (d:\\Sources\\eti-bo\\node_modules\\express\\lib\\router\\layer.js:95:5)', '    at next (d:\\Sources\\eti-bo\\node_modules\\express\\lib\\router\\route.js:131:13)', '    at Route.dispatch (d:\\Sources\\eti-bo\\node_modules\\express\\lib\\router\\route.js:112:3)', '    at Layer.handle [as handle_request] (d:\\Sources\\eti-bo\\node_modules\\express\\lib\\router\\layer.js:95:5)', '    at d:\\Sources\\eti-bo\\node_modules\\express\\lib\\router\\index.js:277:22', '    at Function.process_params (d:\\Sources\\eti-bo\\node_modules\\express\\lib\\router\\index.js:330:12)'],
                name: 'CastError',
                kind: 'ObjectId',
                value: 'admin',
                path: '_id',
                reason: null
            },
            data: {_id: 'admin'},
            when: '2015-11-17T13:00:03.079Z',
            createdAt: '2015-11-17T13:00:03.083Z'
        }];
    }));

    beforeEach(inject(function (_$rootScope_, $controller, $q) {
        $rootScope = _$rootScope_;

        logsService = jasmine.createSpyObj('logsService', ['fetch']);


        logsDeferred = $q.defer();
        logsService.fetch.and.returnValue(logsDeferred.promise);

        logsController = $controller('LogsController', {
            logsService
        });
    }));

    it('should fetch the logs on load', function () {
        expect(logsController.logs).toBeUndefined();

        logsDeferred.resolve(logs);
        $rootScope.$digest();

        expect(logsService.fetch).toHaveBeenCalled();
        expect(logsController.logs).toBeDefined();
        expect(logsController.logs.length).toBe(2);
    });
});
