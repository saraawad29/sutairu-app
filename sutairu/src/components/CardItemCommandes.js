import React from "react";
import "../pages/mesdesign.css";
import "./cardItemCommandes.css";

const CardItemCommandes = ({ item }) => {
  return (
    <div className="CardItemCommandes">
      <div className="leftSideCommandes">
        <img src={item.image} alt={item.name} />
        <p className="productNameCommandes">{item.name}</p>
        <div className="sizePriceCommandes">
          <p>Price: ${item.price}</p>
        </div>  
      </div>
    </div>
  );
};

export default CardItemCommandes;
