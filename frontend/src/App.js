import './App.css';

function App() {
  const clients = [ 
    { id: 1, nom: "Sara Amrani" }, 
    { id: 2, nom: "Yassine Bennani" }, 
    { id: 3, nom: "Lina Fassi" } 
  ];
  return (
   <ul> {clients.map((client) => ( 
   <li key={client.id}>{client.nom}</li> 
  ))} 
  </ul>
  );
}

export default App;
