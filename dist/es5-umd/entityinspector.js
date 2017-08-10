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
        define(["require", "exports", "aurelia-framework", "./utils/type-helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var aurelia_framework_1 = require("aurelia-framework");
    var type_helper_1 = require("./utils/type-helper");
    var EntityinspectorElement = (function () {
        function EntityinspectorElement(element, typeHelper) {
            this.element = element;
            this.typeHelper = typeHelper;
            this.accordionmode = false;
            this.theme = "dark";
        }
        // Naming convention based implicit change handler
        EntityinspectorElement.prototype.themeChanged = function (newValue) {
            this.element.className = this.theme;
        };
        Object.defineProperty(EntityinspectorElement.prototype, "accordionModeBool", {
            get: function () {
                return String(this.accordionmode) === "true";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntityinspectorElement.prototype, "objectId", {
            get: function () {
                var objectId;
                if (this.typeHelper.isComplexType(this.value)) {
                    objectId = this.value["$id"];
                }
                return objectId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntityinspectorElement.prototype, "hasChildren", {
            get: function () {
                var hasChildren = false;
                if (this.typeHelper.isComplexType(this.value)) {
                    hasChildren = Object.keys(this.value).length > 0;
                }
                return hasChildren;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntityinspectorElement.prototype, "kind", {
            get: function () {
                return this.typeHelper.getKind(this.value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntityinspectorElement.prototype, "isComplexType", {
            get: function () {
                return this.typeHelper.isPlainObject(this.value) || this.value instanceof Array;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntityinspectorElement.prototype, "childPropElement", {
            get: function () {
                return this.element.querySelector(":scope > ei-prop")["au"]["controller"]["viewModel"];
            },
            enumerable: true,
            configurable: true
        });
        EntityinspectorElement.prototype.collapseAll = function () {
            var propList = this.childPropElement.childPropListElement;
            if (propList) {
                propList.childPropElements.forEach(function (p) { return p.collapsed = true; });
            }
        };
        __decorate([
            aurelia_framework_1.bindable
        ], EntityinspectorElement.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], EntityinspectorElement.prototype, "accordionmode", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], EntityinspectorElement.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.computedFrom("value")
        ], EntityinspectorElement.prototype, "objectId", null);
        __decorate([
            aurelia_framework_1.computedFrom("value")
        ], EntityinspectorElement.prototype, "hasChildren", null);
        __decorate([
            aurelia_framework_1.computedFrom("value")
        ], EntityinspectorElement.prototype, "kind", null);
        __decorate([
            aurelia_framework_1.computedFrom("value")
        ], EntityinspectorElement.prototype, "isComplexType", null);
        EntityinspectorElement = __decorate([
            aurelia_framework_1.inject(Element, type_helper_1.TypeHelper),
            aurelia_framework_1.customElement("jux-entityinspector")
        ], EntityinspectorElement);
        return EntityinspectorElement;
    }());
    exports.EntityinspectorElement = EntityinspectorElement;
});
//# sourceMappingURL=entityinspector.js.map