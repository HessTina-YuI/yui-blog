import React from 'react';

const SectionContainer: React.FC = ({ children }) => {
    return <section className="w-full h-screen px-6 py-4 bg-gray-100">{children}</section>;
};

export default SectionContainer;
