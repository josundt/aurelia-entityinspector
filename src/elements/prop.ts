import { bindable, bindingMode, computedFrom, customElement, inject } from "aurelia-framework";
import { EntityKind, EntityType } from "../contracts/contracts.js";
import { IPropNavigator, PropNavigator } from "../utils/prop-navigator.js";
import { ITypeHelper, TypeHelper } from "../utils/type-helper.js";
import { PropHeadElement } from "./prophead.js";
import { PropListElement } from "./proplist.js";

enum Key {
    tab = "Tab",
    enter = "Enter",
    arrowLeft = "ArrowLeft",
    arrowUp = "ArrowUp",
    arrowRight = "ArrowRight",
    arrowDown = "ArrowDown"
}

@inject(Element, TypeHelper, PropNavigator)
@customElement("ei-prop")
export class PropElement {

    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper,
        private readonly propNav: IPropNavigator
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

    @computedFrom("value")
    get kind(): EntityKind {
        return this.typeHelper.getKind(this.value);
    }

    get parentPropListElement(): PropListElement | null {
        let result: PropListElement | null = null;
        const parent = this.element.parentElement;
        if (parent && parent.tagName.toLowerCase() === "ei-proplist") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            result = (parent as any)["au"]["controller"]["viewModel"] as PropListElement | null;
        }
        return result;
    }

    get childPropHeadElement(): PropHeadElement {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return (this.element.firstElementChild as any)["au"]["controller"]["viewModel"] as PropHeadElement;
    }

    get childPropListElement(): PropListElement | null {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return (this.element.childElementCount > 1) ? (this.element.children[1] as any)["au"]["controller"]["viewModel"] : null;
    }

    toggleCollapsed(): void {
        this.propNav.setCollapsed(this, !this.collapsed);
    }

    onKeydown(event: KeyboardEvent): boolean {
        let preventDefault = false;
        switch (event.key) {

            // case Key.tab: {
            //     if (event.shiftKey) {
            //         this.propNav.goToPrev(this);
            //     } else {
            //         this.propNav.goToNext(this);
            //     }
            //     break;
            // }

            case Key.enter: {
                this.toggleCollapsed();
                preventDefault = true;
                break;
            }

            case Key.arrowLeft: {
                if (!this.collapsed) {
                    this.propNav.setCollapsed(this, true);
                } else {
                    this.propNav.goToParent(this);
                }
                preventDefault = true;
                break;
            }

            case Key.arrowRight: {
                if (this.collapsed) {
                    this.propNav.setCollapsed(this, false);
                } else {
                    this.propNav.goToChild(this);
                }
                preventDefault = true;
                break;
            }

            case Key.arrowDown: {
                this.propNav.goToNextSibling(this);
                preventDefault = true;
                break;
            }

            case Key.arrowUp: {
                this.propNav.goToPrevSibling(this);
                preventDefault = true;
                break;
            }
        }
        return !preventDefault;
    }
}
