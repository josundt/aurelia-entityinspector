import { valueConverter } from "aurelia-framework";

@valueConverter("objectId")
export class ObjectIdValueConverter {

    toView(value: string | undefined): string {
        return value !== undefined ? `object-${value}` : "";
    }

}