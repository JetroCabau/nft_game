import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";

const PickleRenderer = ({ Pickle = null, size = 200, style }) => {
  if (!Pickle) {
    return null;
  }
  let rarity = _r1;

  if (Pickle.rarity >= 80) {
    rarity = _r2;
  }
  if (Pickle.rarity >= 95) {
    rarity = _r3;
  }

  let dnaStr = String(Pickle.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let PickleDeatils = {
    bg: dnaStr.substring(0, 2) % 5,
    mask: dnaStr.substring(2, 4) % 5,
    line: dnaStr.substring(4, 6) % 5,
    addon: dnaStr.substring(6, 8) % 5,
    addonMouth1: dnaStr.substring(8, 10) % 5,
    addonMouth2: dnaStr.substring(10, 12) % 5,
    addonMouth3: dnaStr.substring(12, 14) % 5,
    name: Pickle.name,
  };

  const PickleStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        background: "blue",
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[PickleDeatils.bg]} style={PickleStyle} />
      <img alt={"mask"} src={parts.mask[PickleDeatils.mask]} style={PickleStyle} />
      <img alt={"line"} src={parts.line[PickleDeatils.line]} style={PickleStyle} />
      <img alt={"addon"} src={parts.addon[PickleDeatils.addon]} style={PickleStyle} />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth1[PickleDeatils.addonMouth1]}
        style={PickleStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth2[PickleDeatils.addonMouth2]}
        style={PickleStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth3[PickleDeatils.addonMouth3]}
        style={PickleStyle}
      />
      <img alt={"rarity"} src={rarity} style={PickleStyle} />
    </div>
  );
};

export default PickleRenderer;