import { Collection, MongoClient } from 'mongodb';
import { Person } from './custom_typings/Person';

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

const addNewUser = async (options: Person): Promise<boolean> => {
  let result = false;
  await collectionUsers.insertOne(options).then(() => {
    result = true;
  }).catch(() => {result = false});
  return result;
}

export { addNewUser }