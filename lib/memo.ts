import path from 'path';
import getAllFilesRecursively from '@/lib/files';
import fs from 'fs';

const root = process.cwd();

export interface IMemoAttribute {
    date: string;
    message: string;
    author: string | null;
}

export const getAllFiles = async (folder: string): Promise<IMemoAttribute[]> => {
    const prefixPaths = path.join(root, 'data', folder);

    const files = getAllFilesRecursively(prefixPaths);

    const memo: IMemoAttribute[] = [];
    files.forEach((file: string) => {
        const source = fs.readFileSync(file, 'utf8');
        memo.push(...JSON.parse(source));
    });

    return memo;
};
