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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByCompany = exports.updateHoliday = exports.getById = exports.getAllHolidays = void 0;
const db_1 = require("../database/db");
const getAllHolidays = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield (yield db_1.db).query('SELECT * FROM holidays');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllHolidays = getAllHolidays;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [rows] = yield (yield db_1.db).query('SELECT * FROM holidays WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Holiday not found' });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getById = getById;
const updateHoliday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield (yield db_1.db).query('UPDATE holidays SET approve_disapprove = NOT approve_disapprove WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Holiday not found' });
        }
        else {
            res.json({ message: 'Holiday updated successfully' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateHoliday = updateHoliday;
const getByCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName } = req.params;
    console.log(companyName);
    try {
        const [companyRows] = yield (yield db_1.db).query('SELECT * FROM companies WHERE company_name = ?', [companyName]);
        if (companyRows.length === 0) {
            res.status(404).json({ error: 'Company not found' });
            return;
        }
        const country = companyRows[0].country;
        const [countryRows] = yield (yield db_1.db).query('SELECT * FROM holidays WHERE country = ?', [country]);
        const [indiaRows] = yield (yield db_1.db).query('SELECT * FROM holidays WHERE country = ?', ['India']);
        const allHolidays = [...countryRows, ...indiaRows]
            .filter((holiday, index, self) => index === self.findIndex((h) => h.date === holiday.date && h.occasion === holiday.occasion));
        res.json(allHolidays);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getByCompany = getByCompany;
