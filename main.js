import gamePad from './game-pad';
import scores from './score-display';
import runNextPattern from './run-next-pattern';


const startButton = document.querySelector('.start');
startButton.addEventListener('click', main);

function main()
{
    scores.message.innerHTML = '';
    gamePad.resetPattern()
    runNextPattern()
}


