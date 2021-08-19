const UP_CODE = 19;
const DOWN_CODE = 20;
const LEFT_CODE = 21;
const RIGHT_CODE = 22;
const OK = 23;


function moveToTop(border, rowLength, setFocus, arr) {
    if (!rowLength) {
        setFocus((prev) => (prev > border) ? prev - 1 : prev);
    } else if (rowLength === 2) {
        moveToLeft(border, setFocus, arr, 3);
    } else {
        const lastPicture = rowLength * rowLength - 1;
        setFocus((prev) => {
            if (prev > lastPicture + 1) {
                return prev - 1;
            } else if (prev === lastPicture + 1) {
                if (arr[lastPicture]) {
                    return lastPicture;
                } else {
                    return searchNearestPosition(prev, arr, lastPicture + 1, -1);
                }
            } else if (prev - rowLength >= border) {
                if (arr[prev - rowLength]) {
                    return prev - rowLength;
                } else return movingInCertainDirection(prev, arr, lastPicture + 1, -2)
            } else {
                return prev;
            }
        })
    }
}

function moveToBottom(border, rowLength, setFocus, arr) {
    if (!rowLength) {
        setFocus((prev) => (prev < border) ? prev + 1 : prev);
    } else if (rowLength === 2) {
        moveToRight(border, setFocus, arr, 3);
    } else {
        const lastPicture = rowLength * rowLength - 1;
        const lastRowStart = lastPicture - rowLength;
        setFocus((prev) => {
            if (prev > lastPicture && prev < border) {
                return prev + 1;
            } else if (prev > lastRowStart && prev <= lastPicture) {
                return lastPicture + 1;
            } else if (prev + rowLength <= border) {
                if (arr[prev + rowLength]) return prev + rowLength;
                else return movingInCertainDirection(prev, arr, lastPicture + 1, 2);
            } else {
                return prev;
            }
        })
    }
}

function moveToLeft(border, setFocus, arr, level) {
    if (!level) {
        setFocus((prev) => (prev > border) ? prev - 1 : prev);
    } else {
        setFocus((prev) => {
            if (prev > border) {
                if (arr[prev - 1]) {
                    return prev - 1;
                } else {
                    const nearestPosition = searchNearestPosition(prev, arr, level, -1);
                    return nearestPosition;
                }
            } else return prev;
        });
    }
}

function moveToRight(border, setFocus, arr, level) {
    if (!level) {
        setFocus((prev) => (prev < border) ? prev + 1 : prev);
    } else {
        setFocus((prev) => {
            if (prev < border) {
                if (arr[prev + 1]) {
                    return prev + 1;
                } else {
                    const nearestPosition = searchNearestPosition(prev, arr, level, 1);
                    return nearestPosition;
                }
            } else return prev;
        });
    }
}

function movingInCertainDirection(ind, arr, level, priority) {
    if (priority === 1) {
        for (let i = ind + 1; i <= level; i++) {
            if (arr[i]) {
                return i;
            }
        }
    } else if (priority === -1) {
        for (let i = ind - 1; i >= 0; i--) {
            if (arr[i]) {
                return i;
            }
        }
    } else if (priority === 2) {
        const step = Math.sqrt(level);
        for (let i = ind + step; i < level; i += step) {
            if (arr[i]) {
                return i;
            }
        }
        return level;
    } else {
        const step = Math.sqrt(level);
        for (let i = ind - step; i >= 0; i -= step) {
            if (arr[i]) {
                return i;
            }
        }
        return ind;
    }
    return -1;
}

function searchNearestPosition(ind, arr, level, priority) {
    let searchingResult = movingInCertainDirection(ind, arr, level, priority);
    if (searchingResult !== -1) {
        return searchingResult;
    } else if (level === 3) {
        return ind;
    } else {
        searchingResult = movingInCertainDirection(ind, arr, level, -priority);
        return searchingResult;
    }
}

export function wrapMoveByRemoteController(elementsCount, rowCount, setFocus, arr) {
    return function(event) {
        switch (event.keyCode) {
            case UP_CODE:
                if (rowCount === 2) {
                    moveToTop(0, 2, setFocus, arr);
                } else {
                    moveToTop(0, rowCount, setFocus, arr);
                }
                break;
            case DOWN_CODE:
                if (rowCount === 2) {
                    moveToBottom(elementsCount - 1, 2, setFocus, arr);
                } else {
                    moveToBottom(elementsCount - 1, rowCount, setFocus, arr);
                }
                break;
            case RIGHT_CODE:
                if (rowCount === 2) {
                    moveToRight(elementsCount - 1, setFocus, arr, 3);
                } else {
                    moveToRight(elementsCount - 1, setFocus, arr, rowCount * rowCount);
                }
                break;
            case LEFT_CODE:
                if (rowCount === 2) {
                    moveToLeft(0, setFocus, arr, 3);
                } else {
                    moveToLeft(0, setFocus, arr, rowCount * rowCount);
                }
                break;
            default:
                break;
        }
    }
}

export function setFocus(focusPosition, refs, rowCount) {
    if (focusPosition === -1) return;
    if (rowCount === 0 || focusPosition >= rowCount * rowCount) {
        refs.current[focusPosition].current.focus();
    } else {
        refs.current[focusPosition].current.querySelector(".picture-btn").focus();
    }
}


export function chooseElementOnFocusPosition() {
    return function(event) {
        if (event.keyCode === OK) {
            document.activeElement.click();
        }
    }
}

export function setSpecialStatusForChosen(focusPosition, level, arr) {
    return function() {
        if (level && (focusPosition < level)) {
            arr[focusPosition] = false;
        }
    }
}


