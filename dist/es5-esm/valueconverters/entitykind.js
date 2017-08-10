var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { valueConverter } from "aurelia-framework";
import { EntityKind } from "../contracts/contracts";
var EntityKindValueConverter = (function () {
    function EntityKindValueConverter() {
    }
    EntityKindValueConverter.prototype.toView = function (value, capitalize) {
        var result = EntityKind[value];
        if (capitalize) {
            result = "" + result.substr(0, 1).toUpperCase() + result.substring(1);
        }
        return result;
    };
    EntityKindValueConverter = __decorate([
        valueConverter("entitykind")
    ], EntityKindValueConverter);
    return EntityKindValueConverter;
}());
export { EntityKindValueConverter };
//# sourceMappingURL=entitykind.js.map