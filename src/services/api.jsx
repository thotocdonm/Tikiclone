import axios from "../utils/axios-customize";


export const callRegister = (fullName, email, password, phone) => {
    return axios.post("/api/v1/user/register", { fullName, email, password, phone })
}

export const callLogin = (username, password, delay) => {
    return axios.post('/api/v1/auth/login', { username, password, delay })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

export const getUserWithPaginate = (query) => {
    return axios.get(`/api/v1/user?${query}`)
}

export const postCreateUser = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', { fullName, password, email, phone })
}

export const postCreateListUser = (array) => {
    return axios.post('/api/v1/user/bulk-create', array)
}

export const putUpdateUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone })
}

export const delDeleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`);
}
