import { useState } from "react";

function App() { 
  const [nom, setNom] = useState(""); 
  return ( 
  <div> 
    <input 
    placeholder="Tape un nom" 
    value={nom} onChange={(event) => setNom(event.target.value)} 
    /> 
    <p>Tu as écrit : {nom}</p> 
    </div> 
  ); 
}
export default App;