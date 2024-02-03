import React from "react";
import logo from '../../img/logonam2.jpg'
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import '../../App.css';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/main/main">
            <div className="logo-container">
              <img src={logo} style={{ width: "70px", height: "70px" }} className="logo" alt="logo" />
              <span className="shop-name">SHOP QUẦN ÁO NAM</span>
              <span className="shop-name">Trang chủ</span>
              <Nav
                style={{ marginLeft: "350px", fontSize: "17px" }}><span className="contact-info">ĐC: Điện Biên Phủ - P15 - Bình Thạnh</span>
                <span className="contact-info">SĐT: 0399597551</span></Nav>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>

  );
};
export default Header;