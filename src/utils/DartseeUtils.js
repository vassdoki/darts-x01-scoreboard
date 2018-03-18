export function modifier2class(modifier) {
    var className = ""
    switch(modifier) {
        case 0: className += "out"; break;
        case 1: className += "default"; break;
        case 2: className += "success"; break;
        case 3: className += "danger"; break;
        default: break;
    }
    return className
}
export function modifier2char(modifier) {
    var res = ""
    switch(modifier) {
        case 0: res = ""; break;
        case 1: res = ""; break;
        case 2: res = "d"; break;
        case 3: res = "t"; break;
        default: break;
    }
    return res
}
export function modifier2board(modifier) {
    let res = "";
    switch(modifier) {
        case 0: res = "O"; break;
        case 1: res = "S"; break;
        case 2: res = "D"; break;
        case 3: res = "T"; break;
        default: break;
    }
    return res
}

export function parseQueryString(url) {
    let urlParams = {};
    url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
            urlParams[$1] = $3;
        }
    );

    return urlParams;
}

export const mapObject = (object, callback) => {
    return Object.keys(object).map( key => callback(key, object[key]) )
};

export function createStat(p) {
    let throwCount = 0;
    let sum = 0;
    let round = 0;
    let round3sum = 0;
    p.rounds.forEach(r => {
        if (r.valid) {
            sum += r.throws.reduce((a, t) => a += t.num * t.mod, 0);
            throwCount += r.throws.length;
            if (round < 3) {
                round3sum += r.throws.reduce((a, t) => a += t.num * t.mod, 0);
            }
        }
        round++;
    });
    return {throwCount: throwCount, sum:sum, round3sum: round3sum}
}
