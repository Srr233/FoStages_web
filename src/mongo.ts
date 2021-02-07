import { Collection, MongoClient } from 'mongodb';
import Person from './custom_typings/Person';
import Status from './custom_typings/Status';
import LoginPass from './custom_typings/LoginPass';

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
    };
  });
  return result;
}

const updateAcc = async (options: Person): Promise<Status> => {
  const loginExist: Person = await collectionUsers.findOne({ login: options.login });
  if (!loginExist) {
    return {
      message: 'doesn\'t exist',
      status: 400
    };
  }
  if (loginExist.pass !== options.pass) {
    return {
      message: 'there is not correct pass',
      status: 400
    }
  }
  let result: Status = {
    message: 'pending',
    status: 400
  };

  await collectionUsers.findOneAndUpdate({ login: options.login }, {$set: options}).then(() => {
    result = {
      message: 'updated',
      status: 200
    }
  }).catch((e) => {
    result = {
      message: `${e}`,
      status: 400
    }
  })
  return result;
};

const getCurrentAcc = async (options: LoginPass): Promise<Status> => {
  const acc: Person = await collectionUsers.findOne({ login: options.login, pass: options.pass });
  let result: Status = {
    message: 'pending',
    status: 400
  };
  if (acc) {
    result = {
      message: acc,
      status: 200
    }
  } else {
    result = {
      message: 'doesn\'t exist or bad pass',
      status: 400
    }
  }
  return result;
}
export { addNewUser, updateAcc, getCurrentAcc }