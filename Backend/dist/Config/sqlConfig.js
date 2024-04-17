"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log((_a = process.env) === null || _a === void 0 ? void 0 : _a['DB_NAME']);
exports.sqlConfig = {
    user: process.env['DB_USER'],
    password: process.env['DB_PWD'],
    database: process.env['DB_NAME'],
    server: process.env.SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
console.log(exports.sqlConfig);
