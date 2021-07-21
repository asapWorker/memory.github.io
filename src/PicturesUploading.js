const START = 1;
const END = 25;

function random(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

function randomSameCount(size) {
    if (size <= 9) {
        return random(3, 6);
    } else if (size <= 16) {
        return  random(4, 7);
    } else {
        return random(6, 9);
    }
}

export function randomListOfNum(size) {
    const result = new Array(size).fill(0);
    const answer = new Array(size).fill("wrong");
    const sameNum = random(START, END + 1);
    let sameCount = randomSameCount(size);
    const resultCount = size - sameCount;
    while (sameCount > 0) {
        let ind = random(0, size);
        if (result[ind] === 0) {
            result[ind] = sameNum;
            answer[ind] = "right";
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
    return [result, answer, resultCount];
}