/**
 * Created by vassdoki on 2017.11.04..
 */
/**
 * Created by vassdoki on 2017.11.04..
 */
import LocalizedStrings from 'react-localization';

// const strings = new LocalizedStrings({
//     hu:{
//         newGame: "Új Játék",
//     },
//     en:{
//         newGame: "New Game",
//     },
// });

let languages = ["hu", "en"];
let translations = {
    doubleOut: ["Dupla kiszálló", "Double out"],
    doubleIn: ["Dupla beszálló", "Double in"],
    newGame: ["Új Játék", "New Game"],
    fixScore: ["Dobás Javítása", "Fix Score"],
    admin: ["Admin", "Admin"],
    stopGame: ["Játék Leállítása", "Stop Game"],
    players: ["Játékosok", "Players"],
    chooseGameType: ["Játék választás", "Choose game type"],
    addPlayer: ["Játékos hozzáadása", "Add player"],
    startGame: ["Játék indítása", "Start game"],
    target: ["Cél", "Target"],
    x01in: ["Beszálló", "In"],
    x01out: ["Kiszálló", "Out"],
    double: ["Dupla", "Double"],
    triple: ["Tripla", "Triple"],
    simple: ["Sima", "Simple"],
    out: ["Kint", "Out"],
    yes: ["Igen", "Yes"],
    no: ["Nem", "No"],
    cutThroat: ["Büntető", "Cut throat"],
    originalThrow: ["Eredeti dobás érték", "Original throw"],
    changedThrow: ["Módosított dobás érték", "Changed throw"],
    cancel: ["Mégse", "Cancel"],
    delete: ["Törlés", "Delete"],
    save: ["Mentés", "Save"],
    bust: ["Sok", "Bust"],
    xxx: ["", ""],
};

let translationKeys = Object.keys(translations);
let param = {};
for(let i in languages) {
    param[languages[i]] = {};
}
for(let t = 0; t < translationKeys.length; t++) {
    for(let i in languages) {
        param[languages[i]][translationKeys[t]] = translations[translationKeys[t]][i];
    }
}

const strings = new LocalizedStrings(param);


export default strings;