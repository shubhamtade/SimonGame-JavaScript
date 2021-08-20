import { Howl } from 'howler';
const rawSounds = require('./sounds/*.mp3');


const greenSound = new Howl(
    {
        src: [rawSounds.green],
        volume: 0.3,
    }
);

const redSound = new Howl(
    {
        src: [rawSounds.red],
        volume: 0.3,
    }
);

const blueSound = new Howl(
    {
        src: [rawSounds.blue],
        volume: 1.0,
    }
);

const yellowSound = new Howl(
    {
        src: [rawSounds.yellow],
        volume: 1.0,
    }
);

const endSound = new Howl(
    {
        src: [rawSounds.end],
        volume: 1.0,
    }
);


export {
    greenSound,
    redSound,
    blueSound,
    yellowSound,
    endSound,
};