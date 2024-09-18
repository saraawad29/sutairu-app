import React, { createContext, useContext, useState } from 'react';

// Créer un contexte pour le panier
const PanierContext = createContext();

// Fournisseur du contexte pour encapsuler l'état du panier et les fonctions associées
export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);

  // Fonction pour ajouter un article au panier
  const ajouterAuPanier = (article) => {
    const index = panier.findIndex((item) => item.id === article.id);
    if (index !== -1) {
      const newPanier = [...panier];
      newPanier[index].quantite++;
      setPanier(newPanier);
    } else {
      const newPanier = [...panier, { ...article, quantite: 1 }];
      setPanier(newPanier);
    }
  };

  // Fonction pour retirer un article du panier
  const retirerDuPanier = (articleId) => {
    const newPanier = panier.filter((item) => item.id !== articleId);
    setPanier(newPanier);
  };

  // Fonction pour vider le panier
  const viderPanier = () => {
    setPanier([]);
  };

  // Valeur du contexte à fournir aux composants enfants
  const value = {
    panier,
    ajouterAuPanier,
    retirerDuPanier,
    viderPanier,
  };

  return (
    <PanierContext.Provider value={value}>
      {children}
    </PanierContext.Provider>
  );
};

// Utilitaire pour utiliser le contexte dans un composant
export const usePanier = () => useContext(PanierContext);
