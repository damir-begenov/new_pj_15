import './App.css';
import Navbar from './Components/NavBar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
  useNavigate
} from "react-router-dom";

import React from "react";
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
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Navbar/>
              <GraphNet /> 
            </>
          } />
          <Route path="/" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Navbar/>
              <GraphNet /> 
            </>
          } />
          <Route path="/registration" element={
            <>
              <Navbar/>
              <RegistrationPage/>
            </>
          } />
          <Route path="/login" element={
            <>
              <SignInPage/>
            </>
          } />
          <Route path="/table" element={
            <>
              {/* {!userSession ? navigate('/login', {replace: true}) : ""}  */}
              <Navbar/>
              <TableLog/>
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
                  <UserDetails/>
                </>
              }/>
              <Route path="/admin" element={
                <>
                  <Navbar/>
                  <AdminPage/>
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
