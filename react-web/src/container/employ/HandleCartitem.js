import React, { useEffect, useState } from "react";
import handleCartItemService from '../../services/employ/handleCartItemService';
import { Button, Pagination, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const HandleCartItem = () => {
    const navigate = useNavigate();
    const [cartitem, setCartItem] = useState([]);
    const [page, setPage] = useState(0);
    const [pagingItem, setPagingItem] = useState([]);
    const [pageLength, setpageLength] = useState(10);
    const [modalshow, setShowModal] = useState(false);
    const [modalshowDelete, setShowModalDelete] = useState(false);
    const [id, setId] = useState(0);

    const handleToOder = () => {
        navigate(`/employ/oder/${id}`);
    }
    const handleModalCloseDelete = () => setShowModalDelete(false);
    const handleModalClose = () => setShowModal(false);

    const handleModalShow = () => setShowModal(true);
    const [valueId, setValueId] = useState(0);

    const handleModalShowDelete = () => setShowModalDelete(true);

    const ShowModalHandlerDelete = (e, id) => {
        if (e) e.preventDefault();
        setValueId(id);
        handleModalShowDelete();
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        handleCartItemService.delete(id).then((res) => {
            if (res.errorCode === 0) {
                loadData();
                handleModalCloseDelete();
                toast.warn(" Xóa thành công !");
            } else { toast.error("Xóa thất bại !"); }
        });
    }


    const formik = useFormik({
        initialValues: {
            id: 0,
        },
        validationSchema: Yup.object({
            id: Yup.number().required(),
        }),
        onSubmit: (values) => {
            handleSubmid(values);
        },
    });
    const handleSubmid = (data) => {
        const dataAdd = {
            "NameProduct": data.NameProduct,
            "IdProduct": data.IdProduct,
            "QualityProduct": data.QualityProduct,
            "Status": 1,
            "IdMember": data.IdMember,
            "NameMember": data.NameMember,
            "TotalPrice": data.TotalPrice,
            "TransPort": data.TransPort,
            "PriceSale": data.PriceSale,
            "TotalPay": data.TotalPay,
            "Phone": data.Phone,
            "Address": data.Address,
        }
        handleCartItemService.updateCartitem(data.id, dataAdd).then((res) => {
            if (res.errorCode === 0) {
                handleModalClose();
                toast.success(" Đã xác nhận !");
            } else toast.error("Xác nhận thất bại !");
        });
        handleToOder();
    }


    const ShowModalHandler = (e, id) => {
        if (e) e.preventDefault();
        if (id) {
            handleCartItemService.get(id).then((res) => {
                formik.setValues(res.data);
                setId(res.data.id);
                handleModalShow();
            });
        }
    };
    const loadData = () => {
        handleCartItemService.getPaging(page, pageLength).then((res) => {
            setCartItem(res.data)
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
    useEffect(() => {
        loadData();
    }, [page, pageLength]);

    return (
        <div>
            <>
                <div className="container mt-4">
                    <div className="card border-dark bt-5">
                        <div className="card-header ">
                            <div className="row">
                                <div className="col  rowmajor ">

                                    <h3 className="card-title">Danh sách đơn hàng</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="mb-2">
                                    <Row>
                                        <Col>
                                            <Row className="gx-1">
                                                <label className="col-form-label col-sm-auto">Số đơn trên trang </label>
                                                <Col className="sm-5">
                                                    <select value={pageLength} style={{ width: "80px" }}
                                                        onChange={handleChangePageLength}
                                                        className="form-select shadow-none">
                                                        <option value="2">2</option>
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>

                                                    </select>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col xs="auto">{/*search box*/}</Col>
                                    </Row>
                                </div>
                                <table className="table table-bordered border-dark table-hover table-striped">
                                    <thead>
                                        <tr className="table-primary border-dark">
                                            <th style={{ width: "50px" }}>STT</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Mã sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Tên Khách hàng</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái đơn</th>
                                            <th style={{ width: "150px" }}>Trạng thái xử lý</th>
                                            <th>Hủy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartitem.map((aCartitem, idx) => (
                                            <tr key={aCartitem.id}>
                                                <th className="text-center">{page * pageLength + idx + 1}</th>
                                                <td style={{ width: "250px" }}>{aCartitem.NameProduct}</td>
                                                <td>{aCartitem.IdProduct}</td>
                                                <td>{aCartitem.QualityProduct}</td>
                                                <td style={{ width: "150px" }}>{aCartitem.NameMember}</td>
                                                <td>{aCartitem.TotalPay}</td>
                                                {aCartitem.Status === 0 ?
                                                    (<td style={{ color: "red" }}>
                                                        <b>Chưa xử lý</b>
                                                    </td>
                                                    ) : (
                                                        aCartitem.Status === 1 ?
                                                            <td style={{ color: "yellow" }}>
                                                                <b>Đang tạo hóa đơn</b>
                                                            </td>
                                                            :
                                                            <td style={{ color: "green" }}>
                                                                <b>Đã xử lý</b>
                                                            </td>
                                                    )
                                                }
                                                <td>
                                                    {aCartitem.Status === 0 ?
                                                        (<Button style={{ width: "100px" }}
                                                            onClick={(e) => ShowModalHandler(e, aCartitem.id)}
                                                            variant="success"> Xác nhận </Button>
                                                        ) : (aCartitem.Status === 1 ?
                                                            <Button style={{ width: "100px" }}
                                                                onClick={(e) => ShowModalHandler(e, aCartitem.id)}
                                                                variant="success"> Xác nhận </Button>
                                                            : (aCartitem.Status === 2 ?
                                                                <Button style={{ width: "100px" }}
                                                                    variant="success"> Đang giao </Button>
                                                                :
                                                                <Button style={{ width: "100px" }}
                                                                    onClick={(e) => ShowModalHandlerDelete(e, aCartitem.id)}
                                                                    variant="danger"> Xóa </Button>
                                                            )
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    <Button style={{ width: "100px" }}
                                                        onClick={(e) => ShowModalHandlerDelete(e, aCartitem.id)}
                                                        variant="danger"> Xóa </Button></td>
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
                    <Modal.Title>Xác nhận tạo hóa đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Xác nhận xử lý và tạo hóa đơn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        No
                    </Button>
                    <Button variant="primary"
                        disabled={!formik.dirty || !formik.isValid}
                        onClick={formik.handleSubmit}>Tạo hóa đơn</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={modalshowDelete}
                onHide={handleModalCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Xóa đơn hàng </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có thật sự muốn xóa hay không !
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalCloseDelete}>
                        No
                    </Button>
                    <Button variant="danger" onClick={(e) => handleDelete(e, valueId)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default HandleCartItem;