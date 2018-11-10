import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { router } from './config/routes'

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/invoicebuilder');
const app = express();
const PORT = 3000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api', router);
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