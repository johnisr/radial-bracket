import React from 'react';
import moment from 'moment';
import Header from '../Header/Header';
import RadialBracketTabs from './RadialBracketTabs/RadialBracketTabs';
import RadialBracket from './RadialBracket/RadialBracket';
import RadialBracketInput from './RadialBracketInput/RadialBracketInput';
import RadialBracketModal from './RadialBracketModal/RadialBracketModal';
import baseTeams from '../../data/baseTeams';
import baseBracket from '../../data/baseBracket';
import nbaNames from '../../data/nbaNames';
import { startSubmitNBABracket } from '../../actions/bracket';
import { saveSvgAsPng } from 'save-svg-as-png';
import './RadialBracketPage.css';

class RadialBracketPage extends React.Component {
  state = {
    dimensions: [600, 700],
    margin: { top: 100, right: 0, bottom: 0, left: 0 },
    showWins: true,
    showImages: false,
    titleFontFamily: 0,
    nameFontFamily: 0,
    textFontFamily: 0,
    winsTextFontFamily: 0,
    fontFamilyChanged: 0,
    colorChanged: 0,
    titleFontStyle: 2,
    textFontStyle: 0,
    winsFontStyle: 0,
    fontStyleChanged: 0,
    startTime: moment().valueOf(),
    teams : [],
    bracket: [],
    modal: {
      x: 0,
      y: 0,
      name: '',
      index: 0,
      otherIndex: 0,
    },
    name: 'username',
    activeTeamIndex: -1,
    hasSubmitted: false,
  };
  componentDidMount() {
    // Deep Copy Array using JSON methods
    const bracket = JSON.parse(JSON.stringify(baseBracket));
    
    let teams = [];
    baseTeams.forEach(temp => {
      const { full, place, conference, name, ...team } = temp;
      team.bracketIndex = team.index;
      team.name = 0; 
      teams.push(team);
    });
    this.setState(() => ({ bracket, teams }));
  }
  onSvgClick = (e, d, level) => {
    const index = Math.pow(2, level) + d.index;
    if (index < 2) {
      console.log('can not select for winner');
      return;
    }

    const bracket = this.state.bracket;
    if (bracket[index].teamIndex === -1) {
      console.log('current team not set');
      return;
    }

    if(baseBracket[index].wins === 4) {
      const teamIndex = baseBracket[index].teamIndex;
      console.log(`${this.state.teams[teamIndex].name} has already won`);
      return;
    }

    let otherIndex;
    if (index % 2 === 0) {
      if (bracket[index + 1].teamIndex === -1) {
        console.log('other team not set');
        return;
      }
      otherIndex = index + 1;
    } else {
      if (bracket[index - 1].teamIndex === -1) {
        console.log('other team not set');
        return;
      }
      otherIndex = index - 1;
    }

    if(baseBracket[otherIndex].wins === 4) {
      const teamIndex = baseBracket[otherIndex].teamIndex;
      console.log(`${this.state.teams[teamIndex].name} has already won`);
      return;
    }

    const x = e.clientX;
    const y =  e.clientY;

    const team = this.state.teams[bracket[index].teamIndex];
    const name = nbaNames[team.index][team.name];

    this.setState(() => ({
      modal: {
        x,
        y,
        name,
        index,
        otherIndex,
      },
    }));
  }
  onModalClose = (e, index, otherIndex) => {

    const bracket = this.state.bracket;
    if (e !== undefined && index !== undefined && otherIndex !== undefined) {
      const value = e.target.value;
      bracket[index].wins = 4;
      bracket[otherIndex].wins = value - 4;
      bracket[Math.floor(index / 2)].teamIndex = bracket[index].teamIndex;

      // Clear 2 levels down and on since the winner changed
      for (let i = Math.floor(index / 4); i > 0; i = Math.floor(i / 2)) {
        bracket[i] = {teamIndex: -1, wins: 0 };
      }
    }
    this.setState(() => ({
      modal: {
        x: 0,
        y: 0,
        name: '',
        index: 0,
        otherIndex: 0,
      },
      bracket,
    }));
  }
  onNameChange = (e) => {
    const name = e.target.value;
    if (name.length > 20) return;
    this.setState(() => ({ name }));
  }
  onResetClick = () => {
    const bracket = JSON.parse(JSON.stringify(baseBracket));
    this.setState(() => ({ bracket }));
  };
  onShowWinsClick = () => {
    this.setState(() => ({ showWins: !this.state.showWins }));
  }
  onShowImagesClick = () => {
    this.setState(() => ({ showImages: !this.state.showImages }));
  }
  onSubmit = async () => {
    if (!this.state.hasSubmitted) {
      try {
        await startSubmitNBABracket(this.state);
        const hasSubmitted = true;
        this.setState(() => ({ hasSubmitted }));
      } catch (e) {
        console.log(e);
      }
    }
    saveSvgAsPng(document.getElementById('svg'), 'radialBracket.png');
  }
  onActiveTeamChange = (e) => {
    const activeTeamIndex = e.target.value;
    this.setState(() => ({ activeTeamIndex }));
  }
  onColorChange = (colorIndex) => {
    const colorChanged = this.state.colorChanged + 1;
    const teams = this.state.teams;
    const index = this.state.activeTeamIndex;
    teams[index].color = colorIndex;
    this.setState(() => ({ teams, colorChanged }));
  }
  onFontChange = (textType, index) => {
    const fontFamilyChanged = this.state.fontFamilyChanged + 1;
    if (textType === 'Title') {
      this.setState(() => ({ titleFontFamily: index, fontFamilyChanged }))
    } else if (textType === 'Name') {
      this.setState(() => ({ nameFontFamily: index, fontFamilyChanged }))
    } else if (textType === 'Teams') {
      this.setState(() => ({ textFontFamily: index, fontFamilyChanged }))
    } else if (textType === 'Wins') {
      this.setState(() => ({ winsTextFontFamily: index, fontFamilyChanged }))
    }
  }
  onFontStyleChange = (textType, index) => {
    const fontStyleChanged = this.state.fontStyleChanged + 1;
    if (textType === 'Title') {
      this.setState(() => ({ titleFontStyle: index, fontStyleChanged }))
    } else if (textType === 'Teams') {
      this.setState(() => ({ textFontStyle: index, fontStyleChanged }))
    } else if (textType === 'Wins') {
      this.setState(() => ({ winsFontStyle: index, fontStyleChanged }))
    }
  }
  render() {
    const isSubmitDisabled = this.state.bracket.length === 0 || this.state.bracket[1].teamIndex === -1;
    return(
      <div className='RadialBracketPage'>
        <div className="RadialBracketPage__row">
          <section className="section__full-start-end">
            <Header />
          </section>
          <section className="section__center-start-end">
            <RadialBracketTabs
              teams={this.state.teams}
              onActiveTeamChange={this.onActiveTeamChange}
              activeTeamIndex={this.state.activeTeamIndex}
              onColorChange={this.onColorChange}
              onFontChange={this.onFontChange}
              onFontStyleChange={this.onFontStyleChange}
              textFontFamily={this.state.textFontFamily}
            />
          </section>
          <section className="section__center-6-start-end">
            <RadialBracket data={this.state} onClick={this.onSvgClick} />
          </section>
          <section className="section__center-6-start-end">
            <RadialBracketInput
              name={this.state.name}
              showWins={this.state.showWins}
              showImages={this.state.showImages}
              onNameChange={this.onNameChange}
              onShowWinsClick={this.onShowWinsClick}
              onShowImagesClick={this.onShowImagesClick}
              onResetClick={this.onResetClick}
              isSubmitDisabled={isSubmitDisabled}
              onSubmit={this.onSubmit}
            />
          </section>
          <RadialBracketModal data={this.state.modal} onModalClose={this.onModalClose}/>
        </div>
      </div>
    );
  };
}

export default RadialBracketPage;