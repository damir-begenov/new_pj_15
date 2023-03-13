import './App.css';
import './Loader.css'
// import './fontawesome/all.css';
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
              <Navbar/>
            <Suspense fallback={<span class="loader"></span>}>
              <LazyGraphnet /> 
            </Suspense>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
            </>
          } />
          <Route path="/" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
                <Navbar/>
              <Suspense fallback={<span class="loader"></span>}>
                <LazyGraphnet /> 
              </Suspense>
            </>
          } />
          <Route path="/registration" element={
            <>

              <Navbar/>
            <Suspense fallback={<span class="loader"></span>}>
              <LazyRegistrationPage/>
            </Suspense>
            </>
          } />

          <Route path="/login" element={
            <>
            <Suspense fallback={<span class="loader"></span>}>
              <LazySignInPage/>
            </Suspense>
            </>
          } />
          <Route path="/table" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Navbar/>
              <Suspense fallback={<span class="loader"></span>}>
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
                  <Navbar/>
                <Suspense fallback={<span class="loader"></span>}>
                  <LazyUserDetails/>

                </Suspense>
                </>
              }/>
              <Route path="/admin" element={
                <>
                  <Navbar/>
                <Suspense fallback={<span class="loader"></span>}>
                  <AdminPage/>

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
