import RoomList from "../roomList/roomList"
import CreateRoomForm from "../createRoomForm/createRoomForm"
import Quickplay from "../quickplay/Quickplay";

import { useEffect, useState } from "react";

export default function selector(props){

    const [content, setContent] = useState(<RoomList/>);
    const [tabList, setTabList] = useState();

    function selectTab(e){
        let slug = e.currentTarget.getAttribute("data-slug");
        const tabsHTML = getTabsHTML(selectTab, tabs, slug);
        setTabList(tabsHTML);
    }

    function getTabsHTML(selectTab, tabs, selected = false){
        const html = tabs.map((tab, index) => {
            
            const selectedClass = '';
            if (tab.slug == selected){
                selectedClass = 'button2_active';
                setContent(tab.component);
            }

            return <div data-slug={tab.slug} key={index} onClick={selectTab} className={`button2 ${selectedClass} cursor-pointer`}>
                        {tab.name}
                    </div>
    
        } );

        return html;
    }

    const tabs = [

        // TODO
        // {
        //     name: "Quickplay",
        //     slug: "quickplay",
        //     component: <Quickplay/>
        // },
        {
            name: "Room List",
            slug: "room_list",
            component: <RoomList/>
        },
        {
            name: "Create Room",
            slug: "create_room",
            component: <CreateRoomForm/>
        },
    ];


    useEffect(function(){

        const tabsHTML = getTabsHTML(selectTab, tabs, 'quickplay');
        setTabList(tabsHTML);

        return () => {
            setTabList({});
        };

    }, []);

    return <div className="switcher flex flex-col w-[30%] h-1/2">
                <div className="flex items-center justify-evenly mb-8">{tabList}</div>
                <div className="flex items-center justify-center">{content}</div>
            </div>
}