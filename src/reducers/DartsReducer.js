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

export default function reducer(state={
    // ez a defaut state
    game: {
        name: "Not started yet"
    },
    players: []
}, action) {

    switch (action.type) {
        case "INSERT_SCORE": {
            var ns = {...state};
            var num = action.num;
            var mod = action.mod;

            var switchToNextPlayer = false; // switch to next player if this is the third throw
            var roundValid = true;

            // store the new throw
            var currentPlayer = ns.players[ns.game.currentPlayerCount];
            if (currentPlayer.rounds.length == 0) {
                currentPlayer.rounds.push({count:1, valid: roundValid, throws:[]});
            }
            var currentRound = currentPlayer.rounds[currentPlayer.rounds.length - 1];

            var currentThrow = num * mod;
            if (currentPlayer.score - currentThrow < 0) {
                roundValid = false;
            }
            if (currentPlayer.score - currentThrow == 0 && ns.game.doubleOut && mod != 2) {
                roundValid = false;
            }
            if (roundValid == false) {
                // subtract the whole round
                var roundScore = 0;
                currentRound.throws.map(t => {roundScore += t.num * t.mod});
                currentPlayer.score += roundScore;
            } else {
                // add the score
                currentPlayer.score -= currentThrow;
            }

            if (currentRound.throws.length == 3) {
                currentPlayer.rounds.push({
                    count: currentRound.count + 1,
                    valid: roundValid,
                    throws: [{num:num, mod: mod}]
                });
            } else {
                if (currentRound.throws.length == 2) {
                    switchToNextPlayer = true;
                }
                currentRound.valid = roundValid;
                currentRound.throws.push({num:num, mod: mod});
            }

            if (switchToNextPlayer) {
                ns.game.currentPlayerCount = (ns.game.currentPlayerCount + 1) % ns.players.length;
            }

            return ns;
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
            var players = [];
            config.game.players.map(player => {
                var p = {
                    id: player.id,
                    name: player.name,
                    score: ns.game.startScore,
                    rounds: []
                };
                var rounds = p.rounds;
                var score = p.score;
                var roundCount = 0;
                var throwCount = 0;
                player.rounds.map(r => {
                    roundCount++;
                    var round = {
                        id: r.id,
                        count: roundCount,
                        throws: [],
                    };
                    rounds.push(round);
                    var throws = round.throws;
                    r.throws.map(t => {
                        throwCount++;
                        score = score - (t.score * t.modifier);
                        throws.push({
                            num: t.score,
                            mod: t.modifier
                        });
                    });
                });

                players.push(p);
            });
            ns["players"] = players;
            return ns;
        }
        default: {
            return {
                ...state
            }
        }
    }
}

