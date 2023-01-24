import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router, Outlet, Link } from '@tanstack/react-location'
import { routes, location } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router routes={routes} location={location}>
      <Outlet />
    </Router>
  </React.StrictMode>,
)
