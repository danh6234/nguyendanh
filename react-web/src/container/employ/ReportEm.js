import React, { useEffect, useState, useRef } from "react";
import { Button, Pagination, Row, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Input from "../../component/Input";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import logo from '../../img/filedowload.jpg';
import * as Yup from "yup";
import { DebounceInput } from "react-debounce-input";
import reportServiceEm from "../../services/employ/reportServiceEm";
import profileEmployservice from '../../services/employ/profileEmployService';

const ReportEm = () => {
    const defaultImgUrl = "http://localhost:2000/laravelapi/public/data/report/download-icon.png";
    const [imagePreview, setImagePreview] = useState(defaultImgUrl);
    const [idImage, setIdImage] = useState(0);

    const [report, setReport] = useState([]);
    const [profileData, setProfileData] = useState({});

    const [modalshow, setShowModal] = useState(false);
    const [modalshowDelete, setShowModalDelete] = useState(false);
    const [valueId, setValueId] = useState(0);

    const [page, setPage] = useState(0);
    const [pagingItem, setPagingItem] = useState([]);
    const [pageLength, setpageLength] = useState(10);
    const [search, setSearch] = useState("");

    const formik = useFormik({
        initialValues: {
            ID: 0,
            Name: "Báo cáo lần 7",
            Description: "Báo cáo doanh thu tháng 7 năm 2024",
            image: undefined,
        },
        validationSchema: Yup.object({
            ID: Yup.number().required(),
            Name: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
        }),
        onSubmit: (values) => {
            handleSubmid(values);
        },
    });
    const handleSubmid = (data) => {
        const dataAdd = {
            "Name": data.Name,
            "Description": data.Description,
            "emp_id": profileData.emp_id,
            "NameMember": profileData.lastname,
            "image": data.image,
        }
        if (data.ID === 0) {
            reportServiceEm.add(dataAdd).then((res) => {
                if (res.errorCode === 0) {
                    loadData();
                    handleModalClose();
                    toast.success("Thêm thành công !");
                } else toast.error("Thêm thất bại !");
            });
        } else {
            reportServiceEm.update(data.ID, data).then((res) => {
                if (res.errorCode === 0) {
                    loadData();
                    handleModalClose();
                    toast.success("Cập nhật thành công !");
                } else toast.error("Cập nhật thất bại !");
            });
        }
    }

    const handleModalCloseDelete = () => setShowModalDelete(false);

    const handleModalShowDelete = () => setShowModalDelete(true);

    const handleModalClose = () => {
        setShowModal(false);
        setIdImage(0);
    }

    const handleModalShow = () => setShowModal(true);

    const ShowModalHandler = (e, id) => {
        if (e) e.preventDefault();
        if (id > 0) {
            reportServiceEm.get(id).then((res) => {
                formik.setValues(res.data);
                handleModalShow();
            });
        } else {
            formik.resetForm();
            setImagePreview(defaultImgUrl);
            handleModalShow();
        }
    };

    const ShowModalHandlerDelete = (e, id) => {
        if (e) e.preventDefault();
        setValueId(id);
        handleModalShowDelete();
    };

    const loadData = () => {
        // getprofile 
        profileEmployservice.get().then((res) => {
            setProfileData(res.data);
        })
        // getPaging Report
        reportServiceEm.getPagingEmpid(page, pageLength, search, profileData.emp_id).then((res) => {
            setReport(res.data)
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

    useEffect(() => {
        loadData();
    }, [page, pageLength, search]);

    const handleDelete = (e, id) => {
        console.log(id)
        e.preventDefault();
        reportServiceEm.delete(id).then((res) => {
            if (res.errorCode === 0) {
                loadData();
                handleModalCloseDelete();
                toast.warn(" Xóa thành công !");
            } else { toast.error("Xóa thất bại !"); }
        });
    }

    const inputFileRef = useRef();

    const handleChangeImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setIdImage(1);
            formik.setFieldValue("image", e.target.files[0]);
        }
    };

    return (
        <div>
            <>
                <div className="container mt-4">
                    <div className="card border-primary bt-5">
                        <div className="card-header">
                            <div className="row">
                                <div className="col  rowmajor">

                                    <h3 className="card-title">Danh sách báo cáo</h3>
                                </div>
                                <div className="col-auto">
                                    <Button type="button" variant="primary" onClick={(e) => ShowModalHandler(e, 0)}  ><i className="bi-plus-lg"></i>Thêm</Button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="mb-2">
                                    <Row>
                                        <Col>
                                            <Row className="gx-1">
                                                <label className="col-form-label col-sm-auto">Số sản phẩm </label>
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
                                        <tr className="table-primary border-primary">
                                            <th style={{ width: "50px" }}>#</th>
                                            <th>Tên báo cáo</th>
                                            <th>Tiêu đề</th>
                                            <th>Người Viết</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report.map((aReport, idx) => (
                                            <tr key={aReport.ID}>
                                                <th className="text-center">{page * pageLength + idx + 1}</th>
                                                <td>{aReport.Name}</td>
                                                <td>{aReport.Description}</td>
                                                <td>{aReport.NameMember}</td>
                                                <td>
                                                    <a href="#." onClick={(e) => ShowModalHandler(e, aReport.ID)}>
                                                        <i className="bi-pencil-square text-primary"></i></a>

                                                    <a href="#." onClick={(e) => ShowModalHandlerDelete(e, aReport.ID)}>
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
                <Modal.Header closeButton >
                    <Modal.Title>Tạo Báo Cáo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm="4" className="text-center mt-5" >

                            {idImage === 0 ? (<img src={imagePreview}
                                style={{ marginLeft: "15px", width: "100px", height: "100px" }}
                                alt=""
                                className=" border-primary d-block" />)
                                : (<img src={logo}
                                    style={{ marginLeft: "15px", width: "100px", height: "100px" }}
                                    alt=""
                                    className=" border-primary d-block" />)
                            }

                            <Input type="file"
                                className="d-none"
                                inputref={inputFileRef}
                                onChange={handleChangeImage} />

                            <div className="mt-3">
                                <Button variant="primary" size="sm"
                                    onClick={() => inputFileRef.current.click()}>Add file</Button>
                            </div>
                        </Col>

                        <Col sm="8">
                            <Input
                                frmField={formik.getFieldProps("Name")}
                                errMessage={formik.touched.Name && formik.errors.Name}
                                id="txtName"
                                lable="Tên:" />

                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Tiêu đề:</label>
                            <textarea className="form-control"
                                {...formik.getFieldProps("Description")}
                                id="txtDescription" rows="3">
                            </textarea>

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
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
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
export default ReportEm;