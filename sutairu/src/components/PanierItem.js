import React from "react";
import "../pages/mesdesign.css";
import edit from "../icons/edit.svg";

import deleteSvg from "../icons/deleteSvg.svg";

const PanierItem = ({ item }) => {
  return (
    <div className="CardItem">
      <div className="leftSide">
        <img src={item.image} alt={item.name} />
        <p className="productName">{item.name}</p>
      </div>
      <div className="rightSide">
        <div className="sizePrice-panier">
          <p>Taille: {item.size}</p>
          <p>Prix: ${item.price}</p>
        </div>
        <div className="deleteIcon">
          <img src={edit} alt="edit icon" style={{width: "25px", height:"auto"}}/>
          <img src={deleteSvg} alt="delete icon" style={{width: "25px", height:"auto"}}/>
        </div>
      </div>
    </div>
  );
};

export default PanierItem;