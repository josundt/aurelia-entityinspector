import { PLATFORM, type FrameworkConfiguration } from "aurelia-framework";
import { EntityNavigator } from "./utils/entity-navigator.js";

export type { IEntityNavigator } from "./utils/entity-navigator.js";
export { EntityNavigator };

export function configure(aurelia: FrameworkConfiguration): void {
    aurelia.globalResources([PLATFORM.moduleName("./entityinspector")]);
}
