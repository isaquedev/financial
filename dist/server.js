"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose"
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
// import { redisConnection } from "@services/redis";
// import { log } from '@utils/log';
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: '*' }));
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333;
    (0, index_1.default)(app);
    // mongoose.connect(process.env.MONGO_URL).then(() => {
    //   log.info('MongoDB connected')
    // }).catch(err => {
    //   log.error('MongoDB error: ', err)
    // })
    // redisConnection.connect()
    //   .then(() => {
    //     log.info("Redis Up")
    //   }).catch(log.error)
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
exports.default = server;
