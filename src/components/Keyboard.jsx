import React, { useEffect, useState } from "react";
import Key from "./Key";
import { NOTES } from "../global/constants";

export default function Keyboard() {
  const [actx, setAudioContext] = useState(null);
  const [freq, setFreq] = useState(null);
  const [keyClicked, setKeyClicked] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const middleA = 440;

  function startAudioContext() {
    // create the audio context
    const ctx = new (AudioContext || webkitAudioContext)();
    setAudioContext(ctx);
  }

  const detectKeyDown = (e) => {
    const newFreq = {
      a: NOTES["C"],
      w: NOTES["C#"],
      s: NOTES["D"],
      e: NOTES["D#"],
      d: NOTES["E"],
      f: NOTES["F"],
      t: NOTES["F#"],
      g: NOTES["G"],
      y: NOTES["G#"],
      h: NOTES["A"],
      u: NOTES["Bb"],
      j: NOTES["B"],
    };
    let freq;
    if (e.code === "onScreenKey") {
      freq = NOTES[e.key];
    } else {
      freq = newFreq[e.key];
    }
    if (freq !== null && currentNote === null) {
      const note = playSound(actx, freq, 0.5);
      setCurrentNote(note);
    }
  };

  useEffect(() => {
    // add event listener for keydown
    window.addEventListener("keydown", detectKeyDown, true);
    // add event listener for keyup
    window.addEventListener("keyup", detectKeyUp, true);
    // cleanup function to remove event listeners
    return () => {
      window.removeEventListener("keydown", detectKeyDown, true);
      window.removeEventListener("keyup", detectKeyUp, true);
    };
  }, [currentNote, actx]);

  const detectKeyUp = (e) => {
    if (currentNote !== null) {
      currentNote.stop(actx.currentTime);
      setCurrentNote(null);
    }
  };

  function playSound(actx, freq, duration) {
    if (!actx) throw "Not supported!";
    const osc = actx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;

    const gain = actx.createGain();
    gain.gain.value = 0.4; // set the volume to 40%

    // connect the oscillator to the gain node
    osc.connect(gain);
    // connect the gain node to the destination (i.e., the speakers)
    gain.connect(actx.destination);

    osc.start();

    const note = {
      oscillator: osc,
      gain: gain,
      stop: function (time) {
        this.gain.gain.exponentialRampToValueAtTime(0.1, time + duration);
        this.oscillator.stop(time + duration);
      },
    };
    return note;
  }

  function notes(n) {
    const formulaVal = middleA * Math.pow(Math.pow(2, 1 / 12), n);
    return formulaVal;
  }

  return (
    <>
      <button onClick={startAudioContext}>Start AudioContext</button>
      <div className="flex">
        {Object.keys(NOTES).map((note, i) => {
          return (
            <Key
              note={note}
              freq={NOTES[note]}
              key={i}
              setFreq={setFreq}
              setKeyClicked={setKeyClicked}
              detectKeyDown={detectKeyDown}
              detectKeyUp={detectKeyUp}
              currentNote={currentNote}
              playSound={playSound}
              actx={actx}
              setCurrentNote={setCurrentNote}
            />
          );
        })}
      </div>
    </>
  );
}
