import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { OnlineIcon, DataIcon, AIIcon, PlatformIcon, EcosystemIcon } from "./icons";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 招商银行数字化转型五大图标 */}
      <Composition
        id="OnlineIcon"
        component={OnlineIcon}
        durationInFrames={180}
        fps={30}
        width={800}
        height={800}
      />
      <Composition
        id="DataIcon"
        component={DataIcon}
        durationInFrames={180}
        fps={30}
        width={800}
        height={800}
      />
      <Composition
        id="AIIcon"
        component={AIIcon}
        durationInFrames={180}
        fps={30}
        width={800}
        height={800}
      />
      <Composition
        id="PlatformIcon"
        component={PlatformIcon}
        durationInFrames={180}
        fps={30}
        width={800}
        height={800}
      />
      <Composition
        id="EcosystemIcon"
        component={EcosystemIcon}
        durationInFrames={180}
        fps={30}
        width={800}
        height={800}
      />

      {/* 原有示例 */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
