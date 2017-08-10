var StringHelper = (function () {
    function StringHelper() {
    }
    StringHelper.prototype.pad = function (str, maxLength, fillString, end) {
        var s = String(str);
        if (s.length >= maxLength) {
            return s;
        }
        fillString = String(fillString);
        if (fillString.length === 0) {
            fillString = " ";
        }
        var fillLen = maxLength - s.length;
        var timesToRepeat = Math.ceil(fillLen / fillString.length);
        var truncatedStringFiller = "";
        for (var i = 0; i < timesToRepeat; i++) {
            truncatedStringFiller += fillString;
        }
        truncatedStringFiller = truncatedStringFiller.slice(0, fillLen);
        return end ?
            s + truncatedStringFiller :
            truncatedStringFiller + s;
    };
    StringHelper.prototype.padStart = function (str, maxLength, fillString) {
        if (fillString === void 0) { fillString = " "; }
        return this.pad(str, maxLength, fillString, false);
    };
    StringHelper.prototype.padEnd = function (str, maxLength, fillString) {
        if (fillString === void 0) { fillString = " "; }
        return this.pad(str, maxLength, fillString, true);
    };
    StringHelper.prototype.format = function (formatString) {
        var formatArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            formatArgs[_i - 1] = arguments[_i];
        }
        var result = formatString;
        var arg;
        for (var i = 0; i < formatArgs.length; i++) {
            arg = formatArgs[i];
            arg = (arg === null || arg === undefined) ? "" : arg;
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:prefer-template
            result = result.replace(new RegExp("([^\\{]{0,1})(\\{" + i + "\\})([^\\}]{0,1})", "gm"), function (substring) {
                var groups = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    groups[_i - 1] = arguments[_i];
                }
                return groups[0] + String(arg) + groups[2];
            });
        }
        result = result.replace(/\{\{/g, "{").replace(/\}\}/g, "}");
        return result;
    };
    return StringHelper;
}());
export { StringHelper };
//# sourceMappingURL=string-helper.js.map