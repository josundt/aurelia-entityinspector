(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "aurelia-framework"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var aurelia_framework_1 = require("aurelia-framework");
    function configure(aurelia) {
        aurelia.globalResources([
            aurelia_framework_1.PLATFORM.moduleName("./entityinspector"),
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map