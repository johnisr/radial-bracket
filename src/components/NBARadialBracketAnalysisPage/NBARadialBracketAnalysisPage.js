import React from 'react';
import Header from '../Header/Header';
import RadialBracketAnalysisContainer from '../RadialBracketAnalysisContainer/RadialBracketAnalysisContainer';
import baseTeams from '../../data/nbaBaseTeams';
import baseBracket from '../../data/nbaBaseBracket';
import teamNames from '../../data/nbaNames';
import fonts from '../../data/fonts';
import fontStyle from '../../data/fontStyle';
import teamColours from '../../data/nbaColours';
import roundNames from '../../data/roundNames';

const NBARadialBracketAnalysisPage = (props) => {

  return (
    <div className="NBARadialBracketAnalysisPage__row">
      <section className="section__full-start-end">
        <Header />
      </section>
      <section className="section__center-start-end">
        <RadialBracketAnalysisContainer
          baseTeams={baseTeams}
          baseBracket={baseBracket}
          teamNames={teamNames}
          fonts={fonts}
          fontStyle={fontStyle}
          teamColours={teamColours}
          roundNames={roundNames}
          bracketStateName={'nba'}
        />
      </section>
    </div>
  );
};

export default NBARadialBracketAnalysisPage;