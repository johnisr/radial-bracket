export default (bracketStateName = '') => {
  return (state = [], action) => {
    switch(action.type) {
      case `SET_BRACKET_DATA_${bracketStateName}`: {
        return action.data;
      }
      default: {
        return state;
      }
    }
  }
};