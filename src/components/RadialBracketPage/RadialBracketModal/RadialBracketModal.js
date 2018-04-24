import React from 'react';
import Modal from 'react-modal';
import './RadialBracketModal.css';

const RadialBracketModal = (props) => {
  const { x, y, name, currentIndex, otherIndex } = props.modal;
  const isVisible = x !== 0 && y !== 0 ? true : false;
  
  const baseBracket = props.baseBracket;

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
        onClick={(e) => props.onModalClose(e, currentIndex, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 0 || baseBracket[currentIndex].wins === 4}
        value={4}
      >
        4
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, currentIndex, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 1 || baseBracket[currentIndex].wins === 4}
        value={5}
      >
        5
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, currentIndex, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 2 || baseBracket[currentIndex].wins === 4}
        value={6}
      >
        6
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, currentIndex, otherIndex)}
        disabled={baseBracket[otherIndex].wins > 3 || baseBracket[currentIndex].wins === 4}
        value={7}
      >
        7
      </button>
    </Modal>
  );
}

export default RadialBracketModal;