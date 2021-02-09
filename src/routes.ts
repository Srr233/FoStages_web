import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { addNewUser, updateAcc, getCurrentAcc } from './mongo';
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
    res.status(result.status).json({ errorIn: result.message });
  }
});
route.post('/getCurrentAcc', jsonParset, async (req: Request, res: Response) => {
  const { login, pass } = req.body;
  if (login && pass) {
    const loginPass = {
      login,
      pass
    };
    const result = await getCurrentAcc(loginPass);
    if (result.message instanceof Object) {
      res.status(result.status).json(result.message);
    } else {
      res.status(result.status).json({ errorIn: result.message});
    }
  } else {
    res.status(400).json({ errorIn: 'login or pass doesn\'t exist or has bad value' });
  }
});
route.post('/updateAcc', jsonParset, async (req: Request, res: Response) => {
  const isCorrect = isCorrectUserBody(req.body);
  if (typeof isCorrect === 'object') {
    res.status(400).json(isCorrect);
  } else {
    const result: Status = await updateAcc(req.body);
    res.status(result.status).json({ errorIn: result.message });
  }
});

export default route;