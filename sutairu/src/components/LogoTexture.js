import { CanvasTexture,TextureLoader } from 'three';

export default function createLogoTexture(logoImage, color) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const image = new Image();

  canvas.width = 256;
  canvas.height = 256;
  return new Promise((resolve, reject) => {
    image.src = logoImage;
    image.onload = () => {
      // Définir la taille du logo
      const logoWidth = 20; // ajuster la largeur du logo
      const logoHeight = 20; // ajuster la hauteur du logo

      // Calculer les offsets pour centrer le logo
      const offsetX = (canvas.width - logoWidth) / 6;
      const offsetY = (canvas.height - logoHeight) / 2 +10;

      // Définir la couleur de fond du canvas
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner le logo sur le canvas
      context.drawImage(image, offsetX, offsetY, logoWidth, logoHeight);

      // Créer la texture
      const texture = new TextureLoader().load(canvas.toDataURL());
      texture.needsUpdate = true;
      resolve(texture);
    };
    image.onerror = (error) => {
      reject(error);
    };
  });
}

export function createTextTexture(text, color) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 512;
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.font = '20px Arial';
  context.fillText(text, 50, 256);
  const texture = new TextureLoader().load(canvas.toDataURL());
  texture.needsUpdate = true;
  return texture;
}

// import { TextureLoader } from 'three';

// export default function createLogoTexture(logoImage, text, color) {
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   const image = new Image();

//   canvas.width = 256; // Augmenter la taille du canvas pour améliorer la résolution
//   canvas.height = 256;

//   return new Promise((resolve, reject) => {
//     image.src = logoImage;
//     image.onload = () => {
//       // Définir la taille du logo
//       const logoWidth = 20; // ajuster la largeur du logo
//       const logoHeight = 20; // ajuster la hauteur du logo

//       // Calculer les offsets pour centrer le logo
//       const offsetX = (canvas.width - logoWidth) / 6;
//       const offsetY = (canvas.height - logoHeight) / 2;

//       // Définir la couleur de fond du canvas
//       context.fillStyle = color;
//       context.fillRect(0, 0, canvas.width, canvas.height);

//       // Dessiner le logo sur le canvas
//       context.drawImage(image, offsetX, offsetY, logoWidth, logoHeight);

//       // Ajouter du texte en dessous du logo
//       context.fillStyle = 'white'; // Couleur du texte
//       context.font = '20px Arial'; // Taille et police du texte
//       context.textAlign = 'center';
//       context.fillText(text, canvas.width / 2, canvas.height - 20); // Position du texte

//       // Créer la texture
//       const texture = new TextureLoader().load(canvas.toDataURL());
//       texture.needsUpdate = true;
//       resolve(texture);
//     };
//     image.onerror = (error) => {
//       reject(error);
//     };
//   });
// }

