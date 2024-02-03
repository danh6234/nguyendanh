import axios from "axios";
import store from '../../store/';
import { hideLoading, showLoading } from "react-redux-loading-bar";

const url = {
    baseUrl: "http://localhost:2000/laravelapi/public/api",
    //Member
    loginmember: "/member/login",
    getcode: "/member/code",
    memberpage: "/member",
    profile: "/member/profile",
    memberproduct: "/member/product",
    product: "/product",
    productcategory: "/member/productcategory",
    saveinfor: "/member/saveinfor/create",
    saveinfordeleteall: "/member/saveinfor/create/deleteall",
    cartitem: "/member/cartitem/create",
    //giỏ hàng
    getcartitem: "/member/cartitem/get",
    //Đăng ký
    singup: "/member/register"
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
    if (state.member.token) {
        request.headers.Authorization = `Bearer ${state.member.token}`;
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