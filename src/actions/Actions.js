import axios from "axios";
import {createStat} from "../utils/DartseeUtils";

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
export function winGame(player, game, boardId) {
    // var newGameState = {...state}
    const cp = player
    const stat = createStat(cp)
    return (dispatch) =>
        dispatch({
            type: "WIN_GAME",
            payload: axios.post("/command/winGame/" + boardId, {
                    winner: cp.id,
                    round_count: cp.rounds.length,
                    throw_count: stat.throwCount,
                    throw_average: (stat.sum / stat.throwCount),
                    throw_sum: stat.sum,
                    round3sum: stat.round3sum,
                    details: JSON.stringify(game)
            }).then((response) => {
                return response;
            })
        });
}
