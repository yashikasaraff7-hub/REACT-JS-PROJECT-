import { useState } from "react";

function ShortestPathFinder({ graph, findShortestPath }) {
  const checkpoints = Object.keys(graph);
  const [startCheckpoint, setStartCheckpoint] = useState(checkpoints[0]);
  const [errorCheckpoint, setErrorCheckpoint] = useState(checkpoints[checkpoints.length - 1]);
  const [path, setPath] = useState([]);

  const handleFindPath = () => {
    setPath(findShortestPath(graph, startCheckpoint, errorCheckpoint));
  };

  return (
    <section className="panel full-width">
      <div className="section-heading">
        <div>
          <h2>Audit Error Path Finder</h2>
          <p>
            BFS finds the shortest sequence of verification steps to locate an accounting error.
          </p>
        </div>
        <button onClick={handleFindPath}>Find Error Path</button>
      </div>

      <div className="path-controls">
        <label>
          Start Verification Step
          <select
            value={startCheckpoint}
            onChange={(event) => setStartCheckpoint(event.target.value)}
          >
            {checkpoints.map((checkpoint) => (
              <option key={checkpoint} value={checkpoint}>
                {checkpoint}
              </option>
            ))}
          </select>
        </label>

        <label>
          Error Located At
          <select
            value={errorCheckpoint}
            onChange={(event) => setErrorCheckpoint(event.target.value)}
          >
            {checkpoints.map((checkpoint) => (
              <option key={checkpoint} value={checkpoint}>
                {checkpoint}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="path-result">
        {path.length > 0
          ? path.join(" -> ")
          : "Select verification steps and find the shortest audit trail."}
      </div>
    </section>
  );
}

export default ShortestPathFinder;
