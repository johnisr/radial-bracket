import React from 'react';

const RadialBracketInput = (props) => {

  return (
    <div>
      <input 
        type="text"
        placeholder="Type Username here"
        value={props.title}
        onChange={props.onTitleChange}
      />
      <button
        type="button"
        onClick={props.onResetClick}
      >
        Reset Bracket
      </button>
      <button
        type="button"
        onClick={props.onShowWinsClick}
      >
        {props.showWins ? 'Hide Wins' : 'Show Wins'} 
      </button>
      <button
        type="button"
        onClick={props.onShowImagesClick}
      >
        {props.showImages ? 'Hide Logos' : 'Show Logos'} 
      </button>
      <button
        type="button"
        onClick={props.onSubmit}
      >
        Submit 
      </button>
    </div>
  );
};

export default RadialBracketInput;