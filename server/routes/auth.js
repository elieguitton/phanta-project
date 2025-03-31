import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
const router = express.Router();

// Inscription
router.post("/inscription", async (req, res) => {
  try {
    const { pseudo, email, pwd, prenom, nom, dateNaissance } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingMail= await User.findOne({ email });
    const existingPseudo= await User.findOne({pseudo});
    if (existingMail) return res.status(400).json({ message: "Email déjà utilisé !" });
    if (existingPseudo) return res.status(400).json({ message: "Pseudo déjà utilisé !" });



    // Hasher le mot de passe
    const hashedpwd = await bcrypt.hash(pwd, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      pseudo,
      email,
      pwd: hashedpwd,
      prenom,
      nom,
      dateNaissance,
    });
    
    if (!pseudo || !email || !pwd || !prenom || !nom || !dateNaissance) {
        return res.status(400).json({ message: 'Tous les champs doivent être remplis' });
      }

    // Sauvegarder dans la BDD
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Connexion
router.post("/login", async (req, res) => {
  try {
    const { email, pwd } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé." });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(pwd, user.pwd);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour récupérer les infos de l'utilisateur connecté
router.get("/profil", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-pwd"); // Ne renvoie pas le mot de passe
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
