import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const VirtualLab = () => {
    const navigate = useNavigate();
  const simList = [
    {
        id: 1,
      topic: "BFS Traversal",
      contributor: "Arpit Bhardwaj",
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*VM84VPcCQe0gSy44l9S5yA.jpeg',
      router: '/bfs'
    },
    {
        id: 2,
      topic: "DFS Traversal",
      contributor: "Arpit Bhardwaj",
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*VM84VPcCQe0gSy44l9S5yA.jpeg',
      router: '/dfs'
    },
  ];
  return (
    <>
      <Navbar />
      <div className="sim_list h-screen m-auto w-[90vw]">
        <center>
          <h2 className="text-3xl text-pink-500 my-[5vh]">Simulations</h2>
          <p>
            Click on the given links to redirect to simulations of the
            respective experiments. <br />
            <span className="text-pink-500">
              Made with ❤ and 💪 for a better tomorrow.
            </span>
          </p>
        </center>
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Simulations
          </li>
          {simList.map((sim) => {
            return (
              <li className="list-row" key={sim.id}>
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={sim.thumbnail}
                  />
                </div>
                <div>
                  <div>{sim.topic}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {sim.contributor}
                  </div>
                </div>
                <button className="btn btn-square btn-ghost" onClick={() => navigate(`${sim.router}`)}>
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </g>
                  </svg>
                </button>
                <button className="btn btn-square btn-ghost">
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </g>
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default VirtualLab;
