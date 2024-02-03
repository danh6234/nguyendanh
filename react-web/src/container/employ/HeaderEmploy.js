import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/member";
import profileEmployservice from '../../services/employ/profileEmployService';
import { useEffect, useState } from "react";

const Header = () => {
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    profileEmployservice.get().then((res) => {
      setProfileData(res.data);
    })
  }, []);
  const dispatch = useDispatch();
  const userInfor = useSelector((state) => state.employ.userInfor);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/employ/home">
            <img src={profileData.ImageUrl}
              style={{ width: "50px", height: "50px" }}
              className="img-thumnail rounded-circle border-primary" alt="Avatar" />
            &ensp;
            {userInfor.username}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/employ/handlecartitem">Xử lý đơn hàng</Nav.Link>
              <Nav.Link as={Link} to="/employ/handlecartitemship">Xử lý đơn giao hàng</Nav.Link>
              <Nav.Link as={Link} to="/employ/report">Tạo báo cáo</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/employ/profile">Thông tin Nhân viên</Nav.Link>
              <Nav.Link onClick={() => dispatch(logout())} as={Link} to="/main/main">Đăng xuất &ensp; <i className="bi-box-arrow-right"></i></Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;