import React from 'react';
import './RadialBracketInput.css';

const RadialBracketInput = (props) => {

  return (
    <div className="RadialBracketInput">
      {/* <button
        type="button"
        onClick={props.onResetClick}
        className="RadialBracketInput__button"
      >
        Reset Bracket
      </button> */}
      <div className="RadialBracketInput__toggleGroup">
        <button
          type="button"
          onClick={props.onShowWinsClick}
          className="RadialBracketInput__button"
        >
          {props.showWins ? 'Hide Wins' : 'Show Wins'} 
        </button>
        <button
          type="button"
          onClick={props.onShowImagesClick}
          className="RadialBracketInput__button"
        >
          {props.showImages ? 'Show Text' : 'Show Logos'} 
        </button>
      </div>
      <div className="RadialBracketInput__submitGroup">
        <input 
          type="text"
          placeholder="Type Username here"
          value={props.title}
          onChange={props.onNameChange}
          className="RadialBracketInput__input"
        />
        <button
          type="button"
          onClick={props.onSubmit}
          disabled={props.isSubmitDisabled}
          className="RadialBracketInput__button RadialBracketInput__button--primary"
        >
          Submit 
        </button>
      </div>
    </div>
  );
};

export default RadialBracketInput;