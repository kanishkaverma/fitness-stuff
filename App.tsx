import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "./tamagui.config";

// you usually export this from a tamagui.config.ts file
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// const tamaguiConfig: any = createTamagui(config);

// make TypeScript type everything based on your config
// type Conf = typeof tamaguiConfig;
// declare module "@tamagui/core" {
// interface TamaguiCustomConfig extends Conf {}
// }

export default () => {
	return <TamaguiProvider>{/* your app here */}</TamaguiProvider>;
};
