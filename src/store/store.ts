import { atom } from 'jotai';
import { InputData } from '../components/OldLinePlayground';

export const pointsAtom = atom<[number, number][]>([[46, 179], [123, 404], [123, 56], [292, 56], [292, 274], [456, 163], [463, 473]]); // control points coordinates as [x, y][]

export const nActiveAtom = atom(7);

export const inputDataAtom = atom<InputData>(
    get => ({
        points: get(pointsAtom),
        active: get(nActiveAtom),
    })
);
