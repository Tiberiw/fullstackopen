import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const create = newObj => {
    return axios.post(baseUrl, newObj).then(res => res.data)
}

const remove = persId => {
    return axios.delete(`${baseUrl}/${persId}`)
}

const update = (id, newPers) => {
    return axios.put(`${baseUrl}/${id}`, newPers).then(res => res.data)
}

export default {getAll, create, remove, update}