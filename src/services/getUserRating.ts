import RatingModel from '../models/rating/model';
import {RatingDocument} from '../models/rating/interface';

interface ItemProps {
    itemId: string,
    userId?: string
}

export async function getUserRating({...props}: ItemProps): Promise<number> {
    const score = 0;
    if (props.userId) {
        const rating: RatingDocument = await RatingModel.findOne({
            $and: [
                {itemId: props.itemId},
                {userId: props.userId}
            ]
        });

        if (rating) {
            return rating.score;
        }
    }
    return score;

}
