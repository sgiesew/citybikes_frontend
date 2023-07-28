import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { ResponsiveLine } from '@nivo/line'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { useTheme } from '@mui/material/styles'

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

const SingleStationView = ({station, showDetailView, setShowDetailView, fetchingDetail}) => {
  const theme = useTheme()
  
  const onClose = () => {
    setShowDetailView(false)
  }

  const DataCard = (props) => {
    const {title, value, unit} = props
    return (
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14, mb: 1.25 }}>
            {title}
          </Typography>
          <Typography variant="h5" color="primary">
            {value} {unit}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const RankingCard = (props) => {
    const {title, values} = props
    return (
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14, mb: 1.25 }}>
            {title}
          </Typography>
          {values.map( (value, index) => (
            <Grid container key={index}>
              <Grid xs={2}>
                <Avatar sx={{ fontSize: 15, width: 22, height: 22, bgcolor: theme.palette.primary.main }}>{index + 1}</Avatar>
              </Grid>
              <Grid xs={10}>
                <Typography color='primary' sx={{ fontSize: 15, mb: 0.5 }}>{value}</Typography>
              </Grid>
            </Grid>))
          }
        </CardContent>
      </Card>
    )
  }

  const ChartCard = (props) => {
    const {title, data} = props
    const chartData = [{
      id: 'graph1',
      data: data
    }]

    return (
      <Card sx={{ m: 1 }}>
        <CardContent sx={{ height: 300 }}>
          <Typography sx={{ fontSize: 16, mb: 1.25 }}>
            {title}
          </Typography>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 15, right: 30, bottom: 60, left: 35 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              format: tick => {
                if (((tick.slice(-2) === '01' || tick.slice(-2) === '15') && tick.slice(-5) !== '08-01') || tick.slice(-5) === '07-31'){
                  return new Date(Date.parse(tick)).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
                }
                else {
                  return ''
                }
              }
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5
            }}
            axisTop={null}
            axisRight={null}
            xFormat={ (x) => (<Typography sx={{ fontSize: 14 }}>Date: {new Date(Date.parse(x)).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</Typography>)}
            yFormat={ (y) => (<Typography sx={{ fontSize: 14 }}>Count: {y}</Typography>) }
            tooltip={({ point }) => {
              return (
                <div style={{ background: '#fff', padding: '9px 12px', border: '1px solid #ccc' }}>
                  {point.data.xFormatted}
                  {point.data.yFormatted}
                </div>
              )
            }} 
            enablePoints={false}
            useMesh={true}
            enableGridX={false}
            theme={{
              "axis": {
                "ticks": {
                  "text": {
                    "fontSize": 14
                  }
                }
              }
            }}
            colors={[theme.palette.primary.main]}
          />
        </CardContent>
      </Card>
    )
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
  })

  if (fetchingDetail || !station){
    return (
      <Dialog
        fullScreen
        TransitionComponent={fetchingDetail ? Transition : undefined}
        open={showDetailView}
        onClose={onClose}
      >
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Dialog>
    )
  }

  const position = [station.yPos, station.xPos]

  return (
    <Dialog
      fullScreen
      open={showDetailView}
      onClose={onClose}
    >
      <DialogTitle
        sx={{ m: 0, p: 0 }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar variant="dense">
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              <div>{station.name} ({station.address}, {station.city})</div>
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent
        sx={{ m: 0, p: 0, backgroundColor: '#eee' }}
      >
        <Grid container spacing={0} columns={24}>
          <Grid xs={6}>
            <Card sx={{ m: 1, p: 1 }}>
              <MapContainer style={{ height: '20vw', width: '100%' }} center={position} zoom={13} >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}></Marker>
              </MapContainer>
            </Card>
          </Grid>
          <Grid xs={4}>
            <DataCard
              title='Total departures'
              value={station.numDepartures}
            />
            <DataCard
              title='Average journey starting here'
              value={station.averageDepartureDistance}
              unit='m'
            />
          </Grid>
          <Grid xs={4}>
            <DataCard
              title='Total returns'
              value={station.numReturns}
            />
            <DataCard
              title='Average journey ending here'
              value={station.averageReturnDistance}
              unit='m'
            />
          </Grid>
          <Grid xs={5}>
            <RankingCard
              title='Most popular return stations for journeys'
              values={station.returnedToFromStationRanked}
            />
          </Grid>
          <Grid xs={5}>
            <RankingCard
              title='Most popular departure stations for journeys'
              values={station.departedFromToStationRanked}
            />
          </Grid>
          <Grid xs={12}>
            <ChartCard
              title='Departures per day'
              data={station.dailyDeparturesFromStation}
            />
          </Grid>
          <Grid xs={12}>
            <ChartCard
              title='Returns per day'
              data={station.dailyReturnsToStation}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default SingleStationView