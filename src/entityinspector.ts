import { bindable, computedFrom, customElement, inject, useShadowDOM } from "aurelia-framework";
import { EntityKind, EntityType } from "./contracts/contracts.js";
import { PropElement } from "./elements/prop.js";
import { ITypeHelper, TypeHelper } from "./utils/type-helper.js";

@inject(Element, TypeHelper)
@customElement("jux-entityinspector")
@useShadowDOM()
export class EntityinspectorElement {

    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper
    ) {}

    @bindable
    value: EntityType | null = null;

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

    collapsed: boolean = false;

    @computedFrom("value")
    get objectId(): string | undefined {
        let objectId: string | undefined;
        if (this.typeHelper.isComplexType(this.value)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return (this.element.querySelector(":scope > ei-prop") as any)["au"]["controller"]["viewModel"];
    }

    collapseAll(): void {
        const propList = this.childPropElement.childPropListElement;
        if (propList) {
            propList.childPropElements.forEach(p => p.collapsed = true);
        }
    }
}
