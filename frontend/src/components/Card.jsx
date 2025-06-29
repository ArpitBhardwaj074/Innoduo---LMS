import React from "react";

const Card = ({image, title, category, price }) => {
  return (
    <>
      <div className="card bg-base-100 md:w-[21vw] shadow-sm my-[8px] gap-[2vw]">
        <figure className="px-5 pt-5">
          <img
            src = {`${image}`}
            alt = {`${title}`}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}{(price == 0)? <div className='badge badge-outline text-white bg-pink-500 '>free</div>:<div></div>}</h2>
          <p>
            {category}
          </p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${price}</div>
            <button className="btn badge badge-outline text-pink-500 hover:bg-pink-500 hover:text-white">Enroll</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
