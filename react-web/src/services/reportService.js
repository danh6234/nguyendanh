import api from './api';

const get = (id) => api.get(`${api.url.report}/${id}`);
// const getAvatarBase64 = (id) => api.get(`${api.url.employees}/avatar-base64/${id}`);
// const getAvatar = (id) => api.get(`${api.url.employees}/avatar/${id}`, {
//     responseType: "blob",
// });
const getPaging = (pageNum, PageLength, searchText) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.pagingreport}/get-paging${queryString}`);
};

const remove = (id) => api.delete(`${api.url.report}/${id}`);

const downloadAvatar = (id) => api.get(`${api.url.report}/download-img/${id}`, {
    responseType: "blob",
});

const reportServices = {
    get,
    downloadAvatar,
    getPaging,
    delete: remove,
}
export default reportServices;