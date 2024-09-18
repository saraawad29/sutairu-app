import React from "react";
import commande from "../icons/commande.svg";
import realisationducolis from "../icons/realisationducolis.svg";
import entransaction from "../icons/entransaction.svg";
import livraisoneffectue from "../icons/livraisoneffectue.svg";
import "./moncolis.css";

function MonColis() {
  return (
    <div>
      <h2 class="titre">Suivre mon colis</h2>
      <div class="process-wrapper">
        <div class="process-step">
          <div class="process-icon">
            <img src={commande} alt="commande" />
          </div>
          <div class="process-text">Commandé</div>
        </div>
        <div class="line"></div>
        <div class="process-step">
          <div class="process-icon">
            <img src={realisationducolis} alt="realisationducolis" />
          </div>
          <div class="process-text">Réalisation du colis</div>
        </div>
        <div class="line"></div>
        <div class="process-step">
          <div class="process-icon">
            <img src={entransaction} alt="entransaction" />
          </div>
          <div class="process-text">En transaction</div>
        </div>
        <div class="line"></div>
        <div class="process-step">
          <div class="process-icon">
            <img src={livraisoneffectue} alt="livraisoneffectue" />
          </div>
          <div class="process-text">Livraison effectuée</div>
        </div>
      </div>
      <div className="footpart">
        <button>Livraison le 00/00/0000</button>
        <button>Télécharger la facture </button>
      </div>
    </div>
  );
}

export default MonColis;