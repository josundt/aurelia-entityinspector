import { bindable, customElement } from "aurelia-framework";
import { EntityKind, EntityType } from "../contracts/contracts.js";

@customElement("ei-propvalue")
export class PropValueElement {

    @bindable
    value?: EntityType;

    @bindable
    kind?: EntityKind;
}
