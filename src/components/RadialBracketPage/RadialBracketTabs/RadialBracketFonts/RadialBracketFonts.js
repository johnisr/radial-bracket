import React from 'react';
import fonts from '../../../../data/fonts';
import './RadialBracketFonts.css';

const RadialBracketFonts = (props) => {

  const textTypes = [
    'Title',
    'Name',
    'Teams',
    'Wins',
  ];
  return (
    <div className="RadialBracketFonts">
      {
        textTypes.map((textType) => (
          <section
            key={`${textType}`}
            className="RadialBracketFonts__section"
          >
            {textType}
            <div className="RadialBracketFonts__options">
              {
                fonts.map((font, i) => (
                  <div
                    className="RadialBracketFonts__option"
                    key={`${textType}__${font}`}
                    style={ { fontFamily: font } }
                    onClick={() => props.onFontChange(textType, i)}
                  >
                    {textType === 'Wins' && i }
                    {textType === 'Teams' && 'TEAM' }
                    {textType === 'Name' && 'Name'}
                    {textType === 'Title' && 'Title'}
                  </div>
                ))
              }
            </div>
          </section>
        ))
      }
    </div>
  );
};

export default RadialBracketFonts;