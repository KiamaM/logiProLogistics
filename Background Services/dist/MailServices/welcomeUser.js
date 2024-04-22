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
exports.welcomeUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../Config/sqlConfig");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const email_helper_1 = require("../Helpers/email.helper");
const welcomeUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = mssql_1.default.connect(sqlConfig_1.sqlConfig);
    const users = (yield ((yield pool).request().query('SELECT * FROM users WHERE isDeleted = 0 AND isWelcomed=0'))).recordset;
    console.log(users);
    for (let user of users) {
        const templatePath = path_1.default.resolve(__dirname, '../Templates/welcomeUser.ejs');
        console.log('Template Path:', templatePath);
        ejs_1.default.renderFile('Templates/welcomeUser.ejs', { userName: user.firstName }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error('Error rendering ejs template', error);
                return;
            }
            console.log('Rendered template data', data);
            let mailOptions = {
                from: "muriithikiamad1@gmail.com",
                to: user.email,
                subject: "Welcome to LogiPro",
                html: data
            };
            console.log(data);
            try {
                yield (0, email_helper_1.sendMail)(mailOptions);
                (yield pool).request().query('UPDATE users SET isWelcomed=1 WHERE isWelcomed=0 AND isDeleted= 0');
                console.log('Email sent to new user');
            }
            catch (error) {
                console.error(error);
            }
        }));
    }
});
exports.welcomeUser = welcomeUser;
