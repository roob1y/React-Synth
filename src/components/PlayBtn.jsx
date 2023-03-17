import React from "react";

export default function PlayBtn({ type }) {
  function playSound() {
    const actx = new (AudioContext || webkitAudioContext)();
    if (!actx) throw "Not supported!";
    const osc = actx.createOscillator();
    osc.type = type;
    osc.frequency.value = 440; // Hz = middle A
    osc.connect(actx.destination); // soundcard output
    osc.start();
    osc.stop(actx.currentTime + 2);
  }
  return (
    <button id="play" onClick={playSound}>
      Play
    </button>
  );
}
