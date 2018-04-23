import React from 'react';
import nbaColours from '../../../../data/nbaColours';
import fonts from '../../../../data/fonts';
import './RadialBracketColours.css';

const RadialBracketColours = (props) => {

  const teams = props.teams;
  let colors = [];
  if (props.activeTeamIndex >= 0) {
    colors = nbaColours[teams[props.activeTeamIndex].index];
  }
  
  return (
    <div className="RadialBracketColours">
      <select 
        value={props.activeTeam}
        onChange={props.onActiveTeamChange}
        className="RadialBracketColours__select"
      >
          <option key={'zero'} value={-1}>Select Team</option>
        {
          teams.map((team, i) => (
            <option key={i} value={i}>
              {team.name}
            </option>
          ))
        }
      </select>
      {
        colors.map((color, i) => (
          <div
            key={`${color.color}--${i}`}
            style={{
              backgroundColor: `${color.color}`,
              fontFamily: fonts[props.textFontFamily],
            }}
            onClick={() => props.onColorChange(i)}
            value={i}
            className="RadialBracketColours__colours"
          >
            <p className="RadialBracketColours__text">
              {teams[props.activeTeamIndex].name}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default RadialBracketColours;