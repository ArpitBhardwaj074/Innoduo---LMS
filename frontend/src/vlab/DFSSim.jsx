import React, { useRef, useState } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

const DFSSim = () => {
  const [graph, setGraph] = useState([]);
  const [network, setNetwork] = useState(null);
  const [path, setPath] = useState([]);
  const [showStartNodeInput, setShowStartNodeInput] = useState(false);

  const containerRef = useRef(null);

  const clearGraph = () => {
    setGraph([]);
    setPath([]);
    setShowStartNodeInput(false);
    if (network) {
      network.destroy();
      setNetwork(null);
    }
  };

  const generateGraph = () => {
    const nodes = parseInt(document.getElementById("nodes").value);

    if (nodes >= 1) {
      const generatedGraph = generateRandomGraph(nodes);
      setGraph(generatedGraph);
      displayGraph(generatedGraph);
      clearOutput();
      setShowStartNodeInput(true);
    } else {
      alert("Invalid input. Please enter a valid number of nodes.");
    }
  };

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

  const dfsWithBacktracking = (graph, start) => {
    const stack = [start];
    const visited = new Array(graph.length).fill(false);
    visited[start] = true;
    const path = [start];

    const dfsRecursive = () => {
      if (stack.length === 0) return;

      const current = stack[stack.length - 1];

      setPath([...path]);

      network.body.data.nodes.update({
        id: current,
        color: { background: "purple", border: "purple" },
      });

      setTimeout(() => {
        network.body.data.nodes.update({
          id: current,
          color: { background: "grey", border: "black" },
        });

        let foundUnvisitedNeighbor = false;
        for (let i = 0; i < graph[current].length; i++) {
          if (graph[current][i] === 1 && !visited[i]) {
            stack.push(i);
            visited[i] = true;
            path.push(i);

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
            }, 2000);
            foundUnvisitedNeighbor = true;
            break;
          }
        }

        if (!foundUnvisitedNeighbor) {
          const poppedNode = stack.pop();

          network.body.data.nodes.update({
            id: poppedNode,
            color: { background: "orange", border: "orange" },
          });
        }

        dfsRecursive();
      }, 2000);
    };

    dfsRecursive();
  };

  const displayGraph = (graph) => {
    const container = containerRef.current;

    const nodes = new DataSet(
      graph.map((_, index) => ({ id: index, label: String(index) }))
    );

    const edges = [];
    for (let i = 0; i < graph.length; i++) {
      for (let j = i + 1; j < graph.length; j++) {
        if (graph[i][j] === 1) {
          edges.push({ id: `${i}-${j}`, from: i, to: j });
        }
      }
    }

    const data = {
      nodes: nodes,
      edges: edges,
    };

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

    const visNetwork = new Network(container, data, options);
    setNetwork(visNetwork);
    visNetwork.fit();
  };

  const runDFS = () => {
    const startNode = parseInt(document.getElementById("start").value);

    if (startNode >= 0 && startNode < graph.length) {
      dfsWithBacktracking(graph, startNode);
    } else {
      alert("Invalid input. Please enter a valid node number.");
    }
  };

  const clearOutput = () => {
    setPath([]);
  };

  return (
    <>
      <div className="border-2 md:m-28 md:px-20 py-8 shadow-2xl drop-shadow-xl bg-white rounded-lg">
        <div className="box" id="Practice">
          <h2 className="font-Robo md:text-3xl text-xl text-center m-6">
            DFS Simulation with Backtracking
          </h2>
          <div
            className="h-80 bg-cyan-200 rounded-xl m-4 border-2 border-black"
            ref={containerRef}
          ></div>
          <div className="flex flex-col justify-center items-center space-y-4">
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
              {showStartNodeInput && (
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
                    onClick={runDFS}
                  >
                    Start Simulation
                  </button>
                </div>
              )}
              <div id="output" className="ml-20">
                <p>
                  {path.length > 0 ? (
                    <>
                      <span className="md:font-bold md:text-2xl text-xl ml-10">
                        DFS Path from Node {path[0]}:
                      </span>
                      <br />
                      {path.map((node, index) => (
                        <span
                          key={index}
                          style={{
                            marginLeft: "10px",
                            color: index < path.length - 1 ? "green" : "orange",
                          }}
                        >
                          {index < path.length - 1 ? node + " -> " : node}
                        </span>
                      ))}
                    </>
                  ) : (
                    <span>No DFS path found.</span>
                  )}
                </p>
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
    </>
  );
};

export default DFSSim;
