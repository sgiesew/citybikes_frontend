import React from 'react'
import { Outlet, useLocation, Link as RouterLink} from 'react-router-dom'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import logo from '../../assets/logo_large.png'
import caption from '../../assets/caption.png'
import { useTheme, styled } from '@mui/material/styles'

const LayoutComponent = () => {
  const location = useLocation()
  const theme = useTheme()
  
  const Link = React.forwardRef(function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />
  })

  const StyledListItemButton = styled(ListItemButton)({
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main
    },
  })
  
  const ListItemLink = (props) => {
    const { icon, primary, to, selected } = props

    return (
      <ListItem component={Link} to={to} sx={{ m: 0, p: 0 }}>
        <StyledListItemButton selected={selected} sx={{ mx: 0, mb: 1, p: 1 }}>
          {selected ? <ListItemIcon sx={{ color: theme.palette.primary.main, minWidth: 40 }}>{icon}</ListItemIcon> : <ListItemIcon sx={{ color: theme.palette.text.secondary, minWidth: 40 }}>{icon}</ListItemIcon>}
          <ListItemText primary={<b>{primary}</b>}/>
        </StyledListItemButton>
      </ListItem>
    )
  }
  
  const menuItems = [
    { 
      label: 'Stations (Map)',
      icon: <LanguageOutlinedIcon />,
      link: '/home' 
    },
    {
      label: 'Stations (List)',
      icon: <LocationOnOutlinedIcon />,
      link: '/home/stations' 
    },
    { 
      label: 'Journeys',
      icon: <ExploreOutlinedIcon />,
      link: '/home/journeys' 
    }
  ]

  const drawerWidth = 180
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <img width={'100%'} src={logo} alt='HSL logo'/>
        <img width={'100%'} src={caption} alt='City Bikes'/>
        <List sx={{ mx: 0, mt: 2, p: 0 }}>
          {menuItems.map( (item, index) => <ListItemLink key={index} to={item.link} primary={item.label} icon={item.icon} selected={item.link === location.pathname}/>)}
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0 }}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  )
}

export default LayoutComponent
