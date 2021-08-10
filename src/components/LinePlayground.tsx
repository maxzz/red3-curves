import React from 'react';
import * as d3 from 'd3';
import { useAtom } from 'jotai';
import { colorScale, lineCheckAtom, LineData, linePathesAtom, linesAtom, pointsAtom, setPointAtom } from '../store/store';
import { css, styled } from '@stitches/react';
import { CURVEINFO } from '../store/datum';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../hooks/pointer';
import lineTypeUrl0 from '../assets/dashed-line0.svg';
import lineTypeUrl1 from '../assets/dashed-line1.svg';
import lineTypeUrl2 from '../assets/dashed-line2.svg';

const dotStyles = css({
    fill: '#00d7ff5a',
    stroke: '#0018aa',
    strokeWidth: '2',
    cursor: 'move',
    r: 14,
});

function Dot(props: { idx: number, cx: number, cy: number; }) {
    const { idx, cx, cy } = props;
    const [_, setPoint] = useAtom(setPointAtom);
    const ref = React.useRef(null);

    const bind = useDrag(({ event, xy }) => {
        //console.log('event', xy);

        const newxy = pointer(event, ref.current);
        setPoint({ idx, value: newxy });
    });

    return (
        <circle ref={ref} {...bind()} className={dotStyles()} cx={cx} cy={cy} />
    );
}

const dotTextStyles = css({
    fill: '#0018aa',
    stroke: '#ffffff40',
    strokeWidth: '1',
    fontSize: '1.5rem',
});

function DotText(props: { idx: number, cx: number, cy: number; }) {
    const { idx, cx, cy } = props;
    return (
        <text>
            <tspan className={dotTextStyles()} x={cx - 29} y={cy - 10}>{idx}</tspan>
        </text>
    );
}

const LinePath = styled('path', {
    strokeWidth: '7',
    strokeLinejoin: 'round',
    fill: 'none',
    pointerEvents: 'none',
    variants: {
        lineStyle: {
            1: { strokeDasharray: '2,2', },
            2: { strokeDasharray: '8,8', },
        }
    }
});

const CheckboxBarStyles = css({
    position: 'relative',
    '&::after': {
        content: "",
        position: 'absolute',
        inset: 0,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '32% 120%',
        backgroundPosition: '85% -65%',
        mixBlendMode: 'multiply',
    }
});

function CheckboxRow({ line, idx }: { line: LineData, idx: number; }) {
    const [value, setValue] = useAtom(lineCheckAtom);
    const curve = CURVEINFO[line.idx];
    return (
        <label className="flex items-center cursor-pointer" key={idx}>
            <input
                className="ml-2 h-4 w-4 appearance-none rounded
                    text-green-600 border border-[#006f94]
                    bg-[#ffffff70] 
                    checked:bg-[#ffffff70] checked:border-transparent 
                    checked:bg-ui-check
                    focus:outline-none
                    z-10" type="checkbox"
                checked={value(idx)}
                onChange={(e) => setValue({ idx, value: e.target.checked })}
            />
            <div
                className={`-ml-6 w-16 h-7 rounded ${CheckboxBarStyles()}`}
                style={{
                    backgroundColor: colorScale(curve.grpIdx),
                    backgroundImage: `url("${curve.lineStyle === 2 ? lineTypeUrl2 : curve.lineStyle === 1 ? lineTypeUrl1 : lineTypeUrl0}")`,
                }}
            ></div>
            <div className="ml-2">{CURVEINFO[idx].name}</div>
        </label>
    );
}

function LinePlayground() {
    const [points] = useAtom(pointsAtom);
    const [linePathes] = useAtom(linePathesAtom);
    const [lines] = useAtom(linesAtom);

    const svgW = 600;
    const svgH = 600;

    return (
        <div className="bg-purple-100">
            {/* Viewer */}
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="bg-yellow-50">
                <g>
                    {points.map((pt, idx) => <Dot idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
                    {lines.map((line) => (line.active &&
                        <LinePath
                            key={line.idx}
                            d={linePathes[line.idx]}
                            lineStyle={CURVEINFO[line.idx].lineStyle}
                            stroke={colorScale(CURVEINFO[line.idx].grpIdx)}
                        />
                    ))}
                    {points.map((pt, idx) => <DotText idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />)}
                </g>
            </svg>

            {/* Controls */}
            <div className="">
                <div className="">
                    Info
                </div>
                <div className="p-2 space-y-1 flex flex-col text-sm select-none">
                    {lines.map((line, idx) => <CheckboxRow line={line} idx={idx} key={idx} />)}
                </div>
            </div>
        </div>
    );
}

export default LinePlayground;
