import database from '../firebase/firebase';

export const setBracketData = (data, bracketStateFor) => ({
  type: `SET_BRACKET_DATA_${bracketStateFor}`,
  data,
});

export const startSetBracketData = (bracketStateFor) => {
  return async (dispatch, getState) => {
    try {

      const snapshot = await database.ref(`2018/${bracketStateFor}`).once('value');
      const data = [];
      snapshot.forEach((datum) => {
        data.push(datum.val());
      });
      console.log(data);
      dispatch(setBracketData(data, bracketStateFor));
    } catch (e) {
      console.log(e);
    }
  }
}