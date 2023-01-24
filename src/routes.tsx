import { Route, ReactLocation } from '@tanstack/react-location'
import Home from './pages/Home'
import Test from './pages/Test'

export const location = new ReactLocation()

export const routes: Route[] = [
    { path: '/', element: <Home /> },
    { path: '/test', element: <Test /> },
]