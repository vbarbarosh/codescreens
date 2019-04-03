// Shortcuts for making ranges of numbers

function range(begin, end)
{
    return Array(end - begin).fill(0).map((v,i) => i + begin);
}

function range_step(begin, end, step)
{
    const length = Math.ceil((end - begin)/step);
    return Array(length).fill(0).map((v,i) => i*step + begin);
}

// 1 2 3 4 5 6 7 8 9
console.log(range(1, 10));

// 5 5.5 6 6.5 7 7.5
console.log(range_step(5, 8, 0.5));

// 5 5.1 5.2 5.3 5.4 5.5 5.6 5.7 5.8 5.9 6 6.1 6.2 6.3 6.4 6.5 6.6 6.7 6.8 6.9
console.log(range_step(5, 7, 0.1));
