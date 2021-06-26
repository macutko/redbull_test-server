// Schema
import {Schema} from 'mongoose';
import {RatingDocument} from "./interface";


export const RatingSchema = new Schema<RatingDocument>({
    userId: {
        type: Schema.Types.String,
        required: true
    },
    score: {
        type: Schema.Types.Number,
        required: true
    },
    itemId: {
        type: Schema.Types.String,
        required: true
    }
}, {timestamps: true});


RatingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.id;
    }
});