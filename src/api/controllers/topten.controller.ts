import * as ratingSerive from '../../services';
import {NextFunction, Request, Response} from 'express';
import {logger} from '../../util/logger';

export function topTen(req: Request, res: Response, next: NextFunction): void {
    ratingSerive.topTen()
        .then((top) => {
            res.status(200).json(top);
        })
        .catch((err) => {
            logger.error(err.message);
            err.data && err.data.statusCode ? res.sendStatus(err.data.statusCode) : res.sendStatus(500);
            next();
        });
}
