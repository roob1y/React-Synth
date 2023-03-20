import React from "react";
import { useState } from "react";

export default function Tuner({setMasterFreq}) {

  const [sliderValue, setSliderValue] = useState(0.5);

  const handleSliderChange = (e) => {
    const val = e.target.value;
    setSliderValue(val);
    // do something with val, e.g.
    setMasterFreq(val * 400);
  };

  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={sliderValue}
      onChange={handleSliderChange}
    />
  );
}
