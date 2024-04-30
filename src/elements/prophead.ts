import { bindable, customElement, inject } from "aurelia-framework";
import type { EntityKind, EntityType } from "../contracts/contracts.js";
import { TypeHelper, type ITypeHelper } from "../utils/type-helper.js";
import { VmUtil, type IVmUtil } from "../utils/vm-util.js";

@inject(Element, TypeHelper, VmUtil)
@customElement("ei-prophead")
export class PropHeadElement {
    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper,
        private readonly vmUtil: IVmUtil
    ) {}

    @bindable
    name?: string;

    @bindable
    value?: EntityType;

    @bindable
    kind?: EntityKind;

    get parentPropElement(): PropHeadElement {
        return this.vmUtil.getVm<PropHeadElement>(this.element.parentElement)!;
    }

    get objectId(): string | undefined {
        let result: string | undefined = "";
        if (this.typeHelper.isComplexType(this.value) && "$id" in this.value) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            result = (this.value as any)["$id"];
        }
        return result;
    }

    get objectReferenceId(): string | undefined {
        let result: string | undefined;
        if (this.typeHelper.isReferenceObject(this.value)) {
            result = this.value["$ref"];
        }
        return result;
    }

    focus(): void {
        this.element.focus();
    }

    scrollIntoView(): void {
        setTimeout(() => {
            this.element.scrollIntoView();
        }, 0);
    }

    private _rootElem: HTMLElement | undefined;
    get rootElem(): HTMLElement {
        // It should be possible to say this.element.shadowRoot?
        if (!this._rootElem) {
            let root: HTMLElement = this.element;
            let curr: HTMLElement | null = this.element;
            while ((curr = root.parentElement) !== null) {
                root = curr;
            }
            this._rootElem = root;
        }
        return this._rootElem;
    }

    onValueClicked(): void {
        const { objectReferenceId } = this;
        if (objectReferenceId) {
            const referencedElem: HTMLElement = this.rootElem.querySelector(
                `ei-prophead[data-objectid='${objectReferenceId}']`
            )!;
            referencedElem.focus();
            referencedElem.scrollIntoView();
        }
    }

    attached(): void {
        const { objectId } = this;
        if (objectId) {
            this.element.setAttribute("data-objectid", objectId);
        }
    }
}
