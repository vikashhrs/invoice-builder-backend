import express from 'express';
import clientController from './client.controller';

export const clientRouter = express.Router();

clientRouter
    .route('/')
    .get(clientController.findAll)
    .post(clientController.create);

clientRouter
    .route('/:_id')
    .get(clientController.findOne)
    .delete(clientController.delete)
    .put(clientController.update);