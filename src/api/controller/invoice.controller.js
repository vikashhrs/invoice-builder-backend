import joi from 'joi';
import Invoice from '../models/invoice.model'

export default {
    findAll(req, res, next) {
        Invoice.find()
            .then(invoices => res.json(invoices))
            .catch(error => {
                res.status = 500;
                res.json(error)
            })
    },

    findOne(req, res, next) {
        let { _id } = req.params;
        const schema = joi.object().keys({
            _id: joi.string().required()
        });
        let { error, value } = joi.validate(req.params, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        Invoice.findOne({ _id })
            .then(invoice => {
                if (invoice)
                    return res.json(invoice);
                return res.status(404).json({
                    error: 'No Invoice Found!'
                })

            })
            .catch(error => {
                res.status(500).json(error);
            })
    },

    createInvoice(req, res, next) {
        let { item, qty, date, due, tax, rate } = req.body;
        const schema = joi.object().keys({
            item: joi.string().required(),
            date: joi.date().required(),
            due: joi.date().required(),
            qty: joi.number().integer().required(),
            tax: joi.optional(),
            rate: joi.optional()
        });
        const { error, value } = joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        Invoice.create(value)
            .then(invoice => {
                res.json(invoice);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    updateInvoice(req, res, next) {
        let { _id } = req.params;
        let { item, qty, date, due, tax, rate } = req.body;
        const schema = joi.object().keys({
            item: joi.string().optional(),
            date: joi.date().optional(),
            due: joi.date().optional(),
            qty: joi.number().integer().optional(),
            tax: joi.number().optional(),
            rate: joi.number().optional()
        });
        const { error, value } = joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        Invoice.findOneAndUpdate({ _id }, value, { new: true })
            .then(invoice => {
                if (invoice)
                    return res.json(invoice);
                return res.status(404).json({ error: 'No Invoice Found!' })
            })
            .catch(error => {
                res.status(500).json(error);
            })

    },

    deleteInvoice(req, res, next) {
        let { _id } = req.params;
        const schema = joi.object().keys({
            _id: joi.string().required()
        });
        let { error, value } = joi.validate(req.params, schema);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        Invoice.findByIdAndRemove({ _id })
            .then(invoice => {
                if (invoice)
                    return res.json(invoice);
                return res.status(404).json({ error: 'No Invoice Found!' })
            })
            .catch(error => {
                res.status(500).json(error);
            })

    }
}