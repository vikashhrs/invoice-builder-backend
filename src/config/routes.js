import express from 'express';
import invoiceController from '../api/controller/invoice.controller'
export const router = express.Router();

//Invoices
router.get('/invoices', invoiceController.findAll);
router.get('/invoices/:_id', invoiceController.findOne)
router.post('/invoices', invoiceController.createInvoice);
router.put('/invoices/:_id', invoiceController.updateInvoice);
router.delete('/invoices/:_id', invoiceController.deleteInvoice);