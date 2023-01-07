import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigator("/login");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand>Monitor & Evaluation System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userInfo?.user ? (
              <>
                <Nav.Link href="/add">Add Program</Nav.Link>
                <Nav.Link href="/kpis">KPIS</Nav.Link>
                <Nav.Link href="/implement">Implement Program</Nav.Link>

                <NavDropdown
                  title={userInfo?.user?.name}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/" style={{ fontWeight: "bold" }}>
                    Programs
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/login"
                    onClick={logoutHandler}
                    style={{ fontWeight: "bold" }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {userInfo?.user?.isAdmin ? (
                  <NavDropdown
                    title={"admin"}
                    id="basic-nav-dropdown"
                    style={{ display: "flex", justifyContent: "space-end" }}
                  >
                    <NavDropdown.Item
                      href="/admin/apps"
                      style={{ fontWeight: "bold" }}
                    >
                      All Programs
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : null}
              </>
            ) : (
              <Nav.Link href="/login">Sign In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
