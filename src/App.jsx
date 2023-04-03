import "./App.css";

import React, { useState } from "react";

import PlayBtn from "./components/PlayBtn";
import OscSlider from "./components/OscSlider";
import Tuner from "./components/Tuner";
import Keyboard from "./components/Keyboard";
import SynthUI from "./components/SynthUI"

function App() {
  const [type, setType] = useState("sawtooth");
  const [masterFreq, setMasterFreq] = useState(440)

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Wave: {type}</h1>
      <PlayBtn type={type} masterFreq={masterFreq} />
      <br />
      <br />
      <OscSlider setType={setType} />
      <br />
      <Tuner setMasterFreq={setMasterFreq}/>
      <br />
      <SynthUI />
      <Keyboard />
    </div>
  );
}

export default App;
