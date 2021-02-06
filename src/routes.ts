import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';

const jsonParset = bodyParser.json();
const route: Router = express.Router();

route.post('/getAllAcc', jsonParset, (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ body: 'getAllAcc' })
});
route.post('/newAcc', jsonParset, (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ body: 'newAcc' })
});
route.post('/getCurrentAcc', jsonParset, (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ body: 'getCurrentAcc' })
});
route.post('/updateAcc', jsonParset, (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ body: 'updateAcc' })
});

export default route;