import { bindable, customElement, inject } from "aurelia-framework";
import type { EntityKind, EntityType } from "../contracts/contracts.js";
import {
    EntityNavigator,
    type IEntityNavigator
} from "../utils/entity-navigator.js";
import { TypeHelper, type ITypeHelper } from "../utils/type-helper.js";
import { VmUtil, type IVmUtil } from "../utils/vm-util.js";

@inject(Element, TypeHelper, VmUtil, EntityNavigator)
@customElement("ei-prophead")
export class PropHeadElement {
    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper,
        private readonly vmUtil: IVmUtil,
        private readonly entityNavigator: IEntityNavigator
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

    async onValueClicked(): Promise<any> {
        const oId = this.objectReferenceId;
        let referencedElem: HTMLElement | null;
        if (oId) {
            // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
            if (oId.indexOf("#") === 0) {
                await this.entityNavigator.navigateToEntityAsync(
                    oId,
                    this.rootElem
                );
            } else {
                referencedElem = this.rootElem.querySelector(
                    `ei-prophead[data-objectid='${oId}']`
                );
                if (referencedElem) {
                    referencedElem.focus();
                    referencedElem.scrollIntoView();
                }
            }
        }
    }

    attached(): void {
        const { objectId } = this;
        if (objectId) {
            this.element.setAttribute("data-objectid", objectId);
        }
    }
}
