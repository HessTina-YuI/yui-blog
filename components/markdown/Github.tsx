import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RiGithubFill } from 'react-icons/ri';

interface IGithubRepoAttribute {
    name: string;
    html_url: string;
    description: string;
    owner: {
        avatar_url: string;
    };
}

const variants = {
    initial: {
        opacity: 0,
        transition: { type: 'linear', duration: 1 }
    },
    hasData: {
        opacity: 1,
        transition: { type: 'linear', duration: 1 }
    },
    loading: {
        opacity: [0.5, 1, 0.5],
        transition: { type: 'linear', duration: 2, repeat: Infinity }
    },
    exit: {
        opacity: 0,
        transition: { type: 'linear', duration: 1 }
    }
};

const defaultSleep = 2000;

const Github: React.FC = ({ children }) => {
    // @ts-ignore
    const repo: string = children.props.children.split('https://github.com/')[1];

    const [github, setGithub] = useState<IGithubRepoAttribute | null>(null);

    useEffect(() => {
        const start = (new Date()).valueOf();
        getGitHubRepoStats(repo)
            .then(result => {
                const interval = (new Date()).valueOf() - start;
                if (interval > defaultSleep) {
                    return new Promise<IGithubRepoAttribute>((resolve, reject) => {
                        resolve(result);
                    });
                }

                return new Promise<IGithubRepoAttribute>((resolve, reject) => {
                    setTimeout(() => {
                        resolve(result);
                    }, defaultSleep - interval);
                });
            })
            .then(result => setGithub(result))
            .catch(err => console.error(err));
    }, [repo]);

    return (
        <div className="w-full h-48 rounded-2xl border-2 overflow-hidden">
            {
                github ?
                    <motion.div className="w-full h-full flex"
                                initial="initial"
                                exit="exit"
                                animate="hasData"
                                variants={variants}>
                        <div className="w-2/3 h-full text-black mx-4 relative">
                            <div className="w-full h-10 ml-4 mt-4 text-2xl font-bold">
                                {github?.name ?? ''}
                            </div>
                            <div className="w-full mt-1 whitespace-normal leading-6 line-clamp-3"
                                 style={{ textIndent: '3rem' }}>
                                {github?.description ?? ''}
                            </div>
                            <div className="w-full absolute bottom-4 left-2 flex items-center">
                                <RiGithubFill className="text-2xl mr-2"/>
                                <span>{github?.html_url ?? ''}</span>
                            </div>
                        </div>
                        <div className="w-1/3 h-full relative">
                            {
                                github?.owner && github?.owner.avatar_url &&
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={github?.owner.avatar_url} alt="avatars"
                                     style={{
                                         margin: 0,
                                         objectFit: 'cover',
                                         objectPosition: 'center',
                                         backgroundRepeat: 'no-repeat'
                                     }}/>
                            }
                        </div>
                    </motion.div> :
                    <motion.div className="w-full h-full flex"
                                initial="initial"
                                exit="exit"
                                animate="loading"
                                variants={variants}>
                        <div className="w-2/3 h-full px-4 text-black relative">
                            <div className="w-1/3 h-10 mt-4 bg-gray-300"/>
                            <div className="w-full h-16 mt-1 bg-gray-300"/>
                            <div className="w-2/3 h-10 absolute bottom-4 left-4 flex items-center bg-gray-300"/>
                        </div>
                        <div className="w-1/3 h-full relative bg-gray-300"/>
                    </motion.div>
            }
        </div>
    );
};

const getGitHubRepoStats = async (repo: string): Promise<IGithubRepoAttribute> => {
    return fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
            'content-type': 'application/json',
            Accept: 'application / vnd.github.v3 + json'
        }
    }).then((response) => response.json());
};

export default Github;
