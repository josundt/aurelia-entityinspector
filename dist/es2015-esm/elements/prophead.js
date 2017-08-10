var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable, customElement, bindingMode, inject } from "aurelia-framework";
import { TypeHelper } from "../utils/type-helper";
let PropHeadElement = class PropHeadElement {
    constructor(element, typeHelper) {
        this.element = element;
        this.typeHelper = typeHelper;
    }
    get parentPropElement() {
        return this.element.parentElement["au"]["controller"]["viewModel"];
    }
    get objectId() {
        let result = "";
        if (this.typeHelper.isComplexType(this.value) && this.value["$id"]) {
            result = this.value["$id"];
        }
        return result;
    }
    get objectReferenceId() {
        let result;
        if (this.typeHelper.isReferenceObject(this.value)) {
            result = this.value["$ref"];
        }
        return result;
    }
    focus() {
        this.element.focus();
    }
    scrollIntoView() {
        setImmediate(() => {
            this.element.scrollIntoView();
        });
    }
    onValueClicked() {
        const objectReferenceId = this.objectReferenceId;
        if (objectReferenceId) {
            const referencedElem = document.querySelector(`ei-prophead[data-objectid='${objectReferenceId}']`);
            referencedElem.focus();
            referencedElem.scrollIntoView();
        }
    }
    attached() {
        const objectId = this.objectId;
        if (objectId) {
            this.element.setAttribute("data-objectid", objectId);
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime })
], PropHeadElement.prototype, "name", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime })
], PropHeadElement.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime })
], PropHeadElement.prototype, "kind", void 0);
PropHeadElement = __decorate([
    inject(Element, TypeHelper),
    customElement("ei-prophead")
], PropHeadElement);
export { PropHeadElement };
//# sourceMappingURL=prophead.js.map