import { NextPage } from 'next';

const Banner: NextPage = () => {
    return (
        <div className="w-full h-screen bg-fixed">
            <div className="w-full h-full bg-blue-400 bg-no-repeat bg-cover"
                 style={{ backgroundImage: 'url(/static/images/2021-02-17-01.png)' }}/>
        </div>
    );
};

export default Banner;
