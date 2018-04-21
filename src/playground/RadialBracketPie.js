import React from 'react';
import { arc, pie } from 'd3-shape';
import nbaColors from '../data/nbaColors';
import nbaLogos from '../data/nbaLogos';
import './RadialBracketPie.css';

class RadialBracketPie extends React.Component {
  isEmpty(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  getColor(d, i) {
    const team = d.data.team;
    if (this.isEmpty(team)) {
      return i % 2 === 0 ? 'lightgray' : 'darkgray';
    }
    return nbaColors[team.name][team.color].color;
  }

  render() {
    const outer = this.props.outer;
    const inner = this.props.inner;
    const round = this.props.round;
    const dimensions = this.props.data.dimensions;
    const margin = this.props.data.margin;
    const showImages = this.props.data.showImages;
    
    //Derived 
    const level = Math.log2(round.length);
    const width = dimensions[0] - margin.left - margin.right;

    // data setup
    const arcs = pie().value(1)(round);
    const path = arc().outerRadius(outer).innerRadius(inner);

    const inChartMarginAngle = 0.02;
    const marginAngleLeveller = (level) => level * (inChartMarginAngle / 10);
    
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

    const getTextTransform = (d, i, round) => {
      const level = Math.log2(round);
      let angle = ((d.startAngle + d.endAngle) / 2) * 180 / Math.PI;
      if (angle > 90 && angle < 270) angle = angle + 180;
      return level !== 0 ? `translate(${path.centroid(d)}) rotate(${angle})` : null;
    }

    const textY = '.37em';
    const  getTextFontSize = () => {
      return width / 18.75 + (3 * (5 - level));
    };

    const imageMargin = 10;
    const centerImageMultiplier = 1.5;
    const centerImageShiftY = width / 24;
    const imageHeight = level !== 0 ? outer - inner - imageMargin : (outer - inner) * centerImageMultiplier;
    const imageWidth = level !== 0 ? outer - inner - imageMargin : (outer - inner) * centerImageMultiplier;

    const getImageTransform = (d, i, round) => {
      if (level === 0) {
        const translation = path.centroid(d);
        return `translate(${translation[0]}, ${translation[1] - centerImageShiftY})`;
      }
      return `translate(${path.centroid(d)})`;
    }

    // The whole thing being returned
    const bracketPie = arcs
      .map((d, i, round) => {
        // Path calculations
        const color = this.getColor(d, i);
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

        // text calculations
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

        // image calculations
        const imageTransform = getImageTransform(d, i, round)
        const imageLink = !this.isEmpty(d.data.team) ? nbaLogos[d.data.team.name][d.data.team.logo] : '#';
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
          <g onClick={(e) => this.props.onClick(e, d, level)}>
            { showImages ? [pathSvg, imageSvg] : [pathSvg, textSvg] }
          </g>
      );
      });

   
    console.log(`ReRendering BracketPi Level ${level}`)
    return (
      [bracketPie]
    );
  }
};

export default RadialBracketPie;