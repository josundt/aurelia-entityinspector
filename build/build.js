const glob = require("glob");
const fs = require("fs");
const path = require("path");

function expandFiles(pattern) {
    return new Promise((resolve, reject) => {
        const files = glob(pattern, (err, matches) => {
            if (err) {
                resolve(matches);
            } else {
                resolve(matches);
            }
        });
    });
}

function copyFile(source, target) {
    return new Promise(function(resolve, reject) {
        var rd = fs.createReadStream(source);
        rd.on('error', rejectCleanup);
        var wr = fs.createWriteStream(target);
        wr.on('error', rejectCleanup);
        function rejectCleanup(err) {
            rd.destroy();
            wr.end();
            reject(err);
        }
        wr.on('finish', resolve);
        rd.pipe(wr);
    });
}

function getDestPath(pattern, srcFile, destFolder) {
    const recStartIdx = pattern.indexOf("**");
    const destPart = recStartIdx > 0 ? srcFile.substring(recStartIdx) : srcFile.substring(2);
    const result = `${destFolder}${destPart}`.replace(/\/\//g, "/");
    return result;
}

const destDirs = [
    "./dist/es5-amd/",
    "./dist/es5-cjs/",
    "./dist/es5-esm/",
    "./dist/es5-umd/",
    "./dist/es2015-esm/"
];

const srcPattern = "./src/**/*.{html,css}";

expandFiles(srcPattern)
    .then(srcFiles => {
        const copyPromises = [];
        srcFiles.forEach(sf => {
            const copyPromise = destDirs.map(dd => {
                const df = getDestPath(srcPattern, sf, dd);
                return copyFile(sf, df).then(() => `${sf} => ${df}`)
            });
            copyPromises.push(...copyPromise);
        })
        return Promise.all(copyPromises);
    })
    .then(lines => {
        lines.sort();
        lines.forEach(l => {
            console.log(l);
        });
    })
    .catch(error => console.log(error));
