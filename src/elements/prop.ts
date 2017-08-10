import { bindable, customElement, bindingMode, inject, computedFrom } from "aurelia-framework";
import { EntityType, EntityKind } from "../contracts/contracts";
import { TypeHelper, ITypeHelper } from "../utils/type-helper";
import { PropNavigator, IPropNavigator } from "../utils/prop-navigator";
import { PropHeadElement } from "./prophead";
import { PropListElement } from "./proplist";

enum Key {
    tab = 9,
    enter = 13,
    arrowLeft = 37,
    arrowUp = 38,
    arrowRight = 39,
    arrowDown = 40,
}

@inject(Element, TypeHelper, PropNavigator)
@customElement("ei-prop")
export class PropElement {

    constructor(
        private element: HTMLElement,
        private typeHelper: ITypeHelper,
        private propNav: IPropNavigator
    ) {}

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    name: string;

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    value: EntityType;

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    collapsible: boolean = false;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    collapsed: boolean = false;

    @bindable({ defaultBindingMode: bindingMode.oneWay })
    accordionmode: boolean = false;

    @computedFrom("value")
    get kind(): EntityKind {
        return this.typeHelper.getKind(this.value);
    }

    get parentPropListElement(): PropListElement | null {
        let result: PropListElement | null = null;
        const parent = this.element.parentElement;
        if (parent && parent.tagName.toLowerCase() === "ei-proplist") {
            result = (parent as any)["au"]["controller"]["viewModel"];
        }
        return result;
    }

    get childPropHeadElement(): PropHeadElement {
        return (this.element.firstElementChild as any)["au"]["controller"]["viewModel"];
    }

    get childPropListElement(): PropListElement | null {
        return (this.element.childElementCount > 1) ? (this.element.children[1] as any)["au"]["controller"]["viewModel"] : null;
    }

    toggleCollapsed(): void {
        this.propNav.setCollapsed(this, !this.collapsed);
    }

    onKeydown(event: KeyboardEvent): boolean {
        let preventDefault = false;
        switch (event.which) {

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
