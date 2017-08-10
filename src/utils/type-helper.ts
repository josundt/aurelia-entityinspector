import { EntityKind, ComplexType, ReferenceObject } from "../contracts/contracts";
import { singleton } from "aurelia-framework";

export interface ITypeHelper {
    isPlainObject(o: any): o is object;
    getKind(value: any): EntityKind;
    isComplexType(value: any): value is ComplexType;
    isReferenceObject(value: any): value is ReferenceObject;
}

@singleton()
export class TypeHelper implements ITypeHelper {

    isPlainObject(o: any): o is object {
        return typeof o === "object" && !(o instanceof Date) && !(o instanceof Array) && o !== null;
    }

    getKind(value: any): EntityKind {
        let result: EntityKind;
        if (value === null) {
            result = EntityKind.null;
        } else if (value instanceof Date) {
            result = EntityKind.date;
        } else if (value as any instanceof Array) {
            result = EntityKind.array;
        } else if (this.isPlainObject(value)) {
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

    isComplexType(value: any): value is ComplexType  {
        return value instanceof Array || this.isPlainObject(value);
    }

    isReferenceObject(value: any): value is ReferenceObject {
        return !!(this.isComplexType(value) && Object.keys(value).length === 1 && value["$ref"]);
    }
}