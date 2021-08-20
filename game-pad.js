'use strict'

import { empty, freeze, not, randomChoice } from 'ez-read';
import user from './user';
import scores from './score-display';
import runNextPattern from './run-next-pattern';
import { greenSound, redSound, blueSound, yellowSound, endSound } from './sounds';

const colors = freeze(['green', 'red', 'blue', 'yellow']);
const gamePadDisplay = document.querySelector('.game-pad');

gamePadDisplay.addEventListener('click', checkPads);
gamePadDisplay.addEventListener('mousedown', highlightPad);
gamePadDisplay.addEventListener('mouseup', removeHighlight);

class GamePad 
{
    constructor()
    {
        this.pattern = [];
        this.colorsToBlink = [];
    }

    addNewColor()
    {
        const newColor = randomChoice(colors);
        this.pattern.push(newColor);
    }

    setColorsToBlink()
    {
        this.colorsToBlink = [...this.pattern];
    }


    resetPattern()
    {
        this.pattern = [];
    }


    async blinkSequence()
    {
        const intervalId = setInterval(() => {
            const color = this.colorsToBlink.splice(0, 1);
            blink(color)
            if (empty(this.colorsToBlink))
            {
                user.turn = true;
                clearInterval(intervalId);
            }
        }, 1000);
    }
}


function isValid(color)
{
    const isColor = color === 'green' || color === 'red' || color === 'blue' || color === 'yellow';
    return isColor;
}


function highlightPad(event)
{
    if (not(user.turn))
    {
        return;
    }
    const color = event.target.id;
    
    if (isValid(color))
    {
        const pad = document.querySelector(`#${color}`);
        pad.classList.add(`blink-${color}`);
    }
}


function removeHighlight(event)
{
    if (not(user.turn))
    {
        return;
    }
    const color = event.target.id;
    if (isValid(color))
    {
        const pad = document.querySelector(`#${color}`);
        pad.classList.remove(`blink-${color}`);
    }
}


function checkPads(event)
{
    if (not(user.turn))
    {
        return;
    }
    const color = event.target.id;

    switch(true)
    {
        case (isWrongChoice(color)):
            endGameSequence()
            break;
        case (correctChoice(color)):
            playSound(color);
            user.counter++;
            break;
        case (notGameButton(color)):
            return;
        default:
            computersTurn(color);
    }
}


function notGameButton(color)
{
    return not(isValid(color))
}


function correctChoice(color)
{
    return isValid(color) 
        && color === gamePad.pattern[user.counter] 
        && user.counter < gamePad.pattern.length - 1;
}


function isWrongChoice(color)
{
    return isValid(color) && color !== gamePad.pattern[user.counter];
}


function computersTurn(color)
{
    playSound(color);
    user.turn = false;
    user.counter++;
    scores.currentScore = user.counter;
    scores.currentScoreDisplay.innerHTML = `Your Score: ${user.counter}`;
    user.counter = 0;
    runNextPattern()
}


function endGameSequence()
{
    endSound.play()
    const newBestScore = scores.currentScore > scores.bestScore;
    if (newBestScore)
    {
        displayNewBestScore()
    }
    user.resetValues()
    scores.currentScoreDisplay.innerHTML = `Your Score: ${user.counter}`;
    scores.message.innerHTML = 'Game Over';
}

function displayNewBestScore()
{
    scores.bestScore = scores.currentScore;
    scores.bestScoreDisplay.innerHTML = `Best Score: ${scores.bestScore}`;
}



function playSound(color)
{
    switch(color)
    {
        case 'green':
            greenSound.play()
            break;
        case 'red':
            redSound.play()
            break;
        case 'blue':
            blueSound.play()
            break;
        case 'yellow':
            yellowSound.play()
            break;
    }
}


function blink(color)
{
    playSound(color[0]);
    const pad = document.querySelector(`#${color}`);
    pad.classList.add(`blink-${color}`);
    setTimeout(() => 
    {
        pad.classList.remove(`blink-${color}`);
    }, 500)
}

const gamePad = new GamePad();

export default gamePad;