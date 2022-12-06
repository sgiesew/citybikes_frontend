import axios from 'axios'
const baseUrl = 'http://localhost:8080/api'

export const getJourneysPage = (pageNr, pageLen, sortField, sortOrder, filterDeparture, filterReturn) => {
    if (!sortField){
        sortField = '' 
    }
    if (!sortOrder){
        sortOrder = '' 
    }
    const request = axios.request({
        method: 'POST',
        baseURL: baseUrl,
        url: '/journey',
        data: {
            pageNr,
            pageLen,
            sortField,
            sortOrder,
            filterDeparture,
            filterReturn
        }
      })
    return request.then(response => response.data)
}

export const getStationsPage = (pageNr, pageLen) => {
    const request = axios.request({
        method: 'POST',
        baseURL: baseUrl,
        url: '/station',
        data: {
            pageNr,
            pageLen
        }
      })
    return request.then(response => response.data)
}

export const getStation = id => {
    const request = axios.get(`${baseUrl}/station/${id}`)
    return request.then(response => response.data)
}
