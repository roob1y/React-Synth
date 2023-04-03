import React, { useState, useEffect } from "react";

export default function Key({
  note,
  freq,
  setFreq,
  setKeyClicked,
  currentNote,
  detectKeyDown,
  detectKeyUp,
  playSound,
  actx,
  setCurrentNote
}) {
  const [showNote, setShowNote] = useState(true);

  function handleMouseDown() {
    setFreq(freq);
    setKeyClicked(true);
    detectKeyDown({ key: note, code: "onScreenKey" }, currentNote);
  }

  function handleMouseUp() {
    setKeyClicked(false);
    detectKeyUp({ key: note, code: "onScreenKey" }, currentNote);
  }

  let noteIsIncidentalClassName = showNote
    ? "text-4xl h-80 w-16"
    : "bg-black -mx-4 absolute h-52 w-7";

  useEffect(() => {
    if (note.length > 1) {
      setShowNote(false);
    } else {
      setShowNote(true);
    }
  }, [note]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="cursor-pointer bg-white"
    >
      <div
        className={`font-semibold" + z-10 border border-black text-black ${noteIsIncidentalClassName}`}
      >
        {showNote ? <p className="bottom-0 translate-y-64">{note}</p> : null}
      </div>
    </div>
  );
}
