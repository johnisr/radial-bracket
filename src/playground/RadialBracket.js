import React from 'react';
import './RadialBracket.css';
import RadialBracketPie from './RadialBracketPie';

class RadialBracket extends React.Component {

  render() {
    const dimensions = this.props.dimensions;
    const margin = this.props.margin;
    const showWins = this.props.showWins;
    const showImages = this.props.showImages;
    const teams = this.props.teams;
    const bracket = this.props.bracket;
    
    // DERIVED STATE
    const width = dimensions[0] - margin.left - margin.right;
    const height = dimensions[1] - margin.top - margin.bottom;

    const preTitleSize = width / 25; // 1.5em, 24px for 600px wide
    const titleSize = width / 15; // 2.5em, 40px for 600px wide

    const preTitleShiftY = -40;
    const titleShiftY = 0;
    const titleText = 'NBA 2018 Playoff Predictions';

    const chartLevelMargins = 5;
    const chartPadding = 10; 
    const inChartMarginAngle = 0.02;
    const marginAngleLeveller = (level) => level * (inChartMarginAngle / 10);
    const textY = '.37em';
    const textFontSize = (level) => {
      if (showWins && level > 3) {
        return width / 24;
      }
      return width / 18.75 + (3 * (5 - level));
    };
    const winsTextFontSize = (level) => width / 18.75 + (3 * (5 - level));
    const imageMargin = 10;
    const centerImageMultiplier = 1.5;
    const centerImageShiftY = width / 24;

    const base = width / 2 - chartPadding;
    const pieSize = [ 0 ];

    // Divides space into equal width pies, depending on bracket length
    for (let i = 0; i < Math.log2(bracket.length); i++) {
      pieSize.push(base / Math.log2(bracket.length) * (i+1))
    }
    
    let radialBracket = [];
    
    for (let i = 0; i < Math.log2(bracket.length); i++) {
      radialBracket.push(
        <RadialBracketPie 
          outer={pieSize[i+1] - chartLevelMargins}
          inner={pieSize[i]}
          round={bracket.slice(Math.pow(2, i), Math.pow(2, i+1))}
          onClick={this.props.onClick}
        />)
    };
    console.log('Rerendering Radial Bracket');
    return (
      <div>
        <svg width={dimensions[0]} height={dimensions[1]}>
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
};

export default RadialBracket;