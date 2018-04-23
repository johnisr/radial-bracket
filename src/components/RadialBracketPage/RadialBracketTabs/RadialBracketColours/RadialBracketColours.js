import React from 'react';
import nbaColours from '../../../../data/nbaColours';
import nbaNames from '../../../../data/nbaNames';
import fonts from '../../../../data/fonts';
import './RadialBracketColours.css';

const RadialBracketColours = (props) => {

  const teams = props.teams;
  console.log(teams);
  let colors = [];
  let name = '';
  const team = props.activeTeamIndex >= 0 ? teams[props.activeTeamIndex] : null;
  if (team) {
    colors = nbaColours[team.index];
    name = nbaNames[team.index][team.name];
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
              {nbaNames[team.index][team.name]}
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
              {name}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default RadialBracketColours;