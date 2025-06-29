import Home from "./home/Home.jsx";
import Courses from "./courses/Courses.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Verify from "./components/Verify.jsx";
import VirtualLab from "./vlab/VirtualLab.jsx";
import About from "./about/About.jsx";
import Account from "./account/Account.jsx";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from "react-router-dom";
import Loading from './loading/Loading.jsx'
import {UserData} from './context/UserContext.jsx';
import CourseDescription from "./coursedescription/CourseDescription.jsx";
import BFSSim from "./vlab/BFSSim.jsx";
import DFSSim from "./vlab/DFSSim.jsx";

function App() {
  const { isAuth } = UserData()
  return (
    <>
        {<Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vlabs" element={<VirtualLab />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path='/course/:id' element={isAuth? <CourseDescription/>:<Signup/>} />
          <Route path='/bfs' element={<BFSSim />} />
          <Route path='/dfs' element={<DFSSim />} />
        </Routes>}
    </>
  );
}

export default App;
