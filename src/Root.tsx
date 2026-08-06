import "./index.css";
import { Composition } from "remotion";
import { HojeEmSP } from "./HojeEmSP";
import { videoFormats, defaultFormat } from "./brand";

export const RemotionRoot: React.FC = () => {
  const format = videoFormats[defaultFormat];

  return (
    <>
      <Composition
        id="HojeEmSP"
        component={HojeEmSP}
        durationInFrames={150}
        fps={format.fps}
        width={format.width}
        height={format.height}
      />
    </>
  );
};
