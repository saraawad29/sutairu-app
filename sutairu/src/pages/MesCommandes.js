import React, { useState, useEffect } from "react";
import "./mesCommandes.css";
import StripeContainer from "../stripe/StripeContainer";
import axios from "axios";
import ThreeArticle from "../components/ThreeArticle"
function MesCommandes() {
  const [panier, setPanier] = useState([]);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

        const response = await axios.get(`${backendUrl}/panier/lulu@test.com`);
        setPanier(response.data.articles);
      } catch (error) {
        console.error('Erreur lors de la récupération du panier :', error);
      }
    };

    fetchPanier();
  }, []);

  const calculerPrixTotal = () => {
    let total = 0;
    panier.forEach((item) => {
      if (item.article) {
        total += item.article.prix * item.quantite;
      }
    });
    return total;
  };

  // const [isModalVisible, setIsModalVisible] = useState(false);

  // // Function to toggle the modal's visibility
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const redirectionsPageHome = () => {
  //   navigate("/");
  // };

  // const closeModal = () => {
  //   setIsModalVisible(false);
  // };

  // const countryOptions = Object.keys(countries).map((code) => ({
  //   code,
  //   name: countries[code].name,
  // }));
  
  return (
    <div className="main-container-commandes">
      <div className="card-container-commandes">
        <div className="card-commandes">
          {panier.map((item) => (
            <div key={item.article._id} className="CardItem-commandes">
              <div className="leftSide-commandes">
                {item.article && (
                  <>
                    <ThreeArticle type={item.article.hoodie} color={item.article.couleur} />
                    <p className="productName-commandes">{item.article.hoodie}</p>
                  </>
                )}
              </div>
              <div className="rightSide-commandes">
                <div className='detail-commandes'>
                  {item.article && (
                    <>
                      <p>Taille : {item.article.taille}</p>
                      <p>Quantité : {item.quantite}</p>
                      <p>Prix : {item.article.prix}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
        <div className="button-container">
            <button className="prixBtn-commandes">
              Prix total : ${calculerPrixTotal()}
            </button>
          </div>
      </div>
      
      <div className="payment-container">
        <div className="payment-form">
          <h1>Le payement</h1>
          <div className="payment-options">
            <button className="option selected">Cartes</button>
          </div>
          <div class="form-group">
            <StripeContainer amount={calculerPrixTotal()}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MesCommandes;
