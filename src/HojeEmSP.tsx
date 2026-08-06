import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { loadFont } from "@remotion/fonts";
import { colors, fonts, logos } from "./brand";

// Converte os caminhos do brand.ts (que às vezes têm "/" inicial) para o
// formato que staticFile() espera (sem barra inicial).
const asset = (p: string) => staticFile(p.replace(/^\//, ""));

// Carrega as fontes locais da marca. loadFont() cuida do delayRender()
// internamente, garantindo que o render aguarde as fontes.
loadFont({
  family: fonts.heading.family,
  url: asset(fonts.heading.variants.extraBold.src),
  weight: String(fonts.heading.variants.extraBold.weight),
});
loadFont({
  family: fonts.heading.family,
  url: asset(fonts.heading.variants.semiBold.src),
  weight: String(fonts.heading.variants.semiBold.weight),
});
loadFont({
  family: fonts.sub.family,
  url: asset(fonts.sub.src),
  weight: String(fonts.sub.weight),
});

// Logo principal (arte preta dentro do PNG) sobre fundo branco.
const LOGO = logos.primary;

// Fundo branco + textos pretos.
const BG = colors.primary; // #ffffff
const FG = colors.secondary; // #000000

// Curva de entrada: desaceleração natural, sem overshoot nem bounce.
const EASE_IN = Easing.out(Easing.cubic);
const EASE_OUT = Easing.in(Easing.cubic);

// Deslocamento sutil e scale 98%→100%, conforme a filosofia de motion da marca.
const RISE = 22; // px — deslocamento vertical discreto na entrada
const DUR = 18; // frames de duração de cada entrada

export const HojeEmSP: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fator de entrada (0→1) de um elemento a partir de `start`.
  const enter = (start: number) =>
    interpolate(frame, [start, start + DUR], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_IN,
    });

  // Estilo de entrada: fade + pequeno deslocamento + scale 98%→100%.
  const entrance = (start: number) => {
    const p = enter(start);
    return {
      opacity: p,
      transform: `translateY(${(1 - p) * RISE}px) scale(${interpolate(
        p,
        [0, 1],
        [0.98, 1],
      )})`,
    };
  };

  // Entradas escalonadas para o conteúdo "respirar".
  const logo = entrance(0);
  const title = entrance(10);
  const sub = entrance(20);

  // Saída do grupo espelhando a entrada: fade + leve redução de escala +
  // pequeno deslocamento para cima. Começa perto do fim da composição.
  const outStart = durationInFrames - 20;
  const out = interpolate(frame, [outStart, durationInFrames - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  const groupStyle = {
    opacity: 1 - out,
    transform: `translateY(${-out * 12}px) scale(${interpolate(
      out,
      [0, 1],
      [1, 0.98],
    )})`,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <CameraMotionBlur shutterAngle={180} samples={8}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            ...groupStyle,
          }}
        >
          <Img
            src={asset(LOGO)}
            style={{
              width: 420,
              height: "auto",
              marginBottom: 24,
              ...logo,
            }}
          />

          <h1
            style={{
              margin: 0,
              fontFamily: `"${fonts.heading.family}"`,
              fontWeight: fonts.heading.variants.extraBold.weight,
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: FG,
              textAlign: "center",
              ...title,
            }}
          >
            HOJE EM SP
          </h1>

          <p
            style={{
              margin: 0,
              fontFamily: `"${fonts.sub.family}"`,
              fontWeight: fonts.sub.weight,
              fontSize: 80,
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: FG,
              textAlign: "center",
              ...sub,
            }}
          >
            Vamos de avião?
          </p>
        </AbsoluteFill>
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
