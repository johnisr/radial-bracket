import { incrementCount, decrementCount, setCount, resetCount } from '../../actions/count';


describe('incrementCount', () => {
  it('should default incrementBy 1', () => {
    const action = incrementCount();
    expect(action).toEqual({
      type: 'INCREMENT',
      incrementBy: 1,
    });
  });

  it('should set incrementBy when given', () => {
    const action = incrementCount({ incrementBy: 5});
    expect(action).toEqual({
      type: 'INCREMENT',
      incrementBy: 5,
    });
  });
});
it('should default decrementBy 1', () => {
  const action = decrementCount();
  expect(action).toEqual({
    type: 'DECREMENT',
    decrementBy: 1,
  });
});it('should default setCount to 0', () => {
  const action = setCount();
  expect(action).toEqual({
    type: 'SET',
    count: 0,
  });
});it('should reset count to 0', () => {
  const action = resetCount();
  expect(action).toEqual({
    type: 'RESET',
  });
});