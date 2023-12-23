import { Request, Response } from 'express';
import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../database/db';

interface Holiday {
  id?: number;
  date: string;
  day: string;
  occasion: string;
  company: string;
  approve_disapprove: boolean;
}

export const getAllHolidays = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await (await db).query('SELECT * FROM holidays');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const [rows] = await (await db).query('SELECT * FROM holidays WHERE id = ?', [id]);
    if ((rows as RowDataPacket[]).length === 0) {
      res.status(404).json({ error: 'Holiday not found' });
    } else {
      res.json((rows as RowDataPacket[])[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateHoliday = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const [result] = await (await db).query('UPDATE holidays SET approve_disapprove = NOT approve_disapprove WHERE id = ?', [id]);
    
    if ((result as OkPacket).affectedRows === 0) {
      res.status(404).json({ error: 'Holiday not found' });
    } else {
      res.json({ message: 'Holiday updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getByCompany = async (req: Request, res: Response): Promise<void> => {
  const { companyName } = req.params;
  console.log(companyName);
  try {
    const [companyRows] = await (await db).query('SELECT * FROM companies WHERE company_name = ?', [companyName]);
    if ((companyRows as RowDataPacket[]).length === 0) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    const country = (companyRows as RowDataPacket[])[0].country;
    const [countryRows] = await (await db).query('SELECT * FROM holidays WHERE country = ?', [country]);

    const [indiaRows] = await (await db).query('SELECT * FROM holidays WHERE country = ?', ['India']);

    const allHolidays = [...(countryRows as RowDataPacket[]), ...(indiaRows as RowDataPacket[])]
      .filter((holiday, index, self) => index === self.findIndex((h) => h.date === holiday.date && h.occasion === holiday.occasion));

    res.json(allHolidays);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



