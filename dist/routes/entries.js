"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeAdapter_1 = __importDefault(require("@adapters/routeAdapter"));
const entriesController_1 = __importDefault(require("@controllers/entriesController"));
const router = express_1.default.Router();
router.get("/", (0, routeAdapter_1.default)(entriesController_1.default.getAll));
exports.default = router;
