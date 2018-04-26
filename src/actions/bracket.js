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
  console.log(data);
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

export const setBracket = (bracket, bracketStateFor) => {
  return {
    type: `SET_BRACKET_${bracketStateFor}`,
    bracket,
  };
} 

export const setTeams = (teams, bracketStateFor) => ({
  type: `SET_TEAMS_${bracketStateFor}`,
  teams,
});

export const setStartTime = (startTime, bracketStateFor) => ({
  type: `SET_START_TIME_${bracketStateFor}`,
  startTime,
})

export const setModal = (modal, bracketStateFor) => ({
  type: `SET_MODAL_${bracketStateFor}`,
  modal,
})

export const setName = (name, bracketStateFor) => ({
  type: `SET_NAME_${bracketStateFor}`,
  name,
})

export const toggleShowWins = (bracketStateFor) => ({
  type: `TOGGLE_SHOW_WINS_${bracketStateFor}`,
})
export const toggleShowImages = (bracketStateFor) => ({
  type: `TOGGLE_SHOW_IMAGES_${bracketStateFor}`,
})

export const setHasSubmitted = (bracketStateFor) => ({
  type: `SET_HAS_SUBMITTED_${bracketStateFor}`,
})

export const setActiveTeamIndex = (activeTeamIndex, bracketStateFor) => ({
  type: `SET_ACTIVE_TEAM_INDEX_${bracketStateFor}`,
  activeTeamIndex,
})

export const incrementColorChanged = (bracketStateFor) => ({
  type: `INCREMENT_COLOR_CHANGED_${bracketStateFor}`,
})
export const setTitleFontFamily = (titleFontFamily, bracketStateFor) => ({
  type: `SET_TITLE_FONT_FAMILY_${bracketStateFor}`,
  titleFontFamily,
})
export const setNameFontFamily = (nameFontFamily, bracketStateFor) => ({
  type: `SET_NAME_FONT_FAMILY_${bracketStateFor}`,
  nameFontFamily,
})
export const setTextFontFamily = (textFontFamily, bracketStateFor) => ({
  type: `SET_TEXT_FONT_FAMILY_${bracketStateFor}`,
  textFontFamily,
})
export const setWinsTextFontFamily = (winsTextFontFamily, bracketStateFor) => ({
  type: `SET_WINS_FONT_FAMILY_${bracketStateFor}`,
  winsTextFontFamily,
})
export const incrementFontFamilyChanged = (bracketStateFor) => ({
  type: `INCREMENT_FONT_FAMILY_CHANGED_${bracketStateFor}`,
})
export const setTitleFontStyle = (titleFontStyle, bracketStateFor) => ({
  type: `SET_TITLE_FONT_STYLE_${bracketStateFor}`,
  titleFontStyle,
})
export const setTextFontStyle = (textFontStyle, bracketStateFor) => ({
  type: `SET_TEXT_FONT_STYLE_${bracketStateFor}`,
  textFontStyle,
})
export const setWinsFontStyle = (winsFontStyle, bracketStateFor) => ({
  type: `SET_WINS_FONT_STYLE_${bracketStateFor}`,
  winsFontStyle,
})
export const incrementFontStyleChanged = (bracketStateFor) => ({
  type: `INCREMENT_FONT_STYLE_CHANGED_${bracketStateFor}`,
})
export const setSvgBackgroundColor = (svgBackgroundColor, bracketStateFor) => ({
  type: `SET_SVG_BACKGROUND_COLOR_${bracketStateFor}`,
  svgBackgroundColor,
})
export const incrementBackgroundColorChanged = (bracketStateFor) => ({
  type: `INCREMENT_BACKGROUND_COLOR_CHANGED_${bracketStateFor}`,
})