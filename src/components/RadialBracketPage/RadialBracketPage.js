import React from 'react';
import moment from 'moment';
import Header from '../Header/Header';
import RadialBracketTabs from './RadialBracketTabs/RadialBracketTabs';
import RadialBracket from './RadialBracket/RadialBracket';
import RadialBracketInput from './RadialBracketInput/RadialBracketInput';
import RadialBracketModal from './RadialBracketModal/RadialBracketModal';
import baseBracket from '../../data/baseBracket';
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
    teams : [
      { name: "TOR", index: 0, full: 'Toronto Raptors', color: 0, logo: 0, place: 1, conference: 'East' },
      { name: "WAS", index: 1, full: 'Washington Wizards', color: 0, logo: 0, place: 8, conference: 'East' },
      { name: "CLE", index: 2, full: 'Cleveland Cavaliers', color: 0, logo: 0, place: 4, conference: 'East' },
      { name: "IND", index: 3, full: 'Indiana Pacers', color: 0, logo: 0, place: 5, conference: 'East' },
      { name: "PHI", index: 4, full: 'Philadelphia 76ers', color: 0, logo: 0, place: 3, conference: 'East' },
      { name: "MIA", index: 5, full: 'Miami Heat', color: 0, logo: 0, place: 6, conference: 'East' },
      { name: "BOS", index: 6, full: 'Boston Celtics', color: 0, logo: 0, place: 2, conference: 'East' },
      { name: "MIL", index: 7, full: 'Milwaukee Bucks', color: 0, logo: 0, place: 7, conference: 'East' },
      { name: "HOU", index: 8, full: 'Houston Rockets', color: 0, logo: 0, place: 1, conference: 'West' },
      { name: "MIN", index: 9, full: 'Minnesota Timberwolves', color: 0, logo: 0, place: 8, conference: 'West' },
      { name: "OKC", index: 10, full: 'Oklahoma City Thunder', color: 0, logo: 0, place: 4, conference: 'West' },
      { name: "UTA", index: 11, full: 'Utah Jazz', color: 0, logo: 0, place: 5, conference: 'West' },
      { name: "POR", index: 12, full: 'Portland Trailblazers', color: 0, logo: 0, place: 3, conference: 'West' },
      { name: "NOP", index: 13, full: 'New Orleans Pelicans', color: 0, logo: 0, place: 6, conference: 'West' },
      { name: "GSW", index: 14, full: 'Golden State Warriors', color: 0, logo: 0, place: 2, conference: 'West' },
      { name: "SAS", index: 15, full: 'San Antonio Spurs', color: 0, logo: 0, place: 7, conference: 'West' },
    ],
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
    this.setState(() => ({ bracket }));
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

    this.setState(() => ({
      modal: {
        x,
        y,
        name: this.state.teams[bracket[index].teamIndex].name,
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