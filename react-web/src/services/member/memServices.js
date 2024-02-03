import api from "./api";
const login = (username, password)=>{
    const data = {username, password};
    return api.post(api.url.loginmember, data);
};
const add = (data) => api.post(`${api.url.singup}`, data);
const memberServices={
    login,
    add,
};
export default memberServices;