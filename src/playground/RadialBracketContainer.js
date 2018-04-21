import React from 'react';
import RadialBracket from './RadialBracket';

class RadialBracketContainer extends React.Component {
  state = {
    dimensions: [600, 670],
    margin: { top: 70, right: 0, bottom: 0, left: 0 },
    showWins: false,
    showImages: false,
    teams : [
      { name: "TOR", full: '', color: 0, logo: 0, place: 1, conference: 'East' },
      { name: "WAS", full: '', color: 0, logo: 0, place: 8, conference: 'East' },
      { name: "CLE", full: '', color: 0, logo: 0, place: 4, conference: 'East' },
      { name: "IND", full: '', color: 0, logo: 0, place: 5, conference: 'East' },
      { name: "PHI", full: '', color: 0, logo: 0, place: 3, conference: 'East' },
      { name: "MIA", full: '', color: 0, logo: 0, place: 6, conference: 'East' },
      { name: "BOS", full: '', color: 0, logo: 0, place: 2, conference: 'East' },
      { name: "MIL", full: '', color: 0, logo: 0, place: 7, conference: 'East' },
      { name: "SAS", full: '', color: 0, logo: 0, place: 7, conference: 'West' },
      { name: "GSW", full: '', color: 0, logo: 0, place: 2, conference: 'West' },
      { name: "NOP", full: '', color: 0, logo: 0, place: 6, conference: 'West' },
      { name: "POR", full: '', color: 0, logo: 0, place: 3, conference: 'West' },
      { name: "UTA", full: '', color: 0, logo: 0, place: 5, conference: 'West' },
      { name: "OKC", full: '', color: 0, logo: 0, place: 4, conference: 'West' },
      { name: "MIN", full: '', color: 0, logo: 0, place: 8, conference: 'West' },
      { name: "HOU", full: '', color: 0, logo: 0, place: 1, conference: 'West' },
    ],
    bracket : [
      { team: {}, wins: null },
      { team: {}, wins: 0 },
      
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
      { team: {}, wins: 0 },
    ]
  }
  defaultOrder(west, east) {
    const order = [east[0], east[7], east[3], east[4], east[2], east[6], east[1], east[7]];
    return order.concat([west[0], west[7], west[3], west[4], west[2], west[6], west[1], west[7]]);
  }
  componentDidMount() {
    const bracket = [];
    for (let i = 0; i < 16; i++) {
      bracket.push({team: {}, wins: 0 });
    };
    const west = [];
    const east = [];
    this.state.teams.forEach(team => {
      team.conference === 'East' ? east.push(team) : west.push(team)
    })
    east.sort((a, b) => a.place - b.place);
    west.sort((a, b) => a.place - b.place);
    this.defaultOrder(west,east).forEach(team => {
      bracket.push({team, wins: 0 });
    })
    console.log(bracket);

    this.setState(() => ({ bracket }));
  }

  onClick = (e, d, level) => {
    const index = Math.pow(2, level) + d.index;
    const bracket = this.state.bracket;
    bracket[index].wins = 4;
    bracket[Math.floor(index / 2)] = { team: bracket[index].team, wins: 0 };
    this.setState(() => ({ bracket }));
  }

   render() {
     console.log('ReRendering Bracket Container');
    return (

      <div>
        <RadialBracket data={this.state} onClick={this.onClick}/>
      </div>
    );
  }
}

export default RadialBracketContainer;