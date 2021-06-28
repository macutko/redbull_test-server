import * as http from 'http';
import {config} from 'dotenv';
import {logger} from './util/logger';
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
        // eslint-disable-next-line max-len
        origin: ['http://localhost:3000',
            'http://asterdigital.tech:80',
            'http://asterdigital.tech'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(cookieParser());

    //init db
    await connectMongoose();


    // api routes
    app.use('/rating', ratingController.default);


    logger.info(`Checkign the DB: ${process.env.CONNECTION_STRING}`);

    const httpServer = http.createServer(app);

    httpServer.listen(8082, () => {
        logger.info('HTTP Server running on port 80');
    });


};

serve().then(() => logger.info('running')).catch(e => logger.error(e));