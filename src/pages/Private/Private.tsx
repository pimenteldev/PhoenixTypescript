import {PrivateRoutes} from '@/routes'
import {Navigate, Route} from 'react-router-dom'
import {RoutesWithNotFound} from '@/helpers'
import {lazy} from 'react'

const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const Products = lazy(() => import('./Products/Products'))
const Tables = lazy(() => import('./Tables/Tables'))

function Private() {
  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={<Navigate to={PrivateRoutes.DASHBOARD} />}
      />
      <Route
        path={PrivateRoutes.DASHBOARD}
        element={<Dashboard />}
      />

      <Route
        path={PrivateRoutes.PRODUCTOS}
        element={<Products />}
      />

      <Route
        path={PrivateRoutes.MESAS}
        element={<Tables />}
      />
    </RoutesWithNotFound>
  )
}

export default Private