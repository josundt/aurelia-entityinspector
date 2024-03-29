import { bindable, customElement, inject } from "aurelia-framework";
import { EntityKind, EntityType } from "../contracts/contracts.js";
import { ITypeHelper, TypeHelper } from "../utils/type-helper.js";

@inject(Element, TypeHelper)
@customElement("ei-prophead")
export class PropHeadElement {

    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper
    ) {}

    @bindable
    name?: string;

    @bindable
    value?: EntityType;

    @bindable
    kind?: EntityKind;

    get parentPropElement(): PropHeadElement {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return (this.element.parentElement as any)["au"]["controller"]["viewModel"] as PropHeadElement;
    }

    get objectId(): string | undefined {
        let result: string | undefined = "";
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (this.typeHelper.isComplexType(this.value) && (this.value as any)["$id"]) {
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
        const objectReferenceId = this.objectReferenceId;
        if (objectReferenceId) {
            const referencedElem: HTMLElement = this.rootElem.querySelector(`ei-prophead[data-objectid='${objectReferenceId}']`)!;
            referencedElem.focus();
            referencedElem.scrollIntoView();
        }
    }

    attached(): void {
        const objectId = this.objectId;
        if (objectId) {
            this.element.setAttribute("data-objectid", objectId);
        }
    }

}
