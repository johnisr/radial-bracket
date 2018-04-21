import React from 'react';
import { arc, pie } from 'd3-shape';
import nbaColours from '../../../../data/nbaColours';

const RadialBracketPie = (props) => {
  // Props
  const outer = props.outer;
  const inner = props.inner;
  const round = props.round;
  const dimensions = props.data.dimensions;
  const margin = props.data.margin;

  // Derived From Props
  const level = Math.log2(round.length);
  const width = dimensions[0] - margin.left - margin.right;

  // Settings (want to eventually base of Props)
  // Path Settings
  const inChartMarginAngle = 0.02;
  const marginAngleLeveller = (level) => level * (inChartMarginAngle / 10);

  // Functions to calculate SVGs
  // Path Functions
  const getPathColor = (d, i) => {
    const team = d.data.team;
      if (team.name === '') {
        return i % 2 === 0 ? 'lightgray' : 'darkgray';
      }
      return nbaColours[team.name][team.color].color;
  }

  const getPiePath = (d, i, round) => {
    if (round.length <= 2) return path(d);
    if (i % 2 === 0) {
      d.startAngle = d.startAngle + inChartMarginAngle - marginAngleLeveller(level);
    }
    if (i % 2 !== 0) {
      d.endAngle = d.endAngle - inChartMarginAngle + marginAngleLeveller(level);
    }
    return path(d);
  }

  //Data Setup
  const arcs = pie().value(1)(round);
  const path = arc().outerRadius(outer).innerRadius(inner);

  const bracketPie = arcs.map((d, i, round) => {
    //Path
    const color = getPathColor(d, i);
    const path = getPiePath(d, i, round);

    const pathSvg = (
      <path 
          key={`arc_${level}--${i}`}
          className={`arc_${level}`}
          stroke={'transparent'}
          fill={color}
          d={path}
        ></path>
    );

    return (
      <g
        key={`group__${level}--${i}`}
        onClick={(e) => console.log('hello')}
      >
        { [pathSvg] }
      </g>
  );
  })

  return (
    [bracketPie]
  );
};

export default RadialBracketPie;