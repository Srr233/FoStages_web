import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import route from './routes';
const app: Application = express();

app.use(cors());
app.use(route);
app.use('/', (req: Request, res: Response) => {
  res.status(200).send();
});

app.listen(process.env.PORT || 3000, () => console.log('started'));