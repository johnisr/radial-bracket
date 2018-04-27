import React from 'react';
import Header from '../Header/Header';
import RadialBracketAnalysisContainer from '../RadialBracketAnalysisContainer/RadialBracketAnalysisContainer';
import baseTeams from '../../data/nhlBaseTeams';
import baseBracket from '../../data/nhlBaseBracket';
import teamNames from '../../data/nhlNames';
import fonts from '../../data/fonts';
import fontStyle from '../../data/fontStyle';
import teamColours from '../../data/nhlColours';
import roundNames from '../../data/roundNames';

const NHLRadialBracketAnalysisPage = (props) => {

  return (
    <div className="NHLRadialBracketAnalysisPage__row">
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
          bracketStateName={'nhl'}
        />
      </section>
    </div>
  );
};

export default NHLRadialBracketAnalysisPage;