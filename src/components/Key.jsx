import React, { useState, useEffect } from "react";

export default function Key({ note, freq, setFreq, setIsClicked }) {
  const [showNote, setShowNote] = useState(true);

  function keyClickHandler() {
    console.log(freq);
    setFreq(freq);
    setIsClicked(true)
  }

  let noteIsIncidentalClassName = showNote
    ? "z-10 border border-black text-4xl font-semibold text-black h-80 w-16"
    : "z-10 bg-black -mx-4 relative text-4xl h-52 w-7 font-semibold text-black";

  useEffect(() => {
    if (note.length > 1) {
      setShowNote(false);
    } else {
      setShowNote(true);
    }
  }, [note]);

  return (
    <div onClick={() => keyClickHandler()} className="cursor-pointer bg-white">
      <div className={noteIsIncidentalClassName}>
        {showNote ? <p className="bottom-0 translate-y-64">{note}</p> : null}
      </div>
    </div>
  );
}
