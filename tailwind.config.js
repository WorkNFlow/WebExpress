/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "window": "0 0 2rem",
        "blog": "0 0 1rem"
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null, // Убираем ограничение
            ".prose-content": {
              width: "100%",
            },
            img: {
              height: "auto",
              width: "auto",
            },
            h1: {
              color: "#ffffff"
            },
            h2: {
              color: "#ffffff"
            },
            h3: {
              color: "#ffffff"
            },
            h4: {
              color: "#ffffff"
            },
            h5: {
              color: "#ffffff"
            },
            h6: {
              color: "#ffffff"
            },

            strong: {
              color: "#ffffff"
            },

            code: {
              color: "#ffffff"
            },

            figcaption: {
              color: "#ffffff"
            },

            li: {
                margin: "0"
            }
          }
        }
      }
    },
    colors: {
      "bg": "#202020",
      "primary": "#ff7a00",
      "hover": "#cc5800",
      "secondary": "#646464",
      "text": "#ffffff"
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}