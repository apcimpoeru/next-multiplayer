export const headerData = {

    logo:'Multiplayer',
    // Text for logout button
    LogoutLink: [
        {
            title: "Logout",
        }
    ],
    // All links
    links: [
        {
            title:"Play",
            href:'/play'
        },
    ],
    // Links only for logged out users
    linksLoggedOut: [
        {
            title:"Log in",
            href:'/auth',
        },
        {
            title:"Sign up",
            href:'/signup',
        }
    ],
    // Links only for logged in users
    linksLoggedIn: [
        {
            title:"Profile",
            href:'/profile'
        },
    ]

}