import React from 'react';
import { arc, pie } from 'd3-shape';
import nbaColours from '../../../../data/nbaColours';
import nbaLogos from '../../../../data/nbaLogos';
import './RadialBracketPie.css';

const RadialBracketPie = (props) => {
  // Props
  const outer = props.outer;
  const inner = props.inner;
  const round = props.round;
  const teams = props.data.teams;
  const dimensions = props.data.dimensions;
  const margin = props.data.margin;
  const showImages = props.data.showImages;
  const showWins = props.data.showWins;

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
      if (d.data.teamIndex === -1) {
        return i % 2 === 0 ? 'lightgray' : 'darkgray';
      }
      const team = teams[d.data.teamIndex];
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
    if (showWins && level > 3) {
      return width / 24;
    }
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

  // winsPath Functions
  const getPathId = (d, i) => (
    `winsPath__${level}--${i}`
  );
  const getWinsPath = (d) => {
    if (level < 3) return path;
    const firstArcRegex = /(^.+?)L/;
    let newArc = firstArcRegex.exec(path(d))[1];
    newArc = newArc.replace(/,/g, ' ');

    if (d.endAngle >= 90 * Math.PI/180 && d.endAngle < 270 * Math.PI/180) {
      const startLoc = /M(.*?)A/;
      //Everything between the capital A and 0 0 1
      let middleLoc = /A(.*?)0 0 1/;
      
      //Everything between the 0 0 1 and the end of the string (denoted by $)
      let endLoc = /0 0 1 (.*?)$/;
    
      //Flip the direction of the arc by switching the start and end point
      //and using a 0 (instead of 1) sweep flag
      if (endLoc.exec(newArc) === null) {
        endLoc = /0 1 1(.*?)$/;
        middleLoc = /A(.*?)0 1 1/;
      }
      const newStart = endLoc.exec( newArc )[1];
      const newEnd = startLoc.exec( newArc )[1];
      const middleSec = middleLoc.exec( newArc )[1];

      //Build up the new arc notation, set the sweep-flag to 0
      newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
    }
    return newArc;
  };

  // winsText Functions
  const getWinsTextFontSize = (level) => (
    width / 18.75 + (3 * (5 - level))
  );

  const getWinsTextShiftY = (d, i) => {
    if (level === 0) return; // don't display this
    if (level === 1) {
      return `${outer - inner + 45}`;
    }
    if (level === 2) {
      if (i === 0 || i === 3) {
        return `${outer - inner - 60}`;
      }
      if (i === 1 || i === 2) {
        return `${outer - inner - 15}`;
      }
    }
    let angle = ((d.startAngle + d.endAngle) / 2) * 180 / Math.PI;
    if (angle > 90 && angle < 270) {
      return `-${outer - inner - 40}`;
    }
    return `${outer - inner - 15}`;
  };
  const getWinsTextShiftX = (d, i) => {
    if (level === 1) {
      return i === 1 ? '-25' : '1';
    }
    if (level === 2) {
      if (i === 0 || i === 1) {
        return width / 4 - 25;
      } else {
        return -width / 4;
      }
    }
    return null;
  };

  const getWinsTextPathLink = (d, i) => (
    `#winsPath__${level}--${i}`
  );

  const getwinsTextPathOffset = (d, i) => {
    if (level === 1) {
      return '20%';
    }
    let angle = ((d.startAngle + d.endAngle) / 2) * 180 / Math.PI;
    if (level === 2) {
      return null;
    }
    if (angle > 90 && angle < 270) {
      return i % 2 === 0 ? `1%` : `${80 + 7 * (4-level)}%`;
    } 
    return i % 2 === 0 ? `${80 + 7 * (4-level)}%` : `1%`;
  };

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

    let textSvg = null;
    if (!showImages) {
      // Text SVG
      const textTransform = getTextTransform(d, i, round);
      const textFontSize = getTextFontSize();

      textSvg = (
        <text
          key={`text__${level}--${i}`}
          className={`RadialBracketPie__text`}
          transform={textTransform}
          dy={textY}
          textAnchor={'middle'}
          fontSize={textFontSize}
          fill={'white'}
        >
          {d.data.teamIndex !== -1 ? teams[d.data.teamIndex].name : null }
        </text>
      );
    }

    let imageSvg = null;
    if (showImages) {
      // Image SVG
      const imageTransform = getImageTransform(d, i, round)
      const imageLink = d.data.teamIndex !== -1 ? nbaLogos[teams[d.data.teamIndex].name][teams[d.data.teamIndex].logo] : '#';
      imageSvg = (
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
    }

    let winsSvg = null;
    let winsTextSvg = null;
    if (showWins && level !== 0) {
      const winsPathId = getPathId(d, i);
      const winsPath = getWinsPath(d);
      winsSvg = (
        <path
          key={`winsPath__${level}--${i}`}
          className={'winsPath'}
          id={winsPathId}
          d={winsPath}
        ></path>
      );
  
      const winsTextFontSize = getWinsTextFontSize(level);
      const winsTextShiftY = getWinsTextShiftY(d, i);
      const winsTextShiftX = getWinsTextShiftX(d, i);
      
      const winsTextPathLink = getWinsTextPathLink(d, i);
      const winsTextPathOffset = getwinsTextPathOffset(d, i);
      winsTextSvg = (
        <text
          key={`winsText__${level}--${i}`}
          className={'winsText'}
          fontSize={winsTextFontSize}
          dy={winsTextShiftY}
          dx={winsTextShiftX}
          fill={'white'}
        >
          <textPath
            xlinkHref={winsTextPathLink}
            startOffset={winsTextPathOffset}
          >
            {d.data.teamIndex !== -1 ? d.data.wins : ''}
          </textPath>
        </text>
      );
    }

    const finalSvg = [pathSvg];
    if (textSvg !== null) finalSvg.push(textSvg);
    if (imageSvg !== null) finalSvg.push(imageSvg);
    if (winsSvg !== null) finalSvg.push(winsSvg);
    if (winsTextSvg !== null) finalSvg.push(winsTextSvg);

    return (
      <g
        key={`group__${level}--${i}`}
        onClick={e => props.onClick(e, d, level)}
      >
        { [finalSvg] }
      </g>
  );
  })

  return (
    [bracketPie]
  );
};

export default RadialBracketPie;