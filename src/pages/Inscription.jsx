import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si le mot de passe et sa confirmation ne sont pas les mêmes
    // On affiche un message d'erreur
    if (pwd !== confirmPwd) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // On crée une constante vec les informations du formulaire
    const newUser = {
      pseudo,
      email,
      pwd,
      prenom,
      nom,
      dateNaissance,
    };

    // Insertion dans la BDD
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/inscription",
        newUser
      );
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erreur serveur.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 relative">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Inscription</h2>

        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="prenom"
                className="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="pseudo"
              className="block text-sm font-medium text-gray-700"
            >
              Pseudo
            </label>
            <input
              type="text"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pwd"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPwd"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPwd"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dateNaissance"
              className="block text-sm font-medium text-gray-700"
            >
              Date de naissance
            </label>
            <input
              type="date"
              id="dateNaissance"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-300"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Déjà inscrit ? <a href="/login" className="text-indigo-600 hover:underline">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
