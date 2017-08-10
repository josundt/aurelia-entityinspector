import { bindable, customElement, bindingMode } from "aurelia-framework";

@customElement("ei-propname")
export class PropNameElement {
    @bindable({ defaultBindingMode: bindingMode.oneTime })
    value: string;
}