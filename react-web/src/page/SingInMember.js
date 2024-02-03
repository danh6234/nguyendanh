import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img from '../img/ao-da-banh-nu-4.jpg'
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/member";
import memberServices from "../services/member/memServices";
import { useNavigate } from "react-router-dom";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Shop Nguyễn Danh
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInMember() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mess, setMess] = useState("");





  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    memberServices.login(data.get('email'), data.get('password')).then((res) => {
      if (res.errorCode === 0) {
        setMess("");
        dispatch(login({
          token: res.data.token,
          userInfor: res.data
        }))
        navigate("/member/product");
      } else {
        setMess(res.message);
      }
    });
  };
  const handleToSigUpMember = () => {
    navigate("/main/singup");
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ĐĂNG NHẬP
            </Typography>
            <p className="text-center text-danger">{mess}</p>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >

                ĐĂNG NHẬP
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleToSigUpMember}>
                    {"Bạn chưa có tài khoản? Đăng ký"}
                  </Link>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}