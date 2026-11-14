
import { useState } from "react";

function ClientList({
    clients,
    onChangerStatut,
    onSupprimer,
    onModifierNom
}) {
    const [idModification, setIdModification] = useState(null);
    const [nouveauNom, setNouveauNom] = useState("");

    function commencerModification(client) {
        setIdModification(client._id);
        setNouveauNom(client.nom);
    }

    function enregistrerModification(id) {
        if (nouveauNom.trim() === "") {
            return;
        }

        onModifierNom(id, nouveauNom.trim());
        setIdModification(null);
        setNouveauNom("");
    }

    if (clients.length === 0) {
        return <p>Aucun client à afficher.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th>Téléphone</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {clients.map((client) => (
                    <tr key={client._id}>
                        <td>
                            {idModification === client._id ? (
                                <input
                                    value={nouveauNom}
                                    onChange={(event) =>
                                        setNouveauNom(event.target.value)
                                    }
                                />
                            ) : (
                                client.nom
                            )}
                        </td>

                        <td>{client.email}</td>
                        <td>{client.entreprise}</td>
                        <td>{client.telephone}</td>

                        <td>
                            <select
                                value={client.statut}
                                onChange={(event) =>
                                    onChangerStatut(
                                        client._id,
                                        event.target.value
                                    )
                                }
                            >
                                <option value="prospect">Prospect</option>
                                <option value="client">Client</option>
                                <option value="inactif">Inactif</option>
                            </select>
                        </td>

                        <td className="actions-buttons">
                            {idModification === client._id ? (
                                <>
                                    <button onClick={() =>
                                        enregistrerModification(client._id)
                                    }>
                                        Enregistrer
                                    </button>

                                    <button onClick={() =>
                                        setIdModification(null)
                                    }>
                                        Annuler
                                    </button>
                                </>
                            ) : (
                                <button onClick={() =>
                                    commencerModification(client)
                                }>
                                    Modifier
                                </button>
                            )}

                            <button onClick={() =>
                                onSupprimer(client._id)
                            }>
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ClientList;
