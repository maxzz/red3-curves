#### About

D3 curves playground.

![](src/assets/previews/2021-08-17_2-18-03.png)

#### Road map

    [ ] Editor
        [x] Allow drag points
        [ ] Add / delete points
        [ ] Deduce drag events
        [x] Add point numbers
        [x] Add information about the current curve
            [ ] Delay changing tooltips between lines
        [ ] Add information about point locations
        [ ] Store / retrieve state in localStorage
        [x] Select / deselect all checkeboxes at once
        [ ] TODO: Why SVG does not smooth on path control points?
        [ ] TODO: Find how to set fill on embedded SVG.
        [ ] BUG: In Chrome DevTools with dimentions responsive pointer events move points to negative coordinates.
        [ ] TODO: When loading points, make sure the coordinates are inside SVG boundary.
        [ ] Controls poins
            [x] Add buttons +/- to modify number of points
            [x] Add disabled state for +/- buttons
            [x] Position buttons menu over SVG extra menu
            [ ] Add italic font for inactive buttons
            [ ] Define stroke and shadow colors
        [ ] TODO: Why jotai does not provide prev value access in update atom function?

#### Links, references, credits

[D3 - Data-Driven Documents](https://github.com/d3/d3/wiki)
