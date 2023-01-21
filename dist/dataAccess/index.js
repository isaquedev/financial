"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletDB = exports.userDB = exports.entryDB = void 0;
const database_1 = __importDefault(require("../database"));
const makeEntryDB_1 = __importDefault(require("./makeEntryDB"));
const makeUserDB_1 = __importDefault(require("./makeUserDB"));
const makeWalletDB_1 = __importDefault(require("./makeWalletDB"));
const entryDB = (0, makeEntryDB_1.default)(database_1.default);
exports.entryDB = entryDB;
const userDB = (0, makeUserDB_1.default)(database_1.default);
exports.userDB = userDB;
const walletDB = (0, makeWalletDB_1.default)(database_1.default);
exports.walletDB = walletDB;
