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
        <Navbar/>
        <Routes>
          <Route path="/searchtool" element={
            <GraphNet /> 
          } />
          <Route path="/" element={<MainPage/>} />
          <Route path="/registration" element={<RegistrationPage/>} />
          <Route path="/login" element={<SignInPage/>} />
          <Route path="/table" element={<TableLog/>} />
          {/* <Route path="/userTable" element={<UsersTable/>} /> */}
          {userSession 
            ? (
              <>
              <Route path="/users/:username" element={<UserDetails/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
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
