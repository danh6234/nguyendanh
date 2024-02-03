import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import oderService from '../../services/employ/oderService';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import profileEmployservice from '../../services/employ/profileEmployService';
import handleCartItemService from '../../services/employ/handleCartItemService';
import { useNavigate } from "react-router-dom";

export default function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [cartitem, setCartItem] = useState([]);
  const [listcartitem, setListcartItem] = useState([]);
  const [address, setAddress] = useState([]);
  const [namemember, setNameMember] = useState([]);
  const [phonemember, setPhoneMember] = useState([]);
  const [sale, setSale] = useState([]);
  const [idmember, setIdMember] = useState([]);
  const [transport, setTransPort] = useState([]);
  const [totalpay, setTotalPay] = useState([]);
  const [date, setDate] = useState(null);
  const [nameproduct, setNameProduct] = useState([]);
  const [idproduct, setIDProduct] = useState([]);
  const [qualityproduct, setQualityProuct] = useState([]);

  const handleTohandleCartitem = () => {
    navigate("/employ/handlecartitem");
  }
  const loadData = () => {
    oderService.get(Number(id)).then((res) => {
      setListcartItem(res.data);
      setCartItem(res.data[0].id);
      setAddress(res.data[0].Address);
      setNameMember(res.data[0].NameMember);
      setPhoneMember(res.data[0].Phone);
      setSale(res.data[0].PriceSale);
      setTransPort(res.data[0].TransPort);
      setTotalPay(res.data[0].TotalPay);
      setIdMember(res.data[0].IdMember);

      setNameProduct(res.data[0].NameProduct.split(', '));
      setIDProduct(res.data[0].IdProduct.split(', '));
      setQualityProuct(res.data[0].QualityProduct.split(', '));

    });
    profileEmployservice.get().then((res) => {
      setProfileData(res.data);
    })
  };

  useEffect(() => {
    loadData();
  }, [id, transport]);
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }, []);

  const handleSubmid = () => {
    handleSubmidOder();
    handleSubmidOderdetail();
    handleStatus();
    handleTohandleCartitem();
  };
  const handleSubmidOder = () => {
    const dataOder = {
      "Address": address,
      "CreatedDate": date,
      "FullName": namemember,
      "Email": "Không có",
      "OderID": cartitem,
      "Tel": phonemember,
      "member_id": idmember,
      "emp_id": profileData.emp_id,
    }
    oderService.addoder(dataOder).then((res) => {
      if (res.errorCode === 0) {
        toast.success("Thêm dữ liệu đơn hàng thành công!");
      } else toast.error("Thêm thất bại !");
    });
  };
  const handleSubmidOderdetail = () => {
    const dataOderdetail = {
      "OderID": cartitem,
      "ProductID": idproduct.join(', '),
      "Quantity": qualityproduct.join(', '),
      "Price": totalpay,
      "TransPort": transport,
      "Sale": sale,
    }
    oderService.addoderdetail(dataOderdetail).then((res) => {
      if (res.errorCode === 0) {
        toast.success("Thêm dữ liệu chi tiết đơn hàng thành công!");
      } else toast.error("Thêm thất bại !");
    });
  };
  const handleStatus = () => {
    const dataAdd = {
      "NameProduct": listcartitem[0].NameProduct,
      "IdProduct": listcartitem[0].IdProduct,
      "QualityProduct": listcartitem[0].QualityProduct,
      "Status": 2,
      "IdMember": listcartitem[0].IdMember,
      "NameMember": listcartitem[0].NameMember,
      "TotalPrice": listcartitem[0].TotalPrice,
      "TransPort": listcartitem[0].TransPort,
      "PriceSale": listcartitem[0].PriceSale,
      "TotalPay": listcartitem[0].TotalPay,
      "Phone": listcartitem[0].Phone,
      "Address": listcartitem[0].Address,
      "Oderdate": date,
      "Expecteddate": listcartitem[0].updatedDate,
    }
    handleCartItemService.updateCartitem(listcartitem[0].id, dataAdd).then((res) => {
      if (res.errorCode === 0) {
        toast.success(" Đã xác nhận !");
      } else toast.error("Xác nhận thất bại !");
    });
  };
  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              <MDBCard className="border-top border-bottom border-3 border-color-custom">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5 " style={{ textAlign: "center", color: "black" }}>
                    HÓA ĐƠN
                  </p>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1"><b>Ngày lập hóa đơn:</b> {date}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1"><b>Đơn hàng số:</b> {cartitem}</p>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1"><b>Tên khách hàng:</b>{namemember}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1"><b>Địa chỉ giao:</b> {address}</p>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1"><b>Email: </b> ..............</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1"><b>Số điện thoại:</b> {phonemember}</p>
                    </MDBCol>
                  </MDBRow>
                  {/* Chi tiết hóa đơn */}
                  <p style={{ textAlign: "center", color: "black" }}
                    className="lead fw-bold mb-4 pb-2"
                  >
                    CHI TIẾT HÓA ĐƠN
                  </p>

                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Tên sản phẩm</th>
                          <th className="text-center">Số lượng</th>
                          <th className="text-center">Mã</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nameproduct.map((aNameProduct, idx) => (
                          <tr key={idx}>
                            <td>{aNameProduct}</td>
                            <td className="text-center">{qualityproduct[idx]}</td>
                            <td className="text-center">{idproduct[idx]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                  <MDBRow className="my-4">
                    <MDBCol md="4" >
                      {/* Tổng tiền */}
                      <p
                        className=" mb-0 h6"
                      >
                        <b>Giảm giá:</b> {sale}
                      </p>
                    </MDBCol>
                    <MDBCol md="4">
                      <p
                        className=" mb-0 h6"
                      >
                        <b>Phí giao:</b> {transport}
                      </p>
                    </MDBCol>
                    <MDBCol md="4">
                      <p
                        className="mb-0 d-flex justify-content-between h6"
                      >
                        <b>Tổng tiền:</b> {totalpay}
                      </p>
                    </MDBCol>
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9 mt-3 mb-0">
                      <Button style={{ width: "100px" }}
                        onClick={handleSubmid}
                        variant="success"> Tạo đơn </Button>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}