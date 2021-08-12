import * as d3 from 'd3';
import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { InputData } from '../components/OldLinePlayground';
import { CURVEINFO } from './datum';

export type LinePointData = [number, number];

const initialPoints: [number, number][] = [[46, 179], [123, 404], [123, 56], [292, 56], [292, 274], [456, 163], [463, 473]]; // control points coordinates as [x, y][]

export const pointsAtom = atom<LinePointData[]>(initialPoints);

export const setPointAtom = atom(
    null,
    (get, set, { idx, value }: { idx: number; value: [number, number]; }) => {
        let pts = get(pointsAtom);
        pts[idx] = value;
        set(pointsAtom, [...pts]);
    }
);

export const nActiveAtom = atom(7); // Number of active points

export const inputDataAtom = atom<InputData>(
    get => ({
        points: get(pointsAtom),
        active: get(nActiveAtom),
    })
);

// Line pathes generation

function generatePathes(points: LinePointData[], numActivePoints: number): string[] {
    const lineGenerator = d3.line();
    const pts = points.slice(0, numActivePoints) as any as [number, number][]; // <any> cast to remove possible trailing data from type.

    return CURVEINFO.map((curve) => {
        lineGenerator.curve(curve.curve);
        return lineGenerator(pts) || '';
    });
}

export const linePathesAtom = atomWithDefault<string[]>((get) => {
    return generatePathes(get(pointsAtom), get(nActiveAtom));
});

// Checkboxes. Lines activation

export type LineData = {
    idx: number;        // index in global CURVEINFO.
    active: boolean;    // true if line activated.
};

export const linesAtom = atom<LineData[]>(CURVEINFO.map((curve, idx) => ({ idx, active: curve.active })));
// export const linesAtom = atom<LineData[]>(CURVEINFO.map((curve, idx) => ({ idx, active: true })));

export const lineCheckAtom = atom(
    (get) => (idx: number) => get(linesAtom)[idx].active,
    (get, set, { idx, value }: { idx: number, value: boolean; }) => {
        let arr = get(linesAtom);
        arr[idx].active = value;
        set(linesAtom, [...arr]);
    }
);

//export const allLinesAtom = atom(false);
export const allLinesSetAtom = atom(
    (get) => {
        let arr = get(linesAtom);
        return !arr.some(line => !line.active);
    },
    (get, set, value: boolean) => {
        let arr = get(linesAtom);
        arr.forEach(line => line.active = value);
        set(linesAtom, [...arr]);
    }
);

// Line hint

export const LineHintIdxAtom = atom(-1);

export const setHintIdxAtom = atom(
    null,
    (get, set, value: number) => {
        set(LineHintIdxAtom, value);
    }
)

// Colors

const gColor = [
    '#3366cc',
    '#ff9900',
    '#109618',
    '#990099',
    '#dc3912',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac'
]; ``;

// const categoryScale = d3.scaleOrdinal<number, string>(d3.schemeCategory10);
// const categoryScale = d3.scaleOrdinal<number, string>(gColor);
// function colorScale(d: number) { return categoryScale(d); }
export function colorScale(n: number) { return gColor[n % gColor.length]; }

//
