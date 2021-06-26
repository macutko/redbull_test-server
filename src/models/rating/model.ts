import {model, Model} from 'mongoose';
import {RatingSchema} from './schema';
import {RatingDocument} from "./interface";

export type RatingModelType = Model<RatingDocument>


// Default export
export default model<RatingDocument, RatingModelType>('Rating', RatingSchema);