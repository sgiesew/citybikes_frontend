import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0086ce'
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
