var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable, customElement, bindingMode, inject, computedFrom } from "aurelia-framework";
import { TypeHelper } from "../utils/type-helper";
import { PropNavigator } from "../utils/prop-navigator";
var Key;
(function (Key) {
    Key[Key["tab"] = 9] = "tab";
    Key[Key["enter"] = 13] = "enter";
    Key[Key["arrowLeft"] = 37] = "arrowLeft";
    Key[Key["arrowUp"] = 38] = "arrowUp";
    Key[Key["arrowRight"] = 39] = "arrowRight";
    Key[Key["arrowDown"] = 40] = "arrowDown";
})(Key || (Key = {}));
let PropElement = class PropElement {
    constructor(element, typeHelper, propNav) {
        this.element = element;
        this.typeHelper = typeHelper;
        this.propNav = propNav;
        this.collapsible = false;
        this.collapsed = false;
        this.accordionmode = false;
    }
    get kind() {
        return this.typeHelper.getKind(this.value);
    }
    get parentPropListElement() {
        let result = null;
        const parent = this.element.parentElement;
        if (parent && parent.tagName.toLowerCase() === "ei-proplist") {
            result = parent["au"]["controller"]["viewModel"];
        }
        return result;
    }
    get childPropHeadElement() {
        return this.element.firstElementChild["au"]["controller"]["viewModel"];
    }
    get childPropListElement() {
        return (this.element.childElementCount > 1) ? this.element.children[1]["au"]["controller"]["viewModel"] : null;
    }
    toggleCollapsed() {
        this.propNav.setCollapsed(this, !this.collapsed);
    }
    onKeydown(event) {
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
                }
                else {
                    this.propNav.goToParent(this);
                }
                preventDefault = true;
                break;
            }
            case Key.arrowRight: {
                if (this.collapsed) {
                    this.propNav.setCollapsed(this, false);
                }
                else {
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
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime })
], PropElement.prototype, "name", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime })
], PropElement.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime })
], PropElement.prototype, "collapsible", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], PropElement.prototype, "collapsed", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneWay })
], PropElement.prototype, "accordionmode", void 0);
__decorate([
    computedFrom("value")
], PropElement.prototype, "kind", null);
PropElement = __decorate([
    inject(Element, TypeHelper, PropNavigator),
    customElement("ei-prop")
], PropElement);
export { PropElement };
//# sourceMappingURL=prop.js.map