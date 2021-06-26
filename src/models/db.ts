import {connect, connection} from 'mongoose';
import {logger} from "../util/logger";


const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

export const connectMongoose = async (): Promise<void> => {
    logger.info(`Connecting mongoose to ${process.env.CONNECTION_STRING}`);
    try {
        await connect(process.env.CONNECTION_STRING, connectionOptions);
        logger.info('Mongoose connected alright!');
        connection.on('disconnected', connect);
        return;
    } catch (e) {
        logger.error(`Mongoose error ${e}`);
        throw new Error(e);
    }
};