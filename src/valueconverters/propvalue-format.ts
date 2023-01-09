import { inject, valueConverter } from "aurelia-framework";
import { IStringHelper, StringHelper } from "../utils/string-helper.js";
import { ITypeHelper, TypeHelper } from "../utils/type-helper.js";

@valueConverter("propvalueFormat")
@inject(TypeHelper, StringHelper)
export class PropvalueFormatValueConverter {
    constructor(
        private readonly typeHelper: ITypeHelper,
        private readonly stringHelper: IStringHelper
    ) {}

    toView(value: boolean | number | string | Date | any[] | object | null): string {
        let result: string;
        if (typeof value === "string") {
            result = `"${value}"`;
        } else if (value instanceof Date) {
            const str = this.stringHelper;
            result = str.format(
                "{0}-{1}-{2} {3}:{4}:{5} {6}{7}:{8}",
                str.padStart(value.getFullYear(), 4, "0"),
                str.padStart((value.getMonth() + 1), 2, "0"),
                str.padStart((value.getDate()), 2, "0"),
                str.padStart(value.getHours(), 2, "0"),
                str.padStart(value.getMinutes(), 2, "0"),
                str.padStart(value.getSeconds(), 2, "0"),
                value.getTimezoneOffset() < 0 ? "+" : "-",
                str.padStart(Math.floor(Math.abs(value.getTimezoneOffset()) / 60), 2, "0"),
                str.padStart(Math.floor(Math.abs(value.getTimezoneOffset()) % 60), 2, "0")
            );
        } else if (value instanceof Array) {
            result = `Array [${value.length}]`;
        } else if (this.typeHelper.isPlainObject(value)) {
            const propCount = Object.keys(value).length;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (propCount === 1 && (value as any)["$ref"]) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
                result = `{ $ref: ${(value as any)["$ref"]} }`;
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const id: string = (value as any)["$id"];
                const idString: string = id ? `#${id} ` : "";
                result = `Object ${idString}{${propCount}}`;
            }
        } else {
            result = String(value);
        }
        return result;
    }
}
