import api from './api';

const get = (id) => api.get(`${api.url.handlecartitem}/${id}`);
const update = (id, data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.updateprofile}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
};
const getPaging = (pageNum, PageLength, searchText) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.cartitempaging}/get-paging${queryString}`);
};
const remove = (id) => api.delete(`${api.url.handlecartitem}/${id}`);

const updateCartitem = (id, data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return api.post(`${api.url.handlecartitem}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
};
const handleCartItemService = {
    get,
    update,
    getPaging,
    delete: remove,
    updateCartitem,
}
export default handleCartItemService;