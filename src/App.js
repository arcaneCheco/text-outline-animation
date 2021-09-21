import { useEffect } from "react";
import "./App.css";
import Experience from "./Experience/Experience.js";

function App() {
  useEffect(() => {
    // bootstrap threejs scene:
    new Experience({
      targetElement: document.querySelector(".experience"),
    });
  }, []);

  return (
    <div className="App">
      <div className="experience"></div>
      <h1>hello world</h1>
    </div>
  );
}

export default App;
