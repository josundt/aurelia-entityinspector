import { valueConverter } from "aurelia-framework";
@valueConverter("propnameFormat")
export class PropnameFormatValueConverter {
    static numericRegex: RegExp = /^\d+$/;

    toView(value: string): string {
        return PropnameFormatValueConverter.numericRegex.test(value) ?
            `[${value}]:` :
            (value ? `${value}:` : "");
    }
}