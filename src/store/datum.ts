import * as d3 from 'd3';

export type CurveInfo = {
    name: string;
    curve: d3.CurveFactory | d3.CurveBundleFactory;
    group: boolean;
    active: boolean;
    info: string;

    grpIdx: number;         // Group index [0..7]
    lineStyle: number;      // Line style in group [0..2]
    lineString?: string;    // Generated curve points
};

export const CURVEINFO: CurveInfo[] = [
    { name: 'curveBundle (ß=0)', curve: d3.curveBundle.beta(0), grpIdx: 0, lineStyle: 0, group: false, active: false,                   info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=0 the curve is straight.' },
    { name: 'curveBundle (ß=0.5)', curve: d3.curveBundle.beta(0.5), grpIdx: 0, lineStyle: 1, group: false, active: false,               info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is.' },
    { name: 'curveBundle (ß=1)', curve: d3.curveBundle.beta(1), grpIdx: 0, lineStyle: 2, group: false, active: false,                   info: 'Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=1 the curve is the same as curveBasis.' },

    { name: 'curveCardinal (tension=0)', curve: d3.curveCardinal.tension(0), grpIdx: 1, lineStyle: 0, group: true, active: false,       info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
    { name: 'curveCardinal (tension=0.5)', curve: d3.curveCardinal.tension(0.5), grpIdx: 1, lineStyle: 1, group: false, active: false,  info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },
    { name: 'curveCardinal (tension=1)', curve: d3.curveCardinal.tension(1), grpIdx: 1, lineStyle: 2, group: false, active: false,      info: "Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear." },

    { name: 'curveCatmullRom (α=0)', curve: d3.curveCatmullRom.alpha(0), grpIdx: 2, lineStyle: 0, group: true, active: true,            info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0 the parameterisation is uniform.' },
    { name: 'curveCatmullRom (α=0.5)', curve: d3.curveCatmullRom.alpha(0.5), grpIdx: 2, lineStyle: 1, group: false, active: false,      info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0.5 the parameterisation is centripetal and self intersecting loops are avoided.' },
    { name: 'curveCatmullRom (α=1)', curve: d3.curveCatmullRom.alpha(1), grpIdx: 2, lineStyle: 2, group: false, active: false,          info: 'Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=1 the parameterisation is chordal.' },

    { name: 'curveMonotoneX', curve: d3.curveMonotoneX, grpIdx: 3, lineStyle: 0, group: true, active: false,                            info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in y.' },
    { name: 'curveMonotoneY', curve: d3.curveMonotoneY, grpIdx: 3, lineStyle: 1, group: false, active: false,                           info: 'Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in x.' },

    { name: 'curveNatural', curve: d3.curveNatural, grpIdx: 4, lineStyle: 0, group: true, active: false,                                info: 'Interpolates the points with a cubic spline with zero 2nd derivatives at the endpoints.' },

    { name: 'curveStep', curve: d3.curveStep, grpIdx: 5, lineStyle: 0, group: true, active: false,                                      info: 'Interpolates the points with alternating horizontal and vertical linear segments. The vertical segments lie midway between points.' },
    { name: 'curveStepAfter', curve: d3.curveStepAfter, grpIdx: 5, lineStyle: 1, group: false, active: false,                           info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes after the x value.' },
    { name: 'curveStepBefore', curve: d3.curveStepBefore, grpIdx: 5, lineStyle: 2, group: false, active: false,                         info: 'Interpolates the points with alternating horizontal and vertical linear segments. The y value changes before the x value.' },

    { name: 'curveLinear', curve: d3.curveLinear, grpIdx: 6, lineStyle: 0, group: true, active: true,                                   info: 'Interpolates the points using linear segments.' },

    { name: 'curveBasis', curve: d3.curveBasis, grpIdx: 7, lineStyle: 0, group: true, active: false,                                    info: 'Interpolates the start and end points and approximates the inner points using a B-spline.' },
    { name: 'curveBasisClosed', curve: d3.curveBasisClosed, grpIdx: 7, lineStyle: 1, group: false, active: false,                       info: 'Uses a closed B-Spline to approximate the points.' },
];
