import React from 'react';
import { shallow } from 'enzyme';
import { TabList, Tab, TabPanels, TabPanel, Tabs } from './Tabs';

it('should render TabList', () => {
  const wrapper = shallow(<TabList
    activeIndex={0}
    children={
      <div>
        <Tab />
        <Tab />
      </div>
    }
  />);
  expect(wrapper).toMatchSnapshot();
});

it('should render active Tab', () => {
  const wrapper = shallow(<Tab
    isDisabled={false}
    isActive={true}
    children={<p>Hello</p>}
  />);
  expect(wrapper).toMatchSnapshot();
});

it('should render disabled Tab', () => {
  const wrapper = shallow(<Tab
    isDisabled={true}
    isActive={false}
    children={<p>Hello</p>}
  />);
  expect(wrapper).toMatchSnapshot();
});

it('should render normal Tab', () => {
  const wrapper = shallow(<Tab
    isDisabled={false}
    isActive={false}
    children={<p>Hello</p>}
  />);
  expect(wrapper).toMatchSnapshot();
});

it('should render TabPanels', () => {
  const wrapper = shallow(<TabPanels
    activeIndex={0}
    children={
      <div>
        <TabPanel />
        <TabPanel />
      </div>
    }
  />);
  expect(wrapper).toMatchSnapshot();
});

it('should render TabPanel', () => {
  const wrapper = shallow(<TabPanel children={<p>Hello</p>}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should render Tabs', () => {
  const wrapper = shallow(<TabPanel activeIndex={0} children={
    <Tabs>
      <TabList>
        <Tab>Hello</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>World</TabPanel>
      </TabPanels>
    </Tabs>
  }/>);
  expect(wrapper).toMatchSnapshot();
});