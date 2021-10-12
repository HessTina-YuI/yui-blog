import React, { Fragment, ReactElement } from 'react';

enum levelEnum {
    h1 = 'h1', h2 = 'h2', h3 = 'h3', h4 = 'h4', h5 = 'h5', h6 = 'h6'
}

interface HeadingProps {
    level: levelEnum;
    id?: string;
    children?: string | ReactElement | ReactElement[];
}

interface HTMLHeadingProps {
    level: levelEnum;
    id?: string;
}

const HeadingComponents: React.FC<HeadingProps> = ({ level, id, children }) => {

    const content = children instanceof Array ? children : new Array(children);

    const scrollToAnchor = (anchorName: string) => {
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
        <HTMLHeading id={id} level={level}>
            <div className="relative">
                <span className="absolute -left-14 text-blue-400 hover:cursor-pointer hover:text-blue-400"
                      onClick={() => scrollToAnchor(id ?? '')}>{level.toUpperCase()}</span>
                {
                    content.map(((value, index) => {
                        if (typeof (value) === 'string') {
                            return <Fragment key={index}>{value}</Fragment>;
                        }
                        // @ts-ignore
                        return <a key={index} href={value.props.href}>{value.props.children}</a>;
                    }))
                }
            </div>
        </HTMLHeading>
    );
};

export default HeadingComponents;

const HTMLHeading: React.FC<HTMLHeadingProps> = ({ level, id, children }) => {
    return React.createElement(level.toString(), { id }, children);
};
