import { bindable, customElement, computedFrom, inject, bindingMode } from "aurelia-framework";
import { TypeHelper, ITypeHelper } from "../utils/type-helper";
import { PropertyModel, ComplexType } from "../contracts/contracts";
import { PropElement } from "./prop";

@inject(Element, TypeHelper)
@customElement("ei-proplist")
export class PropListElement {

    constructor(
        private element: HTMLElement,
        private typeHelper: ITypeHelper
    ) { }

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    owner: ComplexType;

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    accordionmode: boolean;

    get childPropElements(): PropElement[] {
        return this.toArray(this.element.children).map(c => (c as any)["au"]["controller"]["viewModel"]);
    }

    get parentPropElement(): PropElement {
        return (this.element.parentElement as any)["au"]["controller"]["viewModel"];
    }

    @computedFrom("owner")
    get props(): PropertyModel[] {
        const propNames = this.typeHelper.isPlainObject(this.owner) || (this.owner as any) instanceof Array ? Object.keys(this.owner) : [];
        return propNames.map<PropertyModel>(n => {
            const value = this.owner[n];
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
            };
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