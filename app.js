/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/

//creating variables to keep track of the scores

var scores, roundScore, activePlayer, gamePlaying; // this is an easy way to keep track of variables.

init();

var lastDice;


// setting up the button event handler to "roll" the dice


//use an anonymous function since the button wont be used anywhere else
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying) {
        //1. random number
       var dice1 = Math.floor(Math.random() * 6) + 1;
       var dice2 = Math.floor(Math.random() * 6) + 1;

       //2. display the result
       
       document.getElementById('dice-1').style.display = 'block';
       document.getElementById('dice-2').style.display = 'block';
       document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
       document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';

       //var diceDOM = document.querySelector('.dice');

   
       //3.update the round score IF the rolled # was not a 1
        
        if(dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {

            //Next player
            nextPlayer();
        }
        
        /*

       // this will end the turn if two 6 rolled
       if (dice === 6 && lastDice === 6) {
            //player looses score
           scores[activePlayer] = 0;
           document.querySelector('#score-' + activePlayer).textContent = '0'; 
           nextPlayer();
        } else if(dice !== 1) {
       //add score
       roundScore += dice;
       document.querySelector('#current-' + activePlayer).textContent = roundScore;
       } else {
       //Next player
       nextPlayer();
       }

       var lastDice = dice; */
   }
});

//setting up the event listener for the btn-hold 
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {

    // add current score to the global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
        // undefined, 0, null or "empty strings" are COERCED to false
        // anything else COERCED to true
    if(input){
        winningScore = input;   
    } else {
           winningScore = 100;
    }

    // check if player won the game
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = "Winner!";
        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        gamePlaying = false;
    } else {
    //Next player
       nextPlayer();   
    }
}
});

//this function will hold the score and switch players 

function nextPlayer () {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //this is the same as writing another if statement
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //remove active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide dice when a player roles a 1
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

// the new game event listner
document.querySelector('.btn-new').addEventListener('click', init);

//this init function will start the game and reset once the 'new game'button is clicked
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    gamePlaying = true;
   
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    

//this will reset all the player scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //this will reset the winner class once the new game starts
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //this will reset to player one once the game is reset
    document.querySelector('.player-0-panel').classList.add('active');
}


// A player loses the entire turn if rolled a 6


/* 
this will calculate the roll of the dice each turn.
dice = Math.floor(Math.random() * 6) + 1;
 
this will change the current score to what ever the dice rolled by targeting the text only
document.querySelector('#current-' + activePlayer).textContent = dice; 

by selecting the html, it will change the current score to an italic font by target the html tag
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' +  dice + '</em>'; 
*/