import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../Tabs/Tabs';
import RadialBracketColours from './RadialBracketColours/RadialBracketColours';

const RadialBracketTabs = (props) => (
  <Tabs>
    <TabList>
      <Tab>Change Colors</Tab>
      <Tab></Tab>
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
        
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default RadialBracketTabs;