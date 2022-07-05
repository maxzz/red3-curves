import { createCss } from "@stitches/react";

export const { styled, css } = createCss({ // as usual this goes to stitches.config.ts
    media: {
        bp1: '(min-width: 640px)',
        bp2: '(min-width: 768px)',
        bp3: '(min-width: 1024px)',
    },
});
