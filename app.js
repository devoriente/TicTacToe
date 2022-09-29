// récupérer les éléments du DOM
let cases = [...document.querySelectorAll('.case')]; // récupère le tableau
console.log(cases);
let joueur = document.querySelector('#joueur'); // récupère quel joueur joue
console.log(joueur);
let score1 = document.querySelector('#score1'); // récupère le score n°1
console.log(score1);
let score2 = document.querySelector('#score2'); // récupère le score n°2
console.log(score2);
let scoreNul = document.querySelector('#scoreNul'); // récupère le score si nul
console.log(scoreNul);


let state = {
    joueurEnCours: 1,
    scoreJ1: 0,
    scoreJ2: 0,
    matchNuls: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0
};

const resetState = () => {
    joueurEnCours = 1;
    state.c1 = 0;
    state.c2 = 0;
    state.c3 = 0;
    state.c4 = 0;
    state.c5 = 0;
    state.c6 = 0;
    state.c7 = 0;
    state.c8 = 0;
    state.c9 = 0;
}

const verifierVictoire = () => {
    if(
        (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
        (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
        (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
        (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
        (state.c3 == state.c5 && state.c5 == state.c7 && state.c3 > 0) ||
        (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
        (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
        (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0) 
    ) {
        return true;
    } else if (
        state.c1 !== 0 && 
        state.c2 !== 0 && 
        state.c3 !== 0 && 
        state.c4 !== 0 && 
        state.c5 !== 0 && 
        state.c6 !== 0 && 
        state.c7 !== 0 && 
        state.c8 !== 0 && 
        state.c9 !== 0
    ) {
        return null;
    } else {
        return false;
    }
};

const joueurCase = (event) => {
    let idCase = event.target.id;
    if (state[idCase] !== 0) return;

    state[idCase] = state.joueurEnCours;

    let isVictoire = verifierVictoire();

    if (isVictoire === true) {
        alert("Le gagnant est le joueur" + state.joueurEnCours);
        if (state.joueurEnCours == 1) {
            state.scoreJ1++;
            score1.textContent = state.scoreJ1;
        } else {
            state.scoreJ2++;
            score2.textContent = state.scoreJ2;
        }
        resetState();
        cases.forEach((c) => (c.textContent = ""));
    } else if (isVictoire === null) {
        alert("Match null");
        state.matchNuls++;
        scoreNul.textContent = state.matchNuls;
        resetState();
        cases.forEach((c) => (c.textContent = ""));
    } else if (isVictoire === false) {
        if (state.joueurEnCours === 1) {
            event.target.textContent = "X";
            state.joueurEnCours = 2;
            joueur.textContent = "2";
        } else {
            event.target.textContent = "O";
            state.joueurEnCours = 1;
            joueur.textContent = "1";
        }
    }
};

cases.forEach((element) => {
    element.addEventListener("click", joueurCase)
});