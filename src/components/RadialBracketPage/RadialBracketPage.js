import React from 'react';
import Header from '../Header/Header';
import RadialBracketTabs from './RadialBracketTabs/RadialBracketTabs';
import RadialBracket from './RadialBracket/RadialBracket';
import RadialBracketInput from './RadialBracketInput/RadialBracketInput';
import RadialBracketModal from './RadialBracketModal/RadialBracketModal';

class RadialBracketPage extends React.Component {
  state = {
    dimensions: [600, 670],
    margin: { top: 70, right: 0, bottom: 0, left: 0 },
    showWins: false,
    showImages: false,
    showCompleted: false,
    teams : [
      { name: "TOR", full: 'Toronto Raptors', color: 0, logo: 0, place: 1, conference: 'East' },
      { name: "WAS", full: 'Washington Wizards', color: 0, logo: 0, place: 8, conference: 'East' },
      { name: "CLE", full: 'Cleveland Cavaliers', color: 0, logo: 0, place: 4, conference: 'East' },
      { name: "IND", full: 'Indiana Pacers', color: 0, logo: 0, place: 5, conference: 'East' },
      { name: "PHI", full: 'Philadelphia 76ers', color: 0, logo: 0, place: 3, conference: 'East' },
      { name: "MIA", full: 'Miami Heat', color: 0, logo: 0, place: 6, conference: 'East' },
      { name: "BOS", full: 'Boston Celtics', color: 0, logo: 0, place: 2, conference: 'East' },
      { name: "MIL", full: 'Milwaukee Bucks', color: 0, logo: 0, place: 7, conference: 'East' },
      { name: "SAS", full: 'San Antonio Spurs', color: 0, logo: 0, place: 7, conference: 'West' },
      { name: "GSW", full: 'Golden State Warriors', color: 0, logo: 0, place: 2, conference: 'West' },
      { name: "NOP", full: 'New Orleans Pelicans', color: 0, logo: 0, place: 6, conference: 'West' },
      { name: "POR", full: 'Portland Trailblazers', color: 0, logo: 0, place: 3, conference: 'West' },
      { name: "UTA", full: 'Utah Jazz', color: 0, logo: 0, place: 5, conference: 'West' },
      { name: "OKC", full: 'Oklahoma City Thunder', color: 0, logo: 0, place: 4, conference: 'West' },
      { name: "MIN", full: 'Minnesota Timberwolves', color: 0, logo: 0, place: 8, conference: 'West' },
      { name: "HOU", full: 'Houston Rockets', color: 0, logo: 0, place: 1, conference: 'West' },
    ],
    bracket: [],
  };
  defaultOrder(west, east) {
    const order = [east[0], east[7], east[3], east[4], east[2], east[6], east[1], east[7]];
    return order.concat([west[0], west[7], west[3], west[4], west[2], west[6], west[1], west[7]]);
  }
  componentDidMount() {
    const bracket = [];
    for (let i = 0; i < this.state.teams.length; i++) {
      bracket.push({team: { name: '' }, wins: 0 });
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
  render() {
    return(
      <div>
        <Header />
        <RadialBracketTabs />
        <RadialBracket data={this.state} />
        <RadialBracketInput />
        <RadialBracketModal />
      </div>
    );
  };
}

export default RadialBracketPage;