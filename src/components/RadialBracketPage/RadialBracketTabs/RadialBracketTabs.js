import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../Tabs/Tabs';
import RadialBracketColours from './RadialBracketColours/RadialBracketColours';
import RadialBracketFonts from './RadialBracketFonts/RadialBracketFonts';

const RadialBracketTabs = (props) => (
  <Tabs>
    <TabList>
      <Tab>Colors</Tab>
      <Tab>Fonts</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <RadialBracketColours
          teams={props.teams}
          onActiveTeamChange={props.onActiveTeamChange}
          activeTeamIndex={props.activeTeamIndex}
          onColorChange={props.onColorChange}
          textFontFamily={props.textFontFamily}
        />
      </TabPanel>
      <TabPanel>
        <RadialBracketFonts
          teams={props.teams}
          onActiveTeamChange={props.onActiveTeamChange}
          activeTeamIndex={props.activeTeamIndex}
          onFontChange={props.onFontChange}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default RadialBracketTabs;