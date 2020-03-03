import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

class Navbar extends React.Component {
  state = { activeItem: 'home', modalOpen: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  openModal = e => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  };

  render() {
    return (
      <Menu secondary inverted color="purple">
        <Dropdown item icon="bars" simple>
          <Dropdown.Menu>
            <Dropdown.Item>Team Stats</Dropdown.Item>
            <Dropdown.Item>Player Stats</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Compare Stats</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

export default Navbar;
