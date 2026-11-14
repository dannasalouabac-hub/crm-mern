import './App.css';

function App() {
  const prenom = "Sara"; 
  const nombreClients = 3;
  return (
    <div> 
       <h1>Bonjour {prenom} !</h1> 
       <p>Tu as {nombreClients} clients.</p> 
       <p>Le double : {nombreClients * 2}</p>
    </div>
  );
}

export default App;
