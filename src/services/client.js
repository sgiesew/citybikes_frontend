import axios from 'axios'
const baseUrl = 'http://localhost:8080/api'

export const getAllJourneys = () => {
    const request = axios.get(baseUrl + '/journey')
    return request.then(response => response.data)
}
  
export const getAllStations = () => {
    const request = axios.get(baseUrl + '/station')
    return request.then(response => response.data)
}

