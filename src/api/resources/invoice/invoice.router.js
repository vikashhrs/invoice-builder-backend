import express from 'express';
import invoiceController from './invoice.controller';

export const invoiceRouter = express.Router();

invoiceRouter
    .route('/')
    .get(invoiceController.findAll)
    .post(invoiceController.create);

invoiceRouter
    .route('/:_id')
    .get(invoiceController.findOne)
    .put(invoiceController.update)
    .delete(invoiceController.delete);