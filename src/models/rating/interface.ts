import {Document} from 'mongoose';

export interface Rating {
    userId: string,
    score: number,
    itemId: string
}


export interface RatingDocument extends Rating, Document {
}