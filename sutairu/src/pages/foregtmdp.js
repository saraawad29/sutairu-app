import React from "react";
import connexion from "../images/connexion.jpg";
import "./inscription.css";
export default function ForgetMdpPage() {
  return (
    <div class="container">
      <div class="image-section">
        <img src={connexion} alt="connexion" />
      </div>
      <div class="connection-section">
        <h2>SUTAÏRU</h2>
        <div class="text-mdp">
          Changement de mot de passe
        </div>
        <div class="text">
        <p>Si votre mail existe dans notre base, vous receverez un mail avec <br/>un lien que vous permetra de changer votre mot de passe.</p>
        </div>
        <div class="input-mdp">
        <label for="email">Email du compte </label>
        <input type="email" id="email" />
        </div>
        <button type="button" className="button-mdp">Envoyer</button>
      </div>
    </div>
  );
}