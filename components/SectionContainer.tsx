import { NextPage } from 'next';

const SectionContainer: NextPage = ({ children }) => {
    return <section className="max-w-5xl px-4 mx-auto sm:px-6 xl:max-w-7xl xl:px-0">{ children }</section>;
};

export default SectionContainer;