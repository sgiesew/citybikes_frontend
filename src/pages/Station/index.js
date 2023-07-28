import React from 'react'
import { useState, useEffect } from 'react'
import { MaterialReactTable } from 'material-react-table'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import {getStationsPage, getStation} from '../../api/client'
import SingleStationView from './SingleStationView'

const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
    enableColumnFilter: false,
    enableSorting: false
  },
  {
    header: 'City',
    accessorKey: 'city',
    enableColumnFilter: true,
    filterVariant: 'select',
    filterSelectOptions: ['Helsinki', 'Espoo'],
    enableFilterMatchHighlighting: false,
    enableSorting: false
  }
]

const Stations = () => {
  
  const [stations, setStations] = useState([])
  const [fetching, setFetching] = useState(true)
  const [rowCount, setRowCount] = useState(0)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState(
    {
      pageIndex: 0,
      pageSize: 10
    }
  )

  const [fetchingDetail, setFetchingDetail] = useState(false)
  const [showDetailView, setShowDetailView] = useState(false)
  const [station, setStation] = useState(null)

  const fetchStationsPage = (pagination, globalFilter, columnFilters) => {
    setFetching(true)
    getStationsPage(pagination, globalFilter, columnFilters)
      .then(data => {
        setStations(data.content)
        setRowCount(data.totalElements)
        setFetching(false)
      })
  }
  
  useEffect(() => {
    fetchStationsPage(pagination, globalFilter, columnFilters)
  }, [pagination, globalFilter, columnFilters])
  

  const fetchStation = id => {
    getStation(id)
      .then(data => {
        setStation(data)
        setFetchingDetail(false)
      })
  }

  const showDetailViewFor = id => {
    fetchStation(id)
    setStation([])
    setShowDetailView(true)
    setFetchingDetail(true)
  }
  
  if (fetching) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>)
  }
  return (
    <Box sx={{ m: 2 }}>
      <SingleStationView
        station={station}
        showDetailView={showDetailView}
        setShowDetailView={setShowDetailView}
        fetchingDetail={fetchingDetail}
        />
      <MaterialReactTable
        data={stations}
        columns={columns}
        getRowId={(row) => row.station_id}
        initialState={{
          showColumnFilters: true,
          showGlobalFilter: true
        }}
        manualPagination
        manualFiltering
        positionGlobalFilter='left'
        muiSearchTextFieldProps={{
          placeholder: 'Search stations',
          sx: { minWidth: '300px' },
          variant: 'outlined',
        }}
        onPaginationChange={setPagination}
        onGlobalFilterChange={setGlobalFilter}
        onColumnFiltersChange={setColumnFilters}
        rowCount={rowCount}
        state={{
          pagination,
          globalFilter,
          columnFilters
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            showDetailViewFor(row.original.station_id)
          },
          sx: {
            cursor: 'pointer',
          },
        })}
        muiTableHeadCellProps={{
          sx: (theme) => ({
            color: theme.palette.primary.main,
            fontSize: 16
          }),
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '0',
            border: '1px solid #e0e0e0',
          }
        }}
      />
    </Box>
  )
}

export default Stations
