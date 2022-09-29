import GameSelectForm from "../gameSelectForm/gameSelectForm"
import { useState, useEffect } from "react";
export default function quickplay(){

    const [result, setResults] = useState({});
    const [loading, setLoading] = useState('Finding a game');

    const [timerGo, setTimerGo] = useState(false);
    const [timer, setTimer] = useState(0);
    
    function submitAction(e){
        setTimerGo(true);
        e.preventDefault();
    }

    // Effect for the timer
    useEffect(() => {

        function timerFunction(timer){

            if (timer == 0){
                setLoading("Finding a game");
            } else if (timer == 1){
                setLoading(". Finding a game .");
            } else if (timer == 2){
                setLoading(". . Finding a game . .");
            } else if (timer == 3){ 
                setLoading(". . . Finding a game . . .");
                setTimer(0);
            }
    
        }

        if (timerGo){
            const id = setInterval(() => {
                setTimer(timer + 1);
                timerFunction(timer);
            }, 1000);
            return () => clearInterval(id);
        }
        
    }, [timer, timerGo]);

    // END OF timer effect

    return (

        <form onSubmit={submitAction}>
            
            <GameSelectForm/>
            
            <p className="mt-4">{result?.message}</p>

            {timerGo
                ? <p className="mt-8 text-center">{loading}</p>
                : <button 
                        className={`formSubmit`}>
                            Find Game
                    </button>
            }

            

        </form>

    );
}