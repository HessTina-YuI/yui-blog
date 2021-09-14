import React, { useMemo, useState } from 'react';

type ItemProps = {
    navOpen: Boolean
    title: String
}

const Icon: React.FC = ({ children }) => {
    return (
        <span>
            {children}
        </span>
    );
};

const Item: React.FC<ItemProps> = ({ navOpen, title, children }) => {

    const item = useMemo(() => {
        let item = {
            // @ts-ignore
            icon: React.ReactNode
        };

        if (children instanceof Array) {
            Array.from(children).forEach(value => {
                // @ts-ignore
                if (value['type']['name'] === 'Icon') {
                    item.icon = value;
                }
            });
        } else {
            // @ts-ignore
            if (children['type']['name'] === 'Icon') {
                item.icon = children;
            }
        }

        return item;
    }, [children]);

    const [iconMouseOn, setIconMouseOn] = useState<Boolean>(false);

    const iconMouseOver = () => {
        setIconMouseOn(true);
    };

    const iconMouseLeave = () => {
        setIconMouseOn(false);
    };

    return (
        <div className="w-full h-10 my-4 relative flex items-center">
            <div className="w-full h-full my-4 pl-1 rounded-lg flex items-center
                hover:bg-white hover:text-black hover:cursor-pointer duration-500"
                 onMouseOver={iconMouseOver} onMouseLeave={iconMouseLeave}>
                {item.icon ? item.icon : null}
                <span className={`whitespace-nowrap text-xl ml-3 transition-opacity duration-500
                        ${navOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {title}
                </span>
            </div>
            {!navOpen ?
                <div
                    className={`p-2 bg-blue-400 rounded-lg whitespace-nowrap text-base transition-all duration-500 
                    ${iconMouseOn ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0'}`}>
                    {title}
                </div>
                : null
            }
        </div>
    );
};

const NavbarItem = {
    Item, Icon
};

export default NavbarItem;
