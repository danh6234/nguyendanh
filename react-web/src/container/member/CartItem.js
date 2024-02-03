import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import logo from "../../img/cartitempng.png";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import CartItemService from '../../services/member/cartitemService';
import profileMember from '../../services/member/profileMember';
import Input from '../../component/Input';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
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

export default function CartItem() {
  const [products, setProducts] = useState([]);
  const [listcode, setListCode] = useState([]);
  const [Pricesale, setPriceSale] = useState([]);
  const [transport, setTransPort] = useState(10000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [nameproduct, setNameProduct] = useState([]);
  const [idproduct, setIDProduct] = useState([]);
  const [qualityproduct, setQualityProuct] = useState([]);
  const [modalshow, setShowModal] = useState(false);
  const [modalshowsubmid, setShowModalSubMid] = useState(false);
  const [modalshowDelete, setShowModalDelete] = useState(false);
  const [valueId, setValueId] = useState(0);
  const [sale, setSale] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [date, setdate] = useState(null);
  const [updatedDate, setUpdatedDate] = useState(null);
  const [valuetransport, setvaluetransport] = useState(3);

  const handleToProduct = () => {
    window.location.replace("http://localhost:3000/member/product");
  }
  const handleModalClose = () => setShowModal(false);

  const handleModalShow = () => setShowModal(true);

  const handleModalCloseSubMid = () => setShowModalSubMid(false);

  const handleModalShowSubMid = () => setShowModalSubMid(true);

  const formik = useFormik({
    initialValues: {
      Phone: "",
      Address: "",
    },
    validationSchema: Yup.object({
      Phone: Yup.string().matches(/^\d{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
        .required('Số điện thoại là bắt buộc'),
      Address: Yup.string().required("Required").min(5, "Lớn hơn 5 ký tự"),
    }),
    onSubmit: (values) => {
      handleSubmid(values);
    },
  });
  const handleSubmid = (data) => {
    const dataAdd = {
      "NameProduct": nameproduct.join(', '),
      "IdProduct": idproduct.join(', '),
      "QualityProduct": qualityproduct.join(', '),
      "Status": 0,
      "IdMember": profileData.id,
      "NameMember": profileData.lastname,
      "TotalPrice": totalPrice,
      "TransPort": transport,
      "PriceSale": sale,
      "TotalPay": totalPay,
      "Phone": data.Phone,
      "Address": data.Address,
      "Oderdate": date,
      "Expecteddate": updatedDate,
    }
    CartItemService.add(dataAdd).then((res) => {
      if (res.errorCode === 0) {
        handleModalCloseSubMid()
        toast.success("Gửi đơn thành công chờ xử lý!");
      } else toast.error("Thêm thất bại !");
    });

    CartItemService.clear(profileData.id);
    loadData();
  }

  const ShowModalHandlerSubMid = () => {
    handleModalShowSubMid();
  };

  const loadData = () => {
    //load profile
    profileMember.get().then((res) => {
      setProfileData(res.data);
    })
    //get theo profile
    CartItemService.get(profileData.id).then((res) => {
      setProducts(res.data);
      const productNames = Object.values(res.data).map(item => item.Name);
      setNameProduct(productNames);
      const IdProducts = Object.values(res.data).map(item => item.IdProduct);
      setIDProduct(IdProducts);
      const QualityProduct = Object.values(res.data).map(item => item.Quality);
      setQualityProuct(QualityProduct);
      setTotalPrice(res.data.reduce((sum, product) => sum + (product.Price * product.Quality), 0));
      setTotalPay((res.data.reduce((sum, product) => sum + (product.Price * product.Quality), 0) + transport - sale));
      setPriceSale(res.data.reduce((sum, product) => sum + (product.PriceSale * product.Quality), 0));
    })
  };

  const ShowModalHandler = () => {
    handleModalShow();
  };
  const handleModalCloseDelete = () => setShowModalDelete(false);

  const handleModalShowDelete = () => setShowModalDelete(true);

  const ShowModalHandlerDelete = (e, id) => {
    if (e) e.preventDefault();
    setValueId(id);
    handleModalShowDelete();
  };

  const handleDelete = (e, id) => {
    console.log(id)
    e.preventDefault();
    CartItemService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        handleModalCloseDelete();
        toast.warn(" Xóa thành công !");
      } else { toast.error("Xóa thất bại !"); }
    });
  }

  const TransPortonChange = (e) => {
    setTransPort(Number(e.target.value));
    if (transport === 10000) {
      setvaluetransport(2);
    } else (setvaluetransport(3))
  }

  const buttonTotalSale = () => {
    setSale(Pricesale);
    setTotalPay((products.reduce((sum, product) => sum + (product.Price * product.Quality), 0) + transport - sale));
    handleModalClose();
  }

  const buttonSaleAll = (e, id) => {
    if (e) e.preventDefault();
    if (id) {
      if (id === 2) {
        CartItemService.getSalePrice(id).then((res) => {
          if (res.data.IdCode === id && productCount === 2) {
            setSale(res.data.PriceSale)
            setTotalPay((products.reduce((sum, product) => sum + (product.Price * product.Quality), 0) + transport - sale))
            toast.success("Mã giảm giá đã được áp dụng !");
            handleModalClose();
          } else {
            toast.error("Bạn phải mua 2 sản phẩm !");
          }
        });
      } else if (id === 3) {
        CartItemService.getSalePrice(id).then((res) => {
          if (res.data.IdCode === id && productCount === 3) {
            setSale(res.data.PriceSale)
            setTotalPay((products.reduce((sum, product) => sum + (product.Price * product.Quality), 0) + transport - sale))
            toast.success("Mã giảm giá đã được áp dụng !");
            handleModalClose();
          } else {
            toast.error("Bạn phải mua 3 sản phẩm !");
          }
        });
      } else if (id === 4 && productCount === 4) {
        CartItemService.getSalePrice(id).then((res) => {
          if (res.data.IdCode === id && productCount === 4) {
            setSale(res.data.PriceSale)
            setTotalPay((products.reduce((sum, product) => sum + (product.Price * product.Quality), 0) + transport - sale))
            toast.success("Mã giảm giá đã được áp dụng !");
            handleModalClose();
          } else {
            toast.error("Bạn phải mua 4 sản phẩm !");
          }
        });
      } else if (id >= 10) {
        CartItemService.getSalePrice(id).then((res) => {
          if (res.data.IdCode === id && productCount === 5) {
            setSale(res.data.PriceSale)
            setTotalPay((products.reduce((sum, product) => sum + (product.Price * product.Quality), 0) + transport - sale))
            toast.success("Mã giảm giá đã được áp dụng !");
            handleModalClose();
          } else {
            toast.error("Bạn phải mua từ 5 sản phẩm !");
          }
        });
      } else {
        toast.error("Mã giảm giá không được áp dụng !");
      }
    }
  }

  const loadCode = () => {
    CartItemService.listCode().then((res) => {
      setListCode(res.data);
    })
  };

  const productCount = products.length;

  useEffect(() => {
    loadData();
    loadCode();
  }, [profileData.id]);


  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    setdate(formattedDate);

    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + valuetransport);

    const updatedYear = dateObj.getFullYear().toString().slice(-2);
    const updatedMonth = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const updatedDay = ("0" + dateObj.getDate()).slice(-2);
    const updatedDate = `${updatedYear}-${updatedMonth}-${updatedDay}`;
    setUpdatedDate(updatedDate);
  }, [valuetransport]);

  useEffect(() => {
    setTotalPay((products.reduce((sum, product) => sum + (product.Price * product.Quality), 0) + transport - sale));
  }, [products, transport, sale]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box >
            <Container>
              <Stack
                sx={{ pt: 8 }}
                direction="row"
              >
                <img src={logo} style={{ width: "auto", height: "50px" }}
                  className="img-thumnail  border-primary" alt="logo" />
                <Navbar variant=" bg-success" expand="md" className='justify-content-center' style={{ height: "50px", width: "100%", backgroundColor: "#2ecc71", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)", fontFamily: "Arial, sans-serif" }}>
                  <Navbar.Brand style={{ color: "#fff", fontWeight: "bold" }}>GIỎ HÀNG CỦA BẠN</Navbar.Brand>
                </Navbar>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 5 }} maxWidth="md">
            <section className="h-100 mt-0 h-custom" style={{ backgroundColor: "#eee" }}>
              <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol size="12">
                    <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                      <MDBCardBody className="p-0">
                        <MDBRow className="g-0">
                          <MDBCol lg="8">
                            <div className="p-5">
                              <div className="d-flex justify-content-between align-items-center mb-5">
                                <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                  Giỏ hàng
                                </MDBTypography>
                                <MDBTypography className="fw-bold mb-0 text-muted">
                                  Tổng sản phẩm: {productCount}
                                </MDBTypography>
                              </div>

                              <hr className="my-4" />

                              {/* Sản phẩm */}
                              {products.map((aProduct) => (
                                <div key={aProduct.id}>
                                  <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                    <MDBCol md="2" lg="2" xl="2">
                                      <MDBCardImage
                                        src={aProduct.ImageUrl}
                                        fluid className="rounded-3" alt={aProduct.name} />
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="3">
                                      <MDBTypography tag="h6" className="text-black mb-0">
                                        {aProduct.Name}
                                      </MDBTypography>
                                    </MDBCol>
                                    {/* Button number */}
                                    <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                      <MDBBtn color="link" className="px-2">
                                        <MDBIcon fas icon="minus" />
                                      </MDBBtn>
                                      <MDBInput type="text" min="0" defaultValue={aProduct.Quality} size="sm" readOnly />

                                      <MDBBtn color="link" className="px-2">
                                        <MDBIcon fas icon="plus" />
                                      </MDBBtn>
                                    </MDBCol>
                                    {/* Button number */}
                                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                                      <MDBTypography tag="h6" className="mb-0">
                                        {aProduct.Price}
                                      </MDBTypography>
                                    </MDBCol>
                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                      <Button onClick={(e) => ShowModalHandlerDelete(e, aProduct.id)} variant="danger">Xóa</Button>
                                    </MDBCol>
                                  </MDBRow>
                                  <hr className="my-4" />
                                </div>
                              ))}

                              {/* sản phẩm */}
                              <div className="pt-5">
                                <MDBTypography tag="h6" className="mb-0">
                                  <MDBCardText onClick={handleToProduct} tag="a" href="#!" className="text-body">
                                    <MDBIcon fas icon="long-arrow-alt-left me-2" />
                                    Mua thêm sản phẩm
                                  </MDBCardText>
                                </MDBTypography>
                              </div>
                            </div>
                          </MDBCol>
                          <MDBCol lg="4" className="bg-grey">
                            <div className="p-5">
                              <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                Thanh toán
                              </MDBTypography>

                              <hr className="my-4" />

                              <div className="d-flex justify-content-between mb-4">
                                <MDBTypography tag="h5">
                                  Thành tiền: {totalPrice}
                                </MDBTypography>
                              </div>

                              <MDBTypography tag="h5" className="text-uppercase mb-3">
                                Vận chuyển
                              </MDBTypography>

                              <div className="mb-4 pb-2">
                                <select onChange={TransPortonChange} className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                                  <option value={10000}>Vận chuyển thường 10k</option>
                                  <option value={30000}>Vận chuyển nhanh 30k</option>
                                </select>
                              </div>

                              <MDBTypography tag="h5" className="text-uppercase mb-3">
                                GIẢM GIÁ:
                              </MDBTypography>

                              <div className="mb-5">
                                <MDBInput value={sale}
                                  onClick={ShowModalHandler}
                                  size="lg" label="Chọn mã giảm giá" readOnly />
                              </div>

                              <hr className="my-4" />

                              <div className="d-flex justify-content-between mb-5">
                                <MDBTypography tag="h5">
                                  Tổng: {totalPay}
                                </MDBTypography>
                              </div>

                              <Button onClick={ShowModalHandlerSubMid} variant="success">Xác nhận</Button>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </Container>
        </main>

        {/* Footer */}
        <Navbar bg="dark" variant="dark h5" expand="md"
          className='justify-content-center' >
          Thông tin liên hệ
        </Navbar>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Zalo: 0399597551 - FB: Nguyễn Danh
          Đc: P15.Điện Biên Phủ-Bình Thạnh
        </Typography>
        <Copyright />

        {/* End footer */}
      </ThemeProvider>

      {/* Model Show*/}`
      <Modal show={modalshow}
        onHide={handleModalClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Giảm giá Tổng/Giảm giá chung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered border-dark table-hover table-striped">
            <thead>
              <tr className="table-dark border-primary">
                <th style={{ width: "50px" }}>STT</th>
                <th>Mã giảm giá</th>
                <th>Giảm giá</th>
                <th style={{ width: "75px" }}></th>
              </tr>
            </thead>
            <tbody>
              {listcode.map((aListCode, idx) => (
                <tr key={aListCode.IdCode}>
                  <th className="text-center">{idx + 1}</th>
                  <td>{aListCode.Code}</td>
                  <td>{aListCode.PriceSale}</td>
                  <td>
                    <Button
                      onClick={(e) => buttonSaleAll(e, aListCode.IdCode)}

                      variant="success">Chọn</Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">Giảm giá theo số lượng</td>
                <td>{Pricesale}</td>
                <td><Button
                  onClick={buttonTotalSale}
                  variant="success">Chọn</Button></td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger"
            style={{ width: "100px" }}
            onClick={handleModalClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Model Delete*/}
      <Modal show={modalshowDelete}
        onHide={handleModalCloseDelete} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Giỏ hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xóa sản phẩm ra khỏi giỏ hàng !
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCloseDelete}>
            Không
          </Button>
          <Button variant="primary" onClick={(e) => handleDelete(e, valueId)}>Xoá</Button>
        </Modal.Footer>
      </Modal>

      {/* Model Submid */}
      <Modal show={modalshowsubmid}
        onHide={handleModalCloseSubMid} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Địa chỉ giao</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type="text"
            frmField={formik.getFieldProps("Phone")}
            errMessage={formik.touched.Phone && formik.errors.Phone}
            id="txtPhone"
            lable="Số điện thoại" />

          <Input type="text"
            frmField={formik.getFieldProps("Address")}
            errMessage={formik.touched.Address && formik.errors.Address}
            id="txtAddress"
            lable="Địa chỉ" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleModalCloseSubMid}>
            Đóng
          </Button>
          <Button variant="success"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}