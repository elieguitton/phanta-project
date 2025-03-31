import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, pwd });

      setSuccessMessage("Connexion réussie !");
      setErrorMessage("");

      // Stocker le token dans le localStorage
      localStorage.setItem("token", response.data.token);

      // Rediriger vers une autre page après connexion 
      window.location.href = "/";
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erreur serveur.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">
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

          <button type="submit" className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-300">
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Pas encore de compte ? <a href="/inscription" className="text-indigo-600 hover:underline">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
