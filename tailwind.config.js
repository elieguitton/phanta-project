// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        colors: {
          primary: "#8B4513", // Brun chaud
          secondary: "#DAA520", // Doré
          accent: "#4B0082", // Indigo profond
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        },
        fontFamily: {
          fancy: ["Cinzel", "serif"], // Ambiance médiévale / luxueuse
          body: ["Lora", "serif"],
        },
      },
    },
  };

