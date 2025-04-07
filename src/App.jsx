import React from "react";
import ErrorBoundary from "./ErrorBoundary"; // import ErrorBoundary
import Favorites from "./Favorites";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Favorites />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
