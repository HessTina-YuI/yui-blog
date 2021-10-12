import React, { useEffect, useState } from 'react';
import { ITocAttribute } from '@/lib/remark-toc-headings';
import { IProps } from '@/interface/IProps';

interface TOCComponentProps extends IProps {
    toc?: ITocAttribute[];
}

interface IUrlTop {
    url: string;
    top: number;
}

const levelEnum = [
    '', 'pl-4', 'pl-8', 'pl-10', 'pl-12', 'pl-14'
];

let urlTops: IUrlTop[] = [];

const TOCComponent: React.FC<TOCComponentProps> = ({ toc, className }) => {

    const [minLevel, setMinLevel] = useState<number>(0);

    const [activeHeading, setActiveHeading] = useState<string>('');

    useEffect(() => {
        let tempUrlTops: IUrlTop[] = [];

        toc?.forEach((value) => {
            const url = value.url.slice(1, value.url.length);
            const element = document.getElementById(url);
            const top = element ? element.getBoundingClientRect().top + document.documentElement.scrollTop : 0;
            tempUrlTops.push({ url: value.url, top });
        });

        urlTops = tempUrlTops;
        setActiveHeading(toc ? toc[0].url ?? '' : '');
    }, [toc]);

    useEffect(() => {
        let minLevel = 7;
        toc?.forEach((value => {
            if (value.depth < minLevel) {
                minLevel = value.depth;
            }
        }));

        setMinLevel(minLevel);
    }, [toc]);

    useEffect(() => {
        window.addEventListener('scroll', handlerScroller);

        return () => {
            window.removeEventListener('scroll', handlerScroller);
        };
    }, []);

    const handlerScroller = () => {
        const scroller = document.scrollingElement;
        if (!scroller) {
            return;
        }

        let resultTopIndex = 0;
        for (let i = 0; i < urlTops.length; i++) {
            const left = urlTops[i].top - scroller.scrollTop - 10;
            let right;
            if (i + 1 === urlTops.length) {
                right = Infinity;
            } else {
                right = urlTops[i + 1].top - scroller.scrollTop - 10;
            }

            if (left < 0 && right > 0) {
                resultTopIndex = i;
                break;
            }
        }

        setActiveHeading(urlTops[resultTopIndex] ? urlTops[resultTopIndex].url : '');
    };

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
            {
                toc?.map((value, index) => {
                    return <div
                        className={`py-2 px-1 rounded-lg text-sm hover:cursor-pointer hover:text-blue-600 
                                    hover:bg-gray-200
                                    ${levelEnum[value.depth - minLevel]} 
                                    ${value.url === activeHeading ? 'text-blue-500' : ''}`}
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
