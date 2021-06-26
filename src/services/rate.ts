import {RatingDocument} from "../models/rating/interface";
import RatingModel from '../models/rating/model';
import * as mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';

interface RatingProps {
    score: number,
    itemId: string
    userId?: string
}

export async function rate({...props}: RatingProps): Promise<mongoose.Types.ObjectId> {

    if (props.userId) {
        const rating: RatingDocument = await RatingModel.findOne({
            $and: [
                {itemId: props.itemId},
                {userId: props.userId}
            ]
        });

        if (rating) {
            rating.score = props.score
            await rating.save()
            return null
        }
        const newRating: RatingDocument = await RatingModel.create({
            userId: props.userId,
            itemId: props.itemId,
            score: props.score
        })
        return null
    }

    const newUser = uuidv4();

    const newRating: RatingDocument = await RatingModel.create({
        userId: newUser,
        itemId: props.itemId,
        score: props.score
    })
    return newUser

}
