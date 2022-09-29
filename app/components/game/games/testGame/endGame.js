export default function getResult(data, playerChoice, opponentChoice){

    let result = {};

    if (playerChoice == '-' && opponentChoice == '-'){
        result.result = 'tie';
        return result;
    }

    if (playerChoice === '-'){
        result.result   = 'lose';
        return result;
    }

    if (opponentChoice === '-'){
        result.result   = 'win';
        return result;
    }

    // finds item in data by slug
    let playerItem = data.find(item => item.slug === playerChoice);
    let opponentItem = data.find(item => item.slug === opponentChoice);

    if (opponentChoice === playerChoice){

        result.result = 'tie';

    } else if (playerItem.beats.includes(opponentChoice)){

        result.winner   = playerItem.name;
        result.loser    = opponentItem.name;
        result.action   = playerItem.action;
        result.result   = 'win';

    } else {

        result.winner = opponentItem.name;
        result.loser  = playerItem.name;
        result.action = opponentItem.action;
        result.result = 'lose';

    }

    return result;

}

