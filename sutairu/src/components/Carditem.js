import React from "react";
import "../pages/mesdesign.css";
import edit from "../icons/edit.svg";
import axios from 'axios';
import ThreeArticle from "../components/ThreeArticle";
import deleteSvg from "../icons/deleteSvg.svg";

const CardItem = ({ item, ajouterAuPanier }) => {
  const handleDelete = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const response = await axios.delete(`${backendUrl}/article/${item.id}`);
          alert("Article supprimé avec succès");
      window.location.reload();
    } catch (error) {
      alert('Erreur lors de la suppression de l\'article');
    }
  };

  const handleAddToCart = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const response = await axios.post(`${backendUrl}/panier`,  {
        user: "lulu@test.com", // Remplacer par l'utilisateur actuel
        articleId: item.id,
        quantite: 1
      });
    // Vérifier la réponse pour s'assurer que l'article a été ajouté avec succès
    if (response.status === 200 || response.data.success) {
      alert('Article ajouté au panier avec succès');
    } else {
      alert('Échec de l\'ajout de l\'article au panier');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'article au panier :', error);
    alert('Erreur lors de l\'ajout de l\'article au panier');
  }
};

  return (
    <div className="CardItem">
      <div className="leftSide">
        <div className="threeArticle">
          <ThreeArticle type={item.hoodie} color={item.couleur} />
        </div>
        <p className="productName">{item.hoodie}</p>
      </div>
      <div className="rightSide">
        <div className="sizePrice">
          <p>Taille: {item.taille}</p>
          <p>Prix: ${item.prix}</p>
        </div>
        <button className="ajouterBtn" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
        <div className="deleteIcon">
          <button className="boutonIconEdit"><img src={edit} alt="edit icon" style={{width: "25px", height:"auto"}}/></button>
          <button className="boutonIcon" onClick={handleDelete}><img src={deleteSvg} alt="delete icon" style={{width: "25px", height:"auto"}}/></button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
