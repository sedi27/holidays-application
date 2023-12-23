"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const holidays_1 = __importDefault(require("./routes/holidays"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/holidays', holidays_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
