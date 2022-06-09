import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const redirect = () => {
    router.push("/profile/"+username); 
  }

  return (
    <div className='dark:bg-gray-700 h-screen flex items-center justify-center'>
      <Head>
        <title>GitFo - Home</title>
      </Head>
      <div class="relative">
        <label class="sr-only" for="username"> Email </label>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          class="dark:bg-gray-900 dark:text-white w-full py-4 pl-3 pr-16 text-sm rounded-lg"
          id="username"
          type="username"
          placeholder="GitHub Username"
        />

        <button onClick={redirect} class="absolute p-2 text-white -translate-y-1/2 bg-blue-600 rounded-full top-1/2 right-4" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}
