import LoadingSpinner from "./LoadingSpinner";

import "./LoadingScreen.css";


/** Component for full page loading.
 *
 * Props: none
 *
 * state: none
 *
 */

function LoadingScreen() {
  return (
    <div className="LoadingScreen">
      <h1 className="text-light">Loading...
        <LoadingSpinner />
      </h1>
    </div>
  );
}

export default LoadingScreen;