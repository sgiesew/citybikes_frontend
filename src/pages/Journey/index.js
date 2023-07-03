import React from 'react'
import { useState, useEffect } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { Spin } from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getJourneysPage} from '../../api/client'
import styles from './index.module.css'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const columns = [
  {
    header: 'From',
    accessorKey: 'departureStationName',
    enableSorting: false,
    enableColumnFilter: true,
    filterVariant: 'select',
    filterSelectOptions: ['Metro station', 'Train station', 'School', 'Museum', 'Stadium']
  },
  {
    header: 'To',
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
    return <div className={styles.spin}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className={styles.table}>
    <MaterialReactTable
      data={journeys}
      columns={columns}
      getRowId={(row) => row.id}
      enableGlobalFilter={false}
      initialState={{ showColumnFilters: true }}
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
    />
  </div>
}

export default Journeys
