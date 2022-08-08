import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/journey'

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
  
export const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

