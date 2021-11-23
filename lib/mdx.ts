import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import readingTime, { ReadTimeResults } from 'reading-time';
import { compareDesc, format } from 'date-fns';
import getAllFilesRecursively from '@/lib/files';
// remark
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import remarkTocHeadings, { ITocAttribute } from '@/lib/remark-toc-headings';
import remarkCustomDirector from '@/lib/remark-custom-director';
// rehype
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';

export interface IBlogAttribute {
    mdxSource: any;
    toc: ITocAttribute[];
    frontMatter: IFrontMatterAttribute;
}

export interface IFrontMatterAttribute {
    readingTime: ReadTimeResults;
    slug: string;
    fileName: string;
    title?: string;
    date?: string | null;
    lastmod?: string | null;
    thumbnail?: string;
    hero?: string;
    tags?: string[];
    summary?: string;
}

const root = process.cwd();

export const getFiles = (type: string): string[] => {
    const prefixPaths = path.join(root, 'data', type);
    const files = getAllFilesRecursively(prefixPaths);

    // Only want to return blog/path and ignore root, replace is needed to work on Windows
    return files.map((file: string) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'));
};

export const formatSlug = (slug: string): string => {
    return slug.replace(/\.(mdx|md)/, '');
};

export const getFileBySlug = async (type: string, slug: string): Promise<IBlogAttribute> => {
    const mdxPath = path.join(root, 'data', type, `${slug}.mdx`);
    const mdPath = path.join(root, 'data', type, `${slug}.md`);
    const source = fs.existsSync(mdxPath)
        ? fs.readFileSync(mdxPath, 'utf8')
        : fs.readFileSync(mdPath, 'utf8');

    // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'esbuild.exe'
        );
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        );
    }

    let toc: ITocAttribute[] = [];

    const { frontmatter, code } = await bundleMDX(source, {
        // mdx imports can be automatically source from the components directory
        cwd: path.join(process.cwd(), 'components'),
        xdmOptions(options) {
            // this is the recommended way to add custom remark/rehype plugins:
            // The syntax might look weird, but it protects you in case we add/remove
            // plugins in the future.
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkGfm,
                [remarkFootnotes, { inlineNotes: false }],
                remarkMath,
                remarkDirective,
                [remarkTocHeadings, { exportRef: toc }],
                remarkCustomDirector
            ];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeSlug,
                rehypeKatex,
                [rehypePrism, { ignoreMissing: true }]
            ];
            return options;
        },
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                '.ts': 'tsx',
                '.js': 'jsx'
            };
            return options;
        }
    });

    return {
        mdxSource: code,
        toc,
        frontMatter: {
            readingTime: readingTime(source),
            slug: slug,
            fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
            ...frontmatter,
            date: frontmatter.date ? format(new Date(frontmatter.date), 'yyyy-MM-dd') : null,
            lastmod: frontmatter.lastmod ? format(new Date(frontmatter.lastmod), 'yyyy-MM-dd') : null
        }
    };
};

export const getAllFilesFrontMatter = async (folder: string): Promise<IFrontMatterAttribute[]> => {
    const prefixPaths = path.join(root, 'data', folder);

    const files = getAllFilesRecursively(prefixPaths);

    const allFrontMatter: any[] = [];

    files.forEach((file: string) => {
        // Replace is needed to work on Windows
        const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/');
        // Remove Unexpected File
        if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
            return;
        }
        const source = fs.readFileSync(file, 'utf8');
        const { data: frontmatter } = matter(source);

        allFrontMatter.push({
            readingTime: readingTime(source),
            ...frontmatter,
            slug: formatSlug(fileName),
            originDate: frontmatter.date,
            date: frontmatter.date ? format(new Date(frontmatter.date), 'yyyy-MM-dd') : null,
            lastmod: frontmatter.lastmod ? format(new Date(frontmatter.lastmod), 'yyyy-MM-dd') : null
        });
    });

    return allFrontMatter.sort((v1, v2) => compareDesc(new Date(v1.originDate), new Date(v2.originDate)));
};

export const getAllFilesCount = async (folder: string): Promise<number> => {
    const prefixPaths = path.join(root, 'data', folder);

    const files = getAllFilesRecursively(prefixPaths);

    return files ? files.length : 0;
};

export const getFilesFrontMatterByFileNames = async (dir: string, fileNames: string[]): Promise<IFrontMatterAttribute[]> => {
    const files = fileNames.map(v => path.join(root, 'data', dir, v));

    const allFrontMatter: any[] = [];

    files.forEach((file: string, index: number) => {
        // Replace is needed to work on Windows
        const fileName = fileNames[index];

        // Remove Unexpected File
        if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
            return;
        }
        const source = fs.readFileSync(file, 'utf8');
        const { data: frontmatter } = matter(source);

        allFrontMatter.push({
            readingTime: readingTime(source),
            ...frontmatter,
            slug: formatSlug(fileName),
            originDate: frontmatter.date,
            date: frontmatter.date ? format(new Date(frontmatter.date), 'yyyy-MM-dd') : null,
            lastmod: frontmatter.lastmod ? format(new Date(frontmatter.lastmod), 'yyyy-MM-dd') : null
        });
    });

    return allFrontMatter;
};
