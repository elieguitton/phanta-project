import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Vérifier si un token est présent dans le localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convertit en booléen (true si token, false sinon)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    setIsAuthenticated(false); // Met à jour l'état
    navigate("/"); // Redirige vers l'accueil
  };

  return (
    <nav className="bg-black bg-opacity-50 backdrop-blur-lg text-white p-4 flex items-center shadow-md fixed w-full top-0 z-50">
      <h1 className="font-fancy text-gold text-2xl tracking-widest">PhantaProject</h1>

      <div className="flex space-x-6 ml-10 text-lg">
        <Link to="/" className="hover:text-secondary">Accueil</Link>
        <Link to="/attente" className="hover:text-secondary">Temps d'attente</Link>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/profil" className="bg-secondary px-4">Profil</Link>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 rounded">Déconnexion</button>
          </>
        ) : (
          <Link to="/login" className="bg-secondarypx-4">Connexion</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
