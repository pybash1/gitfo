import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function User() {
    const [data, setData] = useState(null);
    const [orgdata, setOrgData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let username = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
        fetch(`https://api.github.com/users/${username}`, {
            method: "GET"
        }).then(res => res.json().then(
            data => {
                setData(data);
            }
        ))
        fetch(`https://api.github.com/users/${username}/orgs`, {
            method: "GET"
        }).then(res => res.json().then(
            data => {
                setOrgData(data);
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

    if (data?.message === "Not Found" || !data) {
        return (
            <div className="bg-indigo-900 relative overflow-hidden h-screen">
                <img src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9" className="absolute h-full w-full object-cover"/>
                <div className="inset-0 bg-black opacity-25 absolute">
                </div>
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                    <div className="w-full font-mono flex flex-col items-center relative z-10">
                        <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                            You reached Mars before Elon Musk! Woah! But you are all alone.
                        </h1>
                        <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
                            404
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='dark:bg-gray-800 h-screen flex items-center justify-center'>
            <Head>
                <title>GitFo - Profile - {data?.login}</title>
            </Head>
            {data?.hireable ? <div className="fixed inset-x-0 bottom-0 px-4 pb-3">
                <div className="relative px-4 py-3 text-white bg-blue-600 rounded-lg pr-14">
                    <p className="text-sm font-medium text-left sm:text-center">
                    Loved the Profile? Then you will be glad to know that {data?.name} is looking for jobs!
                    {" "}
                    <a className="underline" href={`https://github.com/${data?.login}`}>Hire &rarr; </a>
                    </p>
                </div>
            </div> : null}
            <p
                className="relative block p-8 overflow-hidden border border-gray-100 dark:border-none rounded-lg bg-gray-100 dark:bg-gray-900"
                >
                <span
                    className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span>

                <div className="justify-between sm:flex">
                    <div>
                    <a href={`https://github.com/${data?.login}`}>    
                        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                            {data?.name}
                        </h5>
                    </a>
                    <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">AKA {data?.login}</p>
                    </div>

                    <div className="flex-shrink-0 hidden ml-3 sm:block">
                    <img
                        className="object-cover w-16 h-16 rounded-lg shadow-sm"
                        src={data?.avatar_url}
                        alt=""
                    />
                    </div>
                </div>

                <div className="mt-4 sm:pr-8">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                    {data?.bio}
                    </p>
                </div>

                <dl className="flex mt-6">
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Joined</dt>
                        <dd className="text-xs text-gray-500 dark:text-gray-300">{data?.created_at.split("T")[0].split("-").reverse().join("/")}</dd>
                    </div>

                    <div className="flex flex-col-reverse ml-3 sm:ml-6">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Followers</dt>
                        <dd className="text-xs text-gray-500 dark:text-gray-300">{data?.followers}</dd>
                    </div>

                    <div className="flex flex-col-reverse ml-3 sm:ml-6">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Following</dt>
                        <dd className="text-xs text-gray-500 dark:text-gray-300">{data?.following}</dd>
                    </div>

                    {data?.company ? (
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Currently Working For</dt>
                            <dd className="text-xs text-gray-500 dark:text-gray-300">{data?.company}</dd>
                        </div>
                    ) : null}

                    {data?.location ? (
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Based in</dt>
                            <dd className="text-xs text-gray-500 dark:text-gray-300">{data?.location}</dd>
                        </div>
                    ) : null}

                    <Link href={`/repos/${data?.login}`}>
                        <a>
                            <div className="flex flex-col-reverse ml-3 sm:ml-6">
                                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Repositories</dt>
                                <dd className="text-xs text-gray-500 dark:text-gray-300">{data?.public_repos}</dd>
                            </div>    
                        </a>
                    </Link>

                    <div className="flex flex-col-reverse ml-3 sm:ml-6">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Gists</dt>
                        <dd className="text-xs text-gray-500 dark:text-gray-300">{data?.public_gists}</dd>
                    </div>
                </dl>
            </p>
            &nbsp;&nbsp;
            {!data?.twitter_username && !data?.blog ? null : (
            <article className="p-4 bg-gray-100 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center">
                    <div className="ml-3">
                    <h5 className="text-lg font-medium dark:text-white">Socials</h5>
                    <div className="flow-root">
                    </div>
                    </div>
                </div>

                <ul className="mt-4 space-y-2">
                    {data?.twitter_username ? (
                        <li>
                            <a
                                href={`https://twitter.com/${data?.twitter_username}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block h-full p-4 border border-gray-700 rounded-lg hover:border-green-600"
                            >
                                <h5 className="font-medium dark:text-white">{data?.twitter_username}</h5>

                                <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-300">
                                {data?.name}&apos;s twitter!
                                </p>
                            </a>
                        </li>
                    ) : null}
                    {data?.blog ? (
                        <li>
                            <a
                                href={data?.blog}
                                target="_blank"
                                rel="noreferrer"
                                className="block h-full p-4 border border-gray-700 rounded-lg hover:border-green-600"
                            >
                                <h5 className="font-medium dark:text-white">Website</h5>

                                <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-300">
                                {data?.name}&apos;s website!
                                </p>
                            </a>
                        </li>
                    ) : null}
                </ul>
            </article>
            )}
            &nbsp;&nbsp;
            {orgdata?.length===0 ? null : (
            <article className="p-4 bg-gray-100 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center">
                    <div className="ml-3">
                    <h5 className="text-lg font-medium dark:text-white">Organizations</h5>
                    <div className="flow-root">
                    </div>
                    </div>
                </div>

                <ul className="mt-4 space-y-2">
                    {orgdata?.map((org, ind) => (
                        <li key={ind}>
                            <a
                                href={`https://github.com/${org.login}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block h-full p-4 border border-gray-700 rounded-lg hover:border-blue-600"
                            >
                                <h5 className="font-medium dark:text-white">{org.login}</h5>

                                <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-300">
                                {org.description}
                                </p>
                            </a>
                        </li>
                        )
                    )
                    }
                </ul>
            </article>
            )}
        </div>
  )
}
