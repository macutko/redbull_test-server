import * as ratingSerive from '../../services';
import {NextFunction, Request, Response} from 'express';
import {logger} from "../../util/logger";

export function rate(req: Request, res: Response, next: NextFunction): void {
    ratingSerive.rate({...req.body, ...req.cookies})
        .then((userId) => {
            if (userId) {
                res.cookie('userId', userId, {
                    httpOnly: true,
                    sameSite: true
                }).sendStatus(200);

            } else {
                res.sendStatus(200);
            }

        })
        .catch((err) => {
            logger.error(err.message);
            err.data && err.data.statusCode ? res.sendStatus(err.data.statusCode) : res.sendStatus(500);
            next();
        });
}
