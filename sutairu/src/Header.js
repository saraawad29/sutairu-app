import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import Navbar from "./components/NavBar";

function Header({ children }) {
  const location = useLocation(); // Get the current location

  // List of paths where the Navbar should not be shown
  const hideNavBarOnPaths = ["/connexion", "/inscription", "/changement-mot-de-passe"];
  // const headerText = {
  //   "/": "SUTAÏRU", // Homepage
  //   "/about": "About Us", // About page
  //   "/creerdesign": "Créer ton design", // Contact page
  //   "/mesdesigns": "Mes Designs",
  //   "/moncolis": "Suivre Mon Colis",
  //   // Add other pathnames and names as needed
  // };
  const showNavBar = !hideNavBarOnPaths.includes(location.pathname);

  return (
    <div>
      {showNavBar && (
        <div>
          <Navbar name="SUTAÏRU" />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export default Header;