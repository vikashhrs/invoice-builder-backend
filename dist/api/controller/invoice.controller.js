'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _invoice = require('../models/invoice.model');

var _invoice2 = _interopRequireDefault(_invoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        _invoice2.default.find().then(function (invoices) {
            return res.json(invoices);
        }).catch(function (error) {
            res.status = 500;
            res.json(error);
        });
    },
    findOne: function findOne(req, res, next) {
        var _id = req.params._id;

        var schema = _joi2.default.object.keys({
            _id: _joi2.default.string().required()
        });

        var _joi$validate = _joi2.default.validate(req.params, schema),
            error = _joi$validate.error,
            value = _joi$validate.value;

        if (error && error.details) {
            return res.status(400).json(error);
        }
        _invoice2.default.findOne({ _id: _id }).then(function (invoice) {
            if (invoice) {
                res.json(invoice);
            } else {
                res.status(404).json({
                    error: {
                        message: 'No Invoice Found!'
                    }
                });
            }
        }).catch(function (error) {
            res.status(500).json(error);
        });
    },
    createInvoice: function createInvoice(req, res, next) {
        var _req$body = req.body,
            item = _req$body.item,
            qty = _req$body.qty,
            date = _req$body.date,
            due = _req$body.due,
            tax = _req$body.tax,
            rate = _req$body.rate;

        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().required(),
            date: _joi2.default.date().required(),
            due: _joi2.default.date().required(),
            qty: _joi2.default.number().integer().required(),
            tax: _joi2.default.number().optional(),
            rate: _joi2.default.number().optional()
        });

        var _joi$validate2 = _joi2.default.validate(req.body, schema),
            error = _joi$validate2.error,
            value = _joi$validate2.value;

        if (error && error.details) {
            return res.status(400).json(error);
        }
        _invoice2.default.create(value).then(function (invoice) {
            res.json(invoice);
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }
};
//# sourceMappingURL=invoice.controller.js.map