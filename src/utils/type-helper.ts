import { singleton } from "aurelia-framework";
import { ComplexType, EntityKind, ReferenceObject } from "../contracts/contracts.js";

export interface ITypeHelper {
    isPlainObject(o: any): o is object;
    getKind(value: any): EntityKind;
    isComplexType(value: any): value is ComplexType;
    isReferenceObject(value: any): value is ReferenceObject;
}

@singleton()
export class TypeHelper implements ITypeHelper {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    isPlainObject(o: any): o is object {
        return typeof o === "object" && !(o instanceof Date) && !(o instanceof Array) && o !== null;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getKind(value: any): EntityKind {
        let result: EntityKind;
        if (value === null) {
            result = EntityKind.null;
        } else if (value instanceof Date) {
            result = EntityKind.date;
        } else if (value as any instanceof Array) {
            result = EntityKind.array;
        } else if (this.isPlainObject(value)) {
            // eslint-disable-next-line
            result = Object.keys(value).length === 1 && (<any>value)["$ref"] ? EntityKind.reference : EntityKind.object;
        } else if (typeof value === "string") {
            result = EntityKind.string;
        } else if (typeof value === "number") {
            result = EntityKind.number;
        } else if (typeof value === "boolean") {
            result = EntityKind.boolean;
        } else {
            result = EntityKind.unknown;
        }
        return result;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    isComplexType(value: any): value is ComplexType  {
        return value instanceof Array || this.isPlainObject(value);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    isReferenceObject(value: any): value is ReferenceObject {
        return !!(this.isComplexType(value) && Object.keys(value).length === 1 && value["$ref"]);
    }
}
