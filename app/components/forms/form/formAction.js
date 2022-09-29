export default async function formAction(){

    const response = await fetch('/api/game/rooms_get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    const data = await response.json();
    return 'hi';
}