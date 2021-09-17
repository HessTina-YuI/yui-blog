import React, { useEffect, useState } from 'react';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { RiBuilding2Fill, RiBookFill, RiChatHistoryFill, RiBallPenFill, RiFolder4Fill } from 'react-icons/ri';
import NavbarItem from '@/components/NavbarItem';

let waitAnimationEnd: boolean = true;
const initWidth = 16;
const narrowWidth = 4;

const Navbar: React.FC = ({ children }) => {

    const [navWidth, setNavWidth] = useState<number>(initWidth);
    const [navOpen, setNavOpen] = useState<boolean>(true);
    const [navMouseOn, setNavMouseOn] = useState<boolean>(false);

    useEffect(() => {
        navOpen ? setNavWidth(initWidth) : setNavWidth(narrowWidth);
    }, [navOpen]);

    const navOpenClick = () => {
        setNavOpen(!navOpen);

        setNavMouseOn(false);
        waitAnimationEnd = false;
        setTimeout(() => {
            waitAnimationEnd = true;
        }, 500);
    };

    const navMouseOver = () => {
        waitAnimationEnd ? setNavMouseOn(true) : null;
    };

    const navMouseLeave = () => {
        waitAnimationEnd ? setNavMouseOn(false) : null;
    };

    return (
        <>
            <nav
                className="h-full fixed top-0 left-0 z-20 bg-white shadow-lg text-black transition-all duration-500"
                style={{ width: `${navWidth}rem` }} onMouseOver={navMouseOver} onMouseLeave={navMouseLeave}>
                <div className="w-full h-32 mt-2 mb-4">
                    <div className="my-2 pl-1.5 rounded-lg flex items-center hover:cursor-pointer">
                    </div>
                </div>
                <ul className="w-full">
                    <NavbarItem navOpen={navOpen} title="首页" url="/" icon={<RiBuilding2Fill/>}/>
                    <NavbarItem navOpen={navOpen} title="文章" url="/article" icon={<RiBookFill/>}/>
                    <NavbarItem navOpen={navOpen} title="记录" url="/history" icon={<RiChatHistoryFill/>}/>
                    <NavbarItem navOpen={navOpen} title="故事" url="/story" icon={<RiBallPenFill/>}/>
                    <NavbarItem navOpen={navOpen} title="收藏" url="/collector" icon={<RiFolder4Fill/>}/>
                </ul>
            </nav>
            <div
                className={`w-12 h-12 rounded-xl rotate-45 transition-all duration-500 ease-in-out hover:cursor-pointer
                        fixed z-30 top-16 bg-white ${navMouseOn ? '-translate-x-7' : '-translate-x-14'}`}
                style={{ left: `${navWidth}rem` }} onMouseOver={navMouseOver} onMouseLeave={navMouseLeave}
                onClick={navOpenClick}>
                <div className={`-rotate-45 text-xl text-black transition-opacity duration-200 
                        ${navMouseOn ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                    {navOpen ?
                        <BiArrowToLeft className="translate-x-4 translate-y-2"/> :
                        <BiArrowToRight className="translate-x-4 translate-y-2"/>
                    }
                </div>
            </div>
            <main className="relative transition-all duration-500"
                  style={{ width: `calc(100% - ${navWidth}rem)`, left: `${navWidth}rem` }}>
                {children}
            </main>
        </>
    );
};

export default Navbar;
