import moment from 'moment';
import database from '../firebase/firebase';

export const startSubmitNBABracket = async (state = {}) => {
  const {
    showWins = false,
    titleFontFamily =  0,
    nameFontFamily =  0,
    textFontFamily =  0,
    winsTextFontFamily =  0,
    fontFamilyChanged =  0,
    colorChanged =  0,
    teams = [],
    bracket = [],
    name = ''
  } = state;
  const createdAt = moment().valueOf();
  const data = {
    name,
    teams,
    bracket,
    showWins,
    createdAt,
    titleFontFamily,
    nameFontFamily,
    textFontFamily,
    winsTextFontFamily,
    fontFamilyChanged,
    colorChanged,
  };
  try {
    await database.ref(`2018/nba`).push(data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};