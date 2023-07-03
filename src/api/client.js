import axios from 'axios'
const baseUrl = 'http://localhost:8080/api'

export const getJourneysPage = (pagination, sorting, columnFilters) => {
  const {pageIndex, pageSize} = pagination
  var sortField = null
  var sortOrder = null
  if (sorting[0]){
    sortField = sorting[0].id
    sorting[0].desc ? sortOrder = 'descend' : sortOrder = 'ascend'
  }
  const filterD = columnFilters.filter(element => element.id === 'departureStationName')
  const filterDeparture = filterD.length > 0 ? filterD[0].value : null
  const filterR = columnFilters.filter(element => element.id === 'returnStationName')
  const filterReturn = filterR.length > 0 ? filterR[0].value : null
  const request = axios.request({
    method: 'POST',
    baseURL: baseUrl,
    url: '/journey/page',
    data: {
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      filterDeparture,
      filterReturn
    }
  })
  return request.then(response => response.data)
}

export const getStationsPage = (pagination, globalFilter, columnFilters) => {
  const {pageIndex, pageSize} = pagination
  const filterCity = columnFilters.length > 0 ? columnFilters[0].value : null
  if (globalFilter === '')
    globalFilter = null
  const request = axios.request({
    method: 'POST',
    baseURL: baseUrl,
    url: '/station/page',
    data: {
      pageIndex,
      pageSize,
      globalFilter,
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
