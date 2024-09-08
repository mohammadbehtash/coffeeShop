/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: ["./src/**/*.html"],
  theme: {
    extend: {
      colors:{
        "brown":{
          100:"#9CA3AF",
          300:"#DBC1AC",
          600:"#967259",
          900:"#634832"
        }
      },
      boxShadow:{
        "normal":" 0px 1px 10px 0px rgba(0, 0, 0, 0.05)",
        
      },
      borderColor:{
        "4xl":"2rem"
      },
      fontFamily:{
        "Dana":"Dana",
        "DanaMedium":" DMedium",
        "DanaDemiBold":" DDemiBold",
        "MorabbLight":"Morabba Light",
        "MorabbaMedium":"Morabba Medium",
        "MorabbaBold":"Morabba Bold",
      },
      letterSpacing:{
        "tightest":"-0.065em"
      },
      container:{
        center:true,
        padding:{
          DEFAULT:"1rem",
          lg:"0.625rem"
        }
      },
      backgroundImage:{
        "home-modile":"url(/headerBgMobile.webp)",
        "home-desktop":"url(/headerBgDesktop.webp)"
      },
      spacing:{
        "4.5":"1.125rem",
        "25":"6.25rem",
        "50":"12.5rem"
      }
    },
    screens: {
      'xs':'480px',
      'sm': '640px',
     

      'md': '768px',
     

      'lg': '1024px',


      'xl': '1280px',
      
    },
  },
  plugins: [
    function ({addVariant}){
      addVariant('child','& > *');
      addVariant('child-hover','& > *:hover');
    }
  ],
}

