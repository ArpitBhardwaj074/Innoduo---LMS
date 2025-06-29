import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { UserData } from "../context/UserContext.jsx";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { user, setIsAuth, setUser } = UserData();
  const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.clear()
        setUser([])
        setIsAuth(false)
        toast.success("Logged out")
        navigate('/')
    }
  return (
    <>
      <Navbar />
      {user && (
        <div className="h-[60vh]">
          <center>
            <h2 className="my-[2%] text-pink-500 text-3xl">My Profile</h2>
            <p>
              <strong>Name - {user.name} </strong>
            </p>
            <p>
              <strong>Email - {user.email} </strong>
            </p>
            <button className="btn btn-secondary text-white bg-pink-500 my-[2%] flex flex-column justify-center items-center p-[1vw]">
              <MdDashboard />
              <span>Dashboard</span>
            </button>
            <button className="btn btn-secondary text-white bg-red-500 my-[2%] flex flex-column justify-center items-center p-[1vw]" onClick={logoutHandler}>
                <CiLogout />
              <span>Logout</span>
            </button>
          </center>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Account;
