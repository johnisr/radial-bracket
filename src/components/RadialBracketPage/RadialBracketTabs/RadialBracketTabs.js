import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../Tabs/Tabs';
import RadialBracketColours from './RadialBracketColours/RadialBracketColours';

const RadialBracketTabs = (props) => (
  <Tabs>
    <TabList>
      <Tab>Change Colors</Tab>
      <Tab>Other</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <RadialBracketColours
          teams={props.teams}
          onActiveTeamChange={props.onActiveTeamChange}
          activeTeamIndex={props.activeTeamIndex}
          onColorChange={props.onColorChange}
        />
      </TabPanel>
      <TabPanel>
        Another
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default RadialBracketTabs;