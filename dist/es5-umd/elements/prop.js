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
        define(["require", "exports", "aurelia-framework", "../utils/type-helper", "../utils/prop-navigator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var aurelia_framework_1 = require("aurelia-framework");
    var type_helper_1 = require("../utils/type-helper");
    var prop_navigator_1 = require("../utils/prop-navigator");
    var Key;
    (function (Key) {
        Key[Key["tab"] = 9] = "tab";
        Key[Key["enter"] = 13] = "enter";
        Key[Key["arrowLeft"] = 37] = "arrowLeft";
        Key[Key["arrowUp"] = 38] = "arrowUp";
        Key[Key["arrowRight"] = 39] = "arrowRight";
        Key[Key["arrowDown"] = 40] = "arrowDown";
    })(Key || (Key = {}));
    var PropElement = (function () {
        function PropElement(element, typeHelper, propNav) {
            this.element = element;
            this.typeHelper = typeHelper;
            this.propNav = propNav;
            this.collapsible = false;
            this.collapsed = false;
            this.accordionmode = false;
        }
        Object.defineProperty(PropElement.prototype, "kind", {
            get: function () {
                return this.typeHelper.getKind(this.value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropElement.prototype, "parentPropListElement", {
            get: function () {
                var result = null;
                var parent = this.element.parentElement;
                if (parent && parent.tagName.toLowerCase() === "ei-proplist") {
                    result = parent["au"]["controller"]["viewModel"];
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropElement.prototype, "childPropHeadElement", {
            get: function () {
                return this.element.firstElementChild["au"]["controller"]["viewModel"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropElement.prototype, "childPropListElement", {
            get: function () {
                return (this.element.childElementCount > 1) ? this.element.children[1]["au"]["controller"]["viewModel"] : null;
            },
            enumerable: true,
            configurable: true
        });
        PropElement.prototype.toggleCollapsed = function () {
            this.propNav.setCollapsed(this, !this.collapsed);
        };
        PropElement.prototype.onKeydown = function (event) {
            var preventDefault = false;
            switch (event.which) {
                // case Key.tab: {
                //     if (event.shiftKey) {
                //         this.propNav.goToPrev(this);
                //     } else {
                //         this.propNav.goToNext(this);
                //     }
                //     break;
                // }
                case Key.enter: {
                    this.toggleCollapsed();
                    preventDefault = true;
                    break;
                }
                case Key.arrowLeft: {
                    if (!this.collapsed) {
                        this.propNav.setCollapsed(this, true);
                    }
                    else {
                        this.propNav.goToParent(this);
                    }
                    preventDefault = true;
                    break;
                }
                case Key.arrowRight: {
                    if (this.collapsed) {
                        this.propNav.setCollapsed(this, false);
                    }
                    else {
                        this.propNav.goToChild(this);
                    }
                    preventDefault = true;
                    break;
                }
                case Key.arrowDown: {
                    this.propNav.goToNextSibling(this);
                    preventDefault = true;
                    break;
                }
                case Key.arrowUp: {
                    this.propNav.goToPrevSibling(this);
                    preventDefault = true;
                    break;
                }
            }
            return !preventDefault;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
        ], PropElement.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
        ], PropElement.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime })
        ], PropElement.prototype, "collapsible", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
        ], PropElement.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneWay })
        ], PropElement.prototype, "accordionmode", void 0);
        __decorate([
            aurelia_framework_1.computedFrom("value")
        ], PropElement.prototype, "kind", null);
        PropElement = __decorate([
            aurelia_framework_1.inject(Element, type_helper_1.TypeHelper, prop_navigator_1.PropNavigator),
            aurelia_framework_1.customElement("ei-prop")
        ], PropElement);
        return PropElement;
    }());
    exports.PropElement = PropElement;
});
//# sourceMappingURL=prop.js.map