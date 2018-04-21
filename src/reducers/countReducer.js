export default (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + action.incrementBy,
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - action.decrementBy,
      };
    }
    case 'SET': {
      return {
        count: action.count,
      };
    }
    case 'RESET':
      return {
        count: 0,
      };
    default:
      return state;
  }
};