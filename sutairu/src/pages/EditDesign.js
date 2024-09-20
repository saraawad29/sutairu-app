import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import swipe from "../icons/swipe.svg";
import share from "../icons/share.svg";
import ThreeSceneEdit from "../components/ThreeSceneEdit";
import { CirclePicker } from "react-color";
import "./createdesign.css";
 
export default function EditDesign() {
    const navigate = useNavigate();
    const { id } = useParams();
 
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedChoix, setSelectedChoix] = useState("Hoodie");
    const [color, setColor] = useState("#ffffff");
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [texte, setTexte] = useState("");
    const [logo, setLogo] = useState("");
    const [articleLoaded, setArticleLoaded] = useState(false);
 
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/article/${id}`);
                const article = response.data;
                setSelectedSize(article.taille || "M");
                setSelectedChoix(article.hoodie || "Hoodie");
                setColor(article.couleur || "#ffffff");
                setTexte(article.texte || "");
                setLogo(article.logo || "");
                setArticleLoaded(true);
            } catch (error) {
                console.error("Erreur lors du chargement de l'article :", error);
            }
        };
 
        fetchArticle();
    }, [id]);
 
    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/article/${id}`, {
                hoodie: selectedChoix,
                taille: selectedSize,
                couleur: color,
                texte: texte,
                logo: logo,
                prix: 28.99
            });
            console.log(response.data.message);
            alert("Article mis à jour avec succès");
            navigate("/designs");
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error.response?.data || error.message);
            alert("Erreur lors de la mise à jour de l'article");
        }
    };
 
    const openColorPicker = () => setShowColorPicker(true);
    const closeColorPicker = () => setShowColorPicker(false);
    const handleColorChange = (newColor) => setColor(newColor.hex);
    const redirecttoPanier = () => navigate("/panier");
    const redirecttoMesDesigns = () => navigate("/designs");
 
    const [btnClicked, setBtnClicked] = useState(false);
    const [btnChoice, setBtnChoice] = useState(false);
 
    const tailleInputClicked = () => setBtnClicked(!btnClicked);
    const choixInputClicked = () => setBtnChoice(!btnChoice);
    const handleSizeSelection = (size) => setSelectedSize(size);
    const handleChoixSelection = (choix) => setSelectedChoix(choix);
 
    return (
        <div className="container">
            <div className="left-part">
                <h2 className="create-design">Modifier votre design</h2>
                <div className="img-scene">
                    {articleLoaded && (
                        <ThreeSceneEdit color={color} setColor={setColor} choice={selectedChoix} text={texte} />
                    )}
                </div>
                <div className="button-container">
                    <button>
                        <img src={swipe} alt="swipe" />
                    </button>
                    <button>
                        <img src={share} alt="share" />
                    </button>
                </div>
            </div>
            <div className="right-part">
                <input
                    onClick={choixInputClicked}
                    type="text"
                    placeholder={selectedChoix ? `${selectedChoix}` : "Choix"}
                />
                {btnChoice && (
                    <div className="button-row">
                        <button onClick={() => handleChoixSelection("Hoodie")}>Hoodie</button>
                        <button onClick={() => handleChoixSelection("T-shirt")}>T-shirt</button>
                    </div>
                )}
                <input
                    onClick={tailleInputClicked}
                    type="text"
                    placeholder={selectedSize ? `${selectedSize}` : "Taille"}
                />
                {btnClicked && (
                    <div className="button-row">
                        <button onClick={() => handleSizeSelection("XS")}>XS</button>
                        <button onClick={() => handleSizeSelection("S")}>S</button>
                        <button onClick={() => handleSizeSelection("M")}>M</button>
                        <button onClick={() => handleSizeSelection("L")}>L</button>
                        <button onClick={() => handleSizeSelection("XL")}>XL</button>
                        <button onClick={() => handleSizeSelection("XXL")}>XXL</button>
                    </div>
                )}
                <input type="text" placeholder="Couleur" onClick={openColorPicker} value={color} readOnly />
                {showColorPicker && (
                    <div style={{ zIndex: "1" }}>
                        <CirclePicker color={color} onChange={handleColorChange} />
                        <button onClick={closeColorPicker}>Fermer</button>
                    </div>
                )}
                <input type="text" placeholder="Texte" value={texte} onChange={(e) => setTexte(e.target.value)} />
                <input type="text" placeholder="Logo" value={logo} onChange={(e) => setLogo(e.target.value)} />
                <div className="price">
                    <span>Prix : </span>
                    <span>28,99€</span>
                </div>
                <button onClick={handleSave} className="sauvgarder">Sauvegarder</button>
                
            </div>
        </div>
    );
}