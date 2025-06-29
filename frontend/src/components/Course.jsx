import React from "react";
import { useState, useEffect, useRef } from "react";
import Card from "../components/Card.jsx";

const Course = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    fetch("/list.json")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      });
  }, []);

  const keyword = useRef();
  const searchCourse = ()=>{
    const key = keyword.current.value.toLowerCase();
    setFilteredItems(items.filter(item => item.category.toLowerCase().includes(key) || item.title.toLowerCase().includes(key)));
  }

  return (
    <>
      <center>
        <label className="input mx-[3vw] my-[5vh]">
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
            <input type="search" required placeholder="What are you finding?" ref={keyword}/>
          </label>
          <button className="btn btn-secondary" onClick={searchCourse}>Search Course</button>
          {(filteredItems.length != 0)?
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[3vw]">
            {filteredItems
            .map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              category={item.category}
              price={item.price}
            />
          ))}
        </div>
          : <div className="flex justify-center align-center m-[10%]"><span className='text-pink-500 text-2xl'>No results found</span></div>}
      </center>
    </>
  );
};

export default Course;
