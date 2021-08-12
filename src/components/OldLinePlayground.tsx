import React from 'react';
import * as d3 from 'd3';
import styles from './XOrgLinePlayground.module.scss';
import CheckboxTw from './CheckboxTw';
import { useAtom } from 'jotai';
import { inputDataAtom, nActiveAtom, pointsAtom } from '../store/store';
import { CurveInfo, CURVEINFO as globalCURVEINFO } from '../store/datum';

type API = {
    setAll: (onOff: boolean) => void;
};

export type InputData = {
    points: [number, number][]; // control points coordinates as [x, y][]
    active: number;             // number of active points
    //lines: number[];          // selected line types
};

function initial(mainGroup: SVGGElement, inputData: InputData, onSelectionChange: (allOn: boolean) => void): API {

    const CURVEINFO: CurveInfo[] = [...globalCURVEINFO]; // copy global descriptions and initial state.

    type DatumPoint = [number, number, number];
    const points: DatumPoint[] = inputData.points.map((d, i) => [...d, i]);
    let numActivePoints = Math.min(points.length, inputData.active);

    const categoryScale = d3.scaleOrdinal<number, string>(d3.schemeCategory10);
    function colorScale(d: number) { return categoryScale(d); } // We need to have 18 colors but have onlt 10.

    const lineGenerator = d3.line();

    const drag = d3.drag<SVGCircleElement, DatumPoint>()
        .on('drag', function (event: any, d: DatumPoint) {
            const idx = d[2];
            const xy = d3.pointer(event, this);
            points[idx][0] = Math.round(xy[0]);
            points[idx][1] = Math.round(xy[1]);
            updatePointsInfo(d);
            update();
        })
        .on('end', () => {
            updatePointsInfo();
        });

    function updateInfo(info: string) {
        d3.select('.info .default').style('display', info ? 'none' : 'inline');
        d3.select('.info .text').text(info);
    }

    function updatePointsInfo(current?: DatumPoint) {
        function joinPoints(d: DatumPoint) {
            let pt = JSON.stringify([d[0], d[1]]);
            return d === current ? `<b>${pt}</b>` : pt;
        }
        const a = points.slice(0, numActivePoints).map(joinPoints);
        const b = numActivePoints < points.length ? `<span class=${styles.inactivePath}>${points.slice(numActivePoints).map(joinPoints).join(',')}</span>` : '';
        const c = b ? `[${[...a, b].join(',')}]` : `[${a.join(',')}]`;
        d3.select('.info .points').html(c);
    }

    function updateMenu() {
        let items = d3.select('.menu')
            .selectAll<HTMLDivElement, CurveInfo>('div.item')
            .data(CURVEINFO);

        let itemsEnter = items.enter()
            .append('div')
            .attr('class', d => `item ${styles.item} ${d.group ? styles.itemBegingroup : ''}`)
            .on('click', function (event, d) {
                d.active = !d.active;
                updateAllLinesOn();
                update();
            })
            .on('mouseover', function (event, d) { updateInfo(d.info); })
            .on('mouseout', function () { updateInfo(''); });

        itemsEnter.append('div')
            .attr('class', d => `info ${styles.info}`);
        itemsEnter.append('div')
            .attr('class', styles['item-name'])
            .text(d => d.name);

        itemsEnter.merge(items)
            .select('.info')
            .attr('class', d => `info ${styles.info} ${!d.active ? '' : d.lineStyle === 2 ? styles.line2 : d.lineStyle === 1 ? styles.line1 : styles.line0}`)
            .style('--color', function (d, i) { return colorScale(d.grpIdx); })
            .transition()
            .duration(50)
            .ease(d3.easeCubicInOut)
            .style('--size', d => d.active ? 0 : 80);
    }

    function updatePointsMenu() {
        d3.select('.remove-point')
            .classed('active', numActivePoints > 2)
            .on('click', function () {
                if (numActivePoints <= 2) return;
                numActivePoints--;
                updatePointsInfo();
                update();
            });

        d3.select('.add-point')
            .classed('active', numActivePoints < points.length)
            .on('click', function () {
                if (numActivePoints >= points.length) return;
                numActivePoints++;
                updatePointsInfo();
                update();
            });
    }

    function updateLines() {
        CURVEINFO.forEach(function (d) {
            if (d.active) {
                lineGenerator.curve(d.curve);
                d.lineString = lineGenerator(points.slice(0, numActivePoints) as any as [number, number][]) || '';
            }
        });

        let u = d3.select(mainGroup)
            .selectAll<SVGPathElement, CurveInfo>('path')
            .data(CURVEINFO);

        u.enter()
            .append('path')
            .merge(u)
            .attr('stroke-width', 7)
            .style('stroke', (d, i) => colorScale(d.grpIdx))
            .style('stroke-dasharray', (d, i) => d.lineStyle === 2 ? "8,2" : d.lineStyle === 1 ? "2,2,2" : "")
            .attr('d', d => d.lineString || '')
            .style('display', d => d.active ? 'inline' : 'none');
    }

    function updatePoints() {
        let u = d3.select(mainGroup)
            .selectAll<SVGCircleElement, DatumPoint>('circle')
            .data(points.slice(0, numActivePoints));

        let t = d3.select(mainGroup)
            .selectAll<SVGTextElement, DatumPoint>('text')
            .data(points.slice(0, numActivePoints));

        // let p = d3.select(mainGroup)
        //     .selectAll<SVGPathElement, DatumPoint>('.g-highlight')
        //     .data(points.slice(0, numActivePoints));

        u.enter()
            .append('g')
            .attr('class', 'g-point')
            .call(function (selection) {
                selection
                    .append('text')
                    .append('tspan')
                    .merge(t)
                    .attr('x', d => d[0] - 24)
                    .attr('y', d => d[1] - 16)
                    .attr('stroke', '#1c31b3')
                    .text(d => d[2] + 1);
            })
            // .call((selection) => {
            //     selection
            //         .append('g')
            //         .attr('transform', (d) => `translate(${d[0] - 11} ${d[1] - 11}) scale(.5)`)
            //         // .attr('transform', (d) => `scale(.5)`)
            //         .append('path')
            //         .attr('class', 'g-highlight')
            //         .merge(p)
            //         .attr('fill', 'red')
            //         .attr('stroke', 'none')
            //         .attr('d', "M451.5 120.7a18.8 18.8 0 01.7-2.1A22 22 0 01460 108l-2.3-4a22.2 22.2 0 00-7.5 10.3 22.7 22.7 0 00-1.2 5.1 7.8 7.8 0 012.5 1.3zM462.6 106.3a22.2 22.2 0 019.4-2.6l-.2-.3-2.3-4a22.2 22.2 0 00-9.2 2.8l2.3 4.1z")
            //         .attr('transform', (d) => `translate(-448.5 -98.4)`);
            // })
            .append('circle')
            .attr('class', `${styles.circle}`)
            .attr('r', 14)
            .call(drag)
            .merge(u)
            .attr('cx', d => d[0])
            .attr('cy', d => d[1]);

        let g = d3.select(mainGroup)
            .selectAll('.g-point')
            .data(points.slice(0, numActivePoints));

        g.exit().remove();
    }

    function updateAllLinesOn() {
        onSelectionChange(!CURVEINFO.some(item => !item.active));
    }

    function setAll(onOff: boolean) {
        CURVEINFO.forEach(item => item.active = onOff);
        update();
    }

    function update() {
        updateMenu();
        updatePointsMenu();
        updateLines();
        updatePoints();
    }

    (function init() {
        // d3.select("body").transition()
        //     .duration(4750)
        //     .on("start", function () { d3.select(this).style("color", "red"); })
        //     .style("color", "green");

        //d3.select(mainGroup).selectAll('.menu').remove();

        //.styleTween('opacity', (d) => function () { return `${d3.interpolateNumber(0,1)}` }) //OK The returned style should be string w/ the current CSS specs

        updatePointsInfo();
        update();
        updateAllLinesOn();
    })();

    return {
        setAll
    };
}

function LineEditor() {
    const svgRef = React.useRef<SVGGElement>(null);
    const apiRef = React.useRef<API | null>(null);

    const [allChecked, setAllChecked] = React.useState(false);

    // const [points, setPoints] = useAtom(pointsAtom);
    // const [nActive, setNActive] = useAtom(nActiveAtom);
    const [inputData] = useAtom(inputDataAtom);

    function onSelectionChange(allOn: boolean) {
        setAllChecked(allOn);
    }

    React.useEffect(() => {
        apiRef.current = svgRef.current && initial(svgRef.current, inputData, onSelectionChange);
    }, [inputData]);

    return (
        <div className=""> {/* scale-75 */}
            <svg className="bg-white border-8 border-blue-400" viewBox="0 0 500 500" fill="none" stroke="red" strokeWidth="1">
                <g ref={svgRef}></g>
            </svg>

            <div className="ml-4 -mt-3 flex space-x-1">
                <div
                    className="remove-point
                        w-4 h-4 pb-1 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none 
                        flex items-center justify-center"
                    title="Remove point (min is 2)"
                >-</div> {/* TODO: maybe: background-color: #60a5fa; (blue-400) color: white; border: 1px solid white */}
                <div
                    className="add-point
                        w-4 h-4 pb-1 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none 
                        flex items-center justify-center"
                    title="Add point (maximum 7)"
                >+</div>
            </div>

            {/* Controls */}
            <div className="sidebar mt-1 p-2 rounded-md text-sm bg-white">
                {/* Info panel */}
                <div className="info w-[30rem] h-20 p-2 text-xs rounded bg-blue-100 flex flex-col justify-between">
                    <span className="default">
                        <p>Toggle each of the curve types to activate / deactivate the curve.</p>
                        <p>You can also add/remove/drag the points to change the shape of the curve.</p>
                    </span>
                    <span className="text"></span>
                    <span className="points"></span>
                </div>

                {/* Menu header */}
                <div className="flex justify-between">
                    <a className="mt-2 flex items-center" href="https://github.com/d3/d3-shape#curves" target="_blank">
                        <span>D3 curve types to interpolate a set of points:</span>
                        <svg className="h-4 w-4 pt-0.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                    </a>
                    <CheckboxTw label="" title="Toggle all" className="w-4 h-4 rounded-sm"
                        checked={allChecked}
                        onChange={(v) => { apiRef.current?.setAll(v); setAllChecked(v); }}
                    />
                </div>

                {/* Menu items generated by D3 */}
                <div className="menu border border-gray-400 rounded overflow-hidden"></div>
            </div>
        </div>
    );
}

function LinePlayground() {
    return (
        <div className="w-full">
            <LineEditor />
        </div>
    );
}

export default LinePlayground;
