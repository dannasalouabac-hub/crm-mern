import CarteClient from "./components/CarteClient";

function App() { 
  return ( 
  <div> 
    <h1>Mes clients</h1> 
    <CarteClient nom="Sara Amrani" entreprise="Atlas Digital" /> 
    <CarteClient nom="Yassine Bennani" entreprise="Bennani Conseil" />
    </div> 
    ); 
} 
export default App;