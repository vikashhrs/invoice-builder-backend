'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _index = require('./api/index');

var _development = require('./config/env/development');

var _global = require('./api/middlewares/global.middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost:27017/' + _development.devConfig.database, { useNewUrlParser: true });

var app = (0, _express2.default)();
var PORT = _development.devConfig.port;

//register global middleware
(0, _global.setGlobalMiddleware)(app);

app.use('/api', _index.restRouter);
app.use(function (req, res, next) {
    var error = new Error('Not Found!');
    error.message = 'Invalid Route!';
    error.status = 404;
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, function () {
    console.log('server running at port ' + PORT);
});
//# sourceMappingURL=app.js.map