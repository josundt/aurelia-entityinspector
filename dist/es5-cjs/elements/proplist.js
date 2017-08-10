"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var type_helper_1 = require("../utils/type-helper");
var PropListElement = (function () {
    function PropListElement(element, typeHelper) {
        this.element = element;
        this.typeHelper = typeHelper;
    }
    Object.defineProperty(PropListElement.prototype, "childPropElements", {
        get: function () {
            return this.toArray(this.element.children).map(function (c) { return c["au"]["controller"]["viewModel"]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropListElement.prototype, "parentPropElement", {
        get: function () {
            return this.element.parentElement["au"]["controller"]["viewModel"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropListElement.prototype, "props", {
        get: function () {
            var _this = this;
            var propNames = this.typeHelper.isPlainObject(this.owner) || this.owner instanceof Array ? Object.keys(this.owner) : [];
            return propNames.map(function (n) {
                var value = _this.owner[n];
                var hasChildren = false;
                if (_this.typeHelper.isComplexType(value)) {
                    hasChildren = Object.keys(value).length > 0 && !_this.typeHelper.isReferenceObject(value);
                }
                return {
                    name: n,
                    value: value,
                    kind: _this.typeHelper.getKind(value),
                    hasChildren: hasChildren,
                    collapsed: true
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    PropListElement.prototype.toArray = function (nodeList) {
        var result = [];
        for (var i = 0; nodeList && i < nodeList.length; i++) {
            result.push(nodeList.item(i));
        }
        return result;
    };
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
    ], PropListElement.prototype, "owner", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
    ], PropListElement.prototype, "accordionmode", void 0);
    __decorate([
        aurelia_framework_1.computedFrom("owner")
    ], PropListElement.prototype, "props", null);
    PropListElement = __decorate([
        aurelia_framework_1.inject(Element, type_helper_1.TypeHelper),
        aurelia_framework_1.customElement("ei-proplist")
    ], PropListElement);
    return PropListElement;
}());
exports.PropListElement = PropListElement;
//# sourceMappingURL=proplist.js.map