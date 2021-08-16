import React from "react";
import doodle from "@jalba/react-css-doodle";

const gridSize = 10;
const gridGap = "2";

const background = () => "red";

const FancyDoodle = doodle`
  :doodle {
    @grid: ${gridSize} / 200px;
    grid-gap: ${gridGap}px;
  }
  background: @pick(${background}, pink);
`;

export default function HeroAttraction() {
    return (
        <div className="">
            <FancyDoodle />
        </div>
    );
}
