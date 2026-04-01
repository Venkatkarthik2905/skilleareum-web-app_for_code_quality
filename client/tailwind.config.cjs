/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        zen: ['Zen Kaku Gothic Antique', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        bricolagegrotesque: ['Bricolage Grotesque', 'sans-serif'],
        worksans: ['Work Sans', 'sans-serif'],
        inriaserif: ['Inria Serif', 'serif'],
        play: ['Play', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif' ],
        bakbak: ['Bakbak One', 'sans-serif'],
        roboto: [ 'Roboto' , 'sans-serif' ],
        san: ['San Francisco','sans-serif'],
        krona: ['Krona One','sans-serif'],
        zendots: ['Zen Dots', 'sans-serif'],
        space: [ 'Space Grotesk', 'serif'],
        gilroy: ['gilroy', 'sans-serif'],
        artemus: ['artemus', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        pressstart: ['Press Start 2P', 'system-ui'],

    },

    // keyframes: {
    //   bubble: {
    //     '0%': { transform: 'translateY(100vh) scale(0.5)', opacity: 1 },
    //     '50%': { transform: 'translateY(-50vh) scale(1.2)', opacity: 1 },
    //     '100%': { transform: 'translateY(-100vh) scale(0.5)', opacity: 1 },
    //   },
    // },
    // animation: {
    //   bubble: 'bubble 15s linear infinite',
    // },    

    animation: {
      flow: "flow 2s linear infinite",
      glow: "glow 1.5s ease-in-out infinite alternate",
    },
    keyframes: {
      flow: {
        "0%": { opacity: "0", transform: "translateX(-10px)" },
        "100%": { opacity: "1", transform: "translateX(0)" }
      },
      glow: {
        "0%": { boxShadow: "0px 0px 5px #1EEF32" },
        "100%": { boxShadow: "0px 0px 15px #1EEF32" }
      }
    },


    animation: {
      zoomMove: "zoomMove 2s infinite ease-in-out",
    },
    keyframes: {
      zoomMove: {
        "0%, 100%": { transform: "scale(0.5) translateY(0)" },
        "50%": { transform: "scale(1) translateY(0)" },
      },
    },
  },
  },
  plugins: [],
}


