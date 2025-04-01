import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [updateError, setUpdateError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Utilisateur non authentifié.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/auth/profil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (err) {
        setError("Impossible de récupérer les informations.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setUpdateError("");
      const token = localStorage.getItem("token");

      await axios.put("http://localhost:5000/auth/profil", updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setUpdateError(err.response?.data?.message || "Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/auth/profil", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token"); // Supprime le token
      navigate("/"); // Redirige vers la page d'accueil
    } catch (err) {
      setError("Erreur lors de la suppression du compte.");
    }
  };

  if (loading) return <p>Chargement du profil...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg text-center">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.pseudo}`}
          alt="Avatar"
          className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-secondary"
        />

        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold">{user.pseudo}</h1>
            <p className="text-gray-400">{user.email}</p>

            <div className="mt-4">
              <p><span className="font-semibold">Nom :</span> {user.nom}</p>
              <p><span className="font-semibold">Prénom :</span> {user.prenom}</p>
              <p><span className="font-semibold">Date de naissance :</span> {new Date(user.dateNaissance).toLocaleDateString()}</p>
            </div>

            <button 
              className="mt-6 px-4 py-2 bg-secondary font-semibold rounded-lg hover:opacity-50"
              onClick={() => setIsEditing(true)}
            >
              Modifier le profil
            </button>

            <button 
              className="mt-6 px-4 py-2 bg-red-600 font-semibold rounded-lg hover:opacity-50"
              onClick={handleDelete}
            >
              Supprimer mon compte
            </button>
          </>
        ) : (
          <>
            <input type="text" name="pseudo" value={updatedUser.pseudo} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />
            <input type="text" name="email" value={updatedUser.email} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />
            <input type="text" name="nom" value={updatedUser.nom} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />
            <input type="text" name="prenom" value={updatedUser.prenom} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />

            {updateError && <p className="text-red-500">{updateError}</p>}

            <button 
              className="mt-4 me-6 bg-green-600 font-semibold rounded-lg hover:opacity-50"
              onClick={handleUpdate}
            >
              Enregistrer
            </button>

            <button 
              className="mt-4 bg-gray-500 font-semibold rounded-lg hover:opacity-50"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profil;
