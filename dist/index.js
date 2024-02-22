"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.Connection = void 0;
const Connection_1 = __importDefault(require("./PGsql/Connection"));
exports.Connection = Connection_1.default;
const PGsql_1 = __importDefault(require("./PGsql"));
exports.Table = PGsql_1.default;
