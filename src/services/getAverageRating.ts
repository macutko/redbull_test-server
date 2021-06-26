import RatingModel from "../models/rating/model";

interface ItemProps {
    itemId: string
}

export async function getAverageRating({...props}: ItemProps): Promise<number> {
    let rating = await RatingModel.aggregate([
        {
            $match: {itemId: props.itemId}
        },
        {
            $group: {
                _id: "$itemId",
                avg_score: {$avg: "$score"}
            }
        }
    ]).exec();
    if (!rating[0]) return 0
    return rating[0].avg_score

}
