import express from "express";
import Article from "../models/modele.js"; // Assurez-vous que le chemin vers votre modèle est correct
 
const router = express.Router();
 
// Création d'un article
router.post("/", async (req, res) => {
  try {
    const { email, hoodie, taille, couleur, texte, logo, prix } = req.body;
 
    // Création d'un nouvel article avec le modèle Article
    const newArticle = new Article({
      email,
      hoodie,
      taille,
      couleur,
      texte,
      logo,
      prix,
    });
 
    // Sauvegarder l'article
    await newArticle.save();
 
    res.status(201).json({ message: "L'article a été créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'article.", error: error.message });
  }
});
 
// Supprimer un article par son ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article non trouvé." });
    }
    res.status(200).json({ message: "Article supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'article.", error: error.message });
  }
});
 
// Afficher tous les articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des articles.", error: error.message });
  }
});
 
// Mettre à jour un article par son ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, hoodie, taille, couleur, texte, logo, prix } = req.body;
 
  try {
      // Vérifiez que l'ID est valide et que les données sont présentes
      if (!id) {
          return res.status(400).json({ message: "ID requis." });
      }
 
      const updatedArticle = await Article.findByIdAndUpdate(id, {
          email,
          hoodie,
          taille,
          couleur,
          texte,
          logo,
          prix
      }, { new: true }); // { new: true } retourne le document après la mise à jour
 
      if (!updatedArticle) {
          return res.status(404).json({ message: "Article non trouvé." });
      }
 
      res.status(200).json({ message: "Article mis à jour avec succès.", article: updatedArticle });
  } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'article.", error: error.message });
  }
});
 
 
export default router;