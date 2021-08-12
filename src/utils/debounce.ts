// If it is a function, return the original value directly
type ObjectKeysPartial<T> = T extends (...args: any[]) => any ? T : Partial<T>

// If the original value of the function is returned, it is not a function. Change the value of each key to optional, but the function returns the original array
type ObjectValuesPartial<T> = T extends (...args: any[]) => any
  ? T
  : {
      [K in keyof T]: ObjectKeysPartial<T[K]>
    }

type FunctionParamsValuePartial<T> = T extends (...args: infer P) => infer R
  ? (...args: ObjectValuesPartial<P>) => R
  : T

export default function debounce<T extends Function>(f: T, timeout = 100) {
    let timer: any;
    let lastArgs: any;
    let lastThis: any;

    type Fn = FunctionParamsValuePartial<T>;

    return function (this: any, ...args: any[]) {
        ////@ts-ignore
        lastThis = this;
        lastArgs = args;
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            timer = null;
            f.apply(lastThis, lastArgs);
        }, timeout);
    };
}

// export default function debounce<T extends Function>(f: T, timeout = 100) {
//     let timer: any;
//     let lastArgs: any;
//     let lastThis: any;

//     return function (this: any, ...args: any[]) {
//         ////@ts-ignore
//         lastThis = this;
//         lastArgs = args;
//         if (timer) {
//             return;
//         }
//         timer = setTimeout(() => {
//             timer = null;
//             f.apply(lastThis, lastArgs);
//         }, timeout);
//     };
// }