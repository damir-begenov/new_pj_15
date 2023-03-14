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
import {motion} from 'framer-motion';

import React, { Suspense } from "react";
import GraphNet from './pages/Graphs/Graphs';
import MainPage from './pages/MainPage/MainPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import SignInPage from './pages/SignIn/SignInPage';
import AdminPage from './pages/AdminPage/AdminPage';
import TableLog from './Components/TableLog/TableLog';
import UsersTable from './Components/UsersTable/UsersTable';
import UserDetails from './pages/userDetails/userDetails';


const App = () => {
  const userSession = JSON.parse(localStorage.getItem("user"))
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/searchtool" element={
            <>
              <Navbar/>
                <Suspense fallback={<span class="loader"></span>}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                    <GraphNet /> 
                  </motion.div>
                </Suspense>
            </>
          } />
          <Route path="/" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Navbar/>
                <Suspense fallback={<span class="loader"></span>}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                    <GraphNet /> 
                  </motion.div>
                </Suspense>
            </>
          } />
          <Route path="/registration" element={
            <>

              <Navbar/>
                <Suspense fallback={<span class="loader"></span>}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                    <RegistrationPage/> 
                  </motion.div>
                </Suspense>
            </>
          } />

          <Route path="/login" element={
            <>
              <Suspense fallback={<span class="loader"></span>}>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                  <SignInPage /> 
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
              <TableLog/>
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
                  <Suspense fallback={<span class="loader"></span>}>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                      <UserDetails/>
                    </motion.div>
                  </Suspense>
                </>
              }/>
              <Route path="/admin" element={
                <>
                  <Navbar/>
                  <Suspense fallback={<span class="loader"></span>}>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.5 }}>
                      <AdminPage/>
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
