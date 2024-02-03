import React, { useEffect, useState } from "react";
import CartItemService from '../../services/member/cartitemService';
import profileMember from '../../services/member/profileMember';
const HandleCartItem = () => {
    const [cartitem, setCartItem] = useState([]);
    const [profileData, setProfileData] = useState({});

    const loadData = () => {
        //loadprofile
        profileMember.get().then((res) => {
            setProfileData(res.data);
        })
        //get theo profile
        CartItemService.getcartitem(profileData.id).then((res) => {
            setCartItem(res.data);
        })
    };

    useEffect(() => {
        loadData();
    }, [profileData.id]);

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
                                </div>
                                <table className="table table-bordered border-dark table-hover table-striped">
                                    <thead>
                                        <tr className="table-dark border-primary">
                                            <th style={{ width: "50px" }}>STT</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Vận chuyển</th>
                                            <th>Tổng tiền</th>
                                            <th>Ngày đặt</th>
                                            <th>Ngày dự kiến giao</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartitem.map((aCartitem, idx) => (
                                            <tr key={aCartitem.id}>
                                                <th className="text-center">{idx + 1}</th>
                                                <td style={{ width: "250px" }}>{aCartitem.NameProduct}</td>
                                                <td style={{ width: "150px" }}>{aCartitem.QualityProduct}</td>
                                                {aCartitem.TransPortuct === 10000 ?
                                                    <td style={{ width: "150px" }}>Thường</td> :
                                                    <td style={{ width: "150px" }}>Nhanh</td>
                                                }
                                                <td>{aCartitem.TotalPay}</td>
                                                <td>{aCartitem.Oderdate.slice(0, 10)}</td>
                                                <td>{aCartitem.Expecteddate.slice(0, 10)}</td>
                                                {aCartitem.Status === 0 ?
                                                    (<td style={{ color: "red" }}>
                                                        <b>Chưa xử lý</b>
                                                    </td>
                                                    ) : (aCartitem.Status === 1 ?
                                                        <td style={{ color: "red" }}>
                                                            <b>Đang xử lý</b>
                                                        </td>
                                                        : (aCartitem.Status === 2 ?
                                                            <td style={{ color: "red" }}>
                                                                <b>Đang giao</b>
                                                            </td>
                                                            :
                                                            <td style={{ color: "green" }}>
                                                                <b>Đã giao</b>
                                                            </td>
                                                        )

                                                    )
                                                }

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </>

        </div>
    );
}
export default HandleCartItem;