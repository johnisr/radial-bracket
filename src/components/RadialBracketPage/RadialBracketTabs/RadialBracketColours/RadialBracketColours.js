import React from 'react';
import nbaColours from '../../../../data/nbaColours';

const RadialBracketColours = (props) => {

  const teams = props.teams;
  let colors = [];
  console.log(props.activeTeamIndex);
  if (props.activeTeamIndex >= 0) {
    colors = nbaColours[teams[props.activeTeamIndex].name];
  }
  
  return (
    <div>
      <select value={props.activeTeam} onChange={props.onActiveTeamChange}>
          <option key={'zero'} value={-1}>Select Team to Edit</option>
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
            style={{ backgroundColor: `${color.color}` }}
            onClick={() => props.onColorChange(i)}
            value={i}
          >
            {teams[props.activeTeamIndex].name}
          </div>
        ))
      }
    </div>
  );
}

export default RadialBracketColours;