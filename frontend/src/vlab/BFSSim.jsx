import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

const BFSSim = () => {
  const [graph, setGraph] = useState([]);
  const [network, setNetwork] = useState(null);
  const [path, setPath] = useState([]); // New state to keep track of the BFS path
  const [showStartNodeInput, setShowStartNodeInput] = useState(false); // State to control the visibility of the start node input

  const containerRef = useRef(null);

  const clearGraph = () => {
    setGraph([]); // Clear the graph state
    setPath([]); // Clear the path state
    setShowStartNodeInput(false); // Hide the start node input
    if (network) {
      network.destroy(); // Destroy the existing network visualization
      setNetwork(null);
    }
  };

  // Function to generate the adjacency matrix based on the number of nodes
  const generateGraph = () => {
    const nodes = parseInt(document.getElementById("nodes").value);

    if (nodes >= 1) {
      const generatedGraph = generateRandomGraph(nodes);
      setGraph(generatedGraph);
      displayGraph(generatedGraph);
      clearOutput();
      setShowStartNodeInput(true); // Show the start node input after generating the graph
    } else {
      alert("Invalid input. Please enter a valid number of nodes.");
    }
  };

  // Function to generate a random graph
  const generateRandomGraph = (nodes) => {
    const generatedGraph = new Array(nodes)
      .fill(0)
      .map(() => new Array(nodes).fill(0));

    for (let i = 0; i < nodes; i++) {
      for (let j = i + 1; j < nodes; j++) {
        if (Math.random() < 0.5) {
          generatedGraph[i][j] = 1;
          generatedGraph[j][i] = 1;
        }
      }
    }

    return generatedGraph;
  };

  // BFS algorithm implementation
  const bfs = (graph, start) => {
    const queue = [start];
    const visited = new Array(graph.length).fill(false);
    visited[start] = true;

    // Clear the path state before starting the animation
    setPath([]);

    const animateBFS = () => {
      if (queue.length > 0) {
        const current = queue.shift();

        // Update the path state to include the current node
        setPath((prevPath) => [...prevPath, current]);

        // Change node color to red and highlight visited node
        network.body.data.nodes.update({
          id: current,
          color: { background: "purple", border: "purple" },
        });
        setTimeout(() => {
          network.body.data.nodes.update({
            id: current,
            color: { background: "grey", border: "black" },
          });

          for (let i = 0; i < graph[current].length; i++) {
            if (graph[current][i] === 1 && !visited[i]) {
              queue.push(i);
              visited[i] = true;

              // Darken the edge color and highlight visited edge
              network.body.data.edges.update({
                id: `${current}-${i}`,
                color: "#666666",
                font: { color: "#666666" },
              });
              setTimeout(() => {
                network.body.data.edges.update({
                  id: `${current}-${i}`,
                  color: "grey",
                  font: { color: "grey" },
                });
              }, 2000); // Add a delay of 2 seconds for transferring edges
            }
          }

          animateBFS(); // Move to the next step
        }, 2000); // Add a delay of 2 seconds for transferring nodes
      }
    };

    animateBFS();
  };

  // Function to create and display the graph visualization using vis.js
  const displayGraph = (graph) => {
    const container = containerRef.current;

    // Create an array of nodes
    const nodes = new DataSet(
      graph.map((_, index) => ({ id: index, label: String(index) }))
    );

    // Create an array of edges
    const edges = [];
    for (let i = 0; i < graph.length; i++) {
      for (let j = i + 1; j < graph.length; j++) {
        if (graph[i][j] === 1) {
          edges.push({ id: `${i}-${j}`, from: i, to: j });
        }
      }
    }

    // Create a data object with nodes and edges
    const data = {
      nodes: nodes,
      edges: edges,
    };

    // Create options for the network visualization
    const options = {
      physics: false,
      edges: {
        color: {
          color: "black",
        },
        font: {
          color: "green",
        },
      },
    };

    // Create a network visualization
    const visNetwork = new Network(container, data, options);
    setNetwork(visNetwork);
    visNetwork.fit(); // Fit the graph to the container
  };

  // Run BFS algorithm and display the result
  const runBFS = () => {
    const startNode = parseInt(document.getElementById("start").value);

    if (startNode >= 0 && startNode < graph.length) {
      bfs(graph, startNode);
    } else {
      alert("Invalid input. Please enter a valid node number.");
    }
  };

  // Function to clear the output text
  const clearOutput = () => {
    setPath([]); // Clear the path state
  };

  return (
    <>
      <Navbar />
      <div className="border-2 md:m-28 md:px-20 py-8 shadow-2xl drop-shadow-xl bg-white rounded-lg">
        <div className="box" id="Practice">
          <h2 className="font-Robo text-3xl text-center m-6">BFS Simulation</h2>
          <div
            className="h-80 bg-cyan-200 rounded-xl m-4 border-2 border-black"
            ref={containerRef}
          ></div>
          <div className=" flex flex-col justify-center items-center space-y-4">
            <div>
              <label htmlFor="nodes" className="font-bold">
                Enter the number of nodes :
              </label>
              <input
                type="text"
                name="nodes"
                id="nodes"
                className="border-2 border-gray-30 mx-2"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-2"
                onClick={generateGraph}
              >
                Generate Graph
              </button>
            </div>
            <div>
              {showStartNodeInput && ( // Conditional rendering to show start node input
                <div>
                  <label htmlFor="start" className="font-bold">
                    Enter the starting node :
                  </label>
                  <input
                    type="number"
                    id="start"
                    className="border-2 border-gray-30 mx-2"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-2"
                    onClick={runBFS}
                  >
                    Start Simulation
                  </button>
                </div>
              )}
              <div id="output" className="ml-20">
                {path.length > 0 && (
                  <p>
                    <span className="md:font-bold md:text-2xl text-xl ml-10">
                      BFS Path from Node {path[0]}:
                    </span>
                    <br /> <span className="ml-10"> {path.join(" -> ")} </span>
                  </p>
                )}
              </div>
              <button
                className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-2"
                onClick={clearGraph}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BFSSim;
