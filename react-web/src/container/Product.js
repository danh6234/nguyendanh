import React, { useEffect, useState, useRef } from "react";
import productService from '../services/productService';
import { Button, Pagination, Row, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Input from "../component/Input";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DebounceInput } from "react-debounce-input";
import Utils from '../helpers/untils';

const Product = () => {
    const defaultImgUrl = "https://restfulapi.dnd-group.net/public/photo-icon.png";
    const [imagePreview, setImagePreview] = useState(defaultImgUrl);
    const [products, setProducts] = useState([]);
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
            Name: "Áo",
            ProductCode: "Le3004",
            Description: "Trang phục ",
            ProductType: 1,
            Price: 100000,
            PriceSale: "20000",
            Color: "red",
            Manufacture: "VietNam",
            CreatedDate: "2023-11-11",
            Status: "5",
            ProductCategoryID: "5",
            image: undefined,
        },
        validationSchema: Yup.object({
            ID: Yup.number().required(),
            Name: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            ProductCode: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            Description: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            PriceSale: Yup.number().required("Required"),
            Color: Yup.string().required("Required"),
            Manufacture: Yup.string().required("Required")
                .min(5, "Lớn hơn 5 ký tự"),
            Status: Yup.number().integer().positive().min(4, "Tối thiểu là 5 và là số dương").required("Trường bắt buộc"),
            ProductCategoryID: Yup.string().required("Required"),
            ProductType: Yup.number().required("Required"),
            Price: Yup.number().required("Required"),

        }),
        onSubmit: (values) => {
            handleSubmid(values);
        },
    });
    const handleSubmid = (data) => {
        if (data.ID === 0) {
            productService.add(data).then((res) => {
                if (res.errorCode === 0) {
                    loadData();
                    handleModalClose();
                    toast.success("Thêm thành công !");
                } else toast.error("Mã loại sai !");
            });
        } else {
            productService.update(data.ID, data).then((res) => {
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
            productService.getAvatarUrl(id).then((res) => {
                setImagePreview(res.data.imageUrl);
            })
            productService.get(id).then((res) => {
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
        productService.getPaging(page, pageLength, search).then((res) => {
            setProducts(res.data)
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
        productService.delete(id).then((res) => {
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
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            formik.setFieldValue("image", e.target.files[0]);
        }
    };

    const downloadImg = () => {
        productService.downloadAvatar(formik.values.ID).then((res) => {
            if (res.size > 0) Utils.downloadFile(`${formik.values.ID}.zip`, res);
            else toast.warning("No avatar to download!")
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

                                    <h3 className="card-title">Danh sách sản phẩm</h3>
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
                                        <tr className="table-dark border-primary">
                                            <th style={{ width: "50px" }}>#</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Mã giảm giá</th>
                                            <th>Mô tả</th>
                                            <th>Giá</th>
                                            <th>Giảm giá</th>
                                            <th>Màu</th>
                                            <th>Sản xuất</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((aProducts, idx) => (
                                            <tr key={aProducts.ID}>
                                                <th className="text-center">{page * pageLength + idx + 1}</th>
                                                <td>{aProducts.Name}</td>
                                                <td>{aProducts.ProductCode}</td>
                                                <td>{aProducts.Description}</td>
                                                <td>{aProducts.Price >= 100000 ? aProducts.Price / 1000 + "k"
                                                    : aProducts.Price}</td>
                                                <td>{aProducts.PriceSale}</td>
                                                <td>{aProducts.Color}</td>
                                                <td>{aProducts.Manufacture}</td>
                                                <td>
                                                    <a href="#." onClick={(e) => ShowModalHandler(e, aProducts.ID)}>
                                                        <i className="bi-pencil-square text-primary"></i></a>

                                                    <a href="#." onClick={(e) => ShowModalHandlerDelete(e, aProducts.ID)}>
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
                    <Modal.Title>Sản Phẩm Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm="4" className="text-center mt-5" >
                            <img src={imagePreview}
                                alt="" width="150px"
                                height="150px"
                                className="img-thumnail rounded-circle border-primary d-block" />

                            <Input type="file"
                                accept="image/*"
                                className="d-none"
                                inputref={inputFileRef}
                                onChange={handleChangeImage} />
                            <div className="mt-3">
                                <Button variant="primary" size="sm"
                                    onClick={() => inputFileRef.current.click()}>Change</Button>

                                <Button variant="warning" size="sm" className="mt-2"
                                    onClick={downloadImg}>Download</Button>
                            </div>
                        </Col>

                        <Col sm="8">
                            <Input
                                frmField={formik.getFieldProps("Name")}
                                errMessage={formik.touched.Name && formik.errors.Name}
                                id="txtName"
                                lable="Tên" />

                            <Input
                                frmField={formik.getFieldProps("ProductCode")}
                                errMessage={formik.touched.ProductCode && formik.errors.ProductCode}
                                id="txtProductCode"
                                lable="Mã giảm"
                            />

                            <Input
                                frmField={formik.getFieldProps("Description")}
                                errMessage={formik.touched.Description && formik.errors.Description}
                                id="txtDescription"
                                lable="Mô tả" />

                            <Input
                                frmField={formik.getFieldProps("ProductType")}
                                errMessage={formik.touched.ProductType && formik.errors.ProductType}
                                id="txtProductType"
                                lable="Kiểu" />

                            <Input
                                frmField={formik.getFieldProps("Price")}
                                errMessage={formik.touched.Price && formik.errors.Price}
                                id="txtPrice"
                                lable="Gía" />

                            <Input
                                frmField={formik.getFieldProps("PriceSale")}
                                errMessage={formik.touched.PriceSale && formik.errors.PriceSale}
                                id="txtPriceSale"
                                lable="Giảm giá" />

                            <Input
                                frmField={formik.getFieldProps("Color")}
                                errMessage={formik.touched.Color && formik.errors.Color}
                                id="txtColor"
                                lable="Màu sắc" />

                            <Input
                                frmField={formik.getFieldProps("Manufacture")}
                                errMessage={formik.touched.Manufacture && formik.errors.Manufacture}
                                id="txtManufacture"
                                lable="Sản xuất" />

                            <Input
                                frmField={formik.getFieldProps("CreatedDate")}
                                errMessage={formik.touched.CreatedDate && formik.errors.CreatedDate}
                                id="txtCreatedDate"
                                lable="Ngày tạo" />

                            <Input
                                frmField={formik.getFieldProps("Status")}
                                errMessage={formik.touched.Status && formik.errors.Status}
                                id="txtStatus"
                                lable="Trạng thái" />

                            <Input
                                frmField={formik.getFieldProps("ProductCategoryID")}
                                errMessage={formik.touched.ProductCategoryID && formik.errors.ProductCategoryID}
                                id="txtProductCategoryID"
                                lable="Mã loại" />
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
export default Product;