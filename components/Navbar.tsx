import React, { useState, useEffect } from 'react';
import {
    BiArrowToLeft, BiArrowToRight,
    BiCartAlt,
    BiChat,
    BiCog,
    BiFolder,
    BiGridAlt,
    BiHeart,
    BiPieChartAlt2,
    BiSearch,
    BiUser
} from 'react-icons/bi';

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

let waitAnimationEnd = true;

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

    const navMouseEnter = () => {
        waitAnimationEnd ? setNavMouseOn(true) : '';
    };

    const navMouseLeave = () => {
        waitAnimationEnd ? setNavMouseOn(false) : '';
    };

    return (
        <>
            <div
                className={`w-12 h-12 rounded-xl rotate-45 transition-all duration-500 ease-in-out hover:cursor-pointer
                            fixed z-10 top-16 bg-black ${navMouseOn ? '-translate-x-7' : '-translate-x-14'}`}
                style={{ left: `${navWidth}rem` }} onMouseEnter={navMouseEnter} onMouseLeave={navMouseLeave}
                onClick={navOpenClick}>
                <div className="-rotate-45">
                    {navOpen ?
                        <BiArrowToLeft className="text-xl text-white translate-x-4 translate-y-2"/> :
                        <BiArrowToRight className="text-xl text-white translate-x-4 translate-y-2"/>
                    }
                </div>
            </div>
            <nav
                className="h-full px-6 fixed top-0 left-0 z-20 text-white text-2xl bg-black transition-all duration-500 overflow-y-scroll no-scroll-theme"
                style={{ width: `${navWidth}rem` }} onMouseEnter={navMouseEnter} onMouseLeave={navMouseLeave}>
                <div className="mt-2 mb-4">
                    <div className="w-full h-20 my-2 pl-1.5 rounded-lg flex items-center hover:cursor-pointer">
                    </div>
                </div>
                <ul className="list-none">
                    <LiComponent>
                        <span><BiSearch/></span>
                        <SpanComponent navOpen={navOpen}>Search</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiGridAlt/></span>
                        <SpanComponent navOpen={navOpen}>Dashboard</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiUser/></span>
                        <SpanComponent navOpen={navOpen}>User</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiChat/></span>
                        <SpanComponent navOpen={navOpen}>Messages</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiPieChartAlt2/></span>
                        <SpanComponent navOpen={navOpen}>Analytics</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiFolder/></span>
                        <SpanComponent navOpen={navOpen}>File Manager</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiCartAlt/></span>
                        <SpanComponent navOpen={navOpen}>Order</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiHeart/></span>
                        <SpanComponent navOpen={navOpen}>Saved</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiCog/></span>
                        <SpanComponent navOpen={navOpen}>Setting</SpanComponent>
                    </LiComponent>
                </ul>
            </nav>
            <main className="relative transition-all duration-500"
                  style={{ width: `calc(100% - ${navWidth}rem)`, left: `${navWidth}rem` }}>
                {children}
            </main>
        </>
    );
};

export default Navbar;
