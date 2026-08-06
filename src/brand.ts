// src/brand.ts
// Fonte única da identidade visual da marca.
// Qualquer composição Remotion deve importar valores daqui — nunca hardcode cor/fonte/logo direto numa composição.

export const colors = {
  primary: "#ffffff",    // cor primária — usada como fundo (background)
  secondary: "#000000",  // cor secundária — usada nas fontes (texto)
  background: "#ffffff", // alias explícito de fundo, aponta pra primary
  text: "#000000",       // alias explícito de texto, aponta pra secondary
} as const;

export const fonts = {
  heading: {
    family: "Clofie",
    variants: {
      semiBold: { weight: 600, src: "/fonts/Clofie-SemiBold.ttf" },
      extraBold: { weight: 800, src: "/fonts/Clofie-ExtraBold.ttf" },
    },
  },
  sub: {
    family: "Gold & Queen",
    weight: 400,
    src: "/fonts/Gold-and-Queen.ttf",
  },
} as const;

export const logos = {
  primary: "logos/barqwhite.png",   // logo principal — usar por padrão nas animações
  black: "logos/barqblack.png",     // versão preta — usar sobre fundos claros/coloridos
  whiteAlt: "logos/barqwhite1.png", // variação branca alternativa
  blackAlt: "logos/barqblack1.png", // variação preta alternativa
  abbr: "logos/barq.png",           // abreviação da logo
} as const;

// Formatos de vídeo suportados pela marca.
export const videoFormats = {
  square: { width: 1080, height: 1080, fps: 30 },
  vertical: { width: 1080, height: 1440, fps: 30 }, // proporção 3:4
  widescreen: { width: 1920, height: 1080, fps: 30 },
} as const;

export const defaultFormat: keyof typeof videoFormats = "vertical";

export type BrandFormat = keyof typeof videoFormats;
