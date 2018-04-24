import React from 'react';
import './RadialBracketColours.css';

const RadialBracketColours = (props) => {

  const teamColours = props.teamColours;
  const fonts = props.fonts;
  const teamNames = props.teamNames;
  const teams = props.teams;
  let colors = [];
  let name = '';
  const team = props.activeTeamIndex >= 0 ? teams[props.activeTeamIndex] : null;
  if (team) {
    colors = teamColours[team.index];
    name = teamNames[team.index][team.name];
  }
  
  return (
    <div className="RadialBracketColours">
      <select 
        value={props.activeTeam}
        onChange={props.onActiveTeamChange}
        className="RadialBracketColours__select"
      >
          <option key={'zero'} value={-1}>Select Team to Edit</option>
        {
          teams.map((team, i) => (
            <option key={i} value={i}>
              {teamNames[team.index][team.name]}
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