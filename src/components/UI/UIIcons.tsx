import React, { HTMLAttributes, SVGProps, } from "react";

export function IconDarkLight({ dark, title, ...rest }: { dark: boolean; } & SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (dark
        ?
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        :
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

export function IconInfo({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

export function IconCode({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" viewBox="0 0 256 256" {...rest}>
            {title && <title>{title}</title>}
            <path d="M69.1 94.1 28.5 128l40.6 33.9a7.9 7.9 0 0 1 1.1 11.2A8.1 8.1 0 0 1 64 176a7.7 7.7 0 0 1-5.1-1.9l-48-40a7.9 7.9 0 0 1 0-12.2l48-40a8 8 0 1 1 10.2 12.2Zm176 27.8-48-40a8 8 0 0 0-10.2 12.2l40.6 33.9-40.6 33.9A8 8 0 0 0 192 176a7.7 7.7 0 0 0 5.1-1.9l48-40a7.9 7.9 0 0 0 0-12.2Zm-82.4-89.4a7.9 7.9 0 0 0-10.2 4.8l-64 176a7.9 7.9 0 0 0 4.8 10.2 8.6 8.6 0 0 0 2.7.5 7.9 7.9 0 0 0 7.5-5.3l64-176a7.9 7.9 0 0 0-4.8-10.2Z" />
        </svg>
    );
}

export function IconCopy({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"  {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
    );
}

export function InfoAppLogo({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="-100 -100 200 200" {...rest}>
            {title && <title>{title}</title>}
            <path d="M2.4-16c1.2.3 2.7-4 4.4-6 2-2.2 4-3.5 7-6.6C20-35.1 40-61 41-60.2c1.2.9-27.6 40.7-25.2 43.2 1.5 1.5 10.2-6.2 16.6-8.8 7.9-3.3 26.8-10.2 27.4-8.7 1 1.7-29.8 20.5-38 26C17.8-6 12.7-4.3 13-3c1 3 49-7.3 60.4-2.5 5.9 2.5 11.7 9 10.7 11.8-1.4 4-30.2 1.2-32.2 5.5-1.2 2.8 8.1 9.6 7 11.3-2 2.6-30.5-11-33.4-8.4-1.2 1.1-.3 3.5.9 6.3 3.3 8 31.5 32.4 30.5 40.3-.5 4-5.8 8.1-9.8 7.8C40 68.6 26 47.4 18.7 38.7c-5-6-8.7-10.6-11.7-16C4.4 18.2 2.7 8.7 1.3 8.9c-3 .6-.7 72.9-1.3 72.9-.6 0 1.2-66-2.3-66.6-2-.4-5.3 18.1-9.2 22.2-2.5 2.6-5 1.6-8.4 4-6.7 4.7-24.4 28.3-26.6 26.9-2-1.3 4.6-19.5 10.1-29 6.6-11.3 30-31.3 28.8-33.1-.6-.8-3.8 1.3-7.5 2.6C-26 12.5-73.3 35-78 30.6c-2-2.1.5-9.9 4.4-13.8 7.2-7.2 47-11.1 46.7-14.8-.2-3.2-36.1-5.3-36-6.7 0-1.4 34 1.6 35.3-1.6.7-1.6-6.2-4.8-6.8-7.2-.4-1.8.4-4 1.6-5.4 1.2-1.4 5.2-.8 5.6-2.7 1.3-4.7-25.6-28-23.8-33.3.9-2.8 7.2-3.4 11-3.6 4.2-.1 9.1.4 13.4 3.4 6.5 4.6 14.9 28 18 27.4 2-.3 1.5-7.3 2.4-12.7 1.7-9.9 4.7-41.3 6.1-41.3C1.8-81.6-1-17 2.4-16" />
        </svg>
    );
}

/*
export function UISymbolsDefs() {
    return (
        <svg
            id="svgfont"
            style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
        >
            <defs>

                <symbol id="icon-ch" viewBox="0 0 24 24">
                    <defs>
                        <clipPath id="cr-a">
                            <circle cx="12" cy="11.99" r="11.2" fill="none" />
                        </clipPath>
                    </defs>
                    <path d="M7.59 14.54 12 6.9h10a11.21 11.21 0 0 0-19.41-1v8.6Z" fill="#db4437" />
                    <path d="M16.41 14.54H7.59l-5-8.6a11.22 11.22 0 0 0 8.9 17.25l4.94-4.94Z" fill="#0f9d58" />
                    <path d="m12 6.9 4.41 7.64-4.94 8.65H12A11.21 11.21 0 0 0 22 6.9Z" fill="#ffcd40" />
                    <g clipPath="url(#cr-a)">
                        <circle cx="12" cy="11.99" r="5.09" fill="#f1f1f1" />
                        <circle cx="12" cy="11.99" r="4.07" fill="#4285f4" />
                    </g>
                </symbol>

            </defs>
        </svg>
    );
}

export function IconLogoCr(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-ch" />
        </svg>
    );
}
*/
