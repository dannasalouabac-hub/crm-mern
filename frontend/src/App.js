import { useState } from "react"; 
function App() { 
  const [compteur, setCompteur] = useState(0); 
  return ( 
  <div> 
    <h1>Clients appelés : {compteur}</h1> 
    <button onClick={() => setCompteur(compteur + 1)}> 
      +1 appel 
    </button> 
  </div> 
  ); 
} 
export default App;