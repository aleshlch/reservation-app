import { Route, Routes, Outlet, HashRouter } from 'react-router-dom'
import PrivateRoutes from '../utils/PrivateRoutes'
import Main from "../pages/Main/Main"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Navbar from "../components/Navbar"
import NewReserv from '../pages/NewResev'
import EditProfile from '../pages/EditProfile'
import Archive from '../pages/Archive'

import './_reset.scss'
import './_base.scss'


const App = () => {

    function LayoutsWithNavbar() {
        return (
          <>
            <Navbar />
            <Outlet /> 
          </>
        )
      }

  return (  
    <div className='container'>
      <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<LayoutsWithNavbar />}>
                    <Route path="/" element={<Main />} /> 
                    <Route path="/newreserv" element={<NewReserv />} />
                    <Route path="/newreserv/:id" element={<NewReserv />} />
                    <Route path="/edit-profile" element={<EditProfile />} />   
                    <Route path="/archive" element={<Archive />} />  
                </Route>
            </Route>
          </Routes>
      </HashRouter>
    </div>
  )
}
 
export default App
