import React, { useState, useEffect, useRef } from "react";
import KnobSVG from "../assets/svg/knob.svg";

export default function Knob() {

  return (
    <img ref={rot} className="w-96" src={KnobSVG} alt="" />
  );
}

// const options = [
//   "-52",
//   "-40",
//   "-28",
//   "-16",
//   "-4",
//   "8",
// ];
