import './App.css';
import './Loader.css'
import './font.css'
// import './fontawesome/all.css';
import Navbar from './Components/NavBar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import React, { Suspense } from "react";
import {motion} from 'framer-motion';

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
            <Suspense fallback={<span className="loader"></span>}>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
              <LazyGraphnet /> 
                  </motion.div>
              </Suspense>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
            </>
          } />
          <Route path="/" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
                <Navbar/>
              <Suspense fallback={<span className="loader"></span>}>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.3 }}>
                <LazyGraphnet />
                  </motion.div> 
              </Suspense>
            </>
          } />
          <Route path="/registration" element={
            <>

              <Navbar/>
            <Suspense fallback={<span className="loader"></span>}>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.3 }}>
              <LazyRegistrationPage/>
                  </motion.div>
            </Suspense>
            </>
          } />

          <Route path="/login" element={
            <>
            <Suspense fallback={<span className="loader"></span>}>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
              <LazySignInPage/>
                  </motion.div>
            </Suspense>
            </>
          } />
          {console.log(userSession)}
          <Route path="/table" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Navbar/>
              <Suspense fallback={<span className="loader"></span>}>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
              <LazyTableLog/>
                  </motion.div>
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
                <Suspense fallback={<span className="loader"></span>}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                  <LazyUserDetails/>
                  </motion.div>
                </Suspense>
                </>
              }/>
              <Route path="/admin" element={
                <>
                  <Navbar/>
                <Suspense fallback={<span className="loader"></span>}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                  <LazyAdminPage/>
                  </motion.div>

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
