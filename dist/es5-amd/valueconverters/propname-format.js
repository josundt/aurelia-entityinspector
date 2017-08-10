var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PropnameFormatValueConverter = (function () {
        function PropnameFormatValueConverter() {
        }
        PropnameFormatValueConverter_1 = PropnameFormatValueConverter;
        PropnameFormatValueConverter.prototype.toView = function (value) {
            return PropnameFormatValueConverter_1.numericRegex.test(value) ?
                "[" + value + "]:" :
                (value ? value + ":" : "");
        };
        PropnameFormatValueConverter.numericRegex = /^\d+$/;
        PropnameFormatValueConverter = PropnameFormatValueConverter_1 = __decorate([
            aurelia_framework_1.valueConverter("propnameFormat")
        ], PropnameFormatValueConverter);
        return PropnameFormatValueConverter;
        var PropnameFormatValueConverter_1;
    }());
    exports.PropnameFormatValueConverter = PropnameFormatValueConverter;
});
//# sourceMappingURL=propname-format.js.map