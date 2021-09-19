import React, { useEffect, useState } from 'react';
import { RiGithubFill, RiMailOpenFill, RiQqFill, RiWechat2Fill } from 'react-icons/ri';
import ReactTooltip from 'react-tooltip';
import { IProps } from '@/lib/common-props';

interface ToolTip extends IProps {

}

const ToolTip: React.FC<ToolTip> = ({ className }) => {

    const [isMounted, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    return (
        <div className={className} style={{minWidth:'24rem'}}>
            <div className="w-full h-3/4 flex justify-center items-center">
                愿指引明路的苍蓝之星为你们闪耀
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
