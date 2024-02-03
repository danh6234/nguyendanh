import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import anh1 from '../../img/nennam4.jpg';
import anh2 from '../../img/nennam2.jpg'
import '../../App.css';
import SearchIcon from '@mui/icons-material/Search';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Nguyễn Danh Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  const handleToLoginMember = () => {
    navigate("/main/singin");
  }
  const handleToSingUp = () => {
    navigate("/main/singup");
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Button
          onClick={handleToLoginMember}
          style={{ width: '100%', marginTop: '50px', marginBottom: '10px', fontSize: "30px", alignItems: "center", fontWeight: "bold" }}
        > TẤT CẢ SẢN PHẨM  <SearchIcon style={{ marginLeft: '10px', fontSize: "40px", color: "black" }} />
        </Button>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img src={anh1} alt="image1" width="100%" height="800px" />
            </Grid>

            <Grid item xs={12} md={4}>
              <Container maxWidth="sm" className='mt-5'>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  Shop Quần Áo Nam Thành Danh
                </Typography>
                <Typography variant="h5" align="center" color="text.primary" paragraph className="my-text"
                  style={{
                    fontStyle: "italic", fontSize: "20px"
                  }}>
                  Bán các loại quần áo theo mùa, theo các concept riêng... Mua sắm theo sở thích của bạn !
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button style={{ width: '250px', fontWeight: "bold", color: "black", fontSize: "17px" }}
                    onClick={handleToSingUp}
                    variant="outlined">ĐĂNG KÝ KHÁCH HÀNG</Button>
                </Stack>
              </Container>
            </Grid>

            <Grid item xs={12} md={4}>
              <img src={anh2} alt="image1" width="100%" height="100%" />
            </Grid>
          </Grid>
        </Box>


      </main>
      {/* Footer */}
      <Navbar style={{ color: "white" }}
        bg="dark"
        variant="dark h5" expand="md"
        className='justify-content-center' >
        Thông tin liên hệ
      </Navbar>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.primary"
        component="p"
      >
        Zalo: 0399597551 - FB: Nguyễn Danh
        Đc: P15.Điện Biên Phủ-Bình Thạnh
      </Typography>
      <Copyright />
      {/* End footer */}
    </ThemeProvider>
  );
}