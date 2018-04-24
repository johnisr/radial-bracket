import React from 'react';
import RadialBracketPie from './RadialBracketPie/RadialBracketPie';
import './RadialBracket.css';

const RadialBracket = (props) => {
  // External Data Props
  const teamColours = props.teamColours;
  const teamLogos = props.teamLogos;
  const teamNames = props.teamNames;
  const fonts = props.fonts;
  const fontStyle = props.fontStyle;

  // Passing Along and not doing anything
  const teams = props.teams;
  const showWins = props.showWins;
  const showImages = props.showImages;
  const textFontStyle = props.textFontStyle;
  const winsFontStyle = props.winsFontStyle;
  const textFontFamily = props.textFontFamily;
  const winsTextFontFamily = props.winsTextFontFamily;
  
  // Props
  const svgDimensions = props.dimensions;
  const margin = props.margin;
  const bracket = props.bracket;
  const titleFontStyle = props.titleFontStyle;
  const titleFontFamily = props.titleFontFamily;
  const nameFontFamily = props.nameFontFamily;

  // Derived From Props
  const width = svgDimensions[0] - margin.left - margin.right;
  const height = svgDimensions[1] - margin.top - margin.bottom;

  let titleSize = width / 20; // 1.5em, 24px for 600px wide
  let nameSize = width / 12; // 2.5em, 40px for 600px wide
  if (titleFontStyle % 2 === 1) {
    titleSize = width / 19; // 1.5em, 24px for 600px wide
    nameSize = width / 11; // 2.5em, 40px for 600px wide
  }

  // Settings (want to eventually base of Props)
  const titleShiftY = -50;
  const nameShiftY = 0;
  const titleText = props.titleText;
  const chartLevelMargins = 5;
  const chartPadding = 10;

  const base = width / 2 - chartPadding;
  const pieSize = [ 0 ];

  // Style
  const fill = fontStyle[titleFontStyle].split(' ')[0];
  const stroke = fontStyle[titleFontStyle].split(' ')[1];
  const titleStyle = {
    fontFamily: fonts[titleFontFamily],
    fill,
    stroke,
  };
  
  const nameStyle = {
    fontFamily: fonts[nameFontFamily],
    fill,
    stroke,
  };

  const backgroundColor = props.svgBackgroundColor;
  const backgroundStyle = {
    backgroundColor,
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
        onClick={props.onClick}
        teamColours={teamColours}
        teamLogos={teamLogos}
        teamNames={teamNames}
        fonts={fonts}
        fontStyle={fontStyle}
        teams={teams}
        dimensions={svgDimensions}
        margin={margin}
        showWins={showWins}
        showImages={showImages}
        textFontStyle={textFontStyle}
        winsFontStyle={winsFontStyle}
        textFontFamily={textFontFamily}
        winsTextFontFamily={winsTextFontFamily}
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
        style={backgroundStyle}
      >
        <g
          className="origin"
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <text
            className="RadialBracket__text"
            x={width / 2}
            y={titleShiftY}
            textAnchor={'middle'}
            fontSize={titleSize}
            style={titleStyle}
          >
            {titleText}
          </text>
          <text
            className="RadialBracket__text"
            x={width / 2}
            y={nameShiftY}
            fontSize={nameSize}
            textAnchor={'middle'}
            style={nameStyle}
          >
            {props.name}
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
