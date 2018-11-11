import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { restRouter } from './api/index';
import swaggerDocument from './config/swagger.json';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/invoicebuilder', { useNewUrlParser: true });

const app = express();
const PORT = 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const options = {
    explorer: true
};

app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
app.use('/api', restRouter);
app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.message = 'Invalid Route!'
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});