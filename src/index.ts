import {createServer} from 'http';
import app from './app';
import {logger} from "./util/logger";


const serve = async () => {

    const server = createServer(await app());
    logger.warn('Dear devs, please use winston for logging!');

    server.listen(process.env.PORT);

};

serve().then(() => logger.info('server running on port:' + process.env.PORT)).catch(e => logger.error(e));