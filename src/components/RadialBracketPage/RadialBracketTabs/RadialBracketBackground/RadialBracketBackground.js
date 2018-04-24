import React from 'react';
import './RadialBracketBackground.css';

const RadialBracketBackground = (props) => {

  return (
    <div className="RadialBracketBackground">
      <div>
        <button
          type="button"
          className="RadialBracketBackground__button"
          value={''}
          onClick={props.onBackgroundColorChange}
        >
          Transparent
        </button>
        <button
          type="button"
          className="RadialBracketBackground__button"
          value={'#FFFFFF'}
          onClick={props.onBackgroundColorChange}
        >
          White
        </button>
        <button
          type="button"
          className="RadialBracketBackground__button"
          value={'#000000'}
          onClick={props.onBackgroundColorChange}
        >
          Black
        </button>
      </div>
      <div className="RadialBracketBackground__colorgroup">
        <label htmlFor="color" className="RadialBracketBackground__text">
          Custom
        </label>
        <input
          className="RadialBracketBackground__color"
          name="color"
          type="color"
          value={props.svgBackgroundColor}
          onChange={props.onBackgroundColorChange}
        />
      </div>
    </div>
  );
};

export default RadialBracketBackground;