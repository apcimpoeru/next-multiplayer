const data = [
    {
        name: 'Rock',
        slug: 'rock',
        url: '/rpsls/rock.png',
        beats: ['scissors'],
        losesTo: ['paper'],
        action: 'crushes',
    },
    {
        name: 'Paper',
        slug: 'paper',
        url: '/rpsls/paper.png',
        beats: ['rock'],
        losesTo: ['scissors'],
        action: 'covers',
    },
    {
        name: 'Scissors',
        slug: 'scissors',
        url: '/rpsls/scissors.png',
        beats: ['paper'],
        losesTo: ['rock'],
        action: 'cuts',
    }
];

export default data;