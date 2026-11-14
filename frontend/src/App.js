import { useEffect, useState } from "react";

function App() {
  const [clients, setClients] = useState([]); 
  useEffect(() => { 
    fetch("http://localhost:4000/api/clients") 
    .then((response) => response.json()) 
    .then((data) => setClients(data)); 
  }, []);
return ( 
<div> 
  <h1>{clients.length} clients chargés depuis l'API</h1> 
  {clients.map((client) => (
    <p key={client._id}>{client.nom}</p>
   ))} 
  </div> 
  ); 
}
export default App;