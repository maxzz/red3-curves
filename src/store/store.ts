import * as d3 from 'd3';
import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { InputData } from '../components/OldLinePlayground';
import { CURVEINFO } from './datum';

export type LinePointData = [number, number];

const initialPoints: [number, number][] = [[46, 179], [123, 404], [123, 56], [292, 56], [292, 274], [456, 163], [463, 473]]; // control points coordinates as [x, y][]

export const pointsAtom = atom<LinePointData[]>(initialPoints);

export const nActiveAtom = atom(7); // Number of active points

export const inputDataAtom = atom<InputData>(
    get => ({
        points: get(pointsAtom),
        active: get(nActiveAtom),
    })
);

// Line pathes

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

// Lines

export type LineData = {
    idx: number;        // index in global CURVEINFO.
    active: boolean;    // true if line activated.
};

//export const linesAtom = atom<LineData[]>(CURVEINFO.map((curve, idx) => ({ idx, active: curve.active })));
export const linesAtom = atom<LineData[]>(CURVEINFO.map((curve, idx) => ({ idx, active: true })));

//
