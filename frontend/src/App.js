import { useEffect, useState } from "react"; 
import Header from "./components/Header"; 
import ClientForm from "./components/ClientForm"; 
import ClientList from "./components/ClientList";
import {  
  getClients,  
  createClient,  
  updateClient,  
  deleteClient 
} from "./services/clientService"; 
import "./App.css";

function App() {  
  const [clients, setClients] = useState([]);  
  const [recherche, setRecherche] = useState("");  
  const [message, setMessage] = useState("Chargement...");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  useEffect(() => {
      getClients()      
        .then((data) => {        
          setClients(data);        
          setMessage("");      
        })      
        .catch((error) => setMessage(error.message)); 
  }, []);

  async function ajouterClient(nouveauClient) {    
    try {      
      const clientCree = await createClient(nouveauClient);      
      setClients([clientCree, ...clients]);      
      setMessage("Client ajouté !");      
      return true;    
    } catch (error) {      
      setMessage(error.message);      
      return false;    
    }  
  }
  
   async function changerStatut(id, statut) {    
    try {      
      const clientModifie = await updateClient(id, { statut });      
      setClients(clients.map((c) => (c._id === id ? clientModifie : c)));      
      setMessage("Statut modifié !");    
    } catch (error) {      
      setMessage(error.message);    
    }  
  }
   async function supprimerClient(id) {    
    if (!window.confirm("Supprimer ce client ?")) {      
      return;    
    }    
    try {      
      await deleteClient(id);      
      setClients(clients.filter((c) => c._id !== id));      
      setMessage("Client supprimé !");    
    } catch (error) {      
      setMessage(error.message);    
    }  
  }
  async function modifierNom(id, nom) {
    try {
        const clientModifie = await updateClient(id, { nom });

        setClients(
            clients.map((c) =>
                c._id === id ? clientModifie : c
            )
        );

        setMessage("Nom modifié !");
    } catch (error) {
        setMessage(error.message);
    }
}
 const clientsFiltres = clients.filter((c) => {
    const correspondRecherche =
        (c.nom + " " + c.email)
        .toLowerCase()
        .includes(recherche.toLowerCase());

    const correspondStatut =
        filtreStatut === "tous" || c.statut === filtreStatut;

    return correspondRecherche && correspondStatut;
});
const nombreProspects = clients.filter(
    (c) => c.statut === "prospect"
).length;

const nombreClients = clients.filter(
    (c) => c.statut === "client"
).length;

const nombreInactifs = clients.filter(
    (c) => c.statut === "inactif"
).length;
return ( 
<div className="container"> 
  <Header total={clients.length} /> 
  <div className="statistiques">

    <div className="stat-card">
        <h3>Prospects</h3>
        <p>{nombreProspects}</p>
    </div>

    <div className="stat-card">
        <h3>Clients</h3>
        <p>{nombreClients}</p>
    </div>

    <div className="stat-card">
        <h3>Inactifs</h3>
        <p>{nombreInactifs}</p>
    </div>

</div>
  <ClientForm onAjouter={ajouterClient} /> 
  {message && <p className="message">{message}</p>} 
  <input 
    className="recherche" 
    placeholder="Rechercher par nom ou email..." 
    value={recherche} 
    onChange={(event) => setRecherche(event.target.value)} 
  />
  <select
    value={filtreStatut}
    onChange={(event) => setFiltreStatut(event.target.value)}
  >
    <option value="tous">Tous les clients</option>
    <option value="prospect">Prospects</option>
    <option value="client">Clients</option>
    <option value="inactif">Inactifs</option>
  </select>
  <ClientList 
    clients={clientsFiltres} 
    onChangerStatut={changerStatut} 
    onSupprimer={supprimerClient} 
  /> 
  
</div> 
); 
} 
export default App;