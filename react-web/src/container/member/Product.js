import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import memberProduct from '../../services/member/memberProductService';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination, Col, Modal, Row, Button } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import Input from '../../component/Input';
import Select from '../../component/selectquality';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import profileMember from '../../services/member/profileMember';
import { useNavigate } from "react-router-dom";
import logo from '../../img/menu.jpg'
import CartItemService from '../../services/member/cartitemService';

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

export default function Product() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [imagePreview, setImagePreview] = useState();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [pagingItem, setPagingItem] = useState([]);
  const [pageLength, setpageLength] = useState(10);
  const [search, setSearch] = useState("");
  const [modalshow, setShowModal] = useState(false);
  const [modalMenuShow, setModalMenuShow] = useState(false);
  const [modalClassMenuShow, setModalClassMenuShow] = useState("");
  const SelectRef = React.useRef();
  const [qualityproduct, setQualityproduct] = useState(0);
  const [countproduct, setCountproduct] = useState(0);


  const handleModalClose = () => setShowModal(false);

  const handleModalShow = () => setShowModal(true);

  const handleModalMenuClose = () => {
    handleModalCloseClassMenuShow();
    setModalMenuShow(false);
  }

  const handleModalMenuShow = () => {
    handleModalClassMenuShow();
    setModalMenuShow(true);
    handleScrollTop()
  }

  const handleModalClassMenuShow = () => setModalClassMenuShow("model-show");

  const handleModalCloseClassMenuShow = () => setModalClassMenuShow("model");

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const formik = useFormik({
    initialValues: {
      IdProduct: 0,
      Quality: "",
      Price: "",
      Name: "",
    },
    validationSchema: Yup.object({
      ID: Yup.number().required(),
    }),
    onSubmit: (values) => {
      handleSubmid(values);
    },
  });

  const handleSubmid = (data) => {
    const Select = SelectRef.current.value;
    const dataAdd = {
      "IdProduct": data.ID,
      "Name": data.Name,
      "Price": data.Price,
      "ImageUrl": data.ImageUrl,
      "Quality": Select,
      "ProductCode": data.ProductCode,
      "PriceSale": data.PriceSale,
      "IDMember": profileData.id
    }
    console.log(countproduct)
    if (countproduct < 4) {
      qualityproduct === 0 ? (
        Select <= data.Status ?
          memberProduct.add(dataAdd).then((res) => {
            if (res.errorCode === 0) {
              handleModalClose();
              setQualityproduct(data.Status - Select);
              toast.success("Đã thêm vào giỏ hàng !");
              setQualityproduct(data.Status - Select);
            } else (toast.error("Thêm thất bại !"))
          }
          ) : ((toast.error(`Sản phẩm này chỉ còn số lượng ${data.Status} `)))
      ) : (
        Select <= qualityproduct) ?
        memberProduct.add(dataAdd).then((res) => {
          if (res.errorCode === 0) {
            handleModalClose();
            setQualityproduct(data.Status - Select);
            toast.success("Đã thêm vào giỏ hàng !");
            setQualityproduct(data.Status - Select);
          } else (toast.error("Thêm thất bại !"))
        }) : ((toast.error(`Sản phẩm chỉ còn ${qualityproduct} chọn lại! `)))
    } else (toast.error("Giới hạn 5 sản phẩm trong giỏ hàng !"))
  }

  const loadData = () => {
    profileMember.get().then((res) => {
      setProfileData(res.data);
    })

    memberProduct.getPaging(page, pageLength, search).then((res) => {
      setProducts(res.data)
      let items = [];
      const totalPages = res.pagingInfo.totalPages;
      if (totalPages > 1) {
        items = [
          <Pagination.Item key="first" onClick={() => setPage(0)}>
            Trang đầu
          </Pagination.Item>,
          <Pagination.Item key="prev" disabled={page === 0} onClick={() => setPage(page - 1)}>
            &laquo;
          </Pagination.Item>,
        ]

        for (let i = 0; i < res.pagingInfo.totalPages; i++) {
          items.push(
            <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
              {i + 1}
            </Pagination.Item>
          )
        };
        items.push(
          <Pagination.Item key="last" onClick={() => setPage(totalPages - 1)}>
            &raquo;
          </Pagination.Item>
        )
        setPagingItem(items);
      } else {
        setPagingItem([]);
      }
    })
  };

  const loadDataProduct = () => {
    CartItemService.get(profileData.id).then((res) => {
      const countRows = Object.values(res.data).length;
      setCountproduct(countRows);
    })
  };

  const handleChangePageLength = (e) => {
    setPage(0);
    setpageLength(e.target.value);
  }

  const handleChangeSearch = (e) => {
    setPage(0);
    setSearch(e.target.value);
  }

  const ShowModalHandler = (e, id) => {
    if (e) e.preventDefault();
    if (id) {
      memberProduct.getAvatarUrl(id).then((res) => {
        setImagePreview(res.data.imageUrl);
      })
      //thông tin sản phẩm
      memberProduct.get(id).then((res) => {
        formik.setValues(res.data);
        handleModalShow();
      });
    }
  };

  useEffect(() => {
    loadData();
    loadDataProduct();
  }, [page, pageLength, search, profileData.id]);

  //Navigate
  const handleToProductCategory = (id) => {
    navigate(`/member/productcategory/${id}`);
  }

  const handleToAllProduct = () => {
    navigate(`/member/product`);
    handleModalMenuClose();
    loadData();
  }

  const handleToProductCategoryPhukien = (id) => {
    navigate(`/member/productcategory/1`);
  }

  const handleToProductCategoryTet = (id) => {
    navigate(`/member/productcategory/3`);
  }

  const handleToProductCategoryAo = (id) => {
    navigate(`/member/productcategory/4`);
  }

  const handleToProductCategoryQuan = (id) => {
    navigate(`/member/productcategory/5`);
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box>
            <Container maxWidth="">
              <Stack
                sx={{ pt: 5 }}
              >
                <Row>
                  <Col xs={3}>
                    <img
                      onClick={() => handleModalMenuShow()}
                      src={logo}
                      style={{ width: "50px", height: "50px" }} className="logo" alt="logo" />
                  </Col>
                  <Col>
                    <Row className="">
                      <label className="col-form-label col-md-auto">TÌM KIẾM:</label>
                      <Col md>
                        <DebounceInput
                          style={{ width: "600px", height: "45px" }}
                          className="form-control"
                          debounceTimeout={500}
                          placeholder="Từ khóa tên sản phẩm..."
                          value={search}
                          onChange={handleChangeSearch}
                        />
                      </Col>
                    </Row>
                    <Row className="align-items-center mt-3">
                      <label className="col-form-label col-md-auto">HIỂN THỊ:</label>
                      <Col md>
                        <select style={{ width: "100px" }}
                          value={pageLength}
                          className="form-select shadow-none"
                          onChange={handleChangePageLength}
                        >
                          <option value="3">3</option>
                          <option value="6">6</option>
                          <option value="9">9</option>
                        </select>
                      </Col>
                    </Row>
                    <p className='mt-5'>- Khách hàng có thể chọn Xem Thêm để xem các loại sản phẩm liên quan theo sản phẩm mình chọn !</p>
                  </Col>
                </Row>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 20 }} maxWidth="md">
            <Grid container spacing={6}>
              {products.map((aProduct) => (
                <Grid key={aProduct.ID} item xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <img src={`http://localhost:2000/laravelapi/public/data/product/${aProduct.ImageUrl}`}
                      style={{ width: "auto", height: "250px" }}
                      className="img-thumnail  border-primary" alt={aProduct.Name} />
                    <CardContent sx={{ height: '120px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {aProduct.Name}
                      </Typography>
                      <Typography variant="h6"
                        style={{ textDecoration: "line-through" }}>
                        Giá: {aProduct.Price}
                      </Typography>
                      <Typography variant="h6" >
                        Giá: {aProduct.Price - aProduct.PriceSale}
                      </Typography>
                    </CardContent>
                    <CardActions >
                      <Button onClick={() => handleToProductCategory(aProduct.ProductCategoryID)} variant="contained bg-info" size="small" >Xem thêm</Button>
                      &ensp; &ensp;
                      <Button onClick={(e) => ShowModalHandler(e, aProduct.ID)}
                        variant="contained bg-success"
                        size="small">Mua hàng</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <br></br>
            <Pagination className="mb-0 justify-content-end">
              {pagingItem}
            </Pagination>
          </Container>

          {/* Model Menu */}
          <Modal show={modalMenuShow}
            onHide={handleModalMenuClose}
            backdrop="static"
            keyboard={false}
            dialogClassName={`custom-modal ${modalClassMenuShow}`}
            contentClassName="conten-model"
          >
            <Modal.Header closeButton>
              <Modal.Title
                style={{ fontWeight: 'bold', fontSize: "30px" }}
              >
                Menu Sản Phẩm
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Row style={{ fontWeight: 'bold', fontSize: "30px", marginLeft: "5px", cursor: "pointer", marginTop: "30px", textDecoration: 'underline' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'orange';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}

                onClick={() => handleToAllProduct()}
              >

                Xem Tất Cả</Row> <br></br>

              <Row style={{ fontWeight: 'bold', fontSize: "30px", marginLeft: "5px", cursor: "pointer", textDecoration: 'underline' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'orange';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}
                onClick={() => handleToProductCategoryAo()}
              >

                Thời Trang Nam Áo</Row> <br></br>

              <Row style={{ fontWeight: 'bold', fontSize: "30px", marginLeft: "5px", cursor: "pointer", textDecoration: 'underline' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'orange';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}
                onClick={() => handleToProductCategoryQuan()}
              >

                Thời Trang Nam Quần</Row> <br></br>

              <Row style={{ fontWeight: 'bold', fontSize: "30px", marginLeft: "5px", cursor: "pointer", textDecoration: 'underline' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'orange';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}
                onClick={() => handleToProductCategoryTet()}
              >

                Thời Trang Nam Tết</Row>

              <Row style={{ fontWeight: 'bold', fontSize: "30px", marginLeft: "5px", cursor: "pointer", textDecoration: 'underline', marginTop: "15px" }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'orange';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}
                onClick={() => handleToProductCategoryPhukien()}
              >

                Phụ Kiện</Row>


              <Row style={{ fontWeight: 'bold', fontSize: "17px", marginLeft: "5px", cursor: "pointer", marginTop: "100px" }}
              >
                <hr></hr>
                - Địa chỉ: P15, Điện Biên Phủ, Bình Thạnh </Row>


              <Row style={{ fontWeight: 'bold', fontSize: "17px", marginLeft: "5px", cursor: "pointer", marginTop: "15px" }}
              >

                - Liên hệ: 0399597551 - Nguyễn Danh</Row>


            </Modal.Body>
          </Modal>

        </main>

        {/* Footer */}
        <Navbar style={{ color: "white" }}
          bg="dark" variant="dark h5" expand="md"
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

      {/* Model */}
      <Modal show={modalshow}
        onHide={handleModalClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4" className="text-center" >
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <img src={imagePreview}
                  style={{ width: "auto", height: "250px" }}
                  className="img-thumnail  border-primary" alt="Img" />
              </Card>
            </Col>

            <Col sm="8">

              <Input type="text"
                frmField={formik.getFieldProps("Name")}
                id="txtName"
                lable="Sản phẩm" readOnly />

              <Input type="text"
                frmField={formik.getFieldProps("Price")}
                id="txtPrice"
                lable="Giá" readOnly />

              <Select
                inputref={SelectRef}
                {...formik.getFieldProps("Quality")}
                id="Quality"
                lable="Số lượng" />

              <Input type="text"
                frmField={formik.getFieldProps("ID")}
                id="txtID"
                lable="Mã" readOnly />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleModalClose}>
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