import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization"); // Récupérer le token

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET); // Vérifier le token
    req.user = decoded; // Ajouter les infos de l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(400).json({ message: "Token invalide." });
  }
};

export default authMiddleware;
