import React, { useEffect, useState } from 'react';
import { RiGithubFill, RiMailOpenFill, RiQqFill, RiWechat2Fill } from 'react-icons/ri';
import ReactTooltip from 'react-tooltip';
import { IProps } from '@/interface/IProps';
import siteMetaData from '@/data/siteMetaData';

interface Tip extends IProps {

}

const ToolTip: React.FC<Tip> = ({ className }) => {

    const [isMounted, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    return (
        <div className={className} style={{ minWidth: '24rem' }}>
            <div className="w-full h-3/4 flex justify-center items-center">
                {siteMetaData.tip}
            </div>
            <ul className="w-full h-1/4 text-2xl flex justify-center">
                {
                    isMounted ?
                        <li className="mx-2">
                            <RiQqFill data-tip="QQ" data-for="qq"/>
                            <ReactTooltip id="qq" className="tooltip" effect="solid"/>
                        </li>
                        : null
                }
                {
                    isMounted ?
                        <li className="mx-2">
                            <RiWechat2Fill data-tip="WeChat" data-for="wechat"/>
                            <ReactTooltip id="wechat" className="tooltip" effect="solid"/>
                        </li>
                        : null
                }
                {
                    isMounted ?
                        <li className="mx-2">
                            <RiGithubFill data-tip="Github" data-for="github"/>
                            <ReactTooltip id="github" className="tooltip" effect="solid"/>
                        </li>
                        : null
                }
                {
                    isMounted ?
                        <li className="mx-2">
                            <RiMailOpenFill data-tip="Email" data-for="email"/>
                            <ReactTooltip id="email" className="tooltip" effect="solid"/>
                        </li>
                        : null
                }
            </ul>
        </div>
    );
};

export default ToolTip;
