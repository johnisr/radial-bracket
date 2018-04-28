import React from 'react';
import { connect } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

import RadialBracket from '../RadialBracketPage/RadialBracket/RadialBracket';
import { startSetBracketData } from '../../actions/bracketAnalysis';
import './RadialBracketAnalysisContainer.css';

class RadialBracketAnalysis extends React.Component {
  state = {
    predictionsWithoutWins: [],
    bracketWithWins: [],
    percentageNames: [],
    percentageColours: [],
    percentageBracket: [],
    percentageTeams: [],
    activeRound: -1,
    length: 0,
  }
  async componentDidMount() {
    const teams = this.props.teams;
    if (teams.length === 0) return;
    
    const baseBracket = this.props.baseBracket;
    const bracket = this.props.bracket;

    if (JSON.parse(JSON.stringify(bracket)) === JSON.parse(JSON.stringify(baseBracket))) {
      console.log('wow');
    }

    const teamNames = this.props.teamNames;
    const teamColours = this.props.teamColours;

    // Fetch data if it hasn't been fetched already
    if (this.props.data.length === 0) {
      try {
        await this.props.startSetBracketData();   
      } catch (e) {
        console.log(e);
      }
    }

    const data = this.props.data;

    // Calculate aggregate results for entire data
    const bracketWithoutWins = [{ team: 0}];
    for (let i = 1; i < 32; i++) {
      bracketWithoutWins.push({});
    }
    data.forEach((datum) => {
      for (let i = 1; i < 16; i++) {

        const team = teams[datum.bracket[i].teamIndex];
        const winner = teamNames[team.index][team.name];
        const color = teamColours[team.index][team.color].color;

        if (bracketWithoutWins[i][winner] === undefined) {
          bracketWithoutWins[i][winner] = {
            name: winner,
            fill: color,
            count: 1,
          };
        } else {
          bracketWithoutWins[i][winner] = {
            name: winner,
            fill: color,
            count: bracketWithoutWins[i][winner].count + 1
          };
        }
      }
    });
    
    // Making actual percentages based on choices
    let percentageNames = [ [0] ];
    let percentageColours = [ ['#000000'] ];
    let percentageTeams = [{}];
    let percentageBracket = [ { teamIndex: -1, wins: 0} ];
    for (let i = 1; i < 16; i++) {
      // user has not picked a team for this round, make grey
      if (bracket[i].teamIndex < 0) {
        percentageBracket.push({teamIndex: -1, wins: 0 });
        percentageColours.push(['']);
        percentageTeams.push({});
        percentageNames.push(['']);
        continue;
      }
      const team = teams[bracket[i].teamIndex];
      const predicted = teamNames[team.index][team.name];
      const predictedNum = bracketWithoutWins[i][predicted] === undefined ? 0 : bracketWithoutWins[i][predicted].count;
      
      // have to check base bracket to see if already done then put bracket -1
      const alreadyDone = baseBracket[i * 2].wins === 4 || baseBracket[i * 2 + 1].wins === 4;

      percentageBracket.push({teamIndex: alreadyDone ? -1 : i, wins: 0 });
      percentageColours.push(teamColours[team.index]);
      percentageTeams.push({ ...teams[bracket[i].teamIndex], index: i });
      percentageNames.push([(predictedNum / data.length * 100).toFixed(0)]);
    }
    // Not showing outer ring because no predictions can be made there
    // for (let i = 16; i < 32; i++) {
    //   percentageBracket.push({teamIndex: -1, wins: 0 });
    // }

    // Making it into a format that is accessible to victory charts
    const predictionsWithoutWins = [ [ { team: 0 }]];
    bracketWithoutWins.forEach((round, i) => {
      if (i === 0 || i >= 16) return;
      const prediction = [];
      Object.keys(round).forEach(key => {
        prediction.push(round[key]);
      })
      predictionsWithoutWins.push(prediction);
    });

    this.setState(() => ({ 
      predictionsWithoutWins: predictionsWithoutWins,
      percentageNames,
      percentageColours,
      percentageBracket,
      percentageTeams,
      length: data.length,
    }));
  }
  onClick = (e, d, level) => {
    const currentIndex = Math.pow(2, level) + d.index;
    if (currentIndex > 16) {
      return;
    }
    // if (this.props.baseBracket[currentIndex * 2].wins === 4 || this.props.baseBracket[currentIndex * 2 + 1].wins === 4) {
    //   console.log('This was already decided before you used the app');
    //   return;
    // }
    this.setState(() => ({ activeRound: currentIndex }));
  }

  render() {
    if (this.props.teams.length === 0) {
      return (
        <div>
          <p className="RadialBracketAnalysisContainer__text" >Make some predictions first before visiting</p>
        </div>
      )
    };

    return (
      <div className="RadialBracketAnalysisContainer">
        <section className="section__center-start-end">
          <RadialBracket
            onClick={this.onClick}
            teamColours={this.state.percentageColours}
            teamNames={this.state.percentageNames}
            teams={this.state.percentageTeams}
            bracket={this.state.percentageBracket}
            name={'% Agreed with your picks'}
            titleText={'Click to find out details'}
            
            textFontStyle={0}
            winsFontStyle={0}
            titleFontStyle={2}
            textFontFamily={0}
            winsTextFontFamily={0}
            titleFontFamily={0}
            nameFontFamily={0}
            
            svgBackgroundColor={''}
            dimensions={[600, 700]}
            margin={{ top: 100, right: 0, bottom: 0, left: 0 }}
            fonts={this.props.fonts}
            fontStyle={this.props.fontStyle}
            teamLogos={[]}
            showWins={false}
            showImages={false}
          />
          {
            this.state.activeRound !== -1 &&
            <VictoryChart domainPadding={{ x: 60 }}
              domain={{ y: [0, 100] }}
            >
              <VictoryLabel
                text={this.props.roundNames[this.state.activeRound]}
                x={225}
                y={30}
                textAnchor="middle"
              />
              <VictoryAxis/>
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`${x}%`)}
              />
              <VictoryBar
                data={this.state.predictionsWithoutWins[this.state.activeRound]}
                alignment="middle"
                animate={{
                  duration: 250,
                }}
                barRatio={0.8}
                x="name"
                y={d => (d.count / this.state.length * 100)}
                style={{ data: {fill: d => d.fill} }}
              />
            </VictoryChart>
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: state[`${props.bracketStateName}BracketData`],
  bracket: state[`${props.bracketStateName}Bracket`].bracket,
  teams: state[`${props.bracketStateName}Bracket`].teams,
});

const mapDispatchToProps = (dispatch, props) => ({
  startSetBracketData: () => dispatch(startSetBracketData(props.bracketStateName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RadialBracketAnalysis);