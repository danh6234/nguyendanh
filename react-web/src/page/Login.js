import { useDispatch } from "react-redux";
import { login } from "../store/reducers/auth";
import React, { useEffect, useState } from "react";
import Input from "../component/Input";
import userServices from "../services/userServices";
import { useNavigate } from "react-router-dom";
import CustomButton from "../component/CustomButton";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mess, setMess] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);

    const usernameRef = React.useRef();
    const passwordRef = React.useRef();

    const formSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        setIsWaiting(true);
        userServices.login(username, password).then((res) => {
            if (res.errorCode === 0) {
                setMess("");
                dispatch(login({
                    token: res.data.token,
                    userInfor: res.data
                }))
                navigate("/home");
            } else {
                setMess(res.message);
            }

        });
    };
    useEffect(() => {
        usernameRef.current.focus();
    }, []);
    return (
        <>
            <div className='container h-100' >
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-sm-8 col-lg-5">
                        <div className="card bg-primary">
                            <div className="card-header text-white">
                                <h4 className="card-title mb-0"><i className="bi-grid-3x3-gap-fill"></i> Đăng nhập quản lý</h4>
                            </div>
                            <div className="card-body bg-white rounded-bottom">
                                <p className="text-center text-danger">{mess}</p>
                                <form onSubmit={formSubmit}>
                                    <div className="row mb-3">
                                        <Input
                                            inputref={usernameRef}
                                            id="email" lable="User name"
                                            maxLength="50"
                                            type="text" placeholder="Nhập tài khoản" />
                                        <Input
                                            inputref={passwordRef}
                                            id="password" lable="Pass word"
                                            maxLength="50"
                                            type="password" placeholder="Nhập mật khẩu" />

                                    </div>
                                    <div className="row">
                                        <div className="offset-sm-3 col-auto">
                                            <CustomButton type="submit"
                                                disabled={isWaiting}
                                                isLoading={isWaiting}
                                                color="primary"
                                                className="btn btn-primary">
                                                Đăng nhập
                                            </CustomButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Login;