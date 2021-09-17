import React, { useEffect, useRef, useState } from 'react';
import TaskInterval from '@/lib/TaskInterval';

type ImageType = {
    img?: string
}

const Banner: React.FC = () => {

    const intervalRef = useRef<TaskInterval>();
    const [imgObj, setImgObj] = useState<Array<ImageType>>();
    const [selectImg, setSelectImg] = useState<number>(0);

    useEffect(() => {
        const image = [
            {
                img: '/static/images/2021-02-17-01.png'
            },
            {
                img: '/static/images/2021-02-17-02.png'
            }
        ];

        setImgObj(image);
    }, []);

    useEffect(() => {
        intervalRef.current = new TaskInterval(() => {
            const length = imgObj?.length;
            length ? setSelectImg(v => (v + 1) % length) : null;
        }, 5000);
        intervalRef.current?.start();

        return () => {
            intervalRef.current ? intervalRef.current?.stop() : null;
        };

    }, [imgObj?.length]);

    const selectImgClick = (index: number) => {
        setSelectImg(index);

        intervalRef.current ? intervalRef.current?.reset() : null;
    };

    return (
        <>
            <div className="relative w-full h-3/5">
                {
                    imgObj?.map((item, index) =>
                        <div key={index} className={`w-full h-full rounded-2xl bg-no-repeat bg-center absolute 
                                transition-opacity duration-700 ${selectImg === index ? 'opacity-100' : 'opacity-0'}`}
                             style={{ backgroundImage: `url(${item.img})` }}/>
                    )
                }
            </div>
            <div className="h-3 mt-2 flex float-right">
                {
                    imgObj?.map((item, index) => {
                        return <div key={index} className={`w-6 h-full mx-1 rounded-full hover:cursor-pointer
                                        transition-all duration-500
                                        ${(selectImg == index) ? 'w-10 bg-blue-500' : 'w-6 bg-gray-300'}`}
                                    onClick={() => selectImgClick(index)}/>;
                    })
                }
            </div>
        </>
    );
};

export default Banner;
