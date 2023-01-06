import React, {Suspense} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import LayoutComponent from './pages/Layout'
import Journeys from './pages/Journey'
import Stations from './pages/Station'
import StationsMap from './pages/Station/StationsMap'
import './App.css'

const NotFound = () => {
  return <div> NotFound Component</div>
}

const App = () => {
  return (
    <HistoryRouter history = {createBrowserHistory()}>
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />}></Route>
            <Route
              path="/home"
              element={
                  <LayoutComponent />
              }
            >
              <Route exact path="/home" element={<StationsMap />}></Route>
              <Route path="/home/stations" element={<Stations />}></Route>
              <Route path="/home/journeys" element={<Journeys />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
