import React, { useState } from "react";
import "./myprofile.css";
import 'react-phone-number-input/style.css'; // Importez la feuille de style
import PhoneInput from 'react-phone-number-input';

export default function MyProfile() {
  const [numeroTelephone, setNumeroTelephone] = useState('+33');
  return (
    <div className='profile_page_container'>

    <div className='profile_page_card'>
      <div className='items_left'>
        <div className='profile_label'>
          <label>Prénom</label>
          <p>Jean</p>
        </div>
        <div className='profile_label'>
          <label>Nom</label>
          <p>LUCS</p>
        </div>
        <div className='profile_label'>
          <label>Mail</label>
          <p>thisisamail@gmail.com</p>
        </div>
        <div className='profile_label'>
          <label>Mot de passe</label>
          <p>·····················</p>
        </div>
        <div className='profile_label'>
          <label>Date de naissance</label>
          <p><input type="date" id="date_naissance" name="date_naissance" placeholder="jj/mm/aaaa"/></p>
        </div>
        <div className='profile_label'>
          <label className="phone">Téléphone :</label>
          <PhoneInput
          className="phone"
          placeholder="Entrez le numéro de téléphone"
          value={numeroTelephone}
          onChange={setNumeroTelephone}
          />
        </div>
        <div className='profile_label last'>
          <label>RECEVOIR NOS NOTIFICATIONS</label>
          <div>
            <input type="radio" id="true" name="notification" value="oui"/>
            <label for="true" class="oui-label">Oui</label>

            <input type="radio" id="false" name="notification" value="non"/>
            <label for="false" class="non-label">Non</label>
          </div>
        </div>
      </div>

      <div className='items_right'>
        <div className='profile_label'>
          <label>Changer mon mot de passe</label>
        </div>
        <div className='profile_label'>
          <label>Ancien mot de passe</label>
          <p><input type="password" placeholder="Ancien mot de passe" /></p>
        </div>
        <div className='profile_label'>
          <label>Nouveau mot de passe</label>
          <p><input type="password" placeholder="Nouveau mot de passe" /></p>
          <button className="btn">Sauvegarder</button>
        </div>
        <div className='profile_label'>
          <button className='deco_btn'>Déconnexion</button>
        </div>
      </div>
    </div>
  </div>
)
}