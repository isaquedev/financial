"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeAdapter_1 = __importDefault(require("@adapters/routeAdapter"));
const authController_1 = __importDefault(require("@controllers/authController"));
const router = express_1.default.Router();
router.post("/login", (0, routeAdapter_1.default)(authController_1.default.login));
router.post("/register", (0, routeAdapter_1.default)(authController_1.default.register));
exports.default = router;
