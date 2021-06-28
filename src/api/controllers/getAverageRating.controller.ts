import * as ratingSerive from '../../services';
import {NextFunction, Request, Response} from 'express';
import {logger} from '../../util/logger';

export function getAverageRating(req: Request, res: Response, next: NextFunction): void {
    ratingSerive.getAverageRating({...req.query, ...req.cookies})
        .then((score) => {
            res.status(200).json({score: score});
        })
        .catch((err) => {
            logger.error(err.message);
            err.data && err.data.statusCode ? res.sendStatus(err.data.statusCode) : res.sendStatus(500);
            next();
        });
}
