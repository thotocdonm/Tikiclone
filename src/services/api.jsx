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
    return axios.post('http://localhost:8080/api/v1/user', { fullName, password, email, phone })
}
