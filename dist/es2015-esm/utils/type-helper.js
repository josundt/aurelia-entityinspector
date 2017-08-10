var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EntityKind } from "../contracts/contracts";
import { singleton } from "aurelia-framework";
let TypeHelper = class TypeHelper {
    isPlainObject(o) {
        return typeof o === "object" && !(o instanceof Date) && !(o instanceof Array) && o !== null;
    }
    getKind(value) {
        let result;
        if (value === null) {
            result = EntityKind.null;
        }
        else if (value instanceof Date) {
            result = EntityKind.date;
        }
        else if (value instanceof Array) {
            result = EntityKind.array;
        }
        else if (this.isPlainObject(value)) {
            result = Object.keys(value).length === 1 && value["$ref"] ? EntityKind.reference : EntityKind.object;
        }
        else if (typeof value === "string") {
            result = EntityKind.string;
        }
        else if (typeof value === "number") {
            result = EntityKind.number;
        }
        else if (typeof value === "boolean") {
            result = EntityKind.boolean;
        }
        else {
            result = EntityKind.unknown;
        }
        return result;
    }
    isComplexType(value) {
        return value instanceof Array || this.isPlainObject(value);
    }
    isReferenceObject(value) {
        return !!(this.isComplexType(value) && Object.keys(value).length === 1 && value["$ref"]);
    }
};
TypeHelper = __decorate([
    singleton()
], TypeHelper);
export { TypeHelper };
//# sourceMappingURL=type-helper.js.map