import * as http from 'http';
import {config} from 'dotenv';
import app from './app';
import {logger} from './util/logger';
import fs from 'fs';
import * as https from 'https';

config();


const serve = async () => {

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