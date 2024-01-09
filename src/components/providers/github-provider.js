import React, {createContext, useCallback, useState } from 'react'
import api from '../../services/api';

export const GithubContext = createContext({
    leading: false,
    user:{},
    repostories: [],
    starred: [],
})
export default function GithubProvider({children}) {
    const[githubState, setGithub] = useState({
        leading: false,
        user:{
            login: undefined,
                name: 'Mateus',
                    html_url: undefined,
                        blog: undefined,
                            company:  undefined,
                                location: undefined,
                                    followers: 0,
                                        following: 0,
                                            public_gists: 0,
                                                public_repos: 0,
                
        },
        repostories: [],
        starred: [],
    });

    const getUser = (username) => {
        api.get(`users/${username}`).then(({data: {user}}) => {
            setgithubState((prevState) => ({
                ...prevState,
                user:{
                    login: user.login,
                        name: user.name,
                            html_url: user.html_url,
                                blog: user.blog,
                                    company:  user.company,
                                        location: user.location,
                                            followers: user.followers,
                                                following: user.following,
                                                    public_gists: user.public_gists,
                                                        public_repos: user.public_repos,
                },
            }));
        });
    };
    const contexValue = {
        githubState,
        getUser: useCallback((username) => getUser(username), []),
    }
    return (<GithubContext.Provider value={contexValue}>{children}</GithubContext.Provider>);
}
