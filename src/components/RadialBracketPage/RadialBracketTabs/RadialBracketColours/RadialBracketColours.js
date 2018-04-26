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
 
  // Create an object that is alphabetically sorted and knows how it was sorted before
  // thus can show sorted but return proper index as value
  const sortedTeamNames = [];
  if (teams.length !== 0) {
    teamNames.forEach((team , i) => {
      sortedTeamNames.push( { name: team[teams[i].name], index: i });
    });
    sortedTeamNames.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (b.name < a.name) return 1;
      return 0;
    });
  }

  const fontStyle = props.fontStyle[props.textFontStyle];
  const font = {
    fontFamily: fonts[props.textFontFamily],
    color: fontStyle.split(' ')[0],
    textShadow: `
      -1px -1px 0 ${fontStyle.split(' ')[1]},
      1px -1px 0 ${fontStyle.split(' ')[1]},
      -1px 1px 0 ${fontStyle.split(' ')[1]},
      1px 1px 0 ${fontStyle.split(' ')[1]}
      `
  };

  return (
    <div className="RadialBracketColours">
      <select 
        value={props.activeTeam}
        onChange={props.onActiveTeamChange}
        className="RadialBracketColours__select"
      >
          <option key={'zero'} value={-1}>Team</option>
        {
          sortedTeamNames.map((teamObj, i) => (
            <option key={i} value={teamObj.index}>
              {teamObj.name}
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
            }}
            onClick={() => props.onColorChange(i)}
            value={i}
            className="RadialBracketColours__colours"
          >
            <p className="RadialBracketColours__text" style={font}>
              {name}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default RadialBracketColours;