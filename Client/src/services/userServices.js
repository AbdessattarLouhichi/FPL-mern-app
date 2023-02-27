import axios from '../config/config'

const getAllUsers = async () => {
    return await axios.get("/users");
}
const updateOne = (id, data) => {
    return axios.put(`/users/${id}`, data);
};

const removeOne = id => {
    return axios.delete(`/users/${id}`);
};
const getOne = id => {
    return axios.get(`/users/${id}`);
};

const UserService = {
    getAllUsers,
    updateOne,
    removeOne,
    getOne
}

export default UserService