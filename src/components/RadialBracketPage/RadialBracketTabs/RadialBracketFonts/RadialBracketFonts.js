import React from 'react';
import './RadialBracketFonts.css';

const RadialBracketFonts = (props) => {

  const fonts = props.fonts;
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
            <p className="RadialBracketFonts__text">{textType}</p>
            <div className="RadialBracketFonts__options">
              {
                fonts.map((font, i) => (
                  <div
                    className="RadialBracketFonts__option"
                    key={`${textType}__${font}`}
                    style={ { fontFamily: font } }
                    onClick={() => props.onFontChange(textType, i)}
                  >
                    {
                      textType === 'Wins' &&
                      <p className="RadialBracketFonts__text">{i}</p>
                    }
                    {
                      textType === 'Teams' &&
                      <p className="RadialBracketFonts__text">TEAM</p>
                    }
                    {
                      textType === 'Name' &&
                      <p className="RadialBracketFonts__text">Name</p>
                    }
                    {
                      textType === 'Title' &&
                      <p className="RadialBracketFonts__text">Title</p>
                    }
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