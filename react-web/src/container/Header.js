import React from "react";
import logo from '../img/logo2.jpg';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/auth";

const Header = () => {
  const dispatch = useDispatch();
  const userInfor = useSelector((state) => state.auth.userInfor);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <img src={logo} style={{ width: "50px", height: "50px" }} className="logo" alt="logo" />
            &ensp;
            Quản lý web bán hàng
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/productcategory">Loại Sản phẩm</Nav.Link>
              <Nav.Link as={Link} to="/product">Kho Sản phẩm</Nav.Link>
              <Nav.Link as={Link} to="/code">Mã giảm giá chung</Nav.Link>
              <Nav.Link as={Link} to="/employee">Nhân viên</Nav.Link>
              <Nav.Link as={Link} to="/user/member">Khách hàng</Nav.Link>
              <Nav.Link as={Link} to="/report">Báo cáo</Nav.Link>
              <Nav.Link as={Link} to="/revenue">Doanh thu</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/home"> {userInfor.fullName}</Nav.Link>
              <Nav.Link onClick={() => dispatch(logout())} as={Link} to="/main/main"><i className="bi-box-arrow-right"></i></Nav.Link>

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

  );
};
export default Header;