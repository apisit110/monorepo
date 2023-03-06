"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), '..', '..', 'packages', 'libs', '.env')
});
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), '..', '..', 'packages', 'libs', '.env.local')
});
const app = (0, express_1.default)();
const port = process.env.PORTAL_SERVICE_PORT;
console.log('port: ', port);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
