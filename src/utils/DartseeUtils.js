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

const finish2 = {
    "100":"T20 D20",
    "98":"T20 D190",
    "97":"T19 D20",
    "96":"T20 D18",
    "95":"T19 D19",
    "94":"T18 D20",
    "93":"T19 D18",
    "92":"T20 D16",
    "91":"T17 D20",
    "90":"T20 D15",
    "89":"T19 D16",
    "88":"T19 D20",
    "87":"T17 D18",
    "86":"T18 D16",
    "85":"T15 D20",
    "84":"T20 D12",
    "83":"T17 D16",
    "82":"T14 D20",
    "81":"T19 D20",
    "80":"T20 D10",
    "79":"T13 D20",
    "78":"T18 D12",
    "77":"T19 D10",
    "76":"T20 D8",
    "75":"T17 D12",
    "74":"T14 D16",
    "73":"T19 D8",
    "72":"T16 D12",
    "71":"T13 D16",
    "70":"T10 D20",
    "69":"T15 D12",
    "68":"T20 D4",
    "67":"T17 D8",
    "66":"T10 D18",
    "65":"T19 D4",
    "64":"T16 D8",
    "63":"T13 D12",
    "62":"T10 D16",
    "61":"T15 D16",
    "60":"20 D20"
};
const finish3 = {
    "2":"D1",
    "3":"1 D1",
    "4":"D2",
    "5":"3 D1",
    "6":"D3",
    "7":"5 D1",
    "8":"D4",
    "9":"5 D2",
    "10":"D5",
    "11":"3 D4",
    "12":"D6",
    "13":"3 D5",
    "14":"D7",
    "15":"3 D6",
    "16":"D8",
    "17":"3 D7",
    "18":"D9",
    "19":"3 D8",
    "20":"D10",
    "21":"1 D10",
    "22":"D11",
    "23":"5 D9",
    "24":"D12",
    "25":"3 D11",
    "26":"D13",
    "27":"3 D12",
    "28":"D14",
    "29":"1 D14",
    "30":"D15",
    "31":"3 D14",
    "32":"D16",
    "33":"3 D15",
    "34":"D17",
    "35":"7 D14",
    "36":"D18",
    "37":"5 D16",
    "38":"D19",
    "39":"1 D19",
    "40":"D20",
    "41":"3 D19",
    "42":"4 D19",
    "43":"5 D19",
    "44":"6 D19",
    "45":"7 D19",
    "46":"8 D19",
    "47":"9 D19",
    "48":"10 D19",
    "49":"11 D19",
    "50":"12 D19",
    "51":"13 D19",
    "52":"12 D20",
    "53":"15 D19",
    "54":"14 D20",
    "55":"15 D20",
    "56":"16 D20",
    "57":"17 D20",
    "58":"18 D20",
    "59":"19 D20",
    "60":"20 D20",
    "61":"3 20 D19",
    "62":"16 8 D19",
    "63":"14 9 D20",
    "64":"9 15 D20",
    "65":"7 18 D20",
    "66":"6 20 D20",
    "67":"13 16 D19",
    "68":"11 19 D19",
    "69":"10 19 D20",
    "70":"10 20 D20",
    "71":"14 19 D19",
    "72":"18 16 D19",
    "73":"17 18 D19",
    "74":"16 18 D20",
    "75":"15 20 D20",
    "76":"20 16 D20",
    "77":"17 20 D20",
    "78":"18 20 D20",
    "79":"19 20 D20",
    "80":"20 20 D20",
    "81":"D19 3 D20",
    "82":"D19 4 D20",
    "83":"5 D20 D19",
    "84":"6 D20 D19",
    "85":"7 D19 D20",
    "86":"D20 8 D19",
    "87":"9 D19 D20",
    "88":"D20 10 D19",
    "89":"11 D19 D20",
    "90":"12 D19 D20",
    "91":"13 D19 D20",
    "92":"D19 14 D20",
    "93":"15 D19 D20",
    "94":"16 D20 D19",
    "95":"17 D20 D19",
    "96":"D20 18 D19",
    "97":"19 D20 D19",
    "98":"D20 20 D19",
    "99":"19 D20 D20",
    "100":"20 D20 D20",
    "101":"6 T19 D19",
    "102":"D20 D12 D19",
    "103":"5 T20 D19",
    "104":"9 T19 D19",
    "105":"T20 5 D20",
    "106":"D14 D19 D20",
    "107":"T19 12 D19",
    "108":"D19 D20 D15",
    "109":"T20 9 D20",
    "110":"T19 13 D20",
    "111":"16 T19 D19",
    "112":"D19 D20 D17",
    "113":"T19 18 D19",
    "114":"T19 19 D19",
    "115":"T19 18 D20",
    "116":"16 T20 D20",
    "117":"19 T20 D19",
    "118":"18 T20 D20",
    "119":"19 T20 D20",
    "120":"T20 20 D20",
    "121":"T19 D19 D13",
    "122":"D20 T20 D11",
    "123":"T19 D19 D14",
    "124":"D20 T20 D12",
    "125":"D15 T19 D19",
    "126":"T20 D19 D14",
    "127":"D15 T19 D20",
    "128":"D15 T20 D19",
    "129":"D17 T19 D19",
    "130":"T20 D15 D20",
    "131":"T19 D17 D20",
    "132":"T20 D17 D19",
    "133":"D18 T19 D20",
    "134":"D18 T20 D19",
    "135":"T19 D20 D19",
    "136":"D18 T20 D20",
    "137":"T19 D20 D20",
    "138":"T20 D19 D20",
    "139":"T19 T14 D20",
    "140":"T20 D20 D20",
    "141":"T19 T20 D12",
    "142":"T20 T14 D20",
    "143":"T15 T20 D19",
    "144":"T20 T18 D15",
    "145":"T15 T20 D20",
    "146":"T16 T20 D19",
    "147":"T20 T19 D15",
    "148":"T20 T16 D20",
    "149":"T20 T19 D16",
    "150":"T20 T18 D18",
    "151":"T20 T19 D17",
    "152":"T20 T18 D19",
    "153":"T20 T19 D18",
    "154":"T20 T18 D20",
    "155":"T20 T19 D19",
    "156":"T20 T20 D18",
    "157":"T20 T19 D20",
    "158":"T20 T20 D19",
    "159":"-",
    "160":"T20 T20 D20",
    "161":"T20 T17 Bull",
    "162":"-",
    "163":"-",
    "164":"T20 T18 Bull",
    "165":"-",
    "166":"-",
    "167":"T20 T19 Bull",
    "168":"-",
    "169":"-",
    "170":"T20 T20 Bull"};
export function getFinish3(score) {
    if (finish3.hasOwnProperty(score)) {
        return finish3[score];
    } else {
        return "";
    }
}
export function getFinish2(score) {
    if (finish2.hasOwnProperty(score)) {
        return finish2[score];
    } else {
        return getFinish1(score);
    }
}

export function getFinish1(score) {
    let finish = "";
    if (score === 50) {
        finish = "BU";
    } else {
        if (score % 2 === 0 && score <= 40) {
            finish = "D" + (score / 2)
        } else {
            finish = "";
        }
    }
    return finish;
}
