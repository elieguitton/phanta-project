import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config(); // Variables d'environnement

const app = express();
app.use(express.json()); // Traitement des JSON
app.use(cors());

// Utilisation des routes
app.use("/auth", authRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur MongoDB :", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));