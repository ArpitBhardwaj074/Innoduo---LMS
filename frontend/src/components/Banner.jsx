import React from "react";
import {useNavigate} from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20  flex flex-col md:flex-row justify-evenly">
        <div className="w-full md:w-2/3 ">
          <h1 className="text-4xl font-bold mx-[5%] my-[5%]">
            Welcome to Innoduo Learnings
            <br />
            <span className="text-pink-500">Learn new everyday!!</span>
          </h1>
          <p className="text-2xl font-semibold mx-[5%] my-[5%]">
            Innoduo is a modern, intuitive Learning Management System designed
            to simplify online education for students and educators alike. With
            powerful features like interactive course modules, virtual labs,
            real-time assessments, progress tracking, and secure user
            management, our platform ensures a seamless digital learning
            experience. Whether you're managing a classroom, hosting a workshop,
            or delivering self-paced training, Innoduo offers everything you
            need to teach, learn, and grow—all in one place.
          </p>
          {/* <label className="input mx-[5%]">
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
            <input
              type="search"
              required
              placeholder="Enter your E-mail to login"
            />
          </label> */}

          <br />
          <button className="btn btn-secondary mx-[5%] my-[1%]" onClick={()=>{navigate('/courses')}}>Checkout Courses</button>
          <button className="btn btn-secondary mx-[1%] my-[1%]" onClick={()=>{navigate('/vlabs')}}>Checkout Simulations</button>
        </div>
        <div className = "w-full md:w-1/3 flex justify-center items-center">
            <img src="/banner.png" className="w-80 h-80" alt="Banner image" />
        </div>
      </div>
    </>
  );
};

export default Banner;
