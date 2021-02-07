import { Collection, MongoClient } from 'mongodb';
import Person from './custom_typings/Person';
import Status from './custom_typings/Status'

const url = 'mongodb+srv://Sulti:ZShvhyNIi3RGuePs@persons.bpytq.mongodb.net/fostagesdb?retryWrites=true&w=majority';
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const client = new MongoClient(url, connectionParams);

let collectionUsers: Collection;
client.connect().then(() => {
  const db = client.db('FoStagesDB');
  collectionUsers = db.collection('users');
}).catch((e: Error) => {throw e});


const addNewUser = async (options: Person): Promise<Status> => {
  const loginExist = await collectionUsers.findOne({login: options.login});
  if (loginExist) return {
    message: 'exist',
    status: 400
  };
  let result: Status = {
    message: 'pending',
    status: 400
  };
  await collectionUsers.insertOne(options).then(() => {
    result = {
      message: 'created',
      status: 200
    };
  }).catch((e) => {
    result = {
      message: `${e}`,
      status: 400
    }
  });
  return result;
}

export { addNewUser }