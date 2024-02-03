import axios from "axios";
import store from '../../store/';
import { hideLoading, showLoading } from "react-redux-loading-bar";

const url = {
    baseUrl: "http://localhost:2000/laravelapi/public/api",

    loginemploy: "/employees/login",
    profile: "/employees/profile",
    updateprofile: "/employees",

    handlecartitem: "/employees/cartitem",
    cartitempaging: "/employees/cartitem",
    getcartitem: "employees/cartitem/oder",

    oderdetail: "employees/oderdetail/create",
    oder: "employees/oder/create",

    reports: "employees/reportem/report",
    pagingreport: "/report",
    getPagingReportEmpid: "employees/reportem/getPagingReportEmpid"


};

const instanceMember = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "content-Type": "application/json",
        Accept: "application/json",
    },
})

instanceMember.interceptors.request.use((request) => {
    const state = store.getState();
    if (state.employ.token) {
        request.headers.Authorization = `Bearer ${state.employ.token}`;
    }
    store.dispatch(showLoading());
    return request;
});

instanceMember.interceptors.response.use(
    (response) => {
        setTimeout(() => store.dispatch(hideLoading()), 100);
        return response.data;
    },
    (err) => {
        setTimeout(() => store.dispatch(hideLoading()), 100);
        if (err.code === "ERRR_NETWORK") {
            window.location.href = ("/NetworkErr")
        } else {
            switch (err.request.status) {
                case 401: window.location.href = ("/main/main"); break;
                case 403: window.location.href = ("/NoPermission"); break;
                default: break;
            }
        }
        return Promise.reject(err);
    }
);
const api = {
    url,
    instanceMember,
    get: instanceMember.get,
    post: instanceMember.post,
    put: instanceMember.put,
    delete: instanceMember.delete,
    patch: instanceMember.patch,
};
export default api;