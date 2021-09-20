import fs from 'fs';
import path from 'path';

const pipe = (...fns: any) => (x: any) => fns.reduce((v: any, f: (arg0: any) => any) => f(v), x);

const flattenArray = (input: any[]) =>
    input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], []);

const map = (fn: (x: any) => any) => (input: any[]) => input.map(fn);

const walkDir = (fullPath: string) => {
    return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath);
};

const pathJoinPrefix = (prefix: string) => (extraPath: string) => path.join(prefix, extraPath);

const getAllFilesRecursively = (folder: string) =>
    pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder);

export default getAllFilesRecursively;
