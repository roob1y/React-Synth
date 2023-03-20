import React from "react";

export default function OscSlider({ setType }) {
  const waveForms = {
    0: "sawtooth",
    1: "sine",
    2: "square",
    3: "triangle",
  };

  function handleTypeChange() {
    setType(waveForms[event.target.value]);
  }

  return (
    <>
      <input
        type="range"
        min="0"
        max="3"
        step="1"
        onChange={handleTypeChange}
      />
      <br />
      <label>sawtooth </label>
      <label>sine </label>
      <label>square </label>
      <label>triangle </label>
    </>
  );
}
