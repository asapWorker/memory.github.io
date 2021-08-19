function makeActionObj (environment, value) {
    return {environment, value}
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "easy_level":
            return makeActionObj("menu", 0);
        case "middle_level":
            return makeActionObj("menu", 1);
        case "hard_level":
            return makeActionObj("menu", 2);
        case "help":
            return makeActionObj("menu", 3);
        case "help_menu":
            return makeActionObj("help", 0);
        case "help_back":
            return makeActionObj("help", 1);
        case "help_next":
            return makeActionObj("help", 2);
        case "ready":
            return makeActionObj("game", -3);
        case "game_restart":
            return makeActionObj("game", -4);
        case "game_menu":
            return makeActionObj("game", -5);
        case "result_menu":
            return makeActionObj("result", -1);
        case "result_restart":
            return makeActionObj("result", -2);
        case "card":
            return makeActionObj("card", action.number);
        default:
            throw new Error();
    }
}