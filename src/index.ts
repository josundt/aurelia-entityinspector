import { PLATFORM, type FrameworkConfiguration } from "aurelia-framework";

export function configure(aurelia: FrameworkConfiguration): void {
    aurelia.globalResources([PLATFORM.moduleName("./entityinspector")]);
}
