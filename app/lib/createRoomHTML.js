export default function createRoomHTML(rooms, selection = null, selectItem){

    let roomList = '';

    function joinRoom(){
        alert('joining');
    }

    function roomFull(){
        return false;
    }

    if (rooms[0]?._id != null){
        roomList = rooms.map(function(el, i){

            let activeClass;
            let activeHTML;
            let am = el.connected?.length / el.maxPlayers;
            let border = 'border-black';
            let fullClass = '';

            let cursor = 'cursor-pointer';
            let f = selectItem;

            if (selection != null){
                if (el.title == selection){
                    activeClass = 'active';
                } else {
                    activeClass = '';

                }
            }

            if (am == 1){
                cursor = "cursor-no-drop";
                f = roomFull;
                border = '';
                fullClass = 'text-red-500';
            }

            return <div data-name={el.title} onClick={f} key={i} className={`${cursor} border-2 ${border} p-2 flex justify-evenly items-center w-full mb-4`}>
                        <div className="room-name">Name<br/>{el.title}</div>
                        <div className="room-name">Type<br/>{el.type}</div>
                        <p className={`self-end font-bold ${fullClass}`}>Players<br/>{el.connected?.length} / {el.maxPlayers}</p>
                    </div>
        })
    } else {
        roomList = <p className="mb-4">No rooms found</p>;
    }
    

    return <>{roomList}</>
}