import React from "react";
import { useNavigate } from "react-router-dom";
import "./course-card.css";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  return (
    <>
      <div className="course-card">
        <img
          src={`http://localhost:5000/${course.image}`}
          alt=""
          className="course-image"
        />
        <h3>{course.title}</h3>
        <p>Instructor : {course.createdBy}</p>
        <p>Duration : {course.duration}</p>
        <p>Price : Rs.{course.price}</p>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="common-btn"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button onClick={() => navigate("/register")} className="common-btn">
            Get Started
          </button>
        )}

        <br />

        {user && user.role === "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="common-btn"
            style={{ background: "red" }}
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
};

export default CourseCard;
