export const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

export const decrementCount = (({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
}));

export const setCount = (({ count = 0 } = {}) => ({
  type: 'SET',
  count,
}));

// const resetCount = setCount;

export const resetCount = () => ({
  type: 'RESET',
});