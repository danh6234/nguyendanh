import api from './api';
const list = () => api.get(api.url.memberproduct);
const get = (id) => api.get(`${api.url.memberproduct}/${id}`);

const getPaging = (pageNum, PageLength, searchText) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.product}/get-paging${queryString}`);
};
const getcategory = (pageNum, PageLength, searchText, id) => {
    let queryString = `?p=${pageNum}&r=${PageLength}`;
    if (searchText) queryString += `&q=${searchText}`;
    return api.get(`${api.url.productcategory}/${id}${queryString}`);
};

const add = (data) => api.post(`${api.url.saveinfor}`, data);

const getAvatarUrl = (id) => api.get(`${api.url.memberproduct}/avatar-url/${id}`);
const memberProduct = {
    get,
    list,
    getPaging,
    getAvatarUrl,
    add,
    getcategory,
}
export default memberProduct;