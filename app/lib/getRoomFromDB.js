export default async function getRoomsFromDB(){
    
    const response = await fetch('/api/game/rooms_get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
    const data = await response.json();
    return data;
  }