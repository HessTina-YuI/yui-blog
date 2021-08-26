import { NextPage } from 'next';
import { useState } from 'react';

const Header: NextPage = () => {
    const [display, setDisplay] = useState<Boolean>(true);

    const onDisplayHeader = () => {
        setDisplay(!display);
    };

    return (
        <header className={`fixed w-full z-10 transition-all duration-500 ${display ? 'mt-4' : '-mt-14'}`}>
            <div className="max-w-5xl h-14 bg-gray-50 px-4 mx-auto xl:max-w-7xl dark:bg-black
                flex items-center justify-between
                border-gray-100 border-2 rounded-lg shadow-lg">
            </div>
            <div
                className="w-20 h-1.5 mx-auto mt-2 bg-gray-100 rounded-full shadow-2xl hover:bg-blue-300 hover:cursor-pointer"
                onClick={onDisplayHeader}/>
        </header>
    );
};

export default Header;
