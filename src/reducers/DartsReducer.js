/*
Store data format:

{
   game: {
      name: "501",
      startScore: 301,
      doubleOut: true/false,
      doubleIn: true/false,
      currentPlayer: 0-x,
      throwCount: 0-x, // number of all throws
      editedCount: 0-x, // number of edited throws
   },
   players: [
       {
           id: "uuid",
           name: "Player name",  // player name
           score: x,             // x to go
           rounds: [
              {// one round containing the throws
               id: "uuid",        // round uuid
               count: 1 - x,      // count of the round
               valid: true/false  // false if the the round was cleared because it was too much
               throws: [
                   { // one throw
                       id: "uuid",
                       num: 0 - 25,      // throw
                       modifier: -1 - 3, // modifier
                   },...
               ],...
             }
           ]
       },...
   ]
}
 */

const mapObject = (object, callback) => {
    return Object.keys(object).map( key => callback(key, object[key]) )
};

export default function reducer(state={
    // ez a defaut state
    game: {
        name: "Not started yet",
        editedCount: 0,
        winner: ""
    },
    players: []
}, action) {

    switch (action.type) {
        case "WIN_GAME": {
            const cp = action.player
            const stat = createStat(cp)
            fetch("http://localhost:9000/command/win?winner=" + cp.name + "&round_count=" + cp.rounds.length + "&throw_count=" + stat.throwCount + "&throw_average=" + (stat.sum / stat.throwCount) + "&throw_sum=" + stat.sum)
            var newGameState = state
            newGameState.game.winner = cp.name
            return newGameState
        }
        case "INSERT_SCORE": {
            return insertThrow({...state}, action.num, action.mod, action.id);
        }
        case "EDIT_SCORE": {
            return editThrow({...state}, action.num, action.mod, action.id);
        }
        case "NEXT_PLAYER": {
            var nextState = {...state}

            var currRound = nextState.players[nextState.game.currentPlayer].rounds
            currRound.push({
                count: currRound.count + 1,
                valid: true,
                throws: []
            });

            nextState.game.currentPlayer = (nextState.game.currentPlayer + 1) % nextState.players.length;
            return nextState
        }
        case "START_GAME": {
            var config = action.config;
            var ns = {};
            ns["game"] = parseConfig(config.game);
            ns["game"].winner = ""
            ns["game"].editedCount = 0
            ns["players"] = mapObject(config.game.players, (playerId, player) => {
                return {
                    id: player.id,
                    name: player.name,
                    score: ns.game.startScore,
                    rounds: []
                }
            });

            for(var i = 0; i < Object.keys(config.game.players["0"].rounds).length; i++) {
                for(var j = 0; j < Object.keys(config.game.players).length; j++) {
                    if (Object.keys(config.game.players["" + j].rounds).length > i && Object.keys(config.game.players["" + j].rounds["" + i].throws).length > 0) {
                        var throws = config.game.players["" + j].rounds["" + i].throws;
                        mapObject(throws, (key, t) => insertThrow(ns, t.score, t.modifier, t.id, t.editedCount));
                    }
                }
            }
            ns["game"].currentPlayer = config.game.currentPlayer
            return ns;
        }
        default: {
            return {
                ...state
            }
        }
    }
}

function editThrow(ns, num, mod, id) {
    ns.game.editedCount++;
    ns.players.forEach(p => {
        p.rounds.forEach(r => {
            r.throws.forEach(t => {
                if (t.id === id) {
                    console.log(t);
                    t.num = num;
                    t.mod = mod;
                    reCount(p, ns);
                }
            })
        })
    });
    return ns;
}
function createStat(p) {
    var throwCount = 0
    var sum = 0
    p.rounds.forEach(r => {
        if (r.valid) {
            sum += r.throws.reduce((a, t) => a += t.num * t.mod, 0);
            console.log("throwCount: " + throwCount + " length:" + r.throws.length)
            throwCount += r.throws.length
        }
    });
    return {throwCount: throwCount, sum:sum}
}
function reCount(p, ns) {
    var score = ns.game.startScore;
    p.rounds.forEach(r => {
        var roundSum = r.throws.reduce((a, t) => a += t.num * t.mod, 0);
        if (score - roundSum < 0) {
            r.valid = false;
        } else if (score - roundSum === 0 && ns.game.doubleOut && r.throws[r.throws.length-1].mod !== 2) {
            r.valid = false;
        } else {
            score -= roundSum;
            r.valid = true;
        }
    });
    p.score = score;
}
function insertThrow(ns, num, mod, id, editedCount) {
    ns.game.throwCount++;
    var switchToNextPlayer = false; // switch to next player if this is the third throw
    var roundValid = true;

    if (editedCount > 0) {
        ns.game.editedCount++;
    }

    // store the new throw
    var currentPlayer = ns.players[ns.game.currentPlayer];
    if (currentPlayer.rounds.length === 0) {
        currentPlayer.rounds.push({count:1, valid: roundValid, throws:[]});
    }
    var currentRound = currentPlayer.rounds[currentPlayer.rounds.length - 1];

    if (mod !== -1) {
        var currentThrow = num * mod;
        if (currentRound.valid) {
            if (currentPlayer.score - currentThrow < 0) {
                roundValid = false;
            }
            if (currentPlayer.score - currentThrow < 2 && ns.game.doubleOut && mod !== 2) {
                roundValid = false;
            }
            if (roundValid === false) {
                if (currentRound.valid) {
                    var roundScore = currentRound.throws.reduce((a, t) => a + (t.num * t.mod), 0);
                    currentPlayer.score += roundScore;
                }
            } else {
                // add the score
                currentPlayer.score -= currentThrow;
            }
        } else {
            roundValid = false;
        }
        currentRound.valid = roundValid;
        currentRound.throws.push({num:num, mod: mod, id: id});
    }

    if (currentRound.throws.length === 3 || mod === -1) { //  || mod === -1
        switchToNextPlayer = true;
        currentPlayer.rounds.push({
            count: currentRound.count + 1,
            valid: true,
            throws: []
        });
    }

    if (switchToNextPlayer) {
        ns.game.currentPlayer = (ns.game.currentPlayer + 1) % ns.players.length;
    }

    return ns;
}

function parseConfig(c) {
    var res = {
        name: "",
        startScore: 0,
        doubleIn: false,
        doubleOut: false,
        currentPlayer: 0,
        throwCount: 0,
        editedCount: 0
    };
    if (c.subtype.includes("701")) {
        res.name="701";
        res.startScore=701;
    }
    if (c.subtype.includes("501")) {
        res.name="501";
        res.startScore=501;
    }
    if (c.subtype.includes("301")) {
        res.name="301";
        res.startScore=301;
    }
    if (c.subtype.includes("doubleOut")) {
        res.doubleOut=true;
        res.name += " Double-Out"
    } else {
        res.doubleOut=false;
    }
    if (c.subtype.includes("doubleIn")) {
        res.doubleIn=true;
        res.name += " Double-In"
    } else {
        res.doubleIn=false;
    }
    return res;
}