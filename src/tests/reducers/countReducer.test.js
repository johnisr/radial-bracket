import countReducer from '../../reducers/countReducer';

it('should set default state', () => {
  const state = countReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({ count: 0 });
});
it('should increment count', () => {
  const action = {
    type: 'INCREMENT',
    incrementBy: 1,
  }
  const state = countReducer({ count: 0 }, action);
  expect(state).toEqual({ count: 1 });
});