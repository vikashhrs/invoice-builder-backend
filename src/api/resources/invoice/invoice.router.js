import express from 'express';
import passport from 'passport';
import invoiceController from './invoice.controller';

export const invoiceRouter = express.Router();

invoiceRouter
    .route('/')
    .get(passport.authenticate('jwt', { session: false }), invoiceController.findAll)
    .post(passport.authenticate('jwt', { session: false }), invoiceController.create);

invoiceRouter
    .route('/:_id')
    .get(passport.authenticate('jwt', { session: false }), invoiceController.findOne)
    .put(passport.authenticate('jwt', { session: false }), invoiceController.update)
    .delete(passport.authenticate('jwt', { session: false }), invoiceController.delete);