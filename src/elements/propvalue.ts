import { bindable, customElement, bindingMode } from "aurelia-framework";
import { EntityKind, EntityType } from "../contracts/contracts";

@customElement("ei-propvalue")
export class PropValueElement {

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    value: EntityType;

    @bindable({ defaultBindingMode: bindingMode.oneTime })
    kind: EntityKind;
}