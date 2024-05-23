import { Navigate, useRoutes } from 'react-router-dom'

import Layout from '@/layouts'
import NotFound from '@/page/404'
import Demo from '@/page/Demo'
import Home from '@/page/Home'

const AllRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/Demo', element: <Demo /> },
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
