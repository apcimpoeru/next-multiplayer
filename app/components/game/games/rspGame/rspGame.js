import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../../../lib/socketContext"

// Functions
import getGameItems from "./getGameItems";
import getResult from "./endGame";

// Game Data
import data from "./gameData";


export default function RspGame(props){

    const newGameTime = 5;
    const maxTimeLimit = 5;
    const maxScore = 3;

    const socket = useContext(SocketContext);
    const [gameItems, setGameItems] = useState([]);
    // const [maxGames, setMaxGames] = useState(3);

    const [oneTimeCheck, setOneTimeCheck] = useState(true);

    const [playerChoice, setPlayerChoice] = useState('-');
    const [opponentChoice, setOpponentChoice] = useState('-');
    const [result, setResult] = useState('');
    // const [opponentChoicePlaceholder, setOpponentChoicePlaceholder] = useState('-');

    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [playerScoreGames, setPlayerScoreGames] = useState(0);
    const [opponentScoreGames, setOpponentScoreGames] = useState(0);

    // // timer
    const [maxTime, setMaxTime] = useState(maxTimeLimit);

    const [timerGo, setTimerGo] = useState(true);
    const [check, setCheck] = useState(0);
    const [timer, setTimer] = useState(0);

    const [second_timerGo, second_setTimerGo] = useState(false);
    const [second_check, second_setCheck] = useState(0);
    const [second_timer, second_setTimer] = useState(0);

    const [secondGameString, setSecondGameString] = useState('');

    const [placeholderPosition, setPlaceholderPosition] = useState('bottom-[0px]');
    const [placeholderOpacity, setPlaceholderOpacity] = useState('opacity-100');

    const [resultString, setResultString] = useState('Choose!');

    const [opponentIcon, setOpponentIcon] = useState('/rpsls/rock.png');

    function newGame(){
        socket.emit('new_game_server', props.roomName);
    }

    function endGame(){
        socket.emit('end_game_server', props.roomName);
    }

    // NEW GAME
    function newGameAction(){
        setResult('');
        setPlayerChoice('-');
        setOpponentChoice('-');
        setGameItems(getGameItems(data, selectGameItem));
        setCheck(0);
        setTimer(0);
        setMaxTime(maxTimeLimit);
        setTimerGo(true);
        second_setTimerGo(false);
        setResultString('Choose!');
        second_setCheck(0);
        setSecondGameString('');
        setPlaceholderOpacity('opacity-100');
    }

    // END GAME
    function endGameAction(){
        const result = getResult(data, playerChoice, opponentChoice);
        
        if (result.result === 'win'){
            setPlayerScore(playerScore + 1);
        } else if (result.result === 'lose'){
            setOpponentScore(opponentScore + 1);
        }

        if (playerScore == maxScore - 1){
            setPlayerScoreGames(playerScoreGames + 1);
            setPlayerScore(0);
            setOpponentScore(0);
        } else if (opponentScore == maxScore - 1){
            setOpponentScoreGames(opponentScoreGames + 1);
            setOpponentScore(0);
            setPlayerScore(0);
        }

        if (result.result == 'win' || result.result == 'lose'){

            if (result.winner === undefined && result.result == 'win'){
                setResultString('Opponent did not chose.');
            } else if (result.winner === undefined && result.result == 'lose'){
                setResultString('You did not chose.');
            } else {
                //setOpponentIcon(result.winner.url);
                setResultString(result.winner + ' ' + result.action + ' ' + result.loser);
            }

            setMaxTime('You ' + result.result + '!');

        } else if (result.result == 'tie'){
            setResultString('It\'s a tie!');
            setMaxTime(' ');
        }
        setPlaceholderOpacity('opacity-0');
        second_setTimerGo(true);
        setResult(result.result);
    }

    function selectGameItem(e){
        let slug = e.currentTarget.getAttribute("data-slug");

        setGameItems(getGameItems(data, selectGameItem, slug));
        setPlayerChoice(slug);

        let playerAction = {};
        playerAction.room = props.roomName;
        playerAction.action = slug;
        socket.emit('player_action_server', playerAction);
    }

    // Effect for the timer
    useEffect(() => {

        if (timerGo){
            const id = setInterval(() => {
                setCheck(check + 1);
                timerFunction(check);
            }, 500);
            return () => clearInterval(id);
        }
        
    }, [check, timer, maxTime, timerGo, second_timerGo]);

    function timerFunction(check){

        // if check is even
        if (check % 2 == 0){

            setPlaceholderPosition('bottom-[0px]');

            setTimer(timer + 1);
            setMaxTime(maxTimeLimit - timer);

            if (maxTime == 1){
                endGameAction();
                setTimerGo(false);
            }

        } else {
            setPlaceholderPosition('bottom-[20px]');
        }

    }
    // END OF timer effect

    // Effect for SECOND timer
    useEffect(() => {

        if (second_timerGo){
            const id = setInterval(() => {
                second_setCheck(second_check + 1);
                secondTimer(second_check)
            }, 1000);
            return () => clearInterval(id);
        }
        
    }, [second_check, second_timer, second_timerGo]);

    function secondTimer(second_check){

        let timeUntilStart = newGameTime - second_check;

        setSecondGameString("Starting new game in " + timeUntilStart);

        if (second_check == newGameTime){
            second_setCheck(0);
            newGame();
        }
    }

    // Effect for Socket
    useEffect(function(){

        socket.on('player_action_client', function(data){
            setOpponentChoice(data.action);
        });

        socket.on('end_game_client', function(data){
            endGameAction();
        });

        socket.on('new_game_client', function(data){
            newGameAction();
        });

        // on user left
        socket.on('user_left', function(data){
            setTimerGo(false);
            setResultString('Opponent left :(');
            setMaxTime('Waiting for new opponent...');
        });

    }, [socket, opponentChoice, playerChoice, playerScore, opponentScore, playerScoreGames, opponentScoreGames, second_timerGo, timerGo]);

    // First render effect
    useEffect(function(){

        setGameItems(getGameItems(data, selectGameItem));

    }, []);


    return <div>

                <div className="absolute top-10 right-10 flex justify-evenly items-center mb-20">

                    <div className="text-center">
                        <p>Your Score</p>
                        <p>Round : {playerScore}</p>
                        <p>Games : {playerScoreGames}</p>
                    </div>

                    <div className="text-center ml-8">
                        <p>Opponent Score</p>
                        <p>Round: {opponentScore}</p>
                        <p>Games: {opponentScoreGames}</p>
                    </div>

                </div>

                <div className="flex-col absolute top-10 right-0 left-0 text-center flex justify-center items-center mb-20">
                    <p className="text-5xl mb-4">{resultString}</p>
                    <p className="text-5xl mb-4">{maxTime}</p>
                    <p className="text-5xl">{secondGameString}</p>
                </div>

                {/* <div className="flex-col absolute bottom-0 right-0 left-0 text-center flex justify-center items-center mb-20">

                    <p>Room name: {props.roomName}</p>
                    <p className="text-3xl mt-4">Debug</p>
                    <p>Player choice: {playerChoice}</p>
                    <p>Opponent choice: {opponentChoice}</p>
                    <p>Result: {result}</p>
                    <p>Check: {check}</p>
                    <p>Timer: {timer}</p>
                    <p>Max time: {maxTime}</p>
                </div> */}

                <div className="flex justify-center items-center">
                    {gameItems}
                </div>

                {/* <div>

                    <div className={`${placeholderPosition} inline-block w-[50%] h-[200px] relative transition-all ease-in-out transform duration-300`}>
                        <div className={`centerAbsolute z-10 placeholder h-[120px] w-[120px] rounded-full bg-white transition-opacity ease-in-out duration-300 ${placeholderOpacity}`}>
                        </div>
                        <img className="centerAbsolute" src={opponentIcon} width={120} height={120} />
                    </div>

                    <div className={`${placeholderPosition} inline-block w-[50%] h-[200px] relative transition-all ease-in-out transform duration-300`}>
                        <div className={`centerAbsolute z-10 placeholder h-[120px] w-[120px] rounded-full bg-white transition-opacity ease-in-out duration-300 ${placeholderOpacity}`}>
                        </div>
                        <img className="centerAbsolute" src={opponentIcon} width={120} height={120} />
                    </div>

                </div> */}


                {/* <div className="flex justify-evenly items-center mt-20">
                    <button onClick={newGame}>New Game</button>
                    <button onClick={endGame}>End Game</button>
                </div> */}

            </div>
}