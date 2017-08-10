var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../contracts/contracts", "aurelia-framework"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var contracts_1 = require("../contracts/contracts");
    var aurelia_framework_1 = require("aurelia-framework");
    var TypeHelper = (function () {
        function TypeHelper() {
        }
        TypeHelper.prototype.isPlainObject = function (o) {
            return typeof o === "object" && !(o instanceof Date) && !(o instanceof Array) && o !== null;
        };
        TypeHelper.prototype.getKind = function (value) {
            var result;
            if (value === null) {
                result = contracts_1.EntityKind.null;
            }
            else if (value instanceof Date) {
                result = contracts_1.EntityKind.date;
            }
            else if (value instanceof Array) {
                result = contracts_1.EntityKind.array;
            }
            else if (this.isPlainObject(value)) {
                result = Object.keys(value).length === 1 && value["$ref"] ? contracts_1.EntityKind.reference : contracts_1.EntityKind.object;
            }
            else if (typeof value === "string") {
                result = contracts_1.EntityKind.string;
            }
            else if (typeof value === "number") {
                result = contracts_1.EntityKind.number;
            }
            else if (typeof value === "boolean") {
                result = contracts_1.EntityKind.boolean;
            }
            else {
                result = contracts_1.EntityKind.unknown;
            }
            return result;
        };
        TypeHelper.prototype.isComplexType = function (value) {
            return value instanceof Array || this.isPlainObject(value);
        };
        TypeHelper.prototype.isReferenceObject = function (value) {
            return !!(this.isComplexType(value) && Object.keys(value).length === 1 && value["$ref"]);
        };
        TypeHelper = __decorate([
            aurelia_framework_1.singleton()
        ], TypeHelper);
        return TypeHelper;
    }());
    exports.TypeHelper = TypeHelper;
});
//# sourceMappingURL=type-helper.js.map