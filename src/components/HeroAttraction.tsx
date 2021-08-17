import React from "react";
import doodle from "@jalba/react-css-doodle";

const gridSize = 10;
const gridGap = "2";

const background = () => "red";

const FancyDoodle = doodle`
    :doodle {
        @grid: 8 / 90%;
        @shape: circle;
    }
    
    transition: .2s @r(.6s);
    border-radius: @pick(20% 0, 0 20%);
    
    will-change: transform;
    transform: scale(@r(.25, 1.25));
    
    background: hsla(
        calc(240 - 6 * @x * @y),
        70%, 68%, @r.8
    );
`;

// const FancyDoodle = doodle`
//   :doodle {
//     @grid: ${gridSize} / 200px;
//     grid-gap: ${gridGap}px;
//   }
//   background: @pick(${background}, pink);
// `;

export default function HeroAttraction() {
    return (
        <div className="w-64 h-64">
            <FancyDoodle />
        </div>
    );
}
