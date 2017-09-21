export function insertScore(num, mod, id, cp, round) {
    return {
            type: 'INSERT_SCORE',
            num: Number(num),
            mod: Number(mod),
            id: id,
            currentPlayer: cp,
            round: round
        };
}
export function startGame(config) {
    return {
            type: 'START_GAME',
            config: config
        };
}
export function winGame(player) {
    return {
        type: 'WIN_GAME',
        player: player
    };
}
