import React, { useEffect, useState } from "react";
import productcategoryServices from '../services/productcategoryService';
import { Button, Pagination, Row, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Input from "../component/Input";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DebounceInput } from "react-debounce-input";


const Productcategory = () => {
    const [productcategory, setProductCategory] = useState([]);
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
            ProductCategoryID: 1,
            Name: "Mùa Đông",
            Description: "Thời trang nam Mùa Đông ",
            DisplayOrder: "",
            Image: "",
            CreatedDate: "YY-MM-DD",
            CreatedBy: "Admin",
            MetaDescription: "Mùa đông",
            Status: "1",
        },
        validationSchema: Yup.object({
            ID: Yup.number().required(),
            ProductCategoryID: Yup.number().required(),
            Name: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            Description: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            CreatedBy: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            MetaDescription: Yup.string().min(5, "Lớn hơn 5 ký tự"),
            Status: Yup.number().oneOf([0, 1]).required("Required 0 or 1"),
        }),
        onSubmit: (values) => {
            handleSubmid(values);
        },
    });

    const handleSubmid = (data) => {

        if (data.ID === 0) {
            productcategoryServices.add(data).then((res) => {
                console.log(data)
                if (res.errorCode === 0) {
                    loadData();
                    handleModalClose();
                    toast.success("Thêm thành công !");
                } else toast.error("Thêm thất bại !");
            });
        } else {
            productcategoryServices.update(data.ID, data).then((res) => {
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
            productcategoryServices.get(id).then((res) => {
                res.data.DisplayOrder = "";
                res.data.Image = "";
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
        productcategoryServices.getPaging(page, pageLength, search).then((res) => {
            setProductCategory(res.data)
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
        e.preventDefault();
        productcategoryServices.delete(id).then((res) => {
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

                                    <h3 className="card-title">Danh sách loại sản phẩm</h3>
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
                                <table className="table table-bordered border-dark table-hover table-striped">
                                    <thead>
                                        <tr className="table-dark border-primary">
                                            <th style={{ width: "50px" }}>#</th>
                                            <th>Mã thể loại</th>
                                            <th>Tên thể loại</th>
                                            <th>Mô tả</th>
                                            <th>Ngày tạo</th>
                                            <th>Tạo bởi</th>
                                            <th>Trạng thái</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productcategory.map((aProductCategory, idx) => (
                                            <tr key={aProductCategory.ID}>
                                                <th className="text-center">{page * pageLength + idx + 1}</th>
                                                <td>{aProductCategory.ID}</td>
                                                <td>{aProductCategory.Name}</td>
                                                <td>{aProductCategory.Description}</td>
                                                <td>{aProductCategory.CreatedDate}</td>
                                                <td>{aProductCategory.CreatedBy}</td>
                                                {aProductCategory.Status === 1 ?
                                                    <td>Bán chạy</td> :
                                                    <td>Bán chậm</td>

                                                }
                                                <td>
                                                    <a href="#." onClick={(e) => ShowModalHandler(e, aProductCategory.ID)}>
                                                        <i className="bi-pencil-square text-primary"></i></a>

                                                    <a href="#." onClick={(e) => ShowModalHandlerDelete(e, aProductCategory.ID)}>
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
                    <Modal.Title>Loại Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm="8">
                            <Input
                                frmField={formik.getFieldProps("ProductCategoryID")}
                                errMessage={formik.touched.ProductCategoryID && formik.errors.ProductCategoryID}
                                id="txtProductCategoryID"
                                lable="Mã thể loại 2" />

                            <Input
                                frmField={formik.getFieldProps("Name")}
                                errMessage={formik.touched.Name && formik.errors.Name}
                                id="txtName"
                                lable="Tên loại"
                            />

                            <Input
                                frmField={formik.getFieldProps("Description")}
                                errMessage={formik.touched.Description && formik.errors.Description}
                                id="txtDescription"
                                lable="Mô tả" />


                            <Input
                                frmField={formik.getFieldProps("DisplayOrder")}
                                id="txtDisplayOrder"
                                lable="Thứ tự" />

                            <Input
                                frmField={formik.getFieldProps("Image")}
                                errMessage={formik.touched.Image && formik.errors.Image}
                                id="txtImagee"
                                lable="Ảnh"
                            />

                            <Input
                                frmField={formik.getFieldProps("CreatedDate")}
                                errMessage={formik.touched.CreatedDate && formik.errors.CreatedDate}
                                id="txtCreatedDate"
                                lable="Ngày tạo" />

                            <Input
                                frmField={formik.getFieldProps("CreatedBy")}
                                errMessage={formik.touched.CreatedBy && formik.errors.CreatedBy}
                                id="txtCreatedBy"
                                lable="Người tạo" />

                            <Input
                                frmField={formik.getFieldProps("MetaDescription")}
                                errMessage={formik.touched.MetaDescription && formik.errors.MetaDescription}
                                id="txtMetaDescription"
                                lable="Mô tả ngắn" />

                            <Input
                                frmField={formik.getFieldProps("Status")}
                                errMessage={formik.touched.Status && formik.errors.Status}
                                id="txtStatus"
                                lable="Trạng thái" />

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
export default Productcategory;