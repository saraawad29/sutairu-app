import express from "express";
import Panier from "../models/panier.js";

const router = express.Router();

// Ajouter un article au panier
router.post("/", async (req, res) => {
  try {
    const { user, articleId, quantite } = req.body;

    let panier = await Panier.findOne({ user });

    if (panier) {
      // Si le panier existe, vérifier si l'article est déjà dedans
      const itemIndex = panier.articles.findIndex(a => a.article.toString() === articleId);

      if (itemIndex > -1) {
        // L'article existe déjà dans le panier, mettre à jour la quantité
        panier.articles[itemIndex].quantite += quantite;
      } else {
        // L'article n'existe pas dans le panier, l'ajouter
        panier.articles.push({ article: articleId, quantite });
      }
    } else {
      // Si le panier n'existe pas, en créer un nouveau
      panier = new Panier({
        user,
        articles: [{ article: articleId, quantite }]
      });
    }

    await panier.save();
    res.status(201).json(panier);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'article au panier :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'article au panier.", error: error.message });
  }
});

// Supprimer un article du panier
router.delete("/:userId/:articleId", async (req, res) => {
  const { userId, articleId } = req.params;
  try {
    let panier = await Panier.findOne({ user: userId });

    if (panier) {
      panier.articles = panier.articles.filter(item => item.article.toString() !== articleId);
      await panier.save();
      return res.status(200).json(panier);
    } else {
      return res.status(404).json({ message: "Panier non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article du panier :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'article du panier.", error: error.message });
  }
});

// Récupérer le panier d'un utilisateur
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const panier = await Panier.findOne({ user: userId }).populate('articles.article');
    if (panier) {
      // Assurez-vous que chaque article a toutes les propriétés nécessaires
      panier.articles = panier.articles.filter(item => item.article !== null && item.article.hoodie !== null);

      res.status(200).json(panier);
    } else {
      res.status(404).json({ message: "Panier non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du panier :", error);
    res.status(500).json({ message: "Erreur lors de la récupération du panier.", error: error.message });
  }
});

export default router;
