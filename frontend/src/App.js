import './App.css';
import Navbar from './Components/NavBar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import React, { Suspense } from "react";
import GraphNet from './pages/Graphs/Graphs';
import RegistrationPage from './pages/Registration/RegistrationPage';
import SignInPage from './pages/SignIn/SignInPage';
import AdminPage from './pages/AdminPage/AdminPage';
import TableLog from './Components/TableLog/TableLog';
import UsersTable from './Components/UsersTable/UsersTable';
import UserDetails from './pages/userDetails/userDetails';


const App = () => {
  const userSession = JSON.parse(localStorage.getItem("user"))
  const LazyGraphnet = React.lazy(() => import('./pages/Graphs/Graphs'))
  const LazyRegistrationPage = React.lazy(() => import('./pages/Registration/RegistrationPage'))
  const LazySignInPage = React.lazy(() => import('./pages/SignIn/SignInPage'))
  const LazyAdminPage = React.lazy(() => import('./pages/AdminPage/AdminPage'))
  const LazyTableLog = React.lazy(() => import('./Components/TableLog/TableLog'))
  const LazyUserDetails = React.lazy(() => import('./pages/userDetails/userDetails'))
  

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/searchtool" element={
            <>
            <Suspense>
              <Navbar/>
              <LazyGraphnet /> 
            </Suspense>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
            </>
          } />
          <Route path="/" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Suspense>
                <Navbar/>
                <GraphNet /> 
              </Suspense>
            </>
          } />
          <Route path="/registration" element={
            <>
            <Suspense>

              <Navbar/>
              <LazyRegistrationPage/>
            </Suspense>
            </>
          } />

          <Route path="/login" element={
            <>
            <Suspense>
              <LazySignInPage/>
            </Suspense>
            </>
          } />
          <Route path="/table" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Suspense>
              <Navbar/>
              <LazyTableLog/>
              </Suspense>
            </>
          } />
          {/* <Route path="/userTable" element={<UsersTable/>} /> */}
          {userSession 
          && userSession.roles.includes("ADMIN")
            ? (
              <>
              <Route path="/users/:username" element={
                <>
                <Suspense>
                  <Navbar/>
                  <LazyUserDetails/>

                </Suspense>
                </>
              }/>
              <Route path="/admin" element={
                <>
                <Suspense>
                  <Navbar/>
                  <LazyAdminPage/>

                </Suspense>
                </>
              }/>
              </>
            ) : (
              <>

              </>
            )
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App;
