import React from 'react';
import RadialBracketPie from './RadialBracketPie/RadialBracketPie';
import fonts from '../../../data/fonts';
import './RadialBracket.css';

const RadialBracket = (props) => {
  // Props
  const svgDimensions = props.data.dimensions;
  const margin = props.data.margin;
  const bracket = props.data.bracket;

  // Derived From Props
  const width = svgDimensions[0] - margin.left - margin.right;
  const height = svgDimensions[1] - margin.top - margin.bottom;

  const titleSize = width / 25; // 1.5em, 24px for 600px wide
  const nameSize = width / 15; // 2.5em, 40px for 600px wide

  // Settings (want to eventually base of Props)
  const titleShiftY = -40;
  const nameShiftY = 0;
  const titleText = 'NBA 2018 Playoff Predictions';
  const chartLevelMargins = 5;
  const chartPadding = 10;

  const base = width / 2 - chartPadding;
  const pieSize = [ 0 ];

  // Style
  const titleStyle = {
    fontFamily: fonts[props.data.titleFontFamily],
  };
  
  const nameStyle = {
    fontFamily: fonts[props.data.nameFontFamily],
  };

  // Divides SVG into equal width pies
  for (let i = 0; i < Math.log2(bracket.length); i++) {
    pieSize.push(base / Math.log2(bracket.length) * (i + 1));
  }

  const radialBracket = [];

  for (let i = 0; i < Math.log2(bracket.length); i++) {
    radialBracket.push(
      <RadialBracketPie
        key={`BracketPie--${i}`}
        outer={pieSize[i+1] - chartLevelMargins}
        inner={pieSize[i]}
        round={bracket.slice(Math.pow(2, i), Math.pow(2, i+1))} 
        data={props.data}
        onClick={props.onClick}
      />)
  };

  return (
    <div className="RadialBracket">
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        className="RadialBracket__svg"
        viewBox={`0 0 ${svgDimensions[0]} ${svgDimensions[1]}`}
        preserveAspectRatio={'xMidYMid meet'}
        id="svg"
      >
        <g
          className="origin"
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <text
            className="pie__pre-title"
            x={width / 2}
            y={titleShiftY}
            textAnchor={'middle'}
            fontSize={titleSize}
            style={titleStyle}
          >
            {titleText}
          </text>
          <text
            className="pie__title"
            x={width / 2}
            y={nameShiftY}
            fontSize={nameSize}
            textAnchor={'middle'}
            style={nameStyle}
          >
            {props.data.name}
          </text>
          <g
            className="chart"
            transform={`translate(${width /2}, ${height / 2})`}
          >
            {radialBracket}
          </g>
        </g>
      </svg>

    </div>
  );
};

export default RadialBracket;
