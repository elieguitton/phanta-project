import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import taronImage from "../assets/taron.jpg";


const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${taronImage})` }}
      ></div>

      {/* Filtre sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black opacity-1"></div>

{/* Overlay sombre + flou */}
<div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <motion.h1
          className="text-5xl font-extrabold text-gold drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bienvenue sur PhantaProject
        </motion.h1>

        <motion.p
          className="mt-4 text-lg max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Découvrez les attractions, suivez les temps d'attente et explorez la carte interactive du parc !
        </motion.p>

        {/* Boutons interactifs */}
        <motion.div
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Link
            to="/attente"
            className="px-6 py-3 bg-gold font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Voir les temps d'attente
          </Link>
        
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
