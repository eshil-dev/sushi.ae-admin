import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Orders",
    href: "/orders",
    icon: "bi bi-columns",
  },
  {
    title: "Add Category",
    href: "/add-category",
    icon: "bi bi-patch-check",
  },
  {
    title: "Categories",
    href: "/categories",
    icon: "bi bi-bell",
  },

  {
    title: "Add Menu",
    href: "/add-menu",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Menus",
    href: "/menus",
    icon: "bi bi-card-text",
  },
  {
    title: "Add new user",
    href: "/add-user",
    icon: "bi bi-columns",
  },
  {
    title: "Manage users",
    href: "/manage-user",
    icon: "bi bi-columns",
  },
  {
    title: "Customers",
    href: "/customers",
    icon: "bi bi-columns",
  },
];

const Sidebar = () => {
  const showMobilemenu = (e) => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="lg"
          className="ms-auto d-lg-none "
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                onClick={() => showMobilemenu()}
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
