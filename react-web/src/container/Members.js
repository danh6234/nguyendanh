import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Col, Row, Pagination } from "react-bootstrap";
import Input from "../component/Input";
import memberServices from '../services/memberService';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DebounceInput } from "react-debounce-input";


const Members = () => {
    const defaultImgUrl = "https://restfulapi.dnd-group.net/public/photo-icon.png";
    const [imagePreview, setImagePreview] = useState(defaultImgUrl);
    const [member, setMember] = useState([]);
    const [modalshow, setShowModal] = useState(false);
    const [modalshowDelete, setShowModalDelete] = useState(false);
    const [valueId, setValueId] = useState(0);
    const [page, setPage] = useState(0);
    const [pagingItem, setPagingItem] = useState([]);
    const [pageLength, setpageLength] = useState(10);
    const [search, setSearch] = useState("");

    const formik = useFormik({
        initialValues: {
            id: 0,
            lastname: "Danh",
            firstname: "Nguyễn",
            email: "danh@gmail.com",
            phone: "0399597551",
            username: "Danh1",
            password: "",
            image: undefined,
        },
        validationSchema: Yup.object({
            id: Yup.number().required()
            ,
            lastname: Yup.string().required("Required").min(5, "Lớn hơn 5 ký tự")
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
            handleSubmid(values);
        },
    });

    const handleSubmid = (data) => {
        if (data.id === 0) {
            console.log(data)
            memberServices.add(data).then((res) => {
                if (res.errorCode === 0) {
                    loadData();
                    handleModalClose();
                    toast.success("Thêm thành công !");
                } else toast.error("Thêm thất bại !");
            });
        } else {
            console.log(data)
            memberServices.update(data.id, data).then((res) => {
                if (res.errorCode === 0) {
                    loadData();
                    handleModalClose();
                    toast.success("Update thành công !");
                } else toast.error("Update thất bại !");
            });
        }
    }

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);
    const ShowModalHandler = (e, id) => {
        if (e) e.preventDefault();
        if (id > 0) {
            memberServices.getAvatarUrl(id).then((res) => {
                setImagePreview(res.data.imageUrl);
            })
            memberServices.get(id).then((res) => {
                res.data.password = "";
                formik.setValues(res.data);
                handleModalShow();
            });
        } else {
            formik.resetForm();
            setImagePreview(defaultImgUrl);
            handleModalShow();
        }

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
        memberServices.delete(id).then((res) => {
            if (res.errorCode === 0) {
                loadData();
                handleModalCloseDelete();
                toast.warn(" Xóa thành công !");
            } else { toast.error("Xóa thất bại !"); }
        });
    }

    const loadData = () => {
        memberServices.getPaging(page, pageLength, search).then((res) => {
            setMember(res.data)
            //set pagination
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
    const handleChangePageLength = (e) => {
        setPage(0);
        setpageLength(e.target.value);
    }
    const handleChangeSearch = (e) => {
        setPage(0);
        setSearch(e.target.value);
    }
    const inputFileRef = useRef();
    const handleChangeImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            formik.setFieldValue("image", e.target.files[0]);
        }
    };
    useEffect(() => {
        loadData();
    }, [page, pageLength, search]);

    return (
        <div>
            <>
                <div className="container mt-4">
                    <div className="card border-primary bt-5">
                        <div className="card-header">
                            <div className="row">
                                <div className="col  rowmajor">

                                    <h3 className="card-title">Khách hàng</h3>
                                </div>
                                <div className="col-auto">
                                    <Button type="button" variant="primary" onClick={(e) => ShowModalHandler(e, 0)}  ><i className="bi-plus-lg"></i>Add</Button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="mb-2">
                                    <Row>
                                        <Col>
                                            <Row className="gx-1">
                                                <label className="col-form-label col-sm-auto">Số khách hàng </label>
                                                <Col className="sm-5">
                                                    <select value={pageLength} style={{ width: "80px" }}
                                                        onChange={handleChangePageLength}
                                                        className="form-select shadow-none">
                                                        <option value="2">2</option>
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>

                                                    </select>
                                                </Col>
                                                <label className="col-form-label col-sm-auto">Tìm kiếm:</label>
                                                <Col xs="auto">
                                                    <DebounceInput
                                                        className="form-control" debounceTimeout={300}
                                                        value={search} onChange={handleChangeSearch} />
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col xs="auto">{/*search box*/}</Col>
                                    </Row>
                                </div>
                                <table className="table table-bordered border-primary table-hover table-striped">
                                    <thead>
                                        <tr className="table-dark border-primary">
                                            <th style={{ width: "50px" }}>#</th>
                                            <th>Họ</th>
                                            <th>Tên</th>
                                            <th>Số điện thoại</th>
                                            <th>Email</th>
                                            <th>Tài khoản</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {member.map((aMember, idx) => (
                                            <tr key={aMember.id}>
                                                <td>{idx + 1}</td>
                                                <td>{aMember.firstname}</td>
                                                <td>{aMember.lastname}</td>
                                                <td>{aMember.phone}</td>
                                                <td>{aMember.email}</td>
                                                <td>{aMember.username}</td>
                                                <td>
                                                    <a href="#." onClick={(e) => ShowModalHandler(e, aMember.id)}>
                                                        <i className="bi-pencil-square text-primary"></i>
                                                    </a>

                                                    <a href="#." onClick={(e) => ShowModalHandlerDelete(e, aMember.id)}>
                                                        <i className="bi-trash text-danger"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination className="mb-0 justify-content-end">
                                    {pagingItem}
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Modal show={modalshow}
                onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Khách hàng mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="4" className="text-center mt-5" >
                            <img src={imagePreview}
                                alt="" width="150px"
                                height="150px"
                                className="img-thumnail rounded-circle border-primary d-block" />

                            <Input type="file"
                                accept="img/*"
                                className="d-none"
                                inputref={inputFileRef}
                                onChange={handleChangeImage} />
                            <div className="mt-3">
                                <Button variant="primary" size="sm"
                                    onClick={() => inputFileRef.current.click()}>Change</Button>
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

            <Modal show={modalshowDelete}
                onHide={handleModalCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có thật sự muốn xóa hay không !
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalCloseDelete}>
                        No
                    </Button>
                    <Button variant="primary" onClick={(e) => handleDelete(e, valueId)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}
export default Members;