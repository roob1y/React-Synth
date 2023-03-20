import React, { useEffect, useState } from "react";
import Key from "./Key";
import { NOTES } from "../global/constants";

export default function Keyboard() {
  const [freq, setFreq] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const middleA = 440;

  useEffect(() => {
    if (isClicked) {
      playSound();
      setIsClicked(false);
    }
  });

  function playSound() {
    const actx = new (AudioContext || webkitAudioContext)();
    if (!actx) throw "Not supported!";
    const osc = actx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq; // Hz = middle A
    osc.connect(actx.destination); // soundcard output
    osc.start();
    osc.stop(actx.currentTime + 0.5);
  }

  function notes(n) {
    const formulaVal = middleA * Math.pow(Math.pow(2, 1/12), n)
    return formulaVal
  }

  return (
    <div className="flex">
      {Object.keys(NOTES).map((note, i) => {
        return (
          <Key
            note={note}
            freq={NOTES[note]}
            key={i}
            setFreq={setFreq}
            setIsClicked={setIsClicked}
          />
        );
      })}
    </div>
  );
}
