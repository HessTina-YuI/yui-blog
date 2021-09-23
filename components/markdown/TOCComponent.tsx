import React, { useEffect, useState } from 'react';
import { ITocAttribute } from '@/lib/remark-toc-headings';
import { IProps } from '@/interface/IProps';
import { IFrontMatterAttribute } from '@/lib/mdx';

interface TOCComponentProps extends IProps {
    toc?: Array<ITocAttribute>;
    frontMatter?: IFrontMatterAttribute;
}

const levelEnum = [
    '', 'pl-4', 'pl-8', 'pl-10', 'pl-12', 'pl-14'
];

const TOCComponent: React.FC<TOCComponentProps> = ({ toc,frontMatter, className }) => {

    const [minLevel, setMinLevel] = useState<number>(0);

    useEffect(() => {
        let minLevel = 7;
        toc?.forEach((value => {
            if (value.depth < minLevel) {
                minLevel = value.depth;
            }
        }));

        setMinLevel(minLevel);
    }, [toc]);


    const scrollToAnchor = (anchorName: string) => {
        anchorName = anchorName.slice(1, anchorName.length);

        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={className}>
            <div className="text-xl font-bold pb-2 border-b">{frontMatter?.title}</div>
            {
                toc?.map((value, index) => {
                    return <div
                        className={`my-2 text-base hover:cursor-pointer hover:text-blue-500 ${levelEnum[value.depth - minLevel]}`}
                        key={index}
                        onClick={() => scrollToAnchor(value.url)}>
                        {value.value}
                    </div>;
                })
            }
        </div>
    );
};

export default TOCComponent;
