import defaultAcc from './defaultAcc';
import AnyObj from '../custom_typings/AnyObj';
import ResProblem from '../custom_typings/ResProblem';

const isCorrectObject = (checkObj: AnyObj, goodObj: AnyObj, property?: string): boolean | ResProblem => {
  const arrKeysHaveToBe = Object.keys(goodObj);
  const arrKeysHave = Object.keys(checkObj);
  if (arrKeysHave.length !== arrKeysHaveToBe.length) {
    if (property) {
      return {
        errorIn: `Property "${property}" needs to have ${arrKeysHaveToBe.length} length, but has ${arrKeysHave.length} length`
      };
    } else {
      return {
        errorIn: `Body needs to have ${arrKeysHaveToBe.length} length, but has ${arrKeysHave.length} length`
      };
    }
  }
  let result: ResProblem | undefined;
  arrKeysHaveToBe.every((item) => {
    if (checkObj[item]) {
      if (typeof checkObj[item] !== typeof goodObj[item]) {
        const typeValue = typeof goodObj[item] !== 'object' ? typeof goodObj[item] 
        : Array.isArray(goodObj[item]) ? 'array' : 'object'; 
        result = {
          errorIn: `Property "${item}" has not correct value, value need to be "${typeValue}" type`
        };
        return false
      }
      return true;
    } else {
      console.log(item);
      result = {
        errorIn: `Property "${item}" doesn't exist in request body`
      };
      return false;
    }
  });
  return result || true;
}
const isCorrectUserBody = (body: AnyObj): boolean | ResProblem => {
  let result: boolean | ResProblem = isCorrectObject(body, defaultAcc);
  if (result !== true) {
    return result;
  }
  result = isCorrectObject(body.profile, defaultAcc.profile, 'profile');
  console.log(result);
  if (result !== true) {
    return result;
  }
  return result;
}

export default isCorrectUserBody;