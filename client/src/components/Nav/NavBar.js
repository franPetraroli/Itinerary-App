import React from 'react';
import { Menu, Button, Container, Image, Dropdown } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import Signout from '../Auth/Signout';

const NavBar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
  </nav>
);

const NavbarUnAuth = () => (
  <Menu fixed="top">
    <Container>
      <Menu.Item header as={NavLink} to="/">
        {/* <img src="assets/logo.png" alt="logo" /> */}
        Itinerary App
      </Menu.Item>
      <Menu.Item as={Link} to="/search" name="Search" />
      <Menu.Item position="right">
        <Button as={Link} to="/signin" content="Login" />
        <Button as={Link} to="/signup" basic content="Sign Out" style={{ marginLeft: '0.5em' }} />
      </Menu.Item>
    </Container>
  </Menu>
);

const NavbarAuth = ({ session }) => (
  <Menu fixed="top">
    <Container>
      <Menu.Item inverted header as={NavLink} to="/">
        {/* <img src="assets/logo.png" alt="logo" /> */}
        Itinerary App
      </Menu.Item>
      <Menu.Item as={NavLink} to="/search" name="Search" />
      <Menu.Item>
        <h4>Welcome, {session.getCurrentUser.username}</h4>
      </Menu.Item>
      <Menu.Item position="right">
        <Image avatar spaced="right" src="/user.png" />
        <Dropdown pointing="top left" text="Account">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/create" text="Create Itinerary" icon="plus" />
            <Dropdown.Item as={Link} to="/myitineraries" text="My Itinerary" icon="calendar" />
            <Dropdown.Item as={Link} to="/mynetwork" text="My Network" icon="users" />
            <Dropdown.Item as={Link} to="/profile" text="My Profile" icon="user" />
            <Dropdown.Item as={Link} to="/settings" text="Settings" icon="settings" />
            <Signout />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
