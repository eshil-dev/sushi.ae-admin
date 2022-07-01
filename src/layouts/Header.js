import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user4 from "../assets/images/users/user4.jpg";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/usersSlice";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";


const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut());
    navigate('/login', { replace: true });
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar style={{backgroundColor: '#008e07'}} dark expand="md" className="">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
        </NavbarBrand>
        <Button
          color="light"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>

        {/* hide the header logo  on sm screen */}
        {/* <Logo className="d-lg-none"/> */}
        
      </div>
      <div className="hstack gap-2">
        <Button
          color="light"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar />
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user4}
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
