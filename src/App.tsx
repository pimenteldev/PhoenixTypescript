import { Suspense, lazy } from "react"
import { Provider } from "react-redux"
import { Route } from "react-router"
import { BrowserRouter, Navigate } from "react-router-dom"
import CustomSnackBar from "./components/CustomSnackBar/CustomSnackBar"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Spinner from "./components/Spinner/Spinner"
import AuthGuard from "./guards/AuthGuard"
import RolGuard from "./guards/RolGuard"
import RoutesWithNotFound from "./helpers/RoutesWithNotFound"
import { Roles } from "./models/roles"
import HomeUser from "./pages/Private/HomeUser/HomeUser"
import store from "./redux/store"
import { PrivateRoutes, PublicRoutes } from "./routes/routes"
import { LayoutContainer } from "./styled-components/layout"
import Cart from "./pages/Private/Orders/components/Cart/Cart"

const Login = lazy(() => import("./pages/Login/Login"))
const Private = lazy(() => import("./pages/Private/Private"))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <LayoutContainer>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />

              <Route
                path={PublicRoutes.LOGIN}
                element={<Login />}
              />

              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={
                    <>
                      <Navbar />
                      <Sidebar />
                      <Private />
                      <Cart />
                    </>
                  }
                />
              </Route>

              <Route element={<RolGuard rol={Roles.USER} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOMEUSER}`}
                  element={
                    <>
                      <Navbar />
                      <Sidebar />
                      <HomeUser />
                    </>
                  }
                />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
          <CustomSnackBar></CustomSnackBar>
        </LayoutContainer>
      </Provider>
    </Suspense>
  )
}

export default App
