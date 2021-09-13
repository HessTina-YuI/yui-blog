import React, { useState, useEffect } from 'react';
import {
    BiCartAlt,
    BiChat,
    BiCog,
    BiFolder,
    BiGridAlt,
    BiHeart, BiMenu,
    BiPieChartAlt2,
    BiSearch,
    BiUser
} from 'react-icons/bi';

type SpanComponentProps = {
    navDisplay: Boolean;
}

const LiComponent: React.FC = ({ children }) =>
    <li className="w-full h-10 my-4 pl-1 rounded-lg flex items-center
        hover:bg-white hover:text-black hover:cursor-pointer duration-500">
        {children}
    </li>;

const SpanComponent: React.FC<SpanComponentProps> = ({ navDisplay, children }) =>
    <span
        className={`whitespace-nowrap text-xl ml-3 transition-opacity duration-500 
        ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
        {children}
    </span>;

const Navbar: React.FC = ({ children }) => {

    const [navWidth, setNavWidth] = useState<Number>(15);
    const [navDisplay, setNavDisplay] = useState<Boolean>(true);

    useEffect(() => {
        navDisplay ? setNavWidth(15) : setNavWidth(5);
    }, [navDisplay]);

    const navDisplayClick = () => {
        setNavDisplay(!navDisplay);
    };

    return (
        <div>
            <nav
                className="h-full px-6 fixed top-0 left-0 z-10 text-white text-2xl bg-black transition-all duration-500"
                style={{ width: `${navWidth}rem` }}>
                <div className="mt-2 mb-4">
                    <div className="w-full h-10 my-2 pl-1.5 rounded-lg flex items-center hover:cursor-pointer"
                         onClick={navDisplayClick}>
                        <span><BiMenu/></span>
                    </div>
                </div>
                <ul className="list-none">
                    <LiComponent>
                        <span><BiSearch/></span>
                        <SpanComponent navDisplay={navDisplay}>Search</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiGridAlt/></span>
                        <SpanComponent navDisplay={navDisplay}>Dashboard</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiUser/></span>
                        <SpanComponent navDisplay={navDisplay}>User</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiChat/></span>
                        <SpanComponent navDisplay={navDisplay}>Messages</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiPieChartAlt2/></span>
                        <SpanComponent navDisplay={navDisplay}>Analytics</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiFolder/></span>
                        <SpanComponent navDisplay={navDisplay}>File Manager</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiCartAlt/></span>
                        <SpanComponent navDisplay={navDisplay}>Order</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiHeart/></span>
                        <SpanComponent navDisplay={navDisplay}>Saved</SpanComponent>
                    </LiComponent>
                    <LiComponent>
                        <span><BiCog/></span>
                        <SpanComponent navDisplay={navDisplay}>Setting</SpanComponent>
                    </LiComponent>
                </ul>
            </nav>
            <main className="relative transition-all duration-500"
                  style={{ width: `calc(100% - ${navWidth}rem)`, left: `${navWidth}rem` }}>
                {children}
            </main>
        </div>
    );
};

export default Navbar;
