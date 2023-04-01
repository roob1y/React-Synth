import React, { useState } from "react";
import Knob from "./Knob";

import OctMarkers from "../assets/svg/octave-markers.svg";

export default function KnobControl() {
  const [value, setValue] = useState(0);
  const [sixSelectVal, setSixSelectVal] = useState(0);


  return (
    <div className="wrap flex relative">
      <img className="w-40 " src={OctMarkers} alt="" />
      <div className="absolute top-6 left-10">
        <Knob type={6} degrees={180} size={70} setNewVal={setSixSelectVal} />
      </div>
    </div>
  );
}

// const octaveOpts = [
//   "-52",
//   "-40",
//   "-28",
//   "-16",
//   "-4",
//   "8",
// ];
