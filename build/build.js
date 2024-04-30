import { glob } from "glob";
import fs from "node:fs";
import path from "node:path";

async function expandFiles(pattern) {
    const res = await glob(pattern);
    return res.map(r => r.replace(/\\/, "/"));
}

function copyFile(source, target) {
    return new Promise(function (resolve, reject) {
        var rd = fs.createReadStream(source);
        rd.on("error", rejectCleanup);
        var wr = fs.createWriteStream(target);
        wr.on("error", rejectCleanup);
        function rejectCleanup(err) {
            rd.destroy();
            wr.end();
            reject(err);
        }
        wr.on("finish", resolve);
        rd.pipe(wr);
    });
}

function getDestPath(pattern, srcFile, destFolder) {
    const recStartIdx = pattern.indexOf("**");
    const destPart =
        recStartIdx > 0 ? srcFile.substring(recStartIdx - 2) : srcFile;
    const result = `${destFolder}${destPart}`.replace(/\/\//g, "/");
    return result;
}

const destDirs = [
    "./dist/es5-amd/",
    "./dist/es5-cjs/",
    "./dist/es5-esm/",
    "./dist/es5-umd/",
    "./dist/es2015-esm/",
    "./dist/es2022-esm/"
];

const srcPattern = "./src/**/*.{html,css}";

try {
    const srcFiles = await expandFiles(srcPattern);
    const copyPromises = [];
    srcFiles.forEach(sf => {
        const copyPromise = destDirs.map(dd => {
            const df = getDestPath(srcPattern, sf, dd);
            return copyFile(sf, df).then(() => `${sf} => ${df}`);
        });
        copyPromises.push(...copyPromise);
    });
    const lines = await Promise.all(copyPromises);
    lines.sort();
    lines.forEach(l => {
        console.log(l);
    });
} catch (error) {
    console.log(error);
}
