import React, { useEffect, useRef, useState } from 'react';
import { IoCopy, IoExpand } from 'react-icons/io5';
import toast from 'react-hot-toast';

const CodeComponents: React.FC = ({ children }) => {

    const [language, setLanguage] = useState<string>();

    useEffect(() => {
        // @ts-ignore
        const name: string[] = children.props.className ? children.props.className.split(' ') : [];
        for (const temp of name) {
            if (temp.indexOf('language-') != -1) {
                setLanguage(temp.split('language-')[1]);
            }
        }
    }, []);

    const textInput = useRef<HTMLDivElement>(null);

    const notify = () => toast('功能还在施工中');

    const copyClick = () => {
        if (textInput && textInput.current && textInput.current.textContent) {
            navigator.clipboard.writeText(textInput.current.textContent).then(r => console.error(r));
            toast('复制到剪贴板');
        }
    };

    return (
        <pre>
            <figure className="pb-2 overflow-hidden">
                <figcaption className="h-10 flex justify-between items-center"
                            style={{ backgroundColor: '#262626', fontSize: '1.5rem' }}>
                    <div className="w-4 h-4 ml-4 rounded-full"
                         style={{ backgroundColor: '#fc625d', boxShadow: '20px 0 #fdbc40, 40px 0 #35cd4b' }}/>
                    <div style={{ color: '#e5e5e5', fontSize: '1.2rem' }}>
                        {language}
                    </div>
                    <div className="mr-2 text-gray-200 flex">
                            <IoCopy className="mr-1 hover:cursor-pointer" onClick={copyClick}/>
                            <IoExpand className="hover:cursor-pointer" onClick={notify}/>
                        </div>
                </figcaption>
                <div ref={textInput}
                     style={{ padding: '0 1rem 1rem 1rem', borderRadius: 0, backgroundColor: '#262626' }}>
                    {children}
                </div>
            </figure>
        </pre>
    );
};

export default CodeComponents;
