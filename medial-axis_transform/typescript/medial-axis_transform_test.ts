import {manhattanDistances, skeleton} from './medial-axis_transform';

declare function require(name: String): any;
const assert = require('assert');

interface Test {
    input: string;
    manhattanDistances: string;
    skeleton: string;
}

const tests: Test[] = [
    {
        input: `
...........
.XXXXXXXXX.
.XXXXXXXXX.
.XXXXXXXXX.
.XXXXXXXXX.
.XXXXXXXXX.
...........
`,
        manhattanDistances: `
...........
.111111111.
.122222221.
.123333321.
.122222221.
.111111111.
...........
`,
        skeleton: `
...........
.X.......X.
..X.....X..
...XXXXX...
..X.....X..
.X.......X.
...........
`
    },
    {
        input: `
............
......XXXXX.
.....XXXXX..
....XXXXX...
...XXXXX....
..XXXXX.....
.XXXXX......
............
`,
        manhattanDistances: `
............
......11111.
.....12221..
....12321...
...12321....
..12221.....
.11111......
............
` ,
        skeleton: `
............
.........XX.
.......XX...
......X.....
.....X......
...XX.......
.XX.........
............
`
    },
    {
        input: `
............................
............XXXX............
...........XXXXXX...........
..........XX.XXXXX..........
.........XX...XXXXX.........
........XX.....XXXXX........
.......XXXXXXXXXXXXXX.......
......XXXXXXXXXXXXXXXX......
.....XXXXXXXXXXXXXXXXXX.....
....XX.............XXXXX....
...XX...............XXXXX...
..XX.................XXXXX..
.XX...................XXXXX.
............................
`,
        manhattanDistances: `
............................
............1111............
...........112221...........
..........11.12321..........
.........11...12321.........
........11.....12321........
.......12211111233321.......
......1222222222222321......
.....111111111111112321.....
....11.............12321....
...11...............12321...
..11.................12221..
.11...................11111.
............................
`,
        skeleton: `
............................
............................
...........X.XX.............
..........XX...X............
.........XX.....X...........
.................X..........
................XXX.........
.......XXXXXXXXX...X........
.....XX.............X.......
....XX...............X......
...XX.................X.....
..XX...................XX...
.XX......................XX.
............................
`
    },
    {
        input: `
....................
.....XXXXXXXXXXX....
...XXXXX.....XXXXX..
...XXXX......XXXXXX.
....XXXX.....XXXXX..
......XXXX...XXXX...
...XXXXXXX...XXX....
..XXXXXXXX...XX.....
...XXXXX.....X......
....................
`,
        manhattanDistances: `
....................
.....11111111111....
...11221.....12211..
...1221......123221.
....1121.....12321..
......1211...1221...
...1112321...121....
..12222211...11.....
...11111.....1......
....................
`,
        skeleton: `
....................
.......XXXXXXX......
...X.XX.......X.....
....X..........X.XX.
......X........X....
.......X.X....X.....
.......XX.....X.....
..XXXXX..X...X......
.............X......
....................
`
    },
];

const charToPixel = (char: string) => char !== '.';
const lineToPixels = (line: string) => line.split('').map(charToPixel);
const stringToPixels = (str: string) => str.trim().split('\n').map(lineToPixels);

const distanceToChar = (distance: number) => distance === 0 ? '.' : distance.toString();
const distancesToLine = (distances: number[]) => distances.map(distanceToChar).join('');
const distancesToString = (distances: number[][]) => '\n' + distances.map(distancesToLine).join('\n') + '\n';

const pixelToChar = (pixel: boolean) => pixel ? 'X' : '.';
const pixelsToLine = (pixels: boolean[]) => pixels.map(pixelToChar).join('');
const pixelsToString = (pixels: boolean[][]) => '\n' + pixels.map(pixelsToLine).join('\n') + '\n';

function runTest(test: Test) {
    const actualDistances = distancesToString(manhattanDistances(stringToPixels(test.input)));
    if (actualDistances !== test.manhattanDistances) {
        console.log('For input pixels:', test.input);
        console.log('expected chessboard distances to be:', test.manhattanDistances);
        console.log('but were:', actualDistances);
        throw new Error();
    }

    const actualSkeleton = pixelsToString(skeleton(stringToPixels(test.input)));
    if (actualSkeleton !== test.skeleton) {
        console.log('For input pixels:', test.input);
        console.log('expected skeleton to be:', test.skeleton);
        console.log('but was:', actualSkeleton);
        throw new Error();
    }
}

tests.forEach(runTest);
