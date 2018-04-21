import React from 'react';
import { connect } from 'react-redux';

import { incrementCount, decrementCount, resetCount } from '../actions/count';

export class CountPage extends React.Component {
  handleIncrement = () => {
    this.props.increment(1);
  }
  handleDecrement = () => {
    this.props.decrement(1);
  }
  handleReset = () => {
    this.props.reset();
  }
  render() {
    return (
      <div className={'count'}>
        <h1 className={'heading-1 margin-bottom-large'}>Count: {this.props.count.count}</h1>
        <button className={'count__btn'} onClick={this.handleIncrement}>+</button>
        <button className={'count__btn'} onClick={this.handleDecrement}>-</button>
        <button className={'count__btn'} onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  increment: (number) => dispatch(incrementCount({incrementBy: number})),
  decrement: (number) => dispatch(decrementCount({decrementBy: number})),
  reset: () => dispatch(resetCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountPage);

