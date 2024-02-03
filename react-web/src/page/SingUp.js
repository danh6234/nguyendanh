import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Singup from '../services/member/singup'
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../component/Input";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const navigate = useNavigate();
  const handleToLoginMember = () => {
    navigate("/main/singin");
  }

  const formik = useFormik({
    initialValues: {
      id: 0,
      lastname: "",
      firstname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required()
      ,
      lastname: Yup.string().required("Required").min(2, "Lớn hơn 5 ký tự")
      ,
      firstname: Yup.string().required("Required").min(2, "Lớn hơn 2 ký tự")
      ,
      phone: Yup.string().matches(/^\d{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
        .required('Số điện thoại là bắt buộc')
      ,
      email: Yup.string()
        .email('Email không hợp lệ')
        .matches(/@gmail\.com$/, 'Email phải kết thúc bằng @gmail.com')
        .required('Email là bắt buộc'),
      username: Yup.string().required("Required").min(5, "Lớn hơn 5 ký tự")
      ,
      password: Yup.string().required("Required").min(5, "Lớn hơn 5 ký tự")
      ,

    }),
    onSubmit: (values) => {
      handleSubmidSingup(values);
    },
  });

  const handleSubmidSingup = (data) => {
    const dataAdd = {
      "firstname": data.firstname,
      "lastname": data.lastname,
      "email": data.email,
      "username": data.username,
      "password": data.password,
      "phone": data.phone,
    }
    Singup.add(dataAdd).then((res) => {
      if (res.errorCode === 0) {
        toast.success("Tạo thành công !");
        navigate("/main/singin");
      } else toast.error("Email hoặc tài khoản đã tồn tại !");
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Input
                  frmField={formik.getFieldProps("firstname")}
                  errMessage={formik.touched.firstname && formik.errors.firstname}
                  id="txtfirstName"
                  lable="Họ"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  frmField={formik.getFieldProps("lastname")}
                  errMessage={formik.touched.lastname && formik.errors.lastname}
                  id="lastname"
                  lable="Tên"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  frmField={formik.getFieldProps("phone")}
                  errMessage={formik.touched.phone && formik.errors.phone}
                  id="txtphone"
                  lable="Số điện thoại"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  frmField={formik.getFieldProps("email")}
                  errMessage={formik.touched.email && formik.errors.email}
                  id="txtemail"
                  lable="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  frmField={formik.getFieldProps("username")}
                  errMessage={formik.touched.username && formik.errors.username}
                  id="txtusername"
                  lable="Tài khoản"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  type="text"
                  frmField={formik.getFieldProps("password")}
                  errMessage={formik.touched.password && formik.errors.password}
                  id="txtpassword"
                  lable="Mật khẩu"
                />
              </Grid>
            </Grid>

            <Button
              disabled={!formik.dirty || !formik.isValid}
              onClick={formik.handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "100%" }} // Thêm thuộc tính width
            >
              Đăng ký
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" onClick={handleToLoginMember} variant="body2">
                  Bạn đã có tài khoản đăng nhập ?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}