import React from 'react';
import moment from 'moment';

// Components
import RadialBracketTabs from './RadialBracketTabs/RadialBracketTabs';
import RadialBracket from './RadialBracket/RadialBracket';
import RadialBracketInput from './RadialBracketInput/RadialBracketInput';
import RadialBracketModal from './RadialBracketModal/RadialBracketModal';

// Actions
import { saveSvgAsPng } from 'save-svg-as-png';

class RadialBracketPage extends React.Component {
  state = {
    dimensions: [600, 700],
    margin: { top: 100, right: 0, bottom: 0, left: 0 },
    showWins: false,
    showImages: true,
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
      currentIndex: 0,
      otherIndex: 0,
    },
    name: 'username',
    activeTeamIndex: -1,
    hasSubmitted: false,
    svgBackgroundColor: '',
    backgroundColorChanged: 0,
  };
  componentDidMount() {
    // Deep Copy Array using JSON methods
    const bracket = JSON.parse(JSON.stringify(this.props.baseBracket));
    
    let teams = [];
    this.props.baseTeams.forEach(temp => {
      const { full, place, conference, name, ...team } = temp;
      team.name = 0; 
      teams.push(team);
    });
    this.setState(() => ({ bracket, teams }));
  }
  onSvgClick = (e, d, level) => {
    const currentIndex = Math.pow(2, level) + d.index;
    if (currentIndex < 2) {
      console.log('can not select for winner');
      return;
    }

    const bracket = this.state.bracket;
    if (bracket[currentIndex].teamIndex === -1) {
      console.log('current team not set');
      return;
    }

    const baseBracket = this.props.baseBracket;
    if(baseBracket[currentIndex].wins === 4) {
      const index = baseBracket[currentIndex].teamIndex;
      console.log(`${this.state.teams[index].name} has already won`);
      return;
    }

    let otherIndex;
    if (currentIndex % 2 === 0) {
      if (bracket[currentIndex + 1].teamIndex === -1) {
        console.log('other team not set');
        return;
      }
      otherIndex = currentIndex + 1;
    } else {
      if (bracket[currentIndex - 1].teamIndex === -1) {
        console.log('other team not set');
        return;
      }
      otherIndex = currentIndex - 1;
    }

    if(baseBracket[otherIndex].wins === 4) {
      const index = baseBracket[otherIndex].teamIndex;
      console.log(`${this.state.teams[index].name} has already won`);
      return;
    }

    const x = e.clientX;
    const y =  e.clientY;

    const team = this.state.teams[bracket[currentIndex].teamIndex];
    const name = this.props.teamNames[team.index][team.name];

    this.setState(() => ({
      modal: {
        x,
        y,
        name,
        currentIndex,
        otherIndex,
      },
    }));
  }
  onModalClose = (e, currentIndex, otherIndex) => {

    const bracket = this.state.bracket;
    if (e !== undefined && currentIndex !== undefined && otherIndex !== undefined) {
      const value = e.target.value;
      bracket[currentIndex].wins = 4;
      bracket[otherIndex].wins = value - 4;
      bracket[Math.floor(currentIndex / 2)].teamIndex = bracket[currentIndex].teamIndex;

      // Clear 2 levels down and on since the winner changed
      for (let i = Math.floor(currentIndex / 4); i > 0; i = Math.floor(i / 2)) {
        bracket[i] = {teamIndex: -1, wins: 0 };
      }
    }
    this.setState(() => ({
      modal: {
        x: 0,
        y: 0,
        name: '',
        currentIndex: 0,
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
    const bracket = JSON.parse(JSON.stringify(this.props.baseBracket));
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
        await this.props.startSubmitBracket(this.state);
        const hasSubmitted = true;
        this.setState(() => ({ hasSubmitted }));
      } catch (e) {
        console.log(e);
      }
    }
    saveSvgAsPng(document.getElementById('svg'), 'radialBracket.png', { encoderOptions: 1 });
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
    console.log(textType, index);
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
  onBackgroundColorChange = (e) => {
    const svgBackgroundColor = e.target.value;
    const backgroundColorChanged = this.state.backgroundColorChanged + 1;
    this.setState(() => ({ backgroundColorChanged, svgBackgroundColor }));
  }
  render() {
    const isSubmitDisabled = this.state.bracket.length === 0 || this.state.bracket[1].teamIndex === -1;
    return(
      <div className='RadialBracketPage'>
        <RadialBracketTabs
          teamNames={this.props.teamNames}
          teamColours={this.props.teamColours}
          fonts={this.props.fonts}
          fontStyle={this.props.fontStyle}
          textFontStyle={this.state.textFontStyle}
          teams={this.state.teams}
          onActiveTeamChange={this.onActiveTeamChange}
          activeTeamIndex={this.state.activeTeamIndex}
          onColorChange={this.onColorChange}
          onFontChange={this.onFontChange}
          onFontStyleChange={this.onFontStyleChange}
          textFontFamily={this.state.textFontFamily}
          svgBackgroundColor={this.state.svgBackgroundColor}
          onBackgroundColorChange={this.onBackgroundColorChange}
        />
        <RadialBracket
          onClick={this.onSvgClick}
          fonts={this.props.fonts}
          fontStyle={this.props.fontStyle}
          teamColours={this.props.teamColours}
          teamLogos={this.props.teamLogos}
          teamNames={this.props.teamNames}
          teams={this.state.teams}
          showWins={this.state.showWins}
          showImages={this.state.showImages}
          textFontStyle={this.state.textFontStyle}
          winsFontStyle={this.state.winsFontStyle}
          textFontFamily={this.state.textFontFamily}
          winsTextFontFamily={this.state.winsTextFontFamily}
          dimensions={this.state.dimensions}
          margin={this.state.margin}
          bracket={this.state.bracket}
          titleFontStyle={this.state.titleFontStyle}
          titleFontFamily={this.state.titleFontFamily}
          nameFontFamily={this.state.nameFontFamily}
          name={this.state.name}
          svgBackgroundColor={this.state.svgBackgroundColor}
          titleText={this.props.titleText}
        />
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
        <RadialBracketModal
          modal={this.state.modal}
          onModalClose={this.onModalClose}
          baseBracket={this.props.baseBracket}
        />
      </div>
    );
  };
}

export default RadialBracketPage;