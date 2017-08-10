import { bindable, customElement, computedFrom, inject } from "aurelia-framework";
import { EntityType, EntityKind } from "./contracts/contracts";
import { ITypeHelper, TypeHelper } from "./utils/type-helper";
import { PropElement } from "./elements/prop";

@inject(Element, TypeHelper)
@customElement("jux-entityinspector")
export class EntityinspectorElement {

    constructor(
        private element: HTMLElement,
        private typeHelper: ITypeHelper
    ) {}

    @bindable
    value: EntityType;

    @bindable
    accordionmode: boolean = false;

    @bindable
    theme: string = "dark";

    // Naming convention based implicit change handler
    themeChanged(newValue: string): void {
        this.element.className = this.theme;
    }

    get accordionModeBool(): boolean {
        return String(this.accordionmode) === "true";
    }

    collapsed: false;

    @computedFrom("value")
    get objectId(): string | undefined {
        let objectId: string | undefined;
        if (this.typeHelper.isComplexType(this.value)) {
            objectId = (this.value as any)["$id"];
        }
        return objectId;
    }

    @computedFrom("value")
    get hasChildren(): boolean {
        let hasChildren = false;
        if (this.typeHelper.isComplexType(this.value)) {
            hasChildren = Object.keys(this.value).length > 0;
        }
        return hasChildren;
    }

    @computedFrom("value")
    get kind(): EntityKind {
        return this.typeHelper.getKind(this.value);
    }

    @computedFrom("value")
    get isComplexType(): boolean {
        return this.typeHelper.isPlainObject(this.value) || (this.value as any) instanceof Array;
    }

    get childPropElement(): PropElement {
        return (this.element.querySelector(":scope > ei-prop") as any)["au"]["controller"]["viewModel"];
    }

    collapseAll(): void {
        const propList = this.childPropElement.childPropListElement;
        if (propList) {
            propList.childPropElements.forEach(p => p.collapsed = true);
        }
    }
}