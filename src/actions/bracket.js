import moment from 'moment';
import database from '../firebase/firebase';

export const startSubmitBracket = async (state = {}) => {
  const {
    showWins = false,
    showImages = false,
    teams = [],
    bracket = [],
    name = ''
  } = state;
  const createdAt = moment().valueOf();
  const data = {name, teams, bracket, showWins, showImages, createdAt };
  console.log(data);
  try {
    await database.ref(`2018/nba`).push(data);
  } catch (e) {
    console.log(e);
    return false;
  }
};