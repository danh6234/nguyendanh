import  api from './api';

const list = () => api.get(api.url.product);
const get = (id) => api.get(`${api.url.product}/${id}`);
const getAvatarUrl = (id) => api.get(`${api.url.product}/avatar-url/${id}`);
const getPaging = (pageNum, PageLength, searchText)=>{
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if(searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.product}/get-paging${queryString}`);
};

const add = (data)=>{
    const formData = new FormData();
    for(const key in data) formData.append(key, data[key]);
    return api.post(api.url.product, formData, {
        headers: {
            "Content-Type":"multipart/form-data",
        }
    });
};

const update = (id, data)=>{
    const formData = new FormData();
    for(const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.product}/${id}`, formData, {
        headers: {
            "Content-Type":"multipart/form-data",
        }
    })};

const remove=(id) => api.delete(`${api.url.product}/${id}`);
const downloadAvatar = (id) => api.get(`${api.url.product}/download-img/${id}`, {
    responseType: "blob",
});

const productServices = {
    list,
    getPaging,
    get,
    getAvatarUrl,
    add,
    update,
    downloadAvatar,
    delete:remove,
}
export default productServices;