import React, { useState, useEffect} from "react";
// import imgHomePage from "../images/imgHomePage.jpg";
import "./home.css";
import ThreeSceneHome from '../components/threeHome';



function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3); // Cycle through 3 slides
  };

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="mainDiv">
      {/* First part */}
      <div className="parent">
        <div className="child">
          <h2 className="slogan">
            Nous vous proposons de créer votre propre style. Sutairu se tient
            prêt pour accueillir les amateurs de prêt-à-porter
          </h2>
          <a href="/creerdesign" className="customLink">
            Créer votre design
          </a>
        </div>

        <div className="img-three">
          <ThreeSceneHome/>
        </div>
        
      </div>

      {/* Second part */}
      <div className="parent2">
        {/* Carousel container */}
        <div className="container">
          <div
            style={{background: "#0E4A65"}}
            className={`slide ${currentSlide === 0 ? "active" : ""}`}
            id="slide1"
          >
            PANTALON
          </div>
          <div
            style={{background: "#0E4A65"}}
            className={`slide ${currentSlide === 1 ? "active" : ""}`}
            id="slide2"
          >
            CHAUSSETTE
          </div>
          <div
            style={{background: "#0E4A65"}}
            className={`slide ${currentSlide === 2 ? "active" : ""}`}
            id="slide3"
          >
            IMAGE PULL
          </div>
        </div>

        <div className="child">
          <h2 className="slogan">
            Nous vous aidons en vous proposant des modèles déjà existant
          </h2>
          <a href="/" className="customLink">
            Galerie modèle
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;