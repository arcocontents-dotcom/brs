// src/brand.ts
// Fonte única da identidade visual da marca.
// Qualquer composição Remotion deve importar valores daqui — nunca hardcode cor/fonte/logo direto numa composição.

export const colors = {
  primary: "#000000",      // TODO: cor principal da marca
  secondary: "#FFFFFF",    // TODO: cor secundária
  accent: "#FF0000",       // TODO: cor de destaque/CTA
  background: "#0A0A0A",   // TODO: fundo padrão dos vídeos
  text: "#FFFFFF",         // TODO: cor de texto padrão
} as const;

export const fonts = {
  heading: {
    family: "TODO",              // TODO: nome da fonte de título
    weight: 700,
    src: "/fonts/TODO.ttf",      // caminho relativo a /public
  },
  body: {
    family: "TODO",              // TODO: nome da fonte de corpo
    weight: 400,
    src: "/fonts/TODO.ttf",
  },
} as const;

export const logos = {
  primary: "logos/TODO.png",   // TODO: logo principal
  black: "logos/TODO.png",     // TODO: versão preta
} as const;

export const videoFormats = {
  square: { width: 1080, height: 1080, fps: 30 },
  vertical: { width: 1080, height: 1440, fps: 30 }, // proporção 3:4
  widescreen: { width: 1920, height: 1080, fps: 30 },
} as const;

export const defaultFormat: keyof typeof videoFormats = "vertical";

export type BrandFormat = keyof typeof videoFormats;
