import api from "./api";
const add = (data) => api.post(`${api.url.singup}`, data);
const Singup = {
    add,
};
export default Singup;