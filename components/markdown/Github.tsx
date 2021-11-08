import React, { useEffect, useState } from 'react';
import { RiGithubFill } from 'react-icons/ri';

interface IGithubRepoAttribute {
    name: string;
    html_url: string;
    description: string;
    owner: {
        avatar_url: string;
    };
}

const Github: React.FC = ({ children }) => {
    // @ts-ignore
    const repo: string = children.props.children.split('https://github.com/')[1];

    const [github, setGithub] = useState<IGithubRepoAttribute | null>();

    useEffect(() => {
        setGithub(null);
        getGitHubRepoStats(repo)
            .then(result => setGithub(result))
            .catch(err => console.error(err));
    }, [repo]);

    return (
        <div className="w-full h-48 rounded-2xl border-2 flex overflow-hidden">
            {
                github && (
                    <>
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
                                     style={{ margin: 0 }}/>
                            }
                        </div>
                    </>
                )
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
