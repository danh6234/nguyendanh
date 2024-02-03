import api from './api';

const list = () => api.get(api.url.reports);
const get = (id) => api.get(`${api.url.reports}/${id}`);
// const getAvatarBase64 = (id) => api.get(`${api.url.employees}/avatar-base64/${id}`);
// const getAvatar = (id) => api.get(`${api.url.employees}/avatar/${id}`, {
//     responseType: "blob",
// });
const getPaging = (pageNum, PageLength, searchText) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.pagingreport}/get-paging${queryString}`);
};
const getPagingEmpid = (pageNum, PageLength, searchText, id) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.getPagingReportEmpid}/${id}${queryString}`);
};
const add = (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(api.url.reports, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};
const update = (id, data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.reports}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
};

const remove = (id) => api.delete(`${api.url.reports}/${id}`);

const reportServicesEm = {
    list,
    get,
    getPaging,
    getPagingEmpid,
    add,
    update,
    delete: remove,
}
export default reportServicesEm;