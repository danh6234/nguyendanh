import api from './api';

const get = (id) => api.get(`${api.url.getcartitem}/${id}`);
const addoder = (data) => api.post(`${api.url.oder}`, data);
const addoderdetail = (data) => api.post(`${api.url.oderdetail}`, data);

const oderService = {
    get,
    addoder,
    addoderdetail,
}
export default oderService;