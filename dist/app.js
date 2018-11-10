'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('./config/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost:27017/invoicebuilder');
var app = (0, _express2.default)();
var PORT = 3000;

var accessLogStream = _fs2.default.createWriteStream(_path2.default.join(__dirname, 'access.log'), { flags: 'a' });

app.use((0, _morgan2.default)('combined', { stream: accessLogStream }));

app.use(_bodyParser2.default.json());
app.use(_express2.default.urlencoded());
app.use('/api', _routes.router);
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