import { bindable, customElement } from "aurelia-framework";

@customElement("ei-propname")
export class PropNameElement {
    @bindable
    value?: string;
}