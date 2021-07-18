const START = 1;
const END = 25;
const MIN_COUNT = 3;
const MAX_COUNT = 6;

function random(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

export function randomListOfNum(size) {
    let result = new Array(size).fill(0);
    const sameNum = random(START, END + 1);
    let sameCount = random(MIN_COUNT, MAX_COUNT + 1);
    while (sameCount > 0) {
        let ind = random(0, size);
        if (result[ind] === 0) {
            result[ind] = sameNum;
            sameCount--;
        }
    }
    let i = 0;
    while (i < size) {
        if (result[i] !== 0) {
            i++;
            continue;
        }
        const value = random(START, END + 1);
        if (!result.includes(value)) {
            result[i] = value;
            i++;
        }
    }
    return result;
}