import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { addNewUser } from './mongo';
import { Person } from './custom_typings/Person';


const jsonParset = bodyParser.json();
const route: Router = express.Router();

route.post('/getAllAcc', jsonParset, (req: Request, res: Response) => {
  console.log(req.body)
  res.status(200).json({ body: 'getAllAcc' })
});
route.post('/newAcc', jsonParset, async (req: Request, res: Response): Promise<void> => {
  const newUser: Person = {
    login: 'Dada',
    pass: '219Gs0vj',
    profile: {
      words: ['understand', 'field', 'work']
    }
  };
  const result = await addNewUser(newUser);
  console.log(result);
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