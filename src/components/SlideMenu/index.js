import React from 'react';
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import styled from '@emotion/styled';
import withSizes from 'react-sizes'

const StyledSlideMenu = styled.div`
  position: relative;
  top: 0;
  left: 0;
  z-index: 5;
  min-height: 100vh;
`;

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
});

export class SlideMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    if (!this.props.isMobile){
      this.state = {
        visible: false
      };
    } else if(this.props.isMobile){
      this.state = {
        visible: true
      };
    }

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
        <MenuButton menuVisibility={this.state.visible} handleMouseDown={this.handleMouseDown}/>
        <Menu handleMouseDown={this.handleMouseDown}
            menuVisibility={this.state.visible}/>
      </StyledSlideMenu>
    );
  }
}

export default withSizes(mapSizesToProps)(SlideMenu);
