import React, { useState, useEffect } from 'react';
import {
    BiArrowToLeft, BiArrowToRight,
    BiCartAlt, BiChat, BiUser,
    BiCog, BiFolder, BiGridAlt,
    BiHeart, BiPieChartAlt2
} from 'react-icons/bi';
import NavbarItem from '@/components/NavbarItem';

type SpanComponentProps = {
    navOpen: Boolean;
}

const LiComponent: React.FC = ({ children }) =>
    <li className="w-full h-10 my-4 pl-1 rounded-lg flex items-center
        hover:bg-white hover:text-black hover:cursor-pointer duration-500">
        {children}
    </li>;

const SpanComponent: React.FC<SpanComponentProps> = ({ navOpen, children }) =>
    <span
        className={`whitespace-nowrap text-xl ml-3 transition-opacity duration-500 
        ${navOpen ? 'opacity-100' : 'opacity-0'}`}>
        {children}
    </span>;

let waitAnimationEnd: Boolean = true;

const Navbar: React.FC = ({ children }) => {

    const [navWidth, setNavWidth] = useState<Number>(15);
    const [navOpen, setNavOpen] = useState<Boolean>(true);
    const [navMouseOn, setNavMouseOn] = useState<Boolean>(false);

    useEffect(() => {
        navOpen ? setNavWidth(15) : setNavWidth(5);
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
                className="h-full px-6 fixed top-0 left-0 z-20 text-white text-2xl bg-black transition-all duration-500 overflow-visible"
                style={{ width: `${navWidth}rem` }} onMouseOver={navMouseOver} onMouseLeave={navMouseLeave}>
                <div className="w-full h-32 mt-2 mb-4">
                    <div className="my-2 pl-1.5 rounded-lg flex items-center hover:cursor-pointer">
                    </div>
                </div>
                <div>
                    <NavbarItem.Item navOpen={navOpen} title="Dashboard">
                        <NavbarItem.Icon><BiGridAlt/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="User">
                        <NavbarItem.Icon><BiUser/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="Messages">
                        <NavbarItem.Icon><BiChat/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="Analytics">
                        <NavbarItem.Icon><BiPieChartAlt2/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="File Manager">
                        <NavbarItem.Icon><BiFolder/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="Order">
                        <NavbarItem.Icon><BiCartAlt/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="Saved">
                        <NavbarItem.Icon><BiHeart/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="Setting">
                        <NavbarItem.Icon><BiCog/></NavbarItem.Icon>
                    </NavbarItem.Item>
                </div>
            </nav>
            <div
                className={`w-12 h-12 rounded-xl rotate-45 transition-all duration-500 ease-in-out hover:cursor-pointer
                            fixed z-10 top-16 bg-black ${navMouseOn ? '-translate-x-7' : '-translate-x-14'}`}
                style={{ left: `${navWidth}rem` }} onMouseOver={navMouseOver} onMouseLeave={navMouseLeave}
                onClick={navOpenClick}>
                <div className="-rotate-45">
                    {navOpen ?
                        <BiArrowToLeft className="text-xl text-white translate-x-4 translate-y-2"/> :
                        <BiArrowToRight className="text-xl text-white translate-x-4 translate-y-2"/>
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
