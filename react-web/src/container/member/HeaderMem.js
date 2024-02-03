import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/member";
import profileMember from '../../services/member/profileMember';
import { useEffect, useState } from "react";
import '../../App.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    profileMember.get().then((res) => {
      setProfileData(res.data);
    })
  }, []);
  const dispatch = useDispatch();
  const userInfor = useSelector((state) => state.member.userInfor);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/member/profile" >
            <img src={profileData.ImageUrl}
              style={{ width: "50px", height: "50px" }}
              className="img-thumnail rounded-circle border-primary" alt="Avatar" />
            &ensp;
            {userInfor.username}
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ color: "white", fontSize: "17px", fontWeight: "bold" }} className="contact-info" as={Link} to="/member/product">Sản phẩm</Nav.Link>
              <Nav.Link style={{ color: "white", fontSize: "17px", fontWeight: "bold" }} className="contact-info" as={Link} to="/member/cartitem">Giỏ hàng
                <ShoppingCartIcon style={{ marginLeft: '5px', marginBottom: "5px" }} />
              </Nav.Link>

              <Nav.Link style={{ color: "white", fontSize: "17px", fontWeight: "bold" }} className="contact-info" as={Link} to="/member/handlecartitem">Lịch sử
                <ShoppingCartIcon style={{ marginLeft: '5px', marginBottom: "5px" }} />
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link style={{ color: "white", fontSize: "17px", fontWeight: "bold" }} className="contact-info" as={Link} to="/member/profile">
                Thông tin KH
                <PersonIcon style={{ marginLeft: '5px', marginBottom: "5px" }} />

              </Nav.Link>
              <Nav.Link style={{ color: "white", fontSize: "17px", fontWeight: "bold" }} onClick={() => dispatch(logout())} as={Link} to="/main/main">Đăng xuất &ensp; <i className="bi-box-arrow-right"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;