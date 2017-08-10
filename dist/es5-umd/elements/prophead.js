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
        define(["require", "exports", "aurelia-framework", "../utils/type-helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var aurelia_framework_1 = require("aurelia-framework");
    var type_helper_1 = require("../utils/type-helper");
    var PropHeadElement = (function () {
        function PropHeadElement(element, typeHelper) {
            this.element = element;
            this.typeHelper = typeHelper;
        }
        Object.defineProperty(PropHeadElement.prototype, "parentPropElement", {
            get: function () {
                return this.element.parentElement["au"]["controller"]["viewModel"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropHeadElement.prototype, "objectId", {
            get: function () {
                var result = "";
                if (this.typeHelper.isComplexType(this.value) && this.value["$id"]) {
                    result = this.value["$id"];
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropHeadElement.prototype, "objectReferenceId", {
            get: function () {
                var result;
                if (this.typeHelper.isReferenceObject(this.value)) {
                    result = this.value["$ref"];
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        PropHeadElement.prototype.focus = function () {
            this.element.focus();
        };
        PropHeadElement.prototype.scrollIntoView = function () {
            var _this = this;
            setImmediate(function () {
                _this.element.scrollIntoView();
            });
        };
        PropHeadElement.prototype.onValueClicked = function () {
            var objectReferenceId = this.objectReferenceId;
            if (objectReferenceId) {
                var referencedElem = document.querySelector("ei-prophead[data-objectid='" + objectReferenceId + "']");
                referencedElem.focus();
                referencedElem.scrollIntoView();
            }
        };
        PropHeadElement.prototype.attached = function () {
            var objectId = this.objectId;
            if (objectId) {
                this.element.setAttribute("data-objectid", objectId);
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
        ], PropHeadElement.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
        ], PropHeadElement.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
        ], PropHeadElement.prototype, "kind", void 0);
        PropHeadElement = __decorate([
            aurelia_framework_1.inject(Element, type_helper_1.TypeHelper),
            aurelia_framework_1.customElement("ei-prophead")
        ], PropHeadElement);
        return PropHeadElement;
    }());
    exports.PropHeadElement = PropHeadElement;
});
//# sourceMappingURL=prophead.js.map