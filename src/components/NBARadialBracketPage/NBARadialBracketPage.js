import React from 'react';
import Header from '../Header/Header';
import RadialBracketPage from '../RadialBracketPage/RadialBracketPage';
import baseTeams from '../../data/baseTeams';
import baseBracket from '../../data/baseBracket';
import teamNames from '../../data/nbaNames';
import fonts from '../../data/fonts';
import fontStyle from '../../data/fontStyle';
import teamColours from '../../data/nbaColours';
import teamLogos from '../../data/nbaLogos';
import { startSubmitNBABracket } from '../../actions/bracket';

const NBARadialBracketPage = (props) => {

  return (
    <div className="RadialBracketPage__row">
      <section className="section__full-start-end">
        <Header />
      </section>
      <section className="section__full-start-end">
        <RadialBracketPage
          baseTeams={baseTeams}
          baseBracket={baseBracket}
          teamNames={teamNames}
          fonts={fonts}
          fontStyle={fontStyle}
          teamColours={teamColours}
          teamLogos={teamLogos}
          titleText={'NBA 2018 Playoffs'}
          startSubmitBracket={startSubmitNBABracket}
        />
      </section>
    </div>
  );
};

export default NBARadialBracketPage;
