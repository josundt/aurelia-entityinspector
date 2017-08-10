define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EntityKind;
    (function (EntityKind) {
        EntityKind[EntityKind["object"] = 0] = "object";
        EntityKind[EntityKind["array"] = 1] = "array";
        EntityKind[EntityKind["date"] = 2] = "date";
        EntityKind[EntityKind["string"] = 3] = "string";
        EntityKind[EntityKind["number"] = 4] = "number";
        EntityKind[EntityKind["boolean"] = 5] = "boolean";
        EntityKind[EntityKind["null"] = 6] = "null";
        EntityKind[EntityKind["reference"] = 7] = "reference";
        EntityKind[EntityKind["unknown"] = 8] = "unknown";
    })(EntityKind = exports.EntityKind || (exports.EntityKind = {}));
});
//# sourceMappingURL=contracts.js.map