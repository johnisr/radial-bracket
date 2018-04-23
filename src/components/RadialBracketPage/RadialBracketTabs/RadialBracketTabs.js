import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../Tabs/Tabs';
import RadialBracketColours from './RadialBracketColours/RadialBracketColours';
import RadialBracketFonts from './RadialBracketFonts/RadialBracketFonts';
import RadialBracketFontStyle from './RadialBracketFontStyle/RadialBracketFontStyle';

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
        />
      </TabPanel>
      <TabPanel>
        <RadialBracketFonts
          onFontChange={props.onFontChange}
        />
      </TabPanel>
      <TabPanel>
        <RadialBracketFontStyle
          onFontStyleChange={props.onFontStyleChange}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default RadialBracketTabs;