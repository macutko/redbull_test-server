"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingSchema = void 0;
// Schema
var mongoose_1 = require("mongoose");
exports.RatingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    score: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    itemId: {
        type: mongoose_1.Schema.Types.String,
        required: true
    }
}, { timestamps: true });
exports.RatingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.id;
    }
});
//# sourceMappingURL=schema.js.map