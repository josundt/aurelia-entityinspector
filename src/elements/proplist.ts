import { bindable, computedFrom, customElement, inject } from "aurelia-framework";
import { ComplexType, PropertyModel } from "../contracts/contracts.js";
import { ITypeHelper, TypeHelper } from "../utils/type-helper.js";
import { PropElement } from "./prop.js";

@inject(Element, TypeHelper)
@customElement("ei-proplist")
export class PropListElement {

    constructor(
        private readonly element: HTMLElement,
        private readonly typeHelper: ITypeHelper
    ) { }

    @bindable
    owner?: ComplexType;

    @bindable
    accordionmode?: boolean;

    get childPropElements(): PropElement[] {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return this.toArray(this.element.children).map(c => (c as any)["au"]["controller"]["viewModel"]);
    }

    get parentPropElement(): PropElement {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return (this.element.parentElement as any)["au"]["controller"]["viewModel"];
    }

    @computedFrom("owner")
    get props(): PropertyModel[] {
        const propNames = this.owner && (this.typeHelper.isPlainObject(this.owner) || (this.owner as any) instanceof Array) ? Object.keys(this.owner) : [];
        return propNames.map(n => {
            const value = this.owner ? this.owner[n] : undefined;
            let hasChildren = false;
            if (this.typeHelper.isComplexType(value)) {
                hasChildren = Object.keys(value).length > 0 && !this.typeHelper.isReferenceObject(value);
            }
            return {
                name: n,
                value: value,
                kind: this.typeHelper.getKind(value),
                hasChildren: hasChildren,
                collapsed: true
            } as PropertyModel;
        });
    }

    private toArray(nodeList: NodeList | HTMLCollection | null | undefined): HTMLElement[] {
        const result: HTMLElement[] = [];
        for (let i = 0; nodeList && i < nodeList.length; i++) {
            result.push(nodeList.item(i) as HTMLElement);
        }
        return result;
    }

}
