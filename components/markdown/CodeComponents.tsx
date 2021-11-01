import React, { useRef } from 'react';
import { IoCopy, IoExpand } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { IProps } from '@/interface/IProps';

interface ICodeComponentsProps extends IProps {
    language: string;
}

const CodeComponents: React.FC<ICodeComponentsProps> = ({ className, language, ...rest }) => {

    const textInput = useRef<HTMLDivElement>(null);

    const notify = () => toast('功能还在施工中');

    const copyClick = () => {
        if (textInput && textInput.current && textInput.current.textContent) {
            navigator.clipboard.writeText(textInput.current.textContent).then(r => console.error(r));
            toast('复制到剪贴板');
        }
    };

    // if (language === 'github') {
    //     // @ts-ignore
    //     const repo = children.props.children.props.children.toString().split('https://github.com/')[1];
    //     setRepo(repo);
    //
    //     return <div>{github?.name}</div>;
    // }

    return (
        <figure className="rounded-lg overflow-hidden">
            <figcaption className="h-10 flex justify-between items-center"
                        style={{ backgroundColor: '#262626', fontSize: '1.5rem' }}>
                <div className="w-4 h-4 ml-4 rounded-full"
                     style={{ backgroundColor: '#fc625d', boxShadow: '20px 0 #fdbc40, 40px 0 #35cd4b' }}/>
                <div style={{ color: '#e5e5e5' }}>
                    {language}
                </div>
                <div className="mr-2 text-gray-200 flex">
                    <IoCopy className="mr-1 hover:cursor-pointer" onClick={copyClick}/>
                    <IoExpand className="hover:cursor-pointer" onClick={notify}/>
                </div>
            </figcaption>
            <div ref={textInput} style={{ padding: '0 1rem 1rem 1rem', borderRadius: 0, backgroundColor: '#262626' }}>
                {rest.children}
            </div>
        </figure>
    );
};

export default CodeComponents;
