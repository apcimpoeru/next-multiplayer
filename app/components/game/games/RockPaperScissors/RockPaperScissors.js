import Image from "next/image"
import { useEffect, useState } from "react";

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


export default function RockPaperScissors(){

    let maxTime = 5;

    function getGameResult(playerChoice, opponentChoice){

        // finds item in data by slug
        let playerItem = data.find(item => item.slug === playerChoice);
        let opponentItem = data.find(item => item.slug === opponentChoice);
        
        let result = {};

        if (opponentChoice === playerChoice){

            result.result = 'tie';

        } else if (playerItem.beats.includes(opponentChoice)){

            result.isWinner = true;
            result.winner   = playerItem.name;
            result.loser    = opponentItem.name;
            result.action   = playerItem.action;
            result.result   = 'You win!';

        } else {

            result.winner = opponentItem.name;
            result.loser  = playerItem.name;
            result.action = opponentItem.action;
            result.result = 'You lose!';

        }

        return result;

    }

    function timerFunction(){

        console.log('timer', timer);
        console.log('check', check);
        setTimer(timer - 1);

        if (check % 2 == 0){
            setTest('bottom-[100px]');
        } else {
            setTest('bottom-[150px]');
        }

        if (check >= maxTime){

            setPlaceholderOpacity('opacity-0');

            if (playerChoice){
                
                let result = getGameResult(playerChoice, opponentChoice); 

                let string;
                if (result.result != 'tie'){
                    string = `${result.winner} ${result.action} ${result.loser} - ${result.result}`;
                } else {
                    string = `It's a tie!`;
                }
            } else {
                string = `No player choice`;
            }
            
            setTimer(string);
            setTimerGo(false);
            
        }
        
    }

    function selectGameItem(e){
        let slug = e.currentTarget.getAttribute("data-slug");
        setPlayerChoice(slug);
        setGameItems(getGameItems(slug));
    }

    function getGameItems(selected = ""){

        const gameItems = data.map(function(el, index){

            let selectedClass = "border-transparent";

            if (el.slug === selected){
                selectedClass = '';
            }

            return <div key={index} onClick={selectGameItem} data-slug={el.slug} className={`${selectedClass} transition ease-in-out duration-200 rounded-full border-4 pt-[5px] px-[5px] mx-8 cursor-pointer`}>
                        <Image src={el.url} width={120} height={120} />
                    </div>
    
        });

        return gameItems;

    }

    const [gameItems,    setGameItems] =    useState();
    const [check,        setCheck] =        useState(0);
    const [timer,        setTimer] =        useState(maxTime);
    const [timerSize,    setTimerSize] =    useState('text-5xl');
    const [timerGo,      setTimerGo] =      useState(true);
    const [placeholderOpacity, setPlaceholderOpacity] = useState('opacity-100');

    const [playerChoice, setPlayerChoice]     = useState(null);
    const [opponentChoice, setOpponentChoice] = useState('paper');

    const [winner,       setWinner] =       useState(null);
    const [loser,        setLoser] =        useState(null);
    const [action,       setAction] =       useState(null);

    const [test, setTest] = useState('bottom-[150px]');

    // Effect for the timer
    useEffect(() => {

        if (timerGo){
            const id = setInterval(() => {
                timerFunction()
                setCheck(check + 1)
            }, 1000);
            return () => clearInterval(id);
        }
        
    }, [check])

    useEffect(function(){
        setGameItems(getGameItems());
    }, [])

    return <div className="flex flex-col justify-center items-center">


                <div className="relative flex items-center justify-center fixed bottom-16 timer mb-8">
                    <p className={timerSize}>{timer}</p>
                </div>

                <div className={`${test} absolute transition-all ease-in-out transform duration-300`}>
                    <div className={`absolute placeholder h-[120px] w-[120px] rounded-full bg-white transition-opacity ease-in-out duration-300 ${placeholderOpacity}`}>
                    </div>
                    <img src="/rpsls/rock.png" width={120} height={120} />
                </div>

                <div className={`game_items flex flex-row`}>
                    {gameItems}
                </div>       

            </div>
}