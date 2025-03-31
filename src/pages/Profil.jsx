import React, { useEffect, useState } from "react";
import axios from "axios";

const Profil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token
        console.log("TOKEN :", token);
        
        if (!token) {
          setError("Utilisateur non authentifié.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/auth/profil", {
          headers: {
            Authorization: `Bearer ${token}`, // Envoyer le token
          },
        });

        setUser(response.data); // Stocker les infos de l'utilisateur
      } catch (err) {
        setError("Impossible de récupérer les informations.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Chargement du profil...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Profil</h2>

        <div className="mb-4">
          <strong>Pseudo :</strong> {user.pseudo}
        </div>
        <div className="mb-4">
          <strong>Email :</strong> {user.email}
        </div>
        <div className="mb-4">
          <strong>Prénom :</strong> {user.prenom}
        </div>
        <div className="mb-4">
          <strong>Nom :</strong> {user.nom}
        </div>
        <div className="mb-4">
          <strong>Date de naissance :</strong> {user.dateNaissance}
        </div>

      </div>
    </div>
  );
};

export default Profil;
