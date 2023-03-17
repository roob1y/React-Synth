function playSound(){
  const actx = new (AudioContext || webkitAudioContext)();
  if (!actx) throw "Not supported :(";
  const osc = actx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 440; // Hz = middle A
  osc.connect(actx.destination); // soundcard output
  osc.start();
  osc.stop(actx.currentTime + 2);
}

export default function PlayBtn() {
  return <button id="play" onClick={playSound}>Play</button>
} 