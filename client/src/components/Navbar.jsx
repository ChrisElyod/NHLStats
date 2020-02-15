import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Input, Menu, Divider, Icon } from 'semantic-ui-react';

class Navbar extends React.Component {
  state = { activeItem: 'home', modalOpen: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  openModal = e => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu
        secondary
        inverted
        pointing
        color="blue"
        style={{ marginBottom: 0 }}
      >
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={() => this.openModal}
        >
          <Icon name="bars" size="big" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            name="NHL Stats"
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
            color="blue"
          />
          <Menu.Item
            as={Link}
            name="League Stats"
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
            color="yellow"
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
