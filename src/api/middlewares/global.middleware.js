import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../../config/swagger.json';
import fs from 'fs';
import path from 'path';
import { configureJWTStrategy } from './passport-jwt.js';

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const options = {
    explorer: true
};

export const setGlobalMiddleware = (app) => {
    app.use(passport.initialize())
    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    configureJWTStrategy();
    app.use(cors());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
}