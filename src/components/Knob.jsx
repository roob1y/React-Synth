import React, { useState, useEffect } from "react";

export default function Knob(props) {
  const [numTicks, setNumTicks] = useState(0);
  const [max, setMax] = useState(0);

  const fullAngle = props.degrees;
  const startAngle = (360 - props.degrees) / 2;
  const endAngle = startAngle + props.degrees;
  const margin = props.size * 0.15;
  const snapToIncVal = props.degrees / numTicks;

  const [currentDeg, setCurrentDeg] = useState(startAngle);
  const [deg, setDeg] = useState(currentDeg);

  useEffect(() => {
    if (props.type === "fullRange") {
      setNumTicks(props.degrees - 1);
      setMax(props.degrees - 1);
    }
    if (typeof props.type === "number") {
      setNumTicks(props.type - 1);
      setMax(props.type - 1);
    }
  }, [props.type]);

  const startDrag = (e) => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e) => {
      const newCurrentDeg = getDeg(e.clientX, e.clientY, pts);
      setCurrentDeg(newCurrentDeg);
      const newValue = Math.floor(
        convertRange(startAngle, endAngle, 0, max, newCurrentDeg)
      );
      const deg = snapToIncVal * newValue + startAngle;
      setDeg(deg);
      props.setNewVal(newValue);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", (e) => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  const getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  }

  const renderTicks = () => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    const size = margin + props.size / 2;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      const tick = {
        deg: deg,
        tickStyle: {
          height: size + 6,
          left: size - 1,
          top: size + 2,
          transform: "rotate(" + deg + "deg)",
          transformOrigin: "top",
        },
      };
      ticks.push(tick);
    }
    return ticks;
  };

  const dcpy = (o) => {
    return JSON.parse(JSON.stringify(o));
  };

  let kStyle = {
    width: props.size,
    height: props.size,
  };
  let iStyle = dcpy(kStyle);
  let oStyle = dcpy(kStyle);
  oStyle.margin = margin;
  if (props.color) {
    oStyle.backgroundImage =
      "radial-gradient(100% 70%,hsl(300, " +
      currentDeg +
      "%, " +
      currentDeg / 5 +
      "%),hsl(" +
      Math.random() * 100 +
      ",20%," +
      currentDeg / 36 +
      "%))";
  } else {
    oStyle.backgroundImage =
      "radial-gradient(100% 70%,hsl(300, 100%, 100%),hsl(170, 20%, 70%))";

    oStyle.backgroundColor = "gray";
  }
  iStyle.transform = "rotate(" + deg + "deg)";

  return (
    <div className="knob">
      <div className="ticks">
        {numTicks
          ? renderTicks().map((tick, i) => (
              <div
                key={i}
                className={"tick" + (tick.deg <= currentDeg ? " active" : "")}
                style={tick.tickStyle}
              />
            ))
          : null}
      </div>
      <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
        <div className="knob inner" style={iStyle}>
          <div className="grip" />
        </div>
      </div>
    </div>
  );
}
