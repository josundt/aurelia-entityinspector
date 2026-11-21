import { singleton } from "aurelia-framework";
import { EntityKind, type ComplexType } from "../contracts/contracts.js";

export interface ITypeHelper {
    isPlainObject(o: any): o is object;
    getKind(value: any, name?: string): EntityKind;
    isComplexType(value: any): value is ComplexType;
}

@singleton()
export class TypeHelper implements ITypeHelper {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    isPlainObject(o: any): o is object {
        return (
            typeof o === "object" &&
            !(o instanceof Date) &&
            !(o instanceof Array) &&
            o !== null
        );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getKind(value: any, name?: string): EntityKind {
        let result: EntityKind;
        if (value === null) {
            result = EntityKind.null;
        } else if (value instanceof Date) {
            result = EntityKind.date;
        } else if ((value as any) instanceof Array) {
            result = EntityKind.array;
        } else if (this.isPlainObject(value)) {
            result = EntityKind.object;
        } else if (typeof value === "string") {
            if (name === "$ref") {
                result = EntityKind.reference;
            } else {
                result = EntityKind.string;
            }
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
    isComplexType(value: any): value is ComplexType {
        return value instanceof Array || this.isPlainObject(value);
    }
}
