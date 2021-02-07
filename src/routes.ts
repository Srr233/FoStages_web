import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { addNewUser } from './mongo';
import Status from './custom_typings/Status';
import isCorrectUserBody from './servises/isCorrectReq';


const jsonParset = bodyParser.json();
const route: Router = express.Router();

route.post('/getAllAcc', jsonParset, (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ body: 'getAllAcc' })
});
route.post('/newAcc', jsonParset, async (req: Request, res: Response): Promise<void> => {
  const isCorrect = isCorrectUserBody(req.body);
  if (typeof isCorrect === 'object') {
    res.status(400).json(isCorrect);
  } else {
    const result: Status = await addNewUser(req.body);
    res.status(result.status).json(result.message);
  }
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