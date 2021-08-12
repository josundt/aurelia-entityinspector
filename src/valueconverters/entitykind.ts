import { valueConverter } from "aurelia-framework";
import { EntityKind } from "../contracts/contracts.js";

@valueConverter("entitykind")
export class EntityKindValueConverter {

    toView(value: EntityKind, capitalize: boolean): string {
        let result = EntityKind[value];
        if (capitalize) {
            result = `${result.substr(0, 1).toUpperCase()}${result.substring(1)}`;
        }
        return result;
    }

}
