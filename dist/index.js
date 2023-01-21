"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("module-alias/register");
dotenv_1.default.config();
const server_1 = __importDefault(require("./server"));
process.on('uncaughtException', (error, origin) => {
    // log.error('----- Uncaught exception -----')
    console.error(error);
    // log.error('----- Exception origin -----')
    // log.error(origin)
});
(0, server_1.default)();
