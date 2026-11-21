import {
    bindable,
    computedFrom,
    customElement,
    inject
} from "aurelia-framework";
import type { ComplexType, PropertyModel } from "../contracts/contracts.js";
import { TypeHelper, type ITypeHelper } from "../utils/type-helper.js";
import { VmUtil, type IVmUtil } from "../utils/vm-util.js";
import type { PropElement } from "./prop.js";

@inject(Element, TypeHelper, VmUtil)
@customElement("ei-proplist")
export class PropListElement {
    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper,
        private readonly vmUtil: IVmUtil
    ) {}

    @bindable
    owner?: ComplexType;

    @bindable
    accordionmode?: boolean;

    get childPropElements(): PropElement[] {
        return Array.from(this.element.children).map(
            c => this.vmUtil.getVm<PropElement>(c)!
        );
    }

    get parentPropElement(): PropElement {
        return this.vmUtil.getVm<PropElement>(this.element.parentElement)!;
    }

    @computedFrom("owner")
    get props(): PropertyModel[] {
        const propNames =
            this.owner &&
            (this.typeHelper.isPlainObject(this.owner) ||
                (this.owner as any) instanceof Array)
                ? Object.keys(this.owner)
                : [];
        return propNames.map(n => {
            const value = this.owner ? this.owner[n] : undefined;
            let hasChildren = false;
            if (this.typeHelper.isComplexType(value)) {
                hasChildren = Object.keys(value).length > 0;
            }
            return {
                name: n,
                value: value,
                kind: this.typeHelper.getKind(value, n),
                hasChildren: hasChildren,
                collapsed: true
            } as PropertyModel;
        });
    }
}
