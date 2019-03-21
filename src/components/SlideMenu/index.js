import React from 'react';
import SideBar from './SideBar';
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import styled from '@emotion/styled';

const StyledSlideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
`;

export class SlideMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();

    console.log("clicked");
    e.stopPropagation();
  }

  toggleMenu() {
    this.setState(
      {
        visible: !this.state.visible
      }
    );
  }
  render() {
    return (
      <StyledSlideMenu>
        <MenuButton handleMouseDown={this.handleMouseDown}/>
        <Menu handleMouseDown={this.handleMouseDown}
            menuVisibility={this.state.visible}/>
        <SideBar />
      </StyledSlideMenu>
    );
  }
}

export default SlideMenu;
