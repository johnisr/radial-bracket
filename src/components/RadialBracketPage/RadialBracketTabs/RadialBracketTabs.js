import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../Tabs/Tabs';
import RadialBracketColours from './RadialBracketColours/RadialBracketColours';
import RadialBracketFonts from './RadialBracketFonts/RadialBracketFonts';
import RadialBracketFontStyle from './RadialBracketFontStyle/RadialBracketFontStyle';
import './RadialBracketTabs.css';

const RadialBracketTabs = (props) => (
  <Tabs>
    <TabList>
      <Tab>
        <p className="RadialBracketTabs__text">Colors</p>
      </Tab>
      <Tab>
        <p className="RadialBracketTabs__text">Fonts</p>
      </Tab>
      <Tab>
        <p className="RadialBracketTabs__text">Font Style</p>
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <RadialBracketColours
          teams={props.teams}
          onActiveTeamChange={props.onActiveTeamChange}
          activeTeamIndex={props.activeTeamIndex}
          onColorChange={props.onColorChange}
          textFontFamily={props.textFontFamily}
          nbaNames={props.nbaNames}
          nbaColours={props.nbaColours}
          fonts={props.fonts}
        />
      </TabPanel>
      <TabPanel>
        <RadialBracketFonts
          onFontChange={props.onFontChange}
          fonts={props.fonts}
        />
      </TabPanel>
      <TabPanel>
        <RadialBracketFontStyle
          onFontStyleChange={props.onFontStyleChange}
          fontStyle={props.fontStyle}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default RadialBracketTabs;