import {
    bindable,
    bindingMode,
    computedFrom,
    customElement,
    inject
} from "aurelia-framework";
import type { EntityKind, EntityType } from "../contracts/contracts.js";
import { PropNavigator, type IPropNavigator } from "../utils/prop-navigator.js";
import { TypeHelper, type ITypeHelper } from "../utils/type-helper.js";
import { VmUtil, type IVmUtil } from "../utils/vm-util.js";
import type { PropHeadElement } from "./prophead.js";
import type { PropListElement } from "./proplist.js";

type Key =
    | "Tab"
    | "Enter"
    | "ArrowLeft"
    | "ArrowUp"
    | "ArrowRight"
    | "ArrowDown";

@inject(Element, TypeHelper, PropNavigator, VmUtil)
@customElement("ei-prop")
export class PropElement {
    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper,
        private readonly propNav: IPropNavigator,
        private readonly vmUtil: IVmUtil
    ) {}

    @bindable
    name?: string;

    @bindable
    value?: EntityType;

    @bindable
    collapsible: boolean = false;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    collapsed: boolean = false;

    @bindable
    accordionmode: boolean = false;

    @computedFrom("value", "name")
    get kind(): EntityKind {
        return this.typeHelper.getKind(this.value, this.name);
    }

    get parentPropListElement(): PropListElement | null {
        let result: PropListElement | null = null;
        const parent = this.element.parentElement;
        if (parent?.tagName.toLowerCase() === "ei-proplist") {
            result = this.vmUtil.getVm<PropListElement>(parent);
        }
        return result;
    }

    get childPropHeadElement(): PropHeadElement {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return (this.element.firstElementChild as any)["au"]["controller"][
            "viewModel"
        ] as PropHeadElement;
    }

    get childPropListElement(): PropListElement | null {
        return this.element.childElementCount > 1
            ? this.vmUtil.getVm<PropListElement>(this.element.children[1])
            : null;
    }

    toggleCollapsed(): void {
        this.propNav.setCollapsed(this, !this.collapsed);
    }

    onKeydown(event: KeyboardEvent): boolean {
        let preventDefault = false;
        const key = event.key as Key;
        switch (key) {
            case "Tab": {
                // if (event.shiftKey) {
                //     this.propNav.goToPrev(this);
                // } else {
                //     this.propNav.goToNext(this);
                // }
                break;
            }

            case "Enter": {
                this.toggleCollapsed();
                preventDefault = true;
                break;
            }

            case "ArrowLeft": {
                if (!this.collapsed) {
                    this.propNav.setCollapsed(this, true);
                } else {
                    this.propNav.goToParent(this);
                }
                preventDefault = true;
                break;
            }

            case "ArrowRight": {
                if (this.collapsed) {
                    this.propNav.setCollapsed(this, false);
                } else {
                    this.propNav.goToChild(this);
                }
                preventDefault = true;
                break;
            }

            case "ArrowDown": {
                this.propNav.goToNextSibling(this);
                preventDefault = true;
                break;
            }

            case "ArrowUp": {
                this.propNav.goToPrevSibling(this);
                preventDefault = true;
                break;
            }
        }
        return !preventDefault;
    }
}
