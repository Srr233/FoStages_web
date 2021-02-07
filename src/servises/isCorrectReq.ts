import defaultAcc from './defaultAcc';
import AnyObj from '../custom_typings/AnyObj';
const isCorrectObject = (checkObj: AnyObj, goodObj: AnyObj): boolean => {
  const arrKeysHaveToBe = Object.keys(goodObj);
  const arrKeysHave = Object.keys(checkObj);

  if (arrKeysHave.length !== arrKeysHaveToBe.length) return false;
  const isEveryCorrect = arrKeysHaveToBe.every((item) => typeof checkObj[item] === typeof goodObj[item]);
  
  if (!isEveryCorrect) return false;
  return true;
}
const isCorrectUserBody = (body: AnyObj): boolean => {
  if (!isCorrectObject(body, defaultAcc)) return false;
  if (!isCorrectObject(body.profile, defaultAcc.profile)) return false;
  return true;
}

export default isCorrectUserBody;