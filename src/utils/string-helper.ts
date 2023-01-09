
export interface IStringHelper {
    padStart(str: string | number, maxLength: number, fillString?: string): string;
    padEnd(str: string | number, maxLength: number, fillString?: string): string;
    format(formatString: string, ...formatArgs: any[]): string;
}

export class StringHelper {
    private pad(str: string | number, maxLength: number, fillString: string, end: boolean): string {
        const s = String(str);

        if (s.length >= maxLength) {
            return s;
        }

        fillString = String(fillString);
        if (fillString.length === 0) {
            fillString = " ";
        }

        const fillLen = maxLength - s.length;
        const timesToRepeat = Math.ceil(fillLen / fillString.length);

        let truncatedStringFiller: string = "";
        for (let i = 0; i < timesToRepeat; i++) {
            truncatedStringFiller += fillString;
        }
        truncatedStringFiller = truncatedStringFiller.slice(0, fillLen);

        return end ?
            s + truncatedStringFiller :
            truncatedStringFiller + s;
    }

    padStart(str: string | number, maxLength: number, fillString: string = " "): string {
        return this.pad(str, maxLength, fillString, false);
    }

    padEnd(str: string | number, maxLength: number, fillString: string = " "): string {
        return this.pad(str, maxLength, fillString, true);
    }

    format(formatString: string, ...formatArgs: any[]): string {
        let result: string = formatString;
        let arg: any;
        for (let i: number = 0; i < formatArgs.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            arg = formatArgs[i];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            arg = (arg === null || arg === undefined) ? "" : arg;


            result = result.replace(
                new RegExp(`([^\\{]{0,1})(\\{${i}\\})([^\\}]{0,1})`, "ugm"),
                (substring, ...groups: string[]) => groups[0] + String(arg) + groups[2]
            );
        }
        result = result.replace(/\{\{/ug, "{").replace(/\}\}/ug, "}");
        return result;
    }

}
