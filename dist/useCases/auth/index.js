"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = void 0;
const index_1 = require("@dataAccess/index");
const makeLogin_1 = __importDefault(require("./makeLogin"));
const postLogin = (0, makeLogin_1.default)({
    userDB: index_1.userDB
});
exports.postLogin = postLogin;
