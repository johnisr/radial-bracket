import React from 'react';
import './Tabs.css';

export const TabList = (props) => {
  const { activeIndex } = props;
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      onActivate: () => {
        props.onActiveTab(index)
      }
    });
  });
  return (
    <div className="tabs">{children}</div>
  );
}

export const Tab = (props) => {
  const isDisabled = props.isDisabled;
  const isActive = props.isActive;
  const style = isDisabled ? "tab tab--disabled" :
    isActive ? "tab tab--active" : "tab";
  return (
    <div
      className={style}
      onClick={isDisabled ? null : () => props.onActivate()}
    >
      {props.children}
    </div>
  );
}

export const TabPanels = (props) => {
  const activeIndex = props.activeIndex;
  return (
    <div className="tabPanels">
      {props.children[activeIndex]}
    </div>
  );
}

export const TabPanel = (props) => (
  <div>
    {props.children}
  </div>
)

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: this.props.activeIndex ? this.props.activeIndex : 0
    };
  }
  selectTabIndex(activeIndex) {
    this.setState({ activeIndex });
  }
  componentWillReceiveProps = (nextProps) => {
    const { activeIndex } = nextProps;
    this.setState({ activeIndex });
  }
  
  render() {
    const activeIndex = this.state.activeIndex;
    const children = React.Children.map(this.props.children, (child) => {
      if (child.type === TabPanels) {
        return React.cloneElement(child, { activeIndex });
      } else if (child.type === TabList) {
        return React.cloneElement(child, {
          activeIndex,
          onActiveTab: (activeIndex) => {
            this.setState({ activeIndex });
          }
        });
      } else {
        return child;
      } 
    });
    return (
      <div>
        {children}
      </div>
    )
  }
}

export const DataTabs = (props) => {
  const { data } = props;
  return (
    <Tabs>
      <TabList>
        {data.map(tab => (
          <Tab>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map(tab => (
          <TabPanel>{tab.description}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};