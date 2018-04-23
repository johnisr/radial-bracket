import React from 'react';
import Modal from 'react-modal';
import baseBracket from '../../../data/baseBracket';
import './RadialBracketModal.css';

const RadialBracketModal = (props) => {
  const { x, y, name, index, otherIndex } = props.data;
  const isVisible = x !== 0 && y !== 0 ? true : false;

  console.log(x, y, name, index, otherIndex);
  const customStyles = {
    content : {
      top: `50%`,
      left: `50%`,
      right: 'auto',
      bottom: 'auto',
      transform: `translate(-50%, -50%)`,
    }
  };
  
  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={props.onModalClose}
      style={customStyles}
      appElement={document.getElementById('root')}
    >
      <h2 className="RadialBracketModal__title">
        {name !== null ? `${name} wins in: ` : ''}
      </h2>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, index, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 0 || baseBracket[index].wins === 4}
        value={4}
      >
        4
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, index, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 1 || baseBracket[index].wins === 4}
        value={5}
      >
        5
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, index, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 2 || baseBracket[index].wins === 4}
        value={6}
      >
        6
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, index, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 3 || baseBracket[index].wins === 4}
        value={7}
      >
        7
      </button>
    </Modal>
  );
}

export default RadialBracketModal;