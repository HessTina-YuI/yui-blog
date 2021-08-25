import { NextPage } from 'next';

const Header: NextPage = () => {
    return (
        <header className="fixed w-full">
            <div className="max-w-5xl h-14 bg-gray-50 mt-4 px-4 mx-auto xl:max-w-7xl
                flex items-center justify-between
                border-gray-100 border-2 rounded-lg shadow-lg">
            </div>
            <div className="w-20 h-1 mx-auto mt-2 bg-white border-gray-100 border-2 rounded-full shadow-2xl"/>
        </header>
    );
};

export default Header;