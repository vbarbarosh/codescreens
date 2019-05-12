// Generate page numbers like Google does

function pager_numerate_google(active, total, display)
{
    const begin = Math.max(1, active - Math.floor(display/2));
    const length = Math.min(total, display);
    const x = Math.min(0, total + 1 - begin - length);
    return Array(length).fill(0).map((v,i) => begin + i + x)
        .map(v => v == active ? `[${v}]` : v);
}

const expected = `
[1] 2 3 4 5 6 7 8 9 10
1 [2] 3 4 5 6 7 8 9 10
1 2 [3] 4 5 6 7 8 9 10
1 2 3 [4] 5 6 7 8 9 10
1 2 3 4 [5] 6 7 8 9 10
1 2 3 4 5 [6] 7 8 9 10
2 3 4 5 6 [7] 8 9 10 11
3 4 5 6 7 [8] 9 10 11 12
4 5 6 7 8 [9] 10 11 12 13
5 6 7 8 9 [10] 11 12 13 14
6 7 8 9 10 [11] 12 13 14 15
6 7 8 9 10 11 [12] 13 14 15
6 7 8 9 10 11 12 [13] 14 15
6 7 8 9 10 11 12 13 [14] 15
6 7 8 9 10 11 12 13 14 [15]
`.trim().split('\n');

for (let i = 0; i < 15; ++i) {
    const str = pager_numerate_google(i+1, 15, 10).join(' ');
    console.log(str == expected[i], str);
}
