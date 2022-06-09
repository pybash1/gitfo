import Head from 'next/head'
import { useEffect, useState } from 'react';

export default function User() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [forked, setForked] = useState(null);
    const [template, setTemplate] = useState(null);
    const [stars, setStars] = useState(0);
    const [langs, setLangs] = useState([]);
    const [langsU, setLangsU] = useState([]);
    const [mostUsedLang, setMostUsedLang] = useState("");

    useEffect(() => {
        let username = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        fetch(`https://api.github.com/users/${username}/repos`, {
            method: "GET"
        }).then(res => res.json().then(
            data => {
                setData(data);
                setForked(data.filter(repo => repo.fork === true));
                setTemplate(data.filter(repo => repo.is_template === true));
                setStars(data.reduce((acc, repo) => acc + repo.stargazers_count, 0));
                let langs = [];
                data.forEach(repo => {
                    repo.language ? langs.push(repo.language) : null;
                });
                setLangs(langs);
                setLangsU([...new Set(langs)]);
                setMostUsedLang(langs.sort((a,b) => langs.filter(v => v===a).length- langs.filter(v => v===b).length).pop())
                setLoading(false);
            }
        ))
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center dark:bg-gray-800 h-screen">
                <Head>GitFo - Loading...</Head>
            </div>
        )
    }

    if (data?.message === "Not Found") {
        return <p>User not found</p>
    }

    return (
        <div className='dark:bg-gray-800 h-min-screen'>
            <Head>
            <title>GitFo - Repositories</title>
            </Head>
            <section className="text-center">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8 text-white">
                    <ul className="grid grid-cols-2 gap-4 border-2 border-blue-600 rounded-xl lg:grid-cols-4">
                        <li className="p-8">
                            <p className="text-2xl font-extrabold text-blue-500">{forked.length}</p>
                            <p className="mt-1 text-lg font-medium">Forked Repos</p>
                        </li>

                        <li className="p-8">
                            <p className="text-2xl font-extrabold text-blue-500">{template.length}</p>
                            <p className="mt-1 text-lg font-medium">Templates</p>
                        </li>

                        <li className="p-8">
                            <p className="text-2xl font-extrabold text-blue-500">{stars}</p>
                            <p className="mt-1 text-lg font-medium">Stars</p>
                        </li>

                        <li className="p-8">
                            <p className="text-2xl font-extrabold text-blue-500">{mostUsedLang}</p>
                            <p className="mt-1 text-lg font-medium">Most Used Language</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="text-center">
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8 text-white">
                    <ul className="grid grid-cols-2 gap-4 border-2 border-blue-600 rounded-xl lg:grid-cols-4">
                        {langsU?.map((lang, ind) => (
                            <li key={ind} className="p-8">
                                <p className="text-2xl font-extrabold text-blue-500">{langs.filter(item => item===lang).length}</p>
                                <p className="mt-1 text-lg font-medium">{lang}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <div className="grid grid-cols-2 gap-8 p-10">
                {data.map((repo, ind) => (
                    <p key={ind}
                        className="relative block p-8 overflow-hidden border border-gray-100 dark:border-none rounded-lg bg-gray-900"
                        >
                        <span
                            className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                        ></span>

                        <div className="justify-between sm:flex">
                            <div>
                            <a href={repo?.homepage || `https://github.com/${repo?.full_name}`}>
                                <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {repo?.name}
                                    &nbsp;&nbsp;
                                    {repo?.fork ? <strong className="border text-green-500 border-current uppercase px-5 py-0.5  rounded-full text-[10px] tracking-wide">Fork</strong> : null}
                                    {repo?.is_template ? <strong className="border text-blue-500 border-current uppercase px-5 py-0.5  rounded-full text-[10px] tracking-wide">Template</strong> : null}
                                    {repo?.archived ? <strong className="border text-yellow-500 border-current uppercase px-5 py-0.5  rounded-full text-[10px] tracking-wide">Archived</strong> : null}
                                    {repo?.disabled ? <strong className="border text-red-500 border-current uppercase px-5 py-0.5  rounded-full text-[10px] tracking-wide">Disabled</strong> : null}
                                    {repo?.full_name.split("/")[0]===repo?.full_name.split("/")[1] ? <strong className="border text-pink-500 border-current uppercase px-5 py-0.5  rounded-full text-[10px] tracking-wide">Profile</strong> : null}
                                </h5>
                            </a>
                            <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">AKA {repo?.full_name}</p>
                            </div>
                        </div>

                        <div className="mt-4 sm:pr-8">
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                            {repo?.description}
                            </p>
                        </div>

                        <dl className="flex mt-6">
                            <div className="flex flex-col-reverse">
                                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Created</dt>
                                <dd className="text-xs text-gray-500 dark:text-gray-300">{repo?.created_at.split("T")[0].split("-").reverse().join("/")}</dd>
                            </div>

                            <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Stars</dt>
                                <dd className="text-xs text-gray-50 dark:text-gray-300">{repo?.stargazers_count}</dd>
                            </div>

                            <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Watchers</dt>
                                <dd className="text-xs text-gray-50 dark:text-gray-300">{repo?.watchers_count}</dd>
                            </div>

                            <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Forks</dt>
                                <dd className="text-xs text-gray-50 dark:text-gray-300">{repo?.forks_count}</dd>
                            </div>

                            {repo?.language ? (
                                <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Language</dt>
                                    <dd className="text-xs text-gray-50 dark:text-gray-300">{repo?.language}</dd>
                                </div>
                            ) : null}

                            {repo?.location ? (
                                <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Based in</dt>
                                    <dd className="text-xs text-gray-50 dark:text-gray-300">{repo?.location}</dd>
                                </div>
                            ) : null}

                            {repo?.license ? (
                                <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">License</dt>
                                    <dd className="text-xs text-gray-50 dark:text-gray-300">{repo?.license?.name}</dd>
                                </div>
                            ) : null}
                            
                            <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Issues</dt>
                                <dd className="text-xs text-gray-50 dark:text-gray-300">{repo?.open_issues_count}</dd>
                            </div>
                        </dl>
                    </p>
                ))}
            </div>
        </div>
  )
}
