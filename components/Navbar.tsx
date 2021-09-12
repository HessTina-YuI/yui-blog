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
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiSearch/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            Search
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiGridAlt/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            Dashboard
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiUser/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            User
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiChat/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            Messages
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiPieChartAlt2/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            Analytics
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiFolder/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            File Manager
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiCartAlt/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            Order
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiHeart/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            Saved
                        </span>
                    </li>
                    <li className="w-full h-10 my-4 pl-1.5 rounded-lg flex items-center hover:bg-white hover:text-black hover:cursor-pointer duration-500">
                        <span><BiCog/></span>
                        <span
                            className={`whitespace-nowrap text-xl ml-3 -translate-y-0.5 transition-opacity duration-500 ${navDisplay ? 'opacity-100' : 'opacity-0'}`}>
                            Setting
                        </span>
                    </li>
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