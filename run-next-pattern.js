import gamePad from './game-pad';

function runNextPattern()
{
    gamePad.addNewColor()
    gamePad.setColorsToBlink()
    gamePad.blinkSequence()
}

export default runNextPattern;