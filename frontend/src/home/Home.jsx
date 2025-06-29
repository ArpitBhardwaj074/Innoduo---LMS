import React from "react";
import Navbar from "../components/Navbar.jsx";
import Banner from "../components/Banner.jsx";
import FreeCourses from "../components/FreeCourses.jsx";
import Footer from "../components/Footer.jsx";
import Course from "../components/Course.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <br />
      <hr />
      <div className="min-h-screen m-[5%]">
        <center>
          <h1 className="text-3xl">
            Fall in <span className="text-pink-500">love with learning</span>{" "}
            with our well-curated courses
          </h1>
          <Course />
        </center>
      </div>
      <FreeCourses />
      <Footer />
    </>
  );
};

export default Home;
