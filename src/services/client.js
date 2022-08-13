import axios from 'axios'
const baseUrl = 'https://citybikes-backend.herokuapp.com/api'

export const getJourneysPage = (pageNr, pageLen) => {
    const request = axios.get(`${baseUrl}/journey/page/${pageNr}/len/${pageLen}`)
    return request.then(response => response.data)
}

export const getAllStations = () => {
    const request = axios.get(baseUrl + '/station')
    return request.then(response => response.data)
}

export const getStation = id => {
    const request = axios.get(`${baseUrl}/station/${id}`)
    return request.then(response => response.data)
}
