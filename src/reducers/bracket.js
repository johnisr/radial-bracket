const defaultBracketState = {
  "dimensions": [600, 700],
  "margin": { top: 100, right: 0, bottom: 0, left: 0 },
  "backgroundColorChanged" : 0,
  "bracket" : [],
  "colorChanged" : 0,
  "fontFamilyChanged" : 0,
  "fontStyleChanged" : 0,
  "name" : "",
  "nameFontFamily" : 0,
  "showWins" : false,
  "showImages": false,
  "startTime" : 0,
  "svgBackgroundColor" : "#FFFFFF",
  "teams" : [],
  "textFontFamily" : 0,
  "textFontStyle" : 0,
  "titleFontFamily" : 0,
  "titleFontStyle" : 2,
  "winsFontStyle" : 0,
  "winsTextFontFamily" : 0,
  "modal": { x:0, y:0, name: '', currentIndex: 0, otherIndex: 0 },
  "activeTeamIndex" : 0,
  "hasSubmitted" : false,

};

export default (bracketStateName = '') => {
  return (state = defaultBracketState, action) => {
    switch(action.type) {
      case `SET_BRACKET_${bracketStateName}`: {
        return {...state, bracket: action.bracket};
      }
      case `SET_TEAMS_${bracketStateName}`: {
        return {...state, teams: action.teams};
      }
      case `SET_START_TIME_${bracketStateName}`: {
        return {...state, startTime: action.startTime};
      }
      case `SET_MODAL_${bracketStateName}`: {
        return {...state, modal: action.modal};
      }
      case `SET_NAME_${bracketStateName}`: {
        return {...state, name: action.name};
      }
      case `TOGGLE_SHOW_WINS_${bracketStateName}`: {
        return {...state, showWins: !state.showWins};
      }
      case `TOGGLE_SHOW_IMAGES_${bracketStateName}`: {
        return {...state, showImages: !state.showImages};
      }
      case `SET_HAS_SUBMITTED_${bracketStateName}`: {
        return {...state, hasSubmitted: true };
      }
      case `SET_ACTIVE_TEAM_INDEX_${bracketStateName}`: {
        return {...state, activeTeamIndex: action.activeTeamIndex };
      }
      case `INCREMENT_COLOR_CHANGED_${bracketStateName}`: {
        return {...state, colorChanged: state.colorChanged + 1 };
      }
      case `SET_TITLE_FONT_FAMILY_${bracketStateName}`: {
        return {...state, titleFontFamily: action.titleFontFamily };
      }
      case `SET_NAME_FONT_FAMILY_${bracketStateName}`: {
        return {...state, nameFontFamily: action.nameFontFamily };
      }
      case `SET_TEXT_FONT_FAMILY_${bracketStateName}`: {
        return {...state, textFontFamily: action.textFontFamily };
      }
      case `SET_WINS_FONT_FAMILY_${bracketStateName}`: {
        return {...state, winsTextFontFamily: action.winsTextFontFamily };
      }
      case `INCREMENT_FONT_FAMILY_CHANGED_${bracketStateName}`: {
        return {...state, fontFamilyChanged: state.fontFamilyChanged + 1 };
      }
      case `SET_TITLE_FONT_STYLE_${bracketStateName}`: {
        return {...state, titleFontStyle: action.titleFontStyle };
      }
      case `SET_TEXT_FONT_STYLE_${bracketStateName}`: {
        return {...state, textFontStyle: action.textFontStyle };
      }
      case `SET_WINS_FONT_STYLE_${bracketStateName}`: {
        return {...state, winsFontStyle: action.winsFontStyle };
      }
      case `INCREMENT_FONT_STYLE_CHANGED_${bracketStateName}`: {
        return {...state, fontStyleChanged: state.fontStyleChanged + 1 };
      }
      case `SET_SVG_BACKGROUND_COLOR_${bracketStateName}`: {
        return {...state, svgBackgroundColor: action.svgBackgroundColor };
      }
      case `INCREMENT_BACKGROUND_COLOR_CHANGED_${bracketStateName}`: {
        return {...state, backgroundColorChanged: state.backgroundColorChanged + 1 };
      }
      default: {
        return state;
      }
    }
  }
};