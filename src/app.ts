import * as bodyParser from 'body-parser';
import express, {Express} from 'express';
import {connectMongoose} from './models/db';
import * as ratingController from "./api/controllers"
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import cors from 'cors';


export default async function (): Promise<Express> {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000', 'https://redbull-test-client-oueo4qu8k-macutko.vercel.app/'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(cookieParser());


    //init db
    await connectMongoose();


    // api routes
    app.use('/rating', ratingController.default);


    return app;
}