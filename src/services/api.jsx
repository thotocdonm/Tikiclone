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

export const getBookWithPaginate = (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

export const getBookCategory = () => {
    return axios.get(`/api/v1/database/category`)
}

export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}

export const postCreateBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post('/api/v1/book', { thumbnail, slider, mainText, author, price, sold, quantity, category });
}

export const putUpdateBook = (_id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${_id}`, { thumbnail, slider, mainText, author, price, sold, quantity, category })
}

export const delDeleteBook = (_id) => {
    return axios.delete(`/api/v1/book/${_id}`)
}

export const getDetailBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}

export const postCreateOrder = (data) => {
    return axios.post('/api/v1/order', data)
}

export const getHistory = () => {
    return axios.get(`/api/v1/history`)
}

export const postUploadAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        },
    });
}

export const putUpdateInfo = (fullName, phone, avatar, _id) => {
    return axios.put('/api/v1/user', { fullName, phone, avatar, _id })
}

export const postChangePassword = (email, oldpass, newpass) => {
    return axios.post('/api/v1/user/change-password', { email, oldpass, newpass })
}

export const getOrderWithPaginate = (query) => {
    return axios.get(`/api/v1/order?${query}`)
}

export const getDashBoard = () => {
    return axios.get(`/api/v1/database/dashboard`)
}
