/* eslint-disable no-console */
import { copyFile, glob } from "node:fs/promises";

async function expandFilesAsync(pattern: string): Promise<string[]> {
    const res = [];
    for await (const file of glob(pattern)) {
        res.push(file);
    }
    return res.map(r => r.replace(/\\/u, "/"));
}

function getDestPath(
    pattern: string,
    srcFile: string,
    destFolder: string
): string {
    const recStartIdx = pattern.indexOf("**");
    const destPart =
        recStartIdx > 0 ? srcFile.substring(recStartIdx - 2) : srcFile;
    const result = `${destFolder}${destPart}`.replace(/\/\//gu, "/");
    return result;
}

const destDirs = ["./dist/es2015-esm/", "./dist/es2022-esm/"];

const srcPattern = "./src/**/*.{html,css}";

try {
    const srcFiles = await expandFilesAsync(srcPattern);
    const copyPromises: Array<Promise<string>> = [];
    srcFiles.forEach(sf => {
        const copyPromise = destDirs.map(dd => {
            const df = getDestPath(srcPattern, sf, dd);
            return copyFile(sf, df).then(() => `${sf} => ${df}`);
        });
        copyPromises.push(...copyPromise);
    });
    const lines = await Promise.all(copyPromises);
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    lines.sort();
    lines.forEach(l => {
        console.log(l);
    });
} catch (error) {
    console.log(error);
}
/* eslint-enable no-console */
