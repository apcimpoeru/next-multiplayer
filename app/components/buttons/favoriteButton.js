import Link from "next/link"
import { useState } from "react"

export default function FavoriteButton(props){

    const buttonTextInactive = 'Add to favorites'
    const buttonTextActive = 'Favorited'

    const buttonClassesInactive = 'button bg-third text-white mt-8 mb-4 m-auto';
    const buttonClassesActive = 'button border-2 border-third text-third bg-white font-bold text-white text-center w-52 mt-8 mb-4';
    
    const [buttonText, setButtonText] = useState(buttonTextInactive);
    const [buttonClasses, setButtonClasses] = useState(buttonClassesInactive);

    function ring(e){
        e.preventDefault();
        
        if (buttonText != buttonTextActive){
            setButtonText(buttonTextActive);
            setButtonClasses(buttonClassesActive);
        } else {
            setButtonText(buttonTextInactive);
            setButtonClasses(buttonClassesInactive);
        }
        
    }

    return <>
        <Link href='#'>
            <a onClick={ring} className={`${props.className} ${buttonClasses}`}>{buttonText}</a>
        </Link>
    </>
}