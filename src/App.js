import { Routes, Route, Navigate } from 'react-router-dom'

import MainMenu from './MainMenu'
import Journeys from './Journeys'
import Stations from './Stations'

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import React, { Suspense } from 'react'

const NotFound = () => {
  return <div> NotFound Component</div>
}

function App() {
  return (
    <HistoryRouter history = {createBrowserHistory()}>
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />}></Route>
            <Route
              path="/home"
              element={
                  <MainMenu />
              }
              >
              <Route exact path="/home" element={<Journeys />}></Route>
              <Route path="/home/stations" element={<Stations />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
