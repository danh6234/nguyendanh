import axios from "axios";
import store from './../store/';
import { hideLoading, showLoading } from "react-redux-loading-bar";
const url = {
    baseUrl: "http://localhost:2000/laravelapi/public/api",
    //Admin
    login: "/login",

    employees: "/users/employees",
    pagingemployee: "/employees",

    member: "/users/member",
    pagingmember: "/member",

    product: "/product",
    productcategory: "/productcategory",

    report: "/users/report",
    pagingreport: "/report",

    codeforall: "/code",

    oderdetail: "/users/Oderdetail",
    clearOderdetail: "/users/Oderdetail/clear",

    clearOder: "/users/Oder/clear",

};

const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "content-Type": "application/json",
        Accept: "application/json",
    },
})

instance.interceptors.request.use((request) => {

    const state = store.getState();
    if (state.auth.token) {
        request.headers.Authorization = `Bearer ${state.auth.token}`;
    }
    store.dispatch(showLoading());
    return request;
});

instance.interceptors.response.use(
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
                // case 401:window.location.href=("/main/main") ; break;
                case 403: window.location.href = ("/NoPermission"); break;
                default: break;
            }
        }
        return Promise.reject(err);
    }
);
const api = {
    url,
    instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    patch: instance.patch,
};
export default api;