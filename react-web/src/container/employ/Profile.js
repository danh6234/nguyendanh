import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody
} from 'mdb-react-ui-kit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import  { useEffect, useRef, useState} from "react";
import profileEmployservice from '../../services/employ/profileEmployService';
import { Modal, Button,  Row, Col } from "react-bootstrap";
import Input from "../../component/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function ProfileMember() {
  const [profileData, setProfileData] = useState({});
  const [modalshow, setShowModal] = useState(false);
  const [imagePreview, setImagePreview]= useState(profileData.ImageUrl);

  const handleModalClose = () =>setShowModal(false);

  const handleModalShow = () =>setShowModal(true);

  const formik = useFormik({
    initialValues: {
      id: 0,
      lastname: "",
      firstname: "",
      email:"",
      phone: "",
      username:"",
      password: "",
      image: undefined,
    },
    validationSchema: Yup.object({
      emp_id: Yup.number().required()
      ,
      lastname: Yup.string().required("Required").min(5,"Lớn hơn 5 ký tự")
      ,
      firstname: Yup.string().required("Required").min(2,"Lớn hơn 2 ký tự")
      ,
      phone:Yup.string().matches(/^\d{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
      .required('Số điện thoại là bắt buộc')
      ,
      email: Yup.string()
      .email('Email không hợp lệ')
      .matches(/@gmail\.com$/, 'Email phải kết thúc bằng @gmail.com')
      .required('Email là bắt buộc'),
      username: Yup.string().required("Required").min(5,"Lớn hơn 5 ký tự")
      ,
      password: Yup.string().required("Required").min(5,"Lớn hơn 5 ký tự")
      , 
    }),
    onSubmit: (values) => {
      handleSubmid(values);
    },
  });
  const handleSubmid = (data) =>{
    console.log(data)
    profileEmployservice.update(data.emp_id, data).then((res)=>{
            if(res.errorCode === 0){
                handleModalClose();
                toast.success("Cập nhật thành công !");
            }else   toast.error("Cập nhật thất bại !");      
        });
    }
  const inputFileRef = useRef();
  const handleChangeImage= (e) => {
        if(e.target.files && e.target.files[0]){
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            formik.setFieldValue("image", e.target.files[0]);
        }
        };
  useEffect(() => {
    profileEmployservice.get().then((res)=>{
      setProfileData(res.data);
    })
  },[]);

  const id = profileData.emp_id;
  
  const ShowModalHandler= (e, id) =>{
    if(e) e.preventDefault();
    if(id){
      setImagePreview(profileData.ImageUrl);
      profileEmployservice.get().then((res)=>{
        res.data.password = "";
        formik.setValues(res.data);
        handleModalShow();
        });
    }
};

  return (
    <>
      <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="3">
            <Card 
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                   >
                      <img src={profileData.ImageUrl} 
                      style={{width:"250px", height:"250px"}} 
                        className="img-thumnail rounded-circle border-primary" alt={profileData.Name}/> 
                      <CardActions className="d-flex justify-content-center mt-auto">
                        <Button 
                        onClick={(e)=> ShowModalHandler(e, id)}
                        variant="contained" 
                        size="small"  
                        className=' bg-primary'> 
                        Cập nhật thông tin </Button>
                      </CardActions>
                    </Card>

          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-3">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Họ khách hàng:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.firstname}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Tên khách hàng:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.lastname}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email khách hàng:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Số điện thoại:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Tài khoản Shop:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    {/* Model */}
    <Modal  show={modalshow}
                onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin khách hàng</Modal.Title>
                </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm="4" className="text-center mt-5" >
                        <img src={imagePreview} 
                        alt="" width="150px" 
                        height="150px" 
                        className="img-thumnail rounded-circle border-primary d-block"/>
                        
                        <Input type="file" 
                            accept="img/*" 
                            className="d-none"
                            inputref={inputFileRef} 
                            onChange={handleChangeImage}/>
                        <div className="mt-3">
                            <Button variant="primary" size="sm"
                            onClick={() =>inputFileRef.current.click()}>Change</Button>
                        </div>
                </Col>
                
                <Col sm="8">
                    <Input 
                        frmField={formik.getFieldProps("lastname")}
                        errMessage={formik.touched.lastname && formik.errors.lastname}
                        id="lastname"  
                        lable="Tên"
                        />

                    <Input 
                        frmField={formik.getFieldProps("firstname")}
                        errMessage={formik.touched.firstname && formik.errors.firstname}
                        id="txtfirstName" 
                        lable="Họ"
                        />  
                  
                    <Input 
                    frmField={formik.getFieldProps("phone")}
                    errMessage={formik.touched.phone && formik.errors.phone}
                    id="txtphone"  
                    lable="Số điện thoại" />

                    <Input 
                    frmField={formik.getFieldProps("email")}
                    errMessage={formik.touched.email && formik.errors.email}
                    id="txtemail"  
                    lable="Email" />

                    <Input 
                    frmField={formik.getFieldProps("username")}
                    errMessage={formik.touched.username && formik.errors.username}
                    id="txtusername"  
                    lable="Tài khoản" />

                    <Input type="text" 
                    frmField={formik.getFieldProps("password")}
                    errMessage={formik.touched.password && formik.errors.password}
                    id="txtpassword"  
                    lable="password" />
                
                    {/* <Select
                    {...formik.getFieldProps("gender")}
                    id="gender"  
                    lable="Gender"/> */}
                </Col>
              </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary"
           disabled={!formik.dirty || !formik.isValid}
           onClick={formik.handleSubmit}>Save</Button>
        </Modal.Footer>
        </Modal> 
    </>
    
  );
}