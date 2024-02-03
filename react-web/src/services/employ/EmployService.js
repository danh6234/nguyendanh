import api from "./api";
const login = (username, password) => {
    const data = { username, password };
    return api.post(api.url.loginemploy, data);
};
const employServices = {
    login
};
export default employServices;