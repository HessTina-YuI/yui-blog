import React, { useState } from 'react';
import Link from '@/components/Link';
import { Url } from 'url';

interface NavBarItemProps {
    navOpen: boolean;
    title: string;
    url?: Url | string;
    icon?: React.ReactNode;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ navOpen, title, url, icon }) => {

    const [iconMouseOn, setIconMouseOn] = useState<boolean>(false);

    const iconMouseOver = () => {
        setIconMouseOn(true);
    };

    const iconMouseLeave = () => {
        setIconMouseOn(false);
    };

    return (
        <li className={`border-l-4 relative transition-all duration-500 cursor-default
                    ${iconMouseOn ? 'border-black bg-gray-400 text-white' : 'border-transparent bg-transparent text-black'}
                    ${navOpen ? 'py-3 px-8' : 'py-3 px-4'}`}>
            <div className="relative flex items-center">
                <span className="text-2xl">{icon}</span>
                <span className={`ml-2 whitespace-nowrap text-base transition-opacity duration-300
                        ${navOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {title}
                </span>
            </div>
            <Link href={url ? url : '#'}>
                <div className="w-full h-full bg-transparent absolute top-0 -left-1 hover:cursor-pointer"
                     onMouseOver={iconMouseOver} onMouseLeave={iconMouseLeave}/>
            </Link>
            {!navOpen ?
                <div
                    className={`p-2 bg-white shadow-lg rounded-lg whitespace-nowrap text-black text-base transition-all duration-500 absolute top-1 left-14
                        ${iconMouseOn ? 'opacity-100 translate-x-4' : 'opacity-0 translate-x-1'}`}>
                    {title}
                </div>
                : null
            }
        </li>
    );
};

export default NavBarItem;
