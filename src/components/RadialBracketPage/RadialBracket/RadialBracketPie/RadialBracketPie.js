import React from 'react';
import { arc, pie } from 'd3-shape';
import nbaColours from '../../../../data/nbaColours';
import nbaLogos from '../../../../data/nbaLogos';

const RadialBracketPie = (props) => {
  // Props
  const outer = props.outer;
  const inner = props.inner;
  const round = props.round;
  const dimensions = props.data.dimensions;
  const margin = props.data.margin;
  const showImages = props.data.showImages;

  // Derived From Props
  const level = Math.log2(round.length);
  const width = dimensions[0] - margin.left - margin.right;

  // Settings (want to eventually base of Props) -------------------------
  // Path Settings
  const inChartMarginAngle = 0.02;
  const marginAngleLeveller = (level) => level * (inChartMarginAngle / 10);

  //Text Settings
  const textY = '.37em';

  // Image Settings
  const imageMargin = 10;
  const centerImageMultiplier = 1.5;
  const centerImageShiftY = width / 24;
  const imageHeight = level !== 0 ? outer - inner - imageMargin : (outer - inner) * centerImageMultiplier;
  const imageWidth = level !== 0 ? outer - inner - imageMargin : (outer - inner) * centerImageMultiplier;

  // Functions to calculate SVGs -----------------------------------------
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

  // Text Functions
  const getTextTransform = (d, i, round) => {
    const level = Math.log2(round.length);
    let angle = ((d.startAngle + d.endAngle) / 2) * 180 / Math.PI;
    if (angle > 90 && angle < 270) angle = angle + 180;
    return level !== 0 ? `translate(${path.centroid(d)}) rotate(${angle})` : null;
  }

  const  getTextFontSize = () => {
    return width / 18.75 + (3 * (5 - level));
  };

  // Image Functions
  const getImageTransform = (d, i, round) => {
    if (level === 0) {
      const translation = path.centroid(d);
      return `translate(${translation[0]}, ${translation[1] - centerImageShiftY})`;
    }
    return `translate(${path.centroid(d)})`;
  }

  //Data Setup
  const arcs = pie().value(1)(round);
  const path = arc().outerRadius(outer).innerRadius(inner);

  const bracketPie = arcs.map((d, i, round) => {
    //Path SVG
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

    // Text SVG
    const textTransform = getTextTransform(d, i, round);
    const textFontSize = getTextFontSize();

    const textSvg = (
      <text
        key={`text__${level}--${i}`}
        className={`RadialBracketPie__text`}
        transform={textTransform}
        dy={textY}
        textAnchor={'middle'}
        fontSize={textFontSize}
        fill={'white'}
      >
        {d.data.team.name ? d.data.team.name : null }
      </text>
    );

     // Image SVG
     const imageTransform = getImageTransform(d, i, round)
     const imageLink = d.data.team.name !== '' ? nbaLogos[d.data.team.name][d.data.team.logo] : '#';
     const imageSvg = (
       <image
         key={`image__${level}--${i}`}
         href={imageLink}
         height={imageHeight}
         width={imageWidth}
         x={-imageWidth / 2}
         y={-imageHeight / 2}
         transform={imageTransform}
       ></image>
     );

    return (
      <g
        key={`group__${level}--${i}`}
        onClick={e => props.onClick(e, d, level)}
      >
        { showImages ? [pathSvg, imageSvg] : [pathSvg, textSvg] }
      </g>
  );
  })

  return (
    [bracketPie]
  );
};

export default RadialBracketPie;