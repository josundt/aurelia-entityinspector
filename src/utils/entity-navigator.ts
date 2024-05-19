import { inject, singleton } from "aurelia-framework";
import type { PropElement } from "../elements/prop.js";
import { VmUtil, type IVmUtil } from "./vm-util.js";

export interface IEntityNavigator {
    navigateToEntityAsync(
        jsonPointer: string,
        rootElem: HTMLElement
    ): Promise<void>;
}

type ContainerElement = HTMLElement & { tagName: "EI-CONTAINER" };

@singleton()
@inject(VmUtil)
export class EntityNavigator implements IEntityNavigator {
    constructor(private readonly vmUtil: IVmUtil) {}

    async navigateToEntityAsync(
        jsonPointer: string,
        inspectorOrContainerElem: HTMLElement
    ): Promise<void> {
        const containerElem = this.unwrapContainerElem(
            inspectorOrContainerElem
        );

        const pathSegments = jsonPointer
            .split("/")
            .map(i => i.replace(/~0/gu, "~").replace(/~1/gu, "/"));

        let elem: HTMLElement | null = containerElem;
        for (const s of pathSegments) {
            const selector = `ei-prop[data-prop='${s}']`;
            const newElem: HTMLElement | null =
                elem?.querySelector(selector) ?? null;
            if (newElem) {
                const vm = this.vmUtil.getVm<PropElement>(newElem);
                if (vm?.collapsible) {
                    elem = newElem;
                    vm.collapsed = false;
                    await this.delayAsync(100);
                }
            } else {
                break;
            }
        }
        const referencedElem: HTMLElement | null =
            elem === containerElem
                ? null
                : elem?.querySelector("ei-prophead") ?? null;

        if (referencedElem) {
            referencedElem.scrollIntoView();
            await this.delayAsync(400);
            referencedElem.focus();
        }
    }

    private delayAsync(ms: number): Promise<void> {
        return new Promise(r => setTimeout(r, ms));
    }

    private unwrapContainerElem(
        inspectorOrContainerElem: HTMLElement
    ): ContainerElement {
        switch (inspectorOrContainerElem?.tagName.toLowerCase()) {
            case "jux-entityinspector":
                return inspectorOrContainerElem.shadowRoot
                    ? inspectorOrContainerElem.shadowRoot!.querySelector(
                          "ei-container"
                      )!
                    : inspectorOrContainerElem.querySelector("ei-container")!;
            case "ei-container":
                return inspectorOrContainerElem as ContainerElement;
            default:
                throw new Error("Invalid container element");
        }
    }
}
