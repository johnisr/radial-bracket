import React from 'react';
import Header from '../Header/Header';
import RadialBracketPage from '../RadialBracketPage/RadialBracketPage';
import baseTeams from '../../data/nhlBaseTeams';
import baseBracket from '../../data/nhlBaseBracket';
import teamNames from '../../data/nhlNames';
import fonts from '../../data/fonts';
import fontStyle from '../../data/fontStyle';
import teamColours from '../../data/nhlColours';
import teamLogos from '../../data/nhlLogos';
import './NHLRadialBracketPage.css';

const NHLRadialBracketPage = (props) => {

  return (
    <div className="NHLRadialBracketPage__row">
      <section className="section__full-start-end">
        <Header />
      </section>
      <section className="section__center-start-end">
        <RadialBracketPage
          baseTeams={baseTeams}
          baseBracket={baseBracket}
          teamNames={teamNames}
          fonts={fonts}
          fontStyle={fontStyle}
          teamColours={teamColours}
          teamLogos={teamLogos}
          titleText={'NHL 2018 Playoffs'}
          bracketStateName={'nhl'}
          bracketStateDatabase={'nhl'}
        />
      </section>
    </div>
  );
};

export default NHLRadialBracketPage;