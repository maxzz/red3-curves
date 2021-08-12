export default function debounce<T extends Function>(f: T, timeout = 100) {
    let timer: any;
    let lastArgs: any;
    let lastThis: any;

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