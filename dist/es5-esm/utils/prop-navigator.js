var PropNavigator = (function () {
    function PropNavigator() {
    }
    PropNavigator.prototype.goToParent = function (fromProp) {
        var parentPropList = fromProp.parentPropListElement;
        if (parentPropList) {
            parentPropList.parentPropElement.childPropHeadElement.focus();
        }
    };
    PropNavigator.prototype.goToChild = function (fromProp) {
        var childPropList = fromProp.childPropListElement;
        var childPropListElems = childPropList ? childPropList.childPropElements.filter(function (cpe) { return cpe.collapsible; }) : null;
        if (childPropListElems && childPropListElems.length) {
            childPropListElems[0].childPropHeadElement.focus();
        }
    };
    PropNavigator.prototype.goToPrevSibling = function (fromProp) {
        var parentPropList = fromProp.parentPropListElement;
        if (parentPropList) {
            var selectableProps = parentPropList.childPropElements.filter(function (cpe) { return cpe.collapsible; });
            var currIndex = selectableProps.indexOf(fromProp);
            if (currIndex > 0) {
                selectableProps[currIndex - 1].childPropHeadElement.focus();
            }
        }
    };
    PropNavigator.prototype.goToNextSibling = function (fromProp) {
        var parentPropList = fromProp.parentPropListElement;
        if (parentPropList) {
            var selectableProps = parentPropList.childPropElements.filter(function (cpe) { return cpe.collapsible; });
            var currIndex = selectableProps.indexOf(fromProp);
            if (currIndex < selectableProps.length - 1) {
                selectableProps[currIndex + 1].childPropHeadElement.focus();
            }
        }
    };
    PropNavigator.prototype.setCollapsed = function (prop, value, recursive) {
        if (value === void 0) { value = true; }
        if (recursive === void 0) { recursive = false; }
        if (prop.collapsible) {
            if (value && !prop.collapsed) {
                prop.collapsed = true;
            }
            else if (!value && prop.collapsed) {
                prop.collapsed = false;
                if (prop.accordionmode) {
                    var parentPropList = prop.parentPropListElement;
                    if (parentPropList) {
                        var collapsibleProps = parentPropList.childPropElements.filter(function (cpe) { return cpe.collapsible; });
                        var currIndex = collapsibleProps.indexOf(prop);
                        if (currIndex >= 0) {
                            collapsibleProps.forEach(function (p, idx) {
                                if (p !== prop) {
                                    p.collapsed = true;
                                }
                            });
                            //prop.childPropHeadElement.scrollIntoView();
                        }
                    }
                }
                else if (recursive) {
                    this.expandChildrenRecursive(prop);
                }
            }
        }
    };
    PropNavigator.prototype.expandChildrenRecursive = function (prop) {
        if (!prop.accordionmode) {
            return;
        }
        var collapsibleChildProps = prop.childPropListElement ?
            prop.childPropListElement.childPropElements.filter(function (p) { return p.collapsible; }) :
            [];
        for (var _i = 0, collapsibleChildProps_1 = collapsibleChildProps; _i < collapsibleChildProps_1.length; _i++) {
            var childProp = collapsibleChildProps_1[_i];
            this.expandChildrenRecursive(childProp);
        }
    };
    return PropNavigator;
}());
export { PropNavigator };
//# sourceMappingURL=prop-navigator.js.map