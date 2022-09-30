import Image from "next/image";

export default function getGameItems(data, selectGameItem = false, selected = ""){

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