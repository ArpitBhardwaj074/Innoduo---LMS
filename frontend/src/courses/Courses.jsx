import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CourseCard from "./CourseCard.jsx";
import './courses.css'
import { CourseData } from "../context/CourseContext.jsx";

const Courses = () => {
  const { courses } = CourseData();
  console.log(courses);
  return (
    <>
      <Navbar />
      <div className="courses h-screen">
        <center>
          <h2 className="text-3xl text-pink-500 my-[5px]">Available Courses</h2>
          <div className="course-container">
            {
              courses && courses.length>0 ? courses.map((e) => (
                <CourseCard key={e._id} course={e} />
              )) : <p>No Courses Yet!</p>
            }
          </div>
        </center>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
