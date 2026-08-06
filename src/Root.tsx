import "./index.css";
import { Composition } from "remotion";
import { NubankCard360 } from "./NubankCard360";
import { videoFormats, defaultFormat } from "./brand";

export const RemotionRoot: React.FC = () => {
  const format = videoFormats[defaultFormat];

  return (
    <>
      <Composition
        id="NubankCard360"
        component={NubankCard360}
        durationInFrames={120}
        fps={format.fps}
        width={format.width}
        height={format.height}
      />
    </>
  );
};
