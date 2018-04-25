import moment from 'moment';
import database from '../firebase/firebase';

export const startSubmitNBABracket = async (state = {}) => {
  const {
    showWins = false,
    showImages= false,
    titleFontFamily =  0,
    nameFontFamily =  0,
    textFontFamily =  0,
    winsTextFontFamily =  0,
    fontFamilyChanged =  0,
    colorChanged =  0,
    titleFontStyle = 2,
    textFontStyle = 0,
    winsFontStyle = 0,
    fontStyleChanged = 0,
    startTime = 0,
    teams = [],
    bracket = [],
    name = '',
    svgBackgroundColor = '',
    backgroundColorChanged = 0,
  } = state;
  const createdAt = moment().valueOf();
  const data = {
    name,
    teams,
    bracket,
    showWins,
    showImages,
    createdAt,
    titleFontFamily,
    nameFontFamily,
    textFontFamily,
    winsTextFontFamily,
    fontFamilyChanged,
    colorChanged,
    titleFontStyle,
    textFontStyle,
    winsFontStyle,
    fontStyleChanged,
    startTime,
    svgBackgroundColor,
    backgroundColorChanged,
  };

  try {
    await database.ref(`2018/nba`).push(data);
  } catch(e) {
    throw Error(e);
  }
};

export const startSubmitNHLBracket = async (state = {}) => {
  const {
    showWins = false,
    showImages = false,
    titleFontFamily =  0,
    nameFontFamily =  0,
    textFontFamily =  0,
    winsTextFontFamily =  0,
    fontFamilyChanged =  0,
    colorChanged =  0,
    titleFontStyle = 2,
    textFontStyle = 0,
    winsFontStyle = 0,
    fontStyleChanged = 0,
    startTime = 0,
    teams = [],
    bracket = [],
    name = '',
    svgBackgroundColor = '',
    backgroundColorChanged = 0,
  } = state;
  const createdAt = moment().valueOf();
  const data = {
    name,
    teams,
    bracket,
    showWins,
    showImages,
    createdAt,
    titleFontFamily,
    nameFontFamily,
    textFontFamily,
    winsTextFontFamily,
    fontFamilyChanged,
    colorChanged,
    titleFontStyle,
    textFontStyle,
    winsFontStyle,
    fontStyleChanged,
    startTime,
    svgBackgroundColor,
    backgroundColorChanged,
  };

  try {
    await database.ref(`2018/nhl`).push(data);
  } catch(e) {
    throw Error(e);
  }
};