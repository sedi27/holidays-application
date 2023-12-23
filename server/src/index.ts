import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import holidayRouter from './routes/holidays';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.use('/holidays', holidayRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
