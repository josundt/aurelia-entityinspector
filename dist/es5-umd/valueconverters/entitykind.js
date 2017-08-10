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
        define(["require", "exports", "aurelia-framework", "../contracts/contracts"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var aurelia_framework_1 = require("aurelia-framework");
    var contracts_1 = require("../contracts/contracts");
    var EntityKindValueConverter = (function () {
        function EntityKindValueConverter() {
        }
        EntityKindValueConverter.prototype.toView = function (value, capitalize) {
            var result = contracts_1.EntityKind[value];
            if (capitalize) {
                result = "" + result.substr(0, 1).toUpperCase() + result.substring(1);
            }
            return result;
        };
        EntityKindValueConverter = __decorate([
            aurelia_framework_1.valueConverter("entitykind")
        ], EntityKindValueConverter);
        return EntityKindValueConverter;
    }());
    exports.EntityKindValueConverter = EntityKindValueConverter;
});
//# sourceMappingURL=entitykind.js.map