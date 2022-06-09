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
        return <p>Loading</p>
    }

    if (data?.message === "Not Found") {
        return <p>User not found</p>
    }

    return (
        <div className='dark:bg-gray-800 h-screen flex items-center justify-center'>
            <Head>
            <title>GitFo - Profile - {data?.login}</title>
            </Head>
            <div class="fixed inset-x-0 bottom-0 px-4 pb-3">
                <div class="relative px-4 py-3 text-white bg-blue-600 rounded-lg pr-14">
                    <p class="text-sm font-medium text-left sm:text-center">
                    Loved the Profile? Then you will be glad to know that {data?.name} is looking for jobs!
                    {" "}
                    <a class="underline" href={`https://github.com/${data?.login}`}>Hire &rarr; </a>
                    </p>
                </div>
            </div>
            <p
                class="relative block p-8 overflow-hidden border border-gray-100 dark:border-none rounded-lg bg-gray-900"
                >
                <span
                    class="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span>

                <div class="justify-between sm:flex">
                    <div>
                    <a href={`https://github.com/${data?.login}`}>    
                        <h5 class="text-xl font-bold text-gray-900 dark:text-white">
                            {data?.name}
                        </h5>
                    </a>
                    <p class="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">AKA {data?.login}</p>
                    </div>

                    <div class="flex-shrink-0 hidden ml-3 sm:block">
                    <img
                        class="object-cover w-16 h-16 rounded-lg shadow-sm"
                        src={data?.avatar_url}
                        alt=""
                    />
                    </div>
                </div>

                <div class="mt-4 sm:pr-8">
                    <p class="text-sm text-gray-500 dark:text-gray-300">
                    {data?.bio}
                    </p>
                </div>

                <dl class="flex mt-6">
                    <div class="flex flex-col-reverse">
                        <dt class="text-sm font-medium text-gray-600 dark:text-gray-300">Joined</dt>
                        <dd class="text-xs text-gray-500 dark:text-gray-300">{data?.created_at.split("T")[0].split("-").reverse().join("/")}</dd>
                    </div>

                    <div class="flex flex-col-reverse ml-3 sm:ml-6">
                        <dt class="text-sm font-medium text-gray-600 dark:text-gray-300">Followers</dt>
                        <dd class="text-xs text-gray-50 dark:text-gray-300">{data?.followers}</dd>
                    </div>

                    <div class="flex flex-col-reverse ml-3 sm:ml-6">
                        <dt class="text-sm font-medium text-gray-600 dark:text-gray-300">Following</dt>
                        <dd class="text-xs text-gray-50 dark:text-gray-300">{data?.following}</dd>
                    </div>

                    {data?.company ? (
                        <div class="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt class="text-sm font-medium text-gray-600 dark:text-gray-300">Currently Working For</dt>
                            <dd class="text-xs text-gray-50 dark:text-gray-300">{data?.company}</dd>
                        </div>
                    ) : null}

                    {data?.location ? (
                        <div class="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt class="text-sm font-medium text-gray-600 dark:text-gray-300">Based in</dt>
                            <dd class="text-xs text-gray-50 dark:text-gray-300">{data?.location}</dd>
                        </div>
                    ) : null}

                    <Link href={`/repos/${data?.login}`}>
                        <a>
                            <div class="flex flex-col-reverse ml-3 sm:ml-6">
                                <dt class="text-sm font-medium text-gray-600 dark:text-gray-300">Repositories</dt>
                                <dd class="text-xs text-gray-50 dark:text-gray-300">{data?.public_repos}</dd>
                            </div>    
                        </a>
                    </Link>

                    <div class="flex flex-col-reverse ml-3 sm:ml-6">
                        <dt class="text-sm font-medium text-gray-600 dark:text-gray-300">Gists</dt>
                        <dd class="text-xs text-gray-50 dark:text-gray-300">{data?.public_gists}</dd>
                    </div>
                </dl>
            </p>
            &nbsp;&nbsp;
            {!data?.twitter_username && !data?.blog ? null : (
            <article class="p-4 bg-gray-900 rounded-xl">
                <div class="flex items-center">
                    <div class="ml-3">
                    <h5 class="text-lg font-medium text-white">Socials</h5>
                    <div class="flow-root">
                    </div>
                    </div>
                </div>

                <ul class="mt-4 space-y-2">
                    {data?.twitter_username ? (
                        <li>
                            <a
                                href={`https://twitter.com/${data?.twitter_username}`}
                                target="_blank"
                                class="block h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600"
                            >
                                <h5 class="font-medium text-white">{data?.twitter_username}</h5>

                                <p class="mt-1 text-xs font-medium text-gray-300">
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
                                class="block h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600"
                            >
                                <h5 class="font-medium text-white">Website</h5>

                                <p class="mt-1 text-xs font-medium text-gray-300">
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
            <article class="p-4 bg-gray-900 rounded-xl">
                <div class="flex items-center">
                    <div class="ml-3">
                    <h5 class="text-lg font-medium text-white">Organizations</h5>
                    <div class="flow-root">
                    </div>
                    </div>
                </div>

                <ul class="mt-4 space-y-2">
                    {orgdata?.map(org => (
                        <li>
                            <a
                                href={`https://github.com/${org.login}`}
                                target="_blank"
                                class="block h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600"
                            >
                                <h5 class="font-medium text-white">{org.login}</h5>

                                <p class="mt-1 text-xs font-medium text-gray-300">
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
