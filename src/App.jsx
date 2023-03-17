import React from "react";
import { useState } from "react";
import PlayBtn from "./components/PlayBtn";
import OscSlider from "./components/OscSlider";
import "./App.css";

function App() {
  const [type, setType] = useState("sawtooth");
  return (
    <div className="App">
      <h1>Wave: {type}</h1>
      <PlayBtn type={type} />
      <br />
      <br />
      <OscSlider setType={setType} />
    </div>
  );
}

export default App;
