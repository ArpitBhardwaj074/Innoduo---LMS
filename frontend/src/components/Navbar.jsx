import React from "react"
import {Link, useNavigate} from 'react-router-dom'
import Login from './Login.jsx'
import { UserData } from "../context/UserContext.jsx"

const Navbar = () => {
  const navigate = useNavigate()
  const { isAuth, user } = UserData()
  const navItems = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li> 
      <li>
        <Link to='/courses'>Courses</Link>
      </li>
      <li>
        <Link to='/contact'>Contact</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li className="text-pink-500">
        <Link to='/vlabs'>Virtual Lab</Link>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className="text-xl">Innoduo</a>
        </div>

        <div className="navbar-center">
          <div className="hidden lg:flex w-fit">
            <ul className="menu menu-horizontal px-1 flex no-wrap w-fit">
              {navItems}
            </ul>
          </div>
        </div>

        <div className="navbar-end flex no-wrap items-center gap-[5px]">
          <label className="input w-[15vw]">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
          {!isAuth? <a className="btn bg-black text-white px-2 py-2 w-[10vw]" onClick={()=> document.getElementById('my_modal_3').showModal()}>Login</a> : <a className="btn bg-black text-white px-2 py-2 w-[10vw]" onClick={() => {navigate('/account')}}>Account</a>}
          <Login/>
        </div>
      </div>
    </>
  );
};

export default Navbar;
