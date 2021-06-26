import {RatingDocument} from "../models/rating/interface";
import RatingModel from '../models/rating/model';
import {LeanDocument} from "mongoose";


export async function topTen(): Promise<LeanDocument<RatingDocument>> {
    let rating = await RatingModel.aggregate([
        {
            $group: {
                _id: "$itemId",
                avg_score: {$avg: "$score"}
            }
        }
    ]).sort({"avg_score": -1}).limit(10).exec();
    return rating

}
