import * as fs from "fs";
import { resolve } from "path";

export default {
    isDir: (path: string) => {
        const fromCwd = resolve(process.cwd(), path);

        try {
            return fs.statSync(fromCwd).isDirectory();
        } catch (err) {
            return `${fromCwd} is not a directory.`;
        }

    }
}