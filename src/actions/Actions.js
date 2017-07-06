export function insertScore(num, mod) {
    return {
            type: 'INSERT_SCORE',
            num: Number(num),
            mod: Number(mod)
        };
}
export function startGame(config) {
    return {
            type: 'START_GAME',
            config: config
        };
}
