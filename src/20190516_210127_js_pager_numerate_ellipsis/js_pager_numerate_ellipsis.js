// Generate page numbers like Amazon does
//
// The algorithm:
// 1) Represent a result as three ranges: first, middle, last
// 2) Merge three ranges into single array, sort then remove duplicates.
// 3) Insert N between two adjacent numbers with values N-1 and N+1.
// 4) Insert ... between two adjacent numbers with difference more than 1.
//
// Inspired by https://gist.github.com/kottenator/9d936eb3e4e3c3e02598

function pager_numerate_ellipsis(active, total)
{
    // 1|2|3
    // 1|...|18|19|20
    // 1|...|5|6|7|...|20
    const c = active - 3;
    const d = active + 4;
    return [1, ...range(c, d), total].reduce(function (ret, no, i, src) {
        if (ret.length && ret[ret.length-1] >= no) {
            return ret;
        }
        if (i && src[i-1] + 1 == no - 1) {
            ret.push(no - 1);
        }
        else if (i && src[i-1] + 1 < no) {
            ret.push('...');
        }
        ret.push(no);
        return ret;
    }, []).map(v => v == active ? `[${v}]` : v);
}

function range(begin, end)
{
    return Array(end - begin).fill(0).map((v,i) => i + begin);
}

// __CODESCREEN_END__
const expected = `
[1] 2 3 4 ... 15
1 [2] 3 4 5 ... 15
1 2 [3] 4 5 6 ... 15
1 2 3 [4] 5 6 7 ... 15
1 2 3 4 [5] 6 7 8 ... 15
1 2 3 4 5 [6] 7 8 ... 15
2 3 4 5 6 [7] 8 9 10 11
3 4 5 6 7 [8] 9 10 11 12
4 5 6 7 8 [9] 10 11 12 13
5 6 7 8 9 [10] 11 12 13 14
6 7 8 9 10 [11] 12 13 14 15
6 7 8 9 10 11 [12] 13 14 15
6 7 8 9 10 11 12 [13] 14 15
6 7 8 9 10 11 12 13 [14] 15
1 ... 12 13 14 [15]
`.trim().split('\n');

for (let i = 0; i < 15; ++i) {
    const str = pager_numerate_ellipsis(i+1, 15, 10).join(' ');
    console.log(str == expected[i], str);
}
