var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable, customElement, computedFrom, inject } from "aurelia-framework";
import { TypeHelper } from "./utils/type-helper";
let EntityinspectorElement = class EntityinspectorElement {
    constructor(element, typeHelper) {
        this.element = element;
        this.typeHelper = typeHelper;
        this.accordionmode = false;
        this.theme = "dark";
    }
    // Naming convention based implicit change handler
    themeChanged(newValue) {
        this.element.className = this.theme;
    }
    get accordionModeBool() {
        return String(this.accordionmode) === "true";
    }
    get objectId() {
        let objectId;
        if (this.typeHelper.isComplexType(this.value)) {
            objectId = this.value["$id"];
        }
        return objectId;
    }
    get hasChildren() {
        let hasChildren = false;
        if (this.typeHelper.isComplexType(this.value)) {
            hasChildren = Object.keys(this.value).length > 0;
        }
        return hasChildren;
    }
    get kind() {
        return this.typeHelper.getKind(this.value);
    }
    get isComplexType() {
        return this.typeHelper.isPlainObject(this.value) || this.value instanceof Array;
    }
    get childPropElement() {
        return this.element.querySelector(":scope > ei-prop")["au"]["controller"]["viewModel"];
    }
    collapseAll() {
        const propList = this.childPropElement.childPropListElement;
        if (propList) {
            propList.childPropElements.forEach(p => p.collapsed = true);
        }
    }
};
__decorate([
    bindable
], EntityinspectorElement.prototype, "value", void 0);
__decorate([
    bindable
], EntityinspectorElement.prototype, "accordionmode", void 0);
__decorate([
    bindable
], EntityinspectorElement.prototype, "theme", void 0);
__decorate([
    computedFrom("value")
], EntityinspectorElement.prototype, "objectId", null);
__decorate([
    computedFrom("value")
], EntityinspectorElement.prototype, "hasChildren", null);
__decorate([
    computedFrom("value")
], EntityinspectorElement.prototype, "kind", null);
__decorate([
    computedFrom("value")
], EntityinspectorElement.prototype, "isComplexType", null);
EntityinspectorElement = __decorate([
    inject(Element, TypeHelper),
    customElement("jux-entityinspector")
], EntityinspectorElement);
export { EntityinspectorElement };
//# sourceMappingURL=entityinspector.js.map