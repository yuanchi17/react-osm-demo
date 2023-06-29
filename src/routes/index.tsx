import { useRoutes, Navigate } from 'react-router-dom'

import Home from '@/page/Home'
import Layout from '@/layouts'
import NotFound from '@/page/404'

const AllRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        // { path: '/example', element: <Example /> },
      ],
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    { path: '*', element: <Navigate to='/404' replace /> },
  ])
}

export default AllRoutes
