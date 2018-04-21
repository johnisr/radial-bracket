import React from 'react';
import { shallow } from 'enzyme';
import { CountPage } from '../../components/CountPage';

let increment, decrement, reset, wrapper;
beforeEach(() => {
  increment = jest.fn();
  decrement = jest.fn();
  reset = jest.fn();
  wrapper = shallow(
    <CountPage 
      increment={increment}
      decrement={decrement}
      reset={reset}
      count={{ count: 2 }}
    />)


});

it('should render CountPage', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handle increment', () => {
  wrapper.find('.count__btn').at(0).simulate('click');
  expect(increment).toHaveBeenLastCalledWith(1);
});
it('should handle decrement', () => {
  wrapper.find('.count__btn').at(1).simulate('click');
  expect(decrement).toHaveBeenLastCalledWith(1);
});
it('should handle increment', () => {
  wrapper.find('.count__btn').at(2).simulate('click');
  expect(reset).toHaveBeenCalled();
});