import tsBrowserConfig from "@josundt/eslint-config/ts-browser";
import tsNodeConfig from "@josundt/eslint-config/ts-node";
import { setTsConfig, type TsLinterConfig } from "@josundt/eslint-config/utils";

const config: TsLinterConfig[] = [
    setTsConfig("./tsconfig.json", {
        ...tsBrowserConfig,
        files: ["./*.ts"]
    }),
    setTsConfig("./src/tsconfig.json", {
        ...tsBrowserConfig,
        files: ["src/**/*.ts"]
    }),
    setTsConfig("./build/tsconfig.json", {
        ...tsNodeConfig,
        files: ["build/**/*.ts"]
    })
];

export default config;
