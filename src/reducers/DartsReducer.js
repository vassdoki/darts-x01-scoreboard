/*
Store data format:

{
   game: {
      name: "501",
      startScore: 301,
      doubleOut: true/false,
      doubleIn: true/false,
      currentPlayerCount: 0-x,
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
        name: "Not started yet"
    },
    players: []
}, action) {

    switch (action.type) {
        case "INSERT_SCORE": {
            return insertThrow({...state}, action.num, action.mod, action.id);
        }
        case "EDIT_SCORE": {
            return editThrow({...state}, action.num, action.mod, action.id);
        }
        case "START_GAME": {
            var config = action.config;
            var ns = {};
            ns["game"] = {
                name: config.game.name,
                startScore: 301,
                doubleIn: false,
                doubleOut: true,
                currentPlayerCount: 0
            };
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
                        mapObject(throws, (key, t) => insertThrow(ns, t.score, t.modifier, t.id));
                    }
                }
            }
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
function reCount(p, ns) {
    var score = ns.game.startScore;
    p.rounds.forEach(r => {
        var roundSum = r.throws.reduce((a, t) => a += t.num * t.mod, 0)
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
function insertThrow(ns, num, mod, id) {
    var switchToNextPlayer = false; // switch to next player if this is the third throw
    var roundValid = true;

    // store the new throw
    var currentPlayer = ns.players[ns.game.currentPlayerCount];
    if (currentPlayer.rounds.length === 0) {
        currentPlayer.rounds.push({count:1, valid: roundValid, throws:[]});
    }
    var currentRound = currentPlayer.rounds[currentPlayer.rounds.length - 1];

    var currentThrow = num * mod;
    if (currentPlayer.score - currentThrow < 0) {
        roundValid = false;
    }
    if (currentPlayer.score - currentThrow === 0 && ns.game.doubleOut && mod !== 2) {
        roundValid = false;
    }
    if (roundValid === false) {
        // subtract the whole round
        // var roundScore = 0;
        // currentRound.throws.map(t => {roundScore += t.num * t.mod});
        var roundScore = currentRound.throws.reduce((a, t) => a + (t.num * t.mod), 0);
        currentPlayer.score += roundScore;
    } else {
        // add the score
        currentPlayer.score -= currentThrow;
    }

    if (currentRound.throws.length === 3) {
        currentPlayer.rounds.push({
            count: currentRound.count + 1,
            valid: roundValid,
            throws: [{num:num, mod: mod, id: id}]
        });
    } else {
        if (currentRound.throws.length === 2) {
            switchToNextPlayer = true;
        }
        currentRound.valid = roundValid;
        currentRound.throws.push({num:num, mod: mod, id: id});
    }

    if (switchToNextPlayer) {
        ns.game.currentPlayerCount = (ns.game.currentPlayerCount + 1) % ns.players.length;
    }

    return ns;
}