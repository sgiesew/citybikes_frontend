import React from 'react'
import { useState, useEffect } from 'react'
import { MaterialReactTable } from 'material-react-table'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import {getJourneysPage} from '../../api/client'

const columns = [
  {
    header: 'Departure',
    accessorKey: 'departureStationName',
    enableSorting: false,
    enableColumnFilter: true,
    filterVariant: 'select',
    filterSelectOptions: ['Metro station', 'Train station', 'School', 'Museum', 'Stadium']
  },
  {
    header: 'Destination',
    accessorKey: 'returnStationName',
    enableSorting: false,
    enableColumnFilter: true,
    filterVariant: 'select',
    filterSelectOptions: ['Metro station', 'Train station', 'School', 'Museum', 'Stadium']
  },
  {
    header: 'Distance (km)',
    accessorKey: 'distance',
    Cell: ({ cell, column, renderedCellValue, row, table }) => Number((renderedCellValue / 1000).toFixed(3)),
    enableSorting: true,
    enableColumnFilter: false
  },
  {
    header: 'Duration (min)',
    accessorKey: 'duration',
    Cell: ({ cell, column, renderedCellValue, row, table }) => (renderedCellValue / 60).toFixed(2).replace('.', ':'),
    enableSorting: true,
    enableColumnFilter: false
  },
]

const Journeys = () => {

  const [journeys, setJourneys] = useState([])
  const [fetching, setFetching] = useState(true)
  const [rowCount, setRowCount] = useState(0)
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState(
    {
      pageIndex: 0,
      pageSize: 10
    }
  )

  const fetchJourneysPage = (pagination, sorting, columnFilters) => {
    setFetching(true)
    getJourneysPage(pagination, sorting, columnFilters)
      .then(data => {
        data.content.map((element, index) => {
          element.id = index
          return element
        })
        setJourneys(data.content)
        setRowCount(data.totalElements)
        setFetching(false)
      })
  }
  
  useEffect(() => {
    fetchJourneysPage(pagination, sorting, columnFilters)
  }, [pagination, sorting, columnFilters])

  
  if (fetching) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>)
  }
  return (
    <Box sx={{ m: 2 }}>
      <MaterialReactTable
        data={journeys}
        columns={columns}
        getRowId={(row) => row.id}
        enableGlobalFilter={false}
        initialState={{
          showColumnFilters: true
        }}
        manualPagination
        manualSorting
        manualFiltering
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        onColumnFiltersChange={setColumnFilters}
        rowCount={rowCount}
        state={{
          pagination,
          sorting,
          columnFilters
        }}
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

export default Journeys
