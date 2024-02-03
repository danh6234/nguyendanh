import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../App.css';
import { Button, Col, Row } from "react-bootstrap";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import productService from '../services/productService';
import memberServices from '../services/memberService';
import ordetailServices from '../services/oderdetailService';
import { toast } from "react-toastify";

const theme = createTheme();

export default function Revenue() {
  const [product, setProduct] = useState([]);
  const [productexpense, setProductExpense] = useState([]);
  const [member, setMember] = useState([]);
  const [totaloder, setTotaloder] = useState([]);
  const [countdown, setCountdown] = useState('');
  const [month, setmonth] = useState(null);
  const [statustime, setStatusTime] = useState(false);

  const loadData = () => {

    productService.list().then((res) => {
      const totalProduct = res.data.length;
      setProduct(totalProduct);
      const totalProductExpense = res.data.reduce((sum, product) => sum + Number((product.Price) * product.Status), 0);
      setProductExpense(totalProductExpense);
    });

    memberServices.list().then((res) => {
      const totalMembers = res.data.length;
      setMember(totalMembers);
    });

    ordetailServices.list().then((res) => {
      const totalPrice = res.data.reduce((sum, oder) => sum + Number(oder.Price), 0);
      setTotaloder(totalPrice);
    });
  }

  const handleClear = (e) => {
    if (e) e.preventDefault();
    if (statustime === true) {
      ordetailServices.delete();
      ordetailServices.deleteOder();
      toast.warn(" Làm mới thành công !");
    } else { toast.error(`Còn ${countdown} nữa !`); }
    console.log(statustime)
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const monthyear = `${month}-${year}`;
    setmonth(monthyear);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    // const targetDate = new Date(currentDate.getTime() + 10 * 1000);

    const calculateCountdown = () => {
      const timeDifference = targetDate.getTime() - new Date().getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const countdownText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setCountdown(countdownText);
      if (timeDifference <= 0) {
        setStatusTime(true);
      } else {
        setStatusTime(false);
      }
    };

    calculateCountdown();

    const interval = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Row>
          <Button variant="light"
            style={{
              fontSize: "25px", fontWeight: "bold", color: "red"
            }}
            onClick={(e) => handleClear(e)}
          >LÀM MỚI</Button>
        </Row>
        <Row>
          <Col>
            <Container sx={{ py: 12, display: 'flex', justifyContent: 'center' }} maxWidth="">
              <Grid container spacing={-30}>

                <Grid item xs={8}>
                  <Card
                    sx={{ height: '200px', width: "750px" }}
                  >
                    <CardContent sx={{ height: '120px' }}>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          fontWeight: 'bold', color: "green"
                        }}>
                        TỔNG DOANH THU THÁNG {month}
                        <button style={{
                          marginLeft: '2em', fontSize: "20px", fontWeight: 'bold', border: '1px solid gray',
                          borderColor: 'gray', color: "red"
                        }}>Kết thúc: {countdown}</button>

                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          marginLeft: "10px", marginTop: "40px", color: "red"
                        }}
                      >
                        {totaloder} VND
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

                <Grid item xs={2}>
                  <Card
                    sx={{ height: '200px', width: "300px" }}
                  >
                    <CardContent sx={{ height: '120px' }}>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          fontWeight: 'bold', color: "green"
                        }}>
                        TỔNG KHÁCH HÀNG
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          marginLeft: "10px", marginTop: "40px", color: "red"
                        }}
                      >
                        {member} Khách Hàng
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    sx={{ height: '200px', width: "500px", display: 'flex', flexDirection: 'column', marginTop: "30px" }}
                  >
                    <CardContent sx={{ height: '120px' }}>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          fontWeight: 'bold', color: "green"
                        }}>
                        TỔNG SẢN PHẨM
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          marginLeft: "10px", marginTop: "40px", color: "red"
                        }}
                      >
                        {product} Sản Phẩm
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    sx={{ height: '200px', width: "500px", display: 'flex', flexDirection: 'column', marginTop: "30px" }}
                  >
                    <CardContent sx={{ height: '120px' }}>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          fontWeight: 'bold', color: "green"
                        }}>
                        TỔNG CHI SẢN PHẨM
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2"
                        style={{
                          marginLeft: "10px", marginTop: "40px", color: "red"
                        }}
                      >
                        {productexpense} VND
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </Container></Col>
        </Row>

      </main>
    </ThemeProvider>
  );
}