import React, { useEffect, useRef, useState } from 'react';
import TaskInterval from '@/lib/task-interval';
import { IProps } from '@/interface/IProps';

interface BannerProps extends IProps {
    images?: Array<ImageType>;
}

interface ImageType {
    image?: string;
}

const Banner: React.FC<BannerProps> = ({ images = [], className }) => {

    const intervalRef = useRef<TaskInterval>();
    const [selectImg, setSelectImg] = useState<number>(0);

    useEffect(() => {
        intervalRef.current = new TaskInterval(() => {
            const length = images?.length;
            length ? setSelectImg(v => (v + 1) % length) : null;
        }, 5000);
        intervalRef.current?.start();

        return () => {
            intervalRef.current ? intervalRef.current?.stop() : null;
        };

    }, [images?.length]);

    const selectImgClick = (index: number) => {
        setSelectImg(index);

        intervalRef.current ? intervalRef.current?.reset() : null;
    };

    return (
        <div className={`${className} pb-7`}>
            <div className="w-full h-full relative">
                {
                    images?.map((item, index) =>
                        <div key={index} className={`w-full h-full rounded-2xl bg-no-repeat bg-center absolute
                                transition-opacity duration-700 ${selectImg === index ? 'opacity-100' : 'opacity-0'}`}
                             style={{ backgroundImage: `url(${item.image})` }}/>
                    )
                }
            </div>
            <div className="h-3 mt-2 flex float-right">
                {
                    images?.length > 1 && images?.map((item, index) => {
                        return <div key={index} className={`w-6 h-full mx-1 rounded-full hover:cursor-pointer
                                        transition-all duration-500
                                        ${(selectImg == index) ? 'w-10 bg-blue-500' : 'w-6 bg-gray-300'}`}
                                    onClick={() => selectImgClick(index)}/>;
                    })
                }
            </div>
        </div>
    );
};

export default Banner;
