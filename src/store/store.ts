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

// Colors

const gColor = [
    '#3366cc7f',
    '#ff99007f',
    '#1096187f',
    '#9900997f',
    '#dc39127f',
    '#0099c67f',
    '#dd44777f',
    '#66aa007f',
    '#b82e2e7f',
    '#3163957f',
    '#9944997f',
    '#22aa997f',
    '#aaaa117f',
    '#6633cc7f',
    '#e673007f',
    '#8b07077f',
    '#6510677f',
    '#3292627f',
    '#5574a67f',
    '#3b3eac7f'
]; ``;

// const categoryScale = d3.scaleOrdinal<number, string>(d3.schemeCategory10);
// const categoryScale = d3.scaleOrdinal<number, string>(gColor);
// function colorScale(d: number) { return categoryScale(d); }
export function colorScale(n: number) { return gColor[n % gColor.length]; }

//
