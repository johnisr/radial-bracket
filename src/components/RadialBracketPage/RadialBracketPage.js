import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

// Components
import RadialBracketTabs from './RadialBracketTabs/RadialBracketTabs';
import RadialBracket from './RadialBracket/RadialBracket';
import RadialBracketInput from './RadialBracketInput/RadialBracketInput';
import RadialBracketModal from './RadialBracketModal/RadialBracketModal';

// Actions
import {
  setBracket,
  setTeams,
  setStartTime,
  setModal,
  setName,
  toggleShowWins,
  toggleShowImages,
  setHasSubmitted,
  setActiveTeamIndex,
  incrementColorChanged,
  setTitleFontFamily,
  incrementFontFamilyChanged,
  setNameFontFamily,
  setTextFontFamily,
  setWinsTextFontFamily,
  setTitleFontStyle,
  incrementFontStyleChanged,
  setTextFontStyle,
  setWinsFontStyle,
  setSvgBackgroundColor,
  incrementBackgroundColorChanged,
  startSubmitBracket,
} from '../../actions/bracket';
import { saveSvgAsPng } from 'save-svg-as-png';

class RadialBracketPage extends React.Component {
  componentDidMount() {
    // Deep Copy Array using JSON methods
    if (this.props.bracket.length === 0) {
      const bracket = JSON.parse(JSON.stringify(this.props.baseBracket));
      let teams = [];
      this.props.baseTeams.forEach(temp => {
        const { full, place, conference, name, ...team } = temp;
        team.name = 0; 
        teams.push(team);
      });
      this.props.setBracket(bracket);
      this.props.setTeams(teams);
      this.props.setStartTime(moment().valueOf());
    }
    
  }
  onSvgClick = (e, d, level) => {
    const currentIndex = Math.pow(2, level) + d.index;
    if (currentIndex < 2) {
      console.log('can not select for winner');
      return;
    }

    const bracket = this.props.bracket;
    if (bracket[currentIndex].teamIndex === -1) {
      console.log('current team not set');
      return;
    }

    const baseBracket = this.props.baseBracket;
    if(baseBracket[currentIndex].wins === 4) {
      const index = baseBracket[currentIndex].teamIndex;
      console.log(`${this.props.teams[index].name} has already won`);
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
      console.log(`${this.props.teams[index].name} has already won`);
      return;
    }

    const x = e.clientX;
    const y =  e.clientY;

    const team = this.props.teams[bracket[currentIndex].teamIndex];
    const name = this.props.teamNames[team.index][team.name];

    this.props.setModal({
      x,
      y,
      name,
      currentIndex,
      otherIndex,
    });
    
  }
  onModalClose = (e, currentIndex, otherIndex) => {

    const bracket = this.props.bracket;
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

    this.props.setModal({
      x: 0,
      y: 0,
      name: '',
      currentIndex: 0,
      otherIndex: 0,
    });
    this.props.setBracket(bracket);
  }
  onNameChange = (e) => {
    const name = e.target.value;
    if (name.length > 20) return;
    this.props.setName(name);
  }
  onResetClick = () => {
    const bracket = JSON.parse(JSON.stringify(this.props.baseBracket));
    this.props.setBracket(bracket);
  };
  onShowWinsClick = () => {
    this.props.toggleShowWins();
  }
  onShowImagesClick = () => {
    this.props.toggleShowImages();
  }
  onSubmit = async () => {
    if (!this.props.hasSubmitted) {
      try {
        console.log(this.props.state);
        await this.props.startSubmitBracket(this.props.state);
        this.props.setHasSubmitted();
      } catch (e) {
        console.log(e);
      }
    }
    saveSvgAsPng(document.getElementById('svg'), 'radialBracket.png', { encoderOptions: 1 });
  }
  onActiveTeamChange = (e) => {
    const activeTeamIndex = e.target.value;
    this.props.setActiveTeamIndex(activeTeamIndex);
  }
  onColorChange = (colorIndex) => {
    const teams = this.props.teams;
    const index = this.props.activeTeamIndex;
    teams[index].color = colorIndex;
    this.props.incrementColorChanged();
    this.props.setTeams(teams);
  }
  onFontChange = (textType, index) => {
    if (textType === 'Title') {
      this.props.setTitleFontFamily(index);
    } else if (textType === 'Name') {
      this.props.setNameFontFamily(index);
    } else if (textType === 'Teams') {
      this.props.setTextFontFamily(index);
    } else if (textType === 'Wins') {
      this.props.setWinsTextFontFamily(index);
    }
    this.props.incrementFontFamilyChanged();
  }
  onFontStyleChange = (textType, index) => {
    if (textType === 'Title') {
      this.props.setTitleFontStyle(index);
    } else if (textType === 'Teams') {
      this.props.setTextFontStyle(index);
    } else if (textType === 'Wins') {
      this.props.setWinsFontStyle(index);
    }
    this.props.incrementFontStyleChanged();
  }
  onBackgroundColorChange = (e) => {
    const svgBackgroundColor = e.target.value;
    this.props.setSvgBackgroundColor(svgBackgroundColor);
    this.props.incrementBackgroundColorChanged();
  }
  render() {
    const isSubmitDisabled = this.props.bracket.length === 0 || this.props.bracket[1].teamIndex === -1;
    return(
      <div className='RadialBracketPage'>
        <RadialBracketTabs
          teamNames={this.props.teamNames}
          teamColours={this.props.teamColours}
          fonts={this.props.fonts}
          fontStyle={this.props.fontStyle}
          textFontStyle={this.props.textFontStyle}
          teams={this.props.teams}
          onActiveTeamChange={this.onActiveTeamChange}
          activeTeamIndex={this.props.activeTeamIndex}
          onColorChange={this.onColorChange}
          onFontChange={this.onFontChange}
          onFontStyleChange={this.onFontStyleChange}
          textFontFamily={this.props.textFontFamily}
          svgBackgroundColor={this.props.svgBackgroundColor}
          onBackgroundColorChange={this.onBackgroundColorChange}
        />
        <RadialBracket
          onClick={this.onSvgClick}
          fonts={this.props.fonts}
          fontStyle={this.props.fontStyle}
          teamColours={this.props.teamColours}
          teamLogos={this.props.teamLogos}
          teamNames={this.props.teamNames}
          teams={this.props.teams}
          showWins={this.props.showWins}
          showImages={this.props.showImages}
          textFontStyle={this.props.textFontStyle}
          winsFontStyle={this.props.winsFontStyle}
          textFontFamily={this.props.textFontFamily}
          winsTextFontFamily={this.props.winsTextFontFamily}
          dimensions={this.props.dimensions}
          margin={this.props.margin}
          bracket={this.props.bracket}
          titleFontStyle={this.props.titleFontStyle}
          titleFontFamily={this.props.titleFontFamily}
          nameFontFamily={this.props.nameFontFamily}
          name={this.props.name}
          svgBackgroundColor={this.props.svgBackgroundColor}
          titleText={this.props.titleText}
        />
        <RadialBracketInput
          name={this.props.name}
          showWins={this.props.showWins}
          showImages={this.props.showImages}
          onNameChange={this.onNameChange}
          onShowWinsClick={this.onShowWinsClick}
          onShowImagesClick={this.onShowImagesClick}
          onResetClick={this.onResetClick}
          isSubmitDisabled={isSubmitDisabled}
          onSubmit={this.onSubmit}
        />
        <RadialBracketModal
          modal={this.props.modal}
          onModalClose={this.onModalClose}
          baseBracket={this.props.baseBracket}
        />
      </div>
    );
  };
}

const mapStateToProps = (state, props) => {
  return {
    dimensions: state[`${props.bracketStateName}Bracket`].dimensions,
    margin: state[`${props.bracketStateName}Bracket`].margin,
    state: state[`${props.bracketStateName}Bracket`],
    bracket: state[`${props.bracketStateName}Bracket`].bracket,
    teams: state[`${props.bracketStateName}Bracket`].teams,
    modal: state[`${props.bracketStateName}Bracket`].modal,
    name: state[`${props.bracketStateName}Bracket`].name,
    showWins: state[`${props.bracketStateName}Bracket`].showWins,
    showImages: state[`${props.bracketStateName}Bracket`].showImages,
    hasSubmitted: state[`${props.bracketStateName}Bracket`].hasSubmitted,
    activeTeamIndex: state[`${props.bracketStateName}Bracket`].activeTeamIndex,
    colorChanged: state[`${props.bracketStateName}Bracket`].colorChanged,
    titleFontFamily: state[`${props.bracketStateName}Bracket`].titleFontFamily,
    nameFontFamily: state[`${props.bracketStateName}Bracket`].nameFontFamily,
    textFontFamily: state[`${props.bracketStateName}Bracket`].textFontFamily,
    winsTextFontFamily: state[`${props.bracketStateName}Bracket`].winsTextFontFamily,
    fontFamilyChanged: state[`${props.bracketStateName}Bracket`].fontFamilyChanged,
    titleFontStyle: state[`${props.bracketStateName}Bracket`].titleFontStyle,
    textFontStyle: state[`${props.bracketStateName}Bracket`].textFontStyle,
    winsFontStyle: state[`${props.bracketStateName}Bracket`].winsFontStyle,
    fontStyleChanged: state[`${props.bracketStateName}Bracket`].fontStyleChanged,
    svgBackgroundColor: state[`${props.bracketStateName}Bracket`].svgBackgroundColor,
    backgroundColorChanged: state[`${props.bracketStateName}Bracket`].backgroundColorChanged,
  };
}; 

const mapDispatchToProps = (dispatch, props) => {
  return {
    setBracket: (bracket) => dispatch(setBracket(bracket, props.bracketStateName)),
    setTeams: (teams) => dispatch(setTeams(teams, props.bracketStateName)),
    setStartTime: (startTime) => dispatch(setStartTime(startTime, props.bracketStateName)),
    setModal: (modal) => dispatch(setModal(modal, props.bracketStateName)),
    setName: (name) => dispatch(setName(name, props.bracketStateName)),
    toggleShowWins: () => dispatch(toggleShowWins(props.bracketStateName)),
    toggleShowImages: () => dispatch(toggleShowImages(props.bracketStateName)),
    setHasSubmitted: () => dispatch(setHasSubmitted(props.bracketStateName)),
    setActiveTeamIndex: (activeTeamIndex) => dispatch(setActiveTeamIndex(activeTeamIndex, props.bracketStateName)),
    incrementColorChanged: () => dispatch(incrementColorChanged(props.bracketStateName)),
    setTitleFontFamily: (titleFontFamily) => dispatch(setTitleFontFamily(titleFontFamily, props.bracketStateName)),
    setNameFontFamily: (nameFontFamily) => dispatch(setNameFontFamily(nameFontFamily, props.bracketStateName)),
    setTextFontFamily: (textFontFamily) => dispatch(setTextFontFamily(textFontFamily, props.bracketStateName)),
    setWinsTextFontFamily: (winsTextFontFamily) => dispatch(setWinsTextFontFamily(winsTextFontFamily, props.bracketStateName)),
    incrementFontFamilyChanged: () => dispatch(incrementFontFamilyChanged(props.bracketStateName)),
    setTitleFontStyle: (titleFontStyle) => dispatch(setTitleFontStyle(titleFontStyle, props.bracketStateName)),
    setTextFontStyle: (textFontStyle) => dispatch(setTextFontStyle(textFontStyle, props.bracketStateName)),
    setWinsFontStyle: (winsFontStyle) => dispatch(setWinsFontStyle(winsFontStyle, props.bracketStateName)),
    incrementFontStyleChanged: () => dispatch(incrementFontStyleChanged(props.bracketStateName)),
    setSvgBackgroundColor: (svgBackgroundColor) => dispatch(setSvgBackgroundColor(svgBackgroundColor, props.bracketStateName)),
    incrementBackgroundColorChanged: () => dispatch(incrementBackgroundColorChanged(props.bracketStateName)),
    startSubmitBracket: (state) => dispatch(startSubmitBracket(state, props.bracketStateDatabase)),
  };
  
} 
export default connect(mapStateToProps, mapDispatchToProps)(RadialBracketPage);