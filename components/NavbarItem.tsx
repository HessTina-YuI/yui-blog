import React, { useEffect, useState } from 'react';
import { Url } from 'url';
import Link from '@/components/Link';
import { useRouter } from 'next/router';

export interface NavBarItemProps {
    navOpen?: boolean;
    title: string;
    url?: Url | string;
    icon?: React.ReactNode;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ ...props }) => {

    const [active, setActive] = useState<boolean>(false);
    const [iconMouseOn, setIconMouseOn] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const routeUrl = router.route;
        const url = props.url;

        if (url === '/' && routeUrl === '/') {
            setActive(true);
        } else {
            if (url !== '/' && routeUrl.indexOf(url ? url.toString() : '...') !== -1) {
                setActive(true);
            } else {
                setActive(false);
            }
        }

    }, [props.url, router]);

    const iconMouseOver = () => {
        setIconMouseOn(true);
    };

    const iconMouseLeave = () => {
        setIconMouseOn(false);
    };

    return (
        <li className={`border-l-4 relative transition-all duration-500 cursor-default
                    ${iconMouseOn ? 'border-black bg-gray-400 text-white'
            : `bg-transparent text-black ${active ? 'border-blue-400' : 'border-transparent'}`}
                    ${props.navOpen ? 'py-3 px-8' : 'py-3 px-4'}`}>
            <div className="relative flex items-center">
                <span className="text-2xl">{props.icon}</span>
                <span className={`ml-2 whitespace-nowrap text-base transition-opacity duration-300
                        ${props.navOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {props.title}
                </span>
            </div>
            <Link href={props.url ? props.url : '#'}>
                <div className="w-full h-full bg-transparent absolute top-0 -left-1 hover:cursor-pointer"
                     onMouseOver={iconMouseOver} onMouseLeave={iconMouseLeave}/>
            </Link>
            {!props.navOpen ?
                <div
                    className={`p-2 bg-white shadow-lg rounded-lg whitespace-nowrap text-black text-base transition-all duration-500 absolute top-1 left-14
                        ${iconMouseOn ? 'opacity-100 translate-x-4' : 'opacity-0 translate-x-1'}`}>
                    {props.title}
                </div>
                : null
            }
        </li>
    );
};

export default NavBarItem;
