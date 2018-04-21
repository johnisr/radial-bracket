import React from 'react';
import Modal from 'react-modal';
import './RadialBracketModal.css';

const RadialBracketModal = (props) => {
  const { x, y, width, name, index, otherIndex } = props.data;
  const isVisible = x !== 0 && y !== 0 ? true : false;

  const customStyles = {
    content : {
      top: `${y}px`,
      left: `${x}px`,
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
        value={4}
      >
        4
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, index, otherIndex)}
        value={5}
      >
        5
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, index, otherIndex)}
        value={6}
      >
        6
      </button>
      <button
        className="RadialBracketModal__button"
        onClick={(e) => props.onModalClose(e, index, otherIndex)}
        value={7}
      >
        7
      </button>
    </Modal>
  );
}

export default RadialBracketModal;