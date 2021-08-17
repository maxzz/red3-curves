import React from "react";
import doodle from "@jalba/react-css-doodle";

const gridSize = 10;
const gridGap = "2";

const background = () => "red";

const FancyDoodle = doodle`
    :doodle {
        @grid: 30x1 / 50% 100%;
        transform: translate(50%, 30%);
    }

    @place-cell: center;
    border-radius: 20%;
    border: 2px solid #c8c8f4;
    @size: calc(50% / @size() * @i() - 10px);
    opacity: calc(@i() * 0.03);

    border-top-color:#8c8ce3;
    border-right-color:#6174cb;

    transform:
        rotateX(70deg)
        rotateY(6deg)
        translateY(calc(-@i() * 2 * 10px))
        translateX(calc(@sin(@i() / 5 + 2) * @PI() * 10px));
    `;

// const FancyDoodle = doodle`
//     @grid: 50x1 / 100%;

//     @place-cell: center;
//     @size: calc(50% / @I * @i);

//     transform: rotate(calc(@i * 5deg));

//     border-radius: 30%;
//     border: 1px solid hsla(
//         calc(10 + 4 * @i), 70%, 68%, @r.8
//     );
// `;

// const FancyDoodle = doodle`
//     :doodle {
//         @grid: 8 / 90%;
//         @shape: circle;
//     }

//     transition: .2s @r(.6s);
//     border-radius: @pick(20% 0, 0 20%);

//     will-change: transform;
//     transform: scale(@r(.25, 1.25));

//     background: hsla(
//         calc(240 - 6 * @x * @y),
//         70%, 68%, @r.8
//     );
// `;

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
