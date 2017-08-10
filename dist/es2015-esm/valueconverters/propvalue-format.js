var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { valueConverter, inject } from "aurelia-framework";
import { TypeHelper } from "../utils/type-helper";
import { StringHelper } from "../utils/string-helper";
let PropvalueFormatValueConverter = class PropvalueFormatValueConverter {
    constructor(typeHelper, stringHelper) {
        this.typeHelper = typeHelper;
        this.stringHelper = stringHelper;
    }
    toView(value) {
        let result;
        if (typeof value === "string") {
            result = `"${value}"`;
        }
        else if (value instanceof Date) {
            const str = this.stringHelper;
            result = str.format("{0}-{1}-{2} {3}:{4}:{5} {6}{7}:{8}", str.padStart(value.getFullYear(), 4, "0"), str.padStart((value.getMonth() + 1), 2, "0"), str.padStart((value.getDate()), 2, "0"), str.padStart(value.getHours(), 2, "0"), str.padStart(value.getMinutes(), 2, "0"), str.padStart(value.getSeconds(), 2, "0"), value.getTimezoneOffset() < 0 ? "+" : "-", str.padStart(Math.floor(Math.abs(value.getTimezoneOffset()) / 60), 2, "0"), str.padStart(Math.floor(Math.abs(value.getTimezoneOffset()) % 60), 2, "0"));
        }
        else if (value instanceof Array) {
            result = `Array [${value.length}]`;
        }
        else if (this.typeHelper.isPlainObject(value)) {
            const propCount = Object.keys(value).length;
            if (propCount === 1 && value["$ref"]) {
                result = `{ $ref: ${value["$ref"]} }`;
            }
            else {
                const id = value["$id"];
                const idString = id ? `#${id} ` : "";
                result = `Object ${idString}{${propCount}}`;
            }
        }
        else {
            result = String(value);
        }
        return result;
    }
};
PropvalueFormatValueConverter = __decorate([
    valueConverter("propvalueFormat"),
    inject(TypeHelper, StringHelper)
], PropvalueFormatValueConverter);
export { PropvalueFormatValueConverter };
//# sourceMappingURL=propvalue-format.js.map