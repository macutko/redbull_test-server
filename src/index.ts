import * as http from 'http';
import {config} from 'dotenv';
import {logger} from './util/logger';
import fs from 'fs';
import * as https from 'https';
import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {connectMongoose} from './models/db';
import * as ratingController from './api/controllers';

const serve = async () => {
    config();

    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}));

    app.use(helmet());
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000', 'https://redbull-test-client-macutko.vercel.app', 'http://asterdigital.tech:60201'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(cookieParser());

    //init db
    await connectMongoose();


    // api routes
    app.use('/rating', ratingController.default);


    logger.info(`Checkign the DB: ${process.env.CONNECTION_STRING}`);
    // Certificate
    if (!process.env.DEV) {

        const privateKey = fs.readFileSync('/etc/letsencrypt/live/asterdigital.tech/privkey.pem', 'utf8');
        const certificate = fs.readFileSync('/etc/letsencrypt/live/asterdigital.tech/cert.pem', 'utf8');
        const ca = fs.readFileSync('/etc/letsencrypt/live/asterdigital.tech/chain.pem', 'utf8');


        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        };
        const httpsServer = https.createServer(credentials, app);

        httpsServer.listen(443, () => {
            logger.info('HTTPS Server running on port 443');
        });
    }
    const httpServer = http.createServer(app);


    httpServer.listen(80, () => {
        logger.info('HTTP Server running on port 80');
    });


};

serve().then(() => logger.info('running')).catch(e => logger.error(e));