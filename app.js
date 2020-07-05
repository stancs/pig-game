/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

init();

function nextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    for (let i = 0; i < 2; i++) {
        document.getElementById(`current-${i}`).textContent = '0';
        document.querySelector(`.player-${i}-panel`).classList.toggle('active');
    }
    // document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    for (let i = 0; i < 2; i++) {
        document.getElementById(`score-${i}`).textContent = '0';
        document.getElementById(`current-${i}`).textContent = '0';
        document.getElementById(`name-${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    }
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
}

function btnRoll() {
    if (gamePlaying) {
        const diceNum = Math.floor(Math.random() * 6) + 1;

        const diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${diceNum}.png`;

        if (diceNum === 1) {
            nextPlayer();
        } else {
            roundScore += diceNum;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }
    }
}

function btnHold() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        for (let i = 0; i < 2; i++) {
            document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
        }
        if (scores[activePlayer] >= 20) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
}

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-roll').addEventListener('click', btnRoll);
document.querySelector('.btn-hold').addEventListener('click', btnHold);
