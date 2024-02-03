import React, { useEffect, useState } from "react";
import codeforallServices from "../services/codeforallService";
import { Button, Row, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Input from "../component/Input";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";


const CodeforAll = () => {
    const [Code, setCode] = useState([]);
    const [modalshow, setShowModal] = useState(false);
    const [modalshowDelete, setShowModalDelete] = useState(false);
    const [valueId, setValueId] = useState(0);

    const formik = useFormik({
        initialValues: {
            id: 0,
            Code: "",
            PriceSale: "",
            IdCode: 0
        },
        validationSchema: Yup.object({
            id: Yup.number().required(),
            Code: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            PriceSale: Yup.number().required(),
            IdCode: Yup.number().required(),
        }),
        onSubmit: (values) => {
            handleSubmid(values);
        },
    });

    const handleSubmid = (data) => {
        if (data.id === 0) {
            codeforallServices.add(data).then((res) => {
                console.log(data)
                if (res.errorCode === 0) {
                    loadData();
                    handleModalClose();
                    toast.success("Thêm thành công !");
                } else toast.error("Thêm thất bại !");
            });
        } else {
            codeforallServices.update(data.IdCode, data).then((res) => {
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

    const handleModalClose = () => setShowModal(false);

    const handleModalShow = () => setShowModal(true);

    const ShowModalHandler = (e, id) => {
        if (e) e.preventDefault();
        if (id > 0) {
            codeforallServices.get(id).then((res) => {
                formik.setValues(res.data);
                handleModalShow();
            });
        } else {
            formik.resetForm();
            handleModalShow();
        }
    };

    const ShowModalHandlerDelete = (e, id) => {
        if (e) e.preventDefault();
        setValueId(id);
        handleModalShowDelete();
    };

    const loadData = () => {
        codeforallServices.list().then((res) => {
            setCode(res.data);
        })
    };


    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = (e, id) => {
        e.preventDefault();
        codeforallServices.delete(id).then((res) => {
            if (res.errorCode === 0) {
                loadData();
                handleModalCloseDelete();
                toast.warn(" Xóa thành công !");
            } else { toast.error("Xóa thất bại !"); }
        });
    }

    return (
        <div>
            <>
                <div className="container mt-4">
                    <div className="card border-primary bt-5">
                        <div className="card-header">
                            <div className="row">
                                <div className="col  rowmajor">

                                    <h3 className="card-title">Danh sách Code chung</h3>
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
                                        </Col>
                                        <Col xs="auto">{/*search box*/}</Col>
                                    </Row>
                                </div>
                                <table className="table table-bordered border-primary table-hover table-striped">
                                    <thead>
                                        <tr className="table-dark border-primary">
                                            <th style={{ width: "50px" }}>#</th>
                                            <th>Mã giảm giá</th>
                                            <th>Số lượng</th>
                                            <th>ID Code</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Code.map((aCode, idx) => (
                                            <tr key={aCode.id}>
                                                <th className="text-center">{idx + 1}</th>
                                                <td>{aCode.Code}</td>
                                                <td>{aCode.PriceSale}</td>
                                                <td>{aCode.IdCode}</td>
                                                <td>
                                                    <a href="#." onClick={(e) => ShowModalHandler(e, aCode.IdCode)}>
                                                        <i className="bi-pencil-square text-primary"></i></a>

                                                    <a href="#." onClick={(e) => ShowModalHandlerDelete(e, aCode.IdCode)}>
                                                        <i className="bi-trash text-danger"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Modal show={modalshow}
                onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm/Update code</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm="8">
                            <Input
                                frmField={formik.getFieldProps("Code")}
                                errMessage={formik.touched.Code && formik.errors.Code}
                                id="txtCode"
                                lable="Mã Code" />

                            <Input
                                frmField={formik.getFieldProps("PriceSale")}
                                errMessage={formik.touched.PriceSale && formik.errors.PriceSale}
                                id="txtPriceSale"
                                lable="Giảm giá"
                            />

                            <Input
                                frmField={formik.getFieldProps("IdCode")}
                                errMessage={formik.touched.IdCode && formik.errors.IdCode}
                                id="txtIdCode"
                                lable="ID" />

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
export default CodeforAll;