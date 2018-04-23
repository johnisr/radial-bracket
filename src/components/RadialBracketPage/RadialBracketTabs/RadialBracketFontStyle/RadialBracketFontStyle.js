import React from 'react';
import fontStyles from '../../../../data/fontStyle';
import './RadialBracketFontStyle.css';

const RadialBracketFontStyle = (props) => {

  const textTypes = [
    'Title',
    'Teams',
    'Wins',
  ];
  return (
    <div className="RadialBracketFontStyle">
      {
        textTypes.map((textType) => (
          <section
            key={`${textType}`}
            className="RadialBracketFontStyle__section"
          >
            {textType}
            <div className="RadialBracketFontStyle__options">
              {
                fontStyles.map((fontStyle, i) => (
                  <div
                    className="RadialBracketFontStyle__option"
                    key={`${textType}__${fontStyle}`}
                    style={{ 
                      color: fontStyle.split(' ')[0],
                      textShadow: `
                        -1px -1px 0 ${fontStyle.split(' ')[1]},
                        1px -1px 0 ${fontStyle.split(' ')[1]},
                        -1px 1px 0 ${fontStyle.split(' ')[1]},
                        1px 1px 0 ${fontStyle.split(' ')[1]}
                        `
                    }}
                    onClick={() => props.onFontStyleChange(textType, i)}
                  >
                    {textType === 'Wins' && i }
                    {textType === 'Teams' && 'TEAM' }
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

export default RadialBracketFontStyle;