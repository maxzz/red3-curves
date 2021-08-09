import React from 'react';
import * as d3 from 'd3';
import { useAtom } from 'jotai';
import { colorScale, lineCheckAtom, LineData, linePathesAtom, linesAtom, pointsAtom, setPointAtom } from '../store/store';
import { styled } from '@stitches/react';
import { CURVEINFO } from '../store/datum';
import { useDrag } from 'react-use-gesture';

function pointer(event: React.PointerEvent<Element> | PointerEvent, node?: HTMLElement | SVGElement | null): [number, number] {
    if (node === undefined) node = event.currentTarget as any;
    if (node) {
        var svg = ((node as any).ownerSVGElement || node) as SVGSVGElement;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            point.x = event.clientX, point.y = event.clientY;
            point = point.matrixTransform((node as any as SVGGraphicsElement).getScreenCTM()?.inverse());
            
            //console.log('svg', node, svg, point, (node as any as SVGGraphicsElement).getScreenCTM()?.inverse());
            //console.log('svg', point);

            return [point.x, point.y];
        }
        if (node.getBoundingClientRect) {
            var rect = node.getBoundingClientRect();
            return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
        }
    }
    return [event.pageX, event.pageY];
}


const LinePointRow = styled('circle', {
    fill: '#00d7ff5a',
    stroke: '#0018aa',
    strokeWidth: '2',
    cursor: 'move',
    r: 14,
});

function LinePoint(props: { idx: number, cx: number, cy: number; }) {
    const { idx, ...rest } = props;
    const [_, setPoint] = useAtom(setPointAtom);
    const ref = React.useRef(null);

    const bind = useDrag(({ event, xy }) => {
        //console.log('event', xy);

        const newxy = pointer(event, ref.current);
        setPoint({ idx, value: newxy });
    });

    return (
        <>
            {/* <LinePointRow {...bind()} {...rest} /> */}
            <circle
                ref={ref}
                {...bind()}
                style={{
                    fill: '#00d7ff5a',
                    stroke: '#0018aa',
                    strokeWidth: '2',
                    cursor: 'move',
                }}
                {...rest} r={14} />
        </>
    );
}

const LinePath = styled('path', {
    strokeWidth: '7',
    fill: 'none',
    variants: {
        lineStyle: {
            1: {
                strokeDasharray: '2,2',
            },
            2: {
                strokeDasharray: '8,8',
            },
        }
    }
});

function CheckboxRow({ line, idx }: { line: LineData, idx: number; }) {
    const [value, setValue] = useAtom(lineCheckAtom);
    return (
        <label className="flex items-center cursor-pointer" key={idx}>
            {/* space-x-2 */}
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
            <div className="-ml-6 w-12 h-7 rounded" style={{ backgroundColor: colorScale(CURVEINFO[line.idx].grpIdx) }}></div>
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
        <div className="bg-purple-100 mt-16">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="bg-yellow-50">
                <g>
                    {points.map((pt, idx) => (
                        <LinePoint idx={idx} cx={pt[0]} cy={pt[1]} key={idx} />
                    ))}
                </g>
                <g>
                    {lines.map((line) => (line.active &&
                        <LinePath
                            key={line.idx}
                            d={linePathes[line.idx]}
                            lineStyle={CURVEINFO[line.idx].lineStyle}
                            stroke={colorScale(CURVEINFO[line.idx].grpIdx)}
                        />
                    ))}
                </g>
            </svg>

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
