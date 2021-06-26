import {createServer} from 'https';
import app from './app';
import {logger} from './util/logger';
import {execSync, ExecSyncOptions} from 'child_process';
import * as fs from 'fs';


const serve = async () => {

    const execOptions: ExecSyncOptions = {encoding: 'utf-8', windowsHide: true};
    const key = './certs/key.pem';
    const certificate = './certs/certificate.pem';

    if (!fs.existsSync(key) || !fs.existsSync(certificate)) {
        try {
            execSync('openssl version', execOptions);
            execSync(
                // eslint-disable-next-line max-len
                `openssl req -x509 -newkey rsa:2048 -keyout ./certs/key.tmp.pem -out ${certificate} -days 365 -nodes -subj "/C=SK/ST=Bratislava/L=Bratislava/O=RedBull-test/CN=domacanas.hopto.org"`,
                execOptions
            );

            execSync(`openssl rsa -in ./certs/key.tmp.pem -out ${key}`, execOptions);
            execSync('rm ./certs/key.tmp.pem', execOptions);
        } catch (error) {
            logger.error(error);
        }
    }

    const options = {
        key: fs.readFileSync(key),
        cert: fs.readFileSync(certificate),
        passphrase: 'password'
    };

    const server = createServer(options, await app());
    logger.warn('Dear devs, please use winston for logging!');

    server.listen(process.env.PORT);

};

serve().then(() => logger.info('server running on port:' + process.env.PORT)).catch(e => logger.error(e));