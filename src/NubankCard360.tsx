import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { colors } from "./brand";

// ---------------------------------------------------------------------------
// Nubank Card 360 — um cartão girando 360° no eixo Y, com borrão de movimento.
// O cartão é o SUJEITO da animação, então usa a identidade visual do Nubank
// (roxo). O fundo da cena respeita colors.background do brand.ts.
// ---------------------------------------------------------------------------

// Cores do Nubank (subject da peça, não da marca do projeto).
const NU_PURPLE = "#820AD1";
const NU_PURPLE_DARK = "#5B0794";
const NU_PURPLE_LIGHT = "#9F2BE0";

// Dimensões do cartão (proporção padrão de cartão ~1.586:1).
const CARD_W = 620;
const CARD_H = 391;
const RADIUS = 34;

// Curva de rotação: acelera e desacelera suave, sem tranco.
const SPIN_EASE = Easing.inOut(Easing.cubic);

const Face: React.FC<{
  children?: React.ReactNode;
  back?: boolean;
}> = ({ children, back = false }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      width: CARD_W,
      height: CARD_H,
      borderRadius: RADIUS,
      backfaceVisibility: "hidden",
      transform: back ? "rotateY(180deg)" : undefined,
      background: back
        ? `linear-gradient(160deg, ${NU_PURPLE_DARK} 0%, ${NU_PURPLE} 100%)`
        : `linear-gradient(145deg, ${NU_PURPLE_LIGHT} 0%, ${NU_PURPLE} 45%, ${NU_PURPLE_DARK} 100%)`,
      boxShadow:
        "0 40px 80px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.15)",
      overflow: "hidden",
      color: "#ffffff",
      fontFamily: "Helvetica, Arial, sans-serif",
    }}
  >
    {children}
  </div>
);

const FrontFace: React.FC = () => (
  <Face>
    {/* Brilho sutil diagonal */}
    <div
      style={{
        position: "absolute",
        top: -CARD_H,
        left: -CARD_W * 0.2,
        width: CARD_W * 0.5,
        height: CARD_H * 3,
        transform: "rotate(22deg)",
        background:
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 100%)",
      }}
    />

    {/* Chip */}
    <div
      style={{
        position: "absolute",
        top: 46,
        left: 46,
        width: 62,
        height: 48,
        borderRadius: 10,
        background: "linear-gradient(135deg, #E9D9A8, #C9A84B)",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
      }}
    />

    {/* Contactless */}
    <div
      style={{
        position: "absolute",
        top: 52,
        left: 128,
        width: 34,
        height: 34,
        borderRight: "3px solid rgba(255,255,255,0.85)",
        borderTop: "3px solid rgba(255,255,255,0.85)",
        borderRadius: "0 30px 0 0",
        transform: "rotate(0deg)",
      }}
    />

    {/* Wordmark nubank */}
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 48,
        fontSize: 40,
        fontWeight: 800,
        letterSpacing: "-0.02em",
      }}
    >
      nubank
    </div>

    {/* Número do cartão */}
    <div
      style={{
        position: "absolute",
        bottom: 96,
        left: 48,
        fontSize: 34,
        letterSpacing: "0.18em",
        fontVariantNumeric: "tabular-nums",
        textShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      ●●●● ●●●● ●●●● 3607
    </div>

    {/* Nome do titular */}
    <div
      style={{
        position: "absolute",
        bottom: 44,
        left: 48,
        fontSize: 22,
        letterSpacing: "0.12em",
        opacity: 0.92,
      }}
    >
      SEU NOME AQUI
    </div>

    {/* Bandeira (dois círculos estilo Mastercard) */}
    <div
      style={{
        position: "absolute",
        bottom: 42,
        right: 48,
        width: 74,
        height: 46,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "#EB001B",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "#F79E1B",
          mixBlendMode: "hardLight",
        }}
      />
    </div>
  </Face>
);

const BackFace: React.FC = () => (
  <Face back>
    {/* Tarja magnética */}
    <div
      style={{
        position: "absolute",
        top: 52,
        left: 0,
        width: "100%",
        height: 62,
        background: "#150022",
      }}
    />

    {/* Faixa de assinatura + CVV */}
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 48,
        right: 48,
        height: 54,
        borderRadius: 6,
        background: "#EDE6F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 18,
        color: "#3a2a4a",
        fontSize: 26,
        letterSpacing: "0.15em",
        fontStyle: "italic",
      }}
    >
      360
    </div>

    {/* Wordmark discreto no rodapé */}
    <div
      style={{
        position: "absolute",
        bottom: 40,
        right: 48,
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        opacity: 0.9,
      }}
    >
      nubank
    </div>
  </Face>
);

export const NubankCard360: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Uma volta completa (360°) ao longo de toda a composição, com aceleração
  // e desaceleração suaves nas pontas.
  const rotateY = interpolate(frame, [0, durationInFrames - 1], [0, 360], {
    easing: SPIN_EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Entrada sutil: fade + leve aproximação (scale 96%→100%).
  const enter = interpolate(frame, [0, 16], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flutuação vertical delicada, para o cartão "respirar" no espaço.
  const floatY = Math.sin((frame / durationInFrames) * Math.PI * 2) * 14;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Halo de luz atrás do cartão */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 44%, ${NU_PURPLE}33 0%, transparent 55%)`,
        }}
      />

      <CameraMotionBlur shutterAngle={220} samples={12}>
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              perspective: 1600,
              opacity: enter,
              transform: `translateY(${floatY}px) scale(${interpolate(
                enter,
                [0, 1],
                [0.96, 1],
              )})`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: CARD_W,
                height: CARD_H,
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotateY}deg)`,
              }}
            >
              <FrontFace />
              <BackFace />
            </div>
          </div>
        </AbsoluteFill>
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
