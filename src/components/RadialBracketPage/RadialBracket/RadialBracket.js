import React from 'react';
import RadialBracketPie from './RadialBracketPie/RadialBracketPie';

const RadialBracket = (props) => {
  // Props
  const svgDimensions = props.data.dimensions;
  const margin = props.data.margin;
  const teams = props.data.teams;
  const bracket = props.data.bracket;

  // Derived From Props
  const width = svgDimensions[0] - margin.left - margin.right;
  const height = svgDimensions[1] - margin.top - margin.bottom;

  const preTitleSize = width / 25; // 1.5em, 24px for 600px wide
  const titleSize = width / 15; // 2.5em, 40px for 600px wide

  // Settings (want to eventually base of Props)
  const preTitleShiftY = -40;
  const titleShiftY = 0;
  const titleText = 'NBA 2018 Playoff Predictions';
  const chartLevelMargins = 5;
  const chartPadding = 10;

  const base = width / 2 - chartPadding;
  const pieSize = [ 0 ];

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
    <svg width={svgDimensions[0]} height={svgDimensions[1]}>
      <g
        className="origin"
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <text
          className="pie__pre-title"
          x={width / 2}
          y={preTitleShiftY}
          textAnchor={'middle'}
          fontSize={preTitleSize}
        >
          {titleText}
        </text>
        <text
          className="pie__title"
          x={width / 2}
          y={titleShiftY}
          fontSize={titleSize}
          textAnchor={'middle'}
        >
          {props.data.title}
        </text>
        <g
          className="chart"
          transform={`translate(${width /2}, ${height / 2})`}
        >
          {radialBracket}
        </g>
      </g>
    </svg>
  );
};

export default RadialBracket;
