"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var rate_controller_1 = require("./rate.controller");
var topten_controller_1 = require("./topten.controller");
var getAverageRating_controller_1 = require("./getAverageRating.controller");
var getUserRating_controller_1 = require("./getUserRating.controller");
var router = express_1.default.Router();
// routes
router.post('/rate', rate_controller_1.rate);
router.get('/topTen', topten_controller_1.topTen);
router.get('/average', getAverageRating_controller_1.getAverageRating);
router.get('/user', getUserRating_controller_1.getUserRating);
exports.default = router;
//# sourceMappingURL=index.js.map