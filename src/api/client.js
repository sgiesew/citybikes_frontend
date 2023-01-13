import axios from 'axios'
const baseUrl = 'https://citybikes-backend.herokuapp.com/api'

export const getJourneysPage = (params) => {
  var {curPage, pageLen, sortField, sortOrder, filterDeparture, filterReturn} = params
  curPage -= 1
  const request = axios.request({
    method: 'POST',
    baseURL: baseUrl,
    url: '/journey/page',
    data: {
      curPage,
      pageLen,
      sortField,
      sortOrder,
      filterDeparture,
      filterReturn
    }
  })
  return request.then(response => response.data)
}

export const getStationsPage = (params) => {
  var {curPage, pageLen, searchTerm, filterCity} = params
  curPage -= 1
  const request = axios.request({
    method: 'POST',
    baseURL: baseUrl,
    url: '/station/page',
    data: {
      curPage,
      pageLen,
      searchTerm,
      filterCity
    }
  })
  return request.then(response => response.data)
}

export const getStation = id => {
  const request = axios.get(`${baseUrl}/station/${id}`)
  return request.then(response => response.data)
}

export const getStations = () => {
  const request = axios.get(`${baseUrl}/station`)
  return request.then(response => response.data)
}
