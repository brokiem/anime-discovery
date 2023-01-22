import Image from "next/image";

export async function getTopAnime() {
    const API_URL = "https://anitop-brokiem.vercel.app/api";

    let res = await fetch(`${API_URL}/v1/top-anime`, {
        next: { revalidate: 43200 }
    });
    res = await res.json();

    if (res.code === 200) {
        res.data.length = Math.min(res.data.length, 40);
        res.data = res.data.map((v: { title: any; url: any; picture: any; }) => ({...v, anime: v.title, animeLink: v.url, pictureImage: v.picture}));
        return res.data;
    }

    return [];
}

export default async function Home() {
    return (
        <>
            <main>
                <div className="flex content-center justify-center">
                    <div className="mt-10 w-full max-w-5xl text-white">
                        <h1 className="text-center text-gray-900 dark:text-white mx-5">
                            Welcome to brokiem's Anime discovery!<br />
                            Start searching for anime with the search button above.
                        </h1>

                        <div className="mt-12">
                            <Recommendations recommendations={await getTopAnime()} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

function Recommendations({recommendations}: {recommendations: any}) {
    return (<>
        <div className="marquee rounded-md mx-5">
            <div className="marquee-content" style={{animationDuration: recommendations.length * 1500 + 'ms'}}>
                {recommendations?.map((anime: any) => (<>
                    <div>
                        <div key={anime.title} className="marquee-tag w-[225px] bg-white border border-gray-200 rounded-md shadow-md dark:bg-grey dark:border-white/10">
                            <a href={'/anime/' + anime.animeLink.split('/')[anime.animeLink.split('/').length - 1].replaceAll('_', '-')}>
                                <Image
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    quality={100}
                                    className="rounded-md h-[332px] w-auto"
                                    title={anime.anime}
                                    src={anime.pictureImage.replace('r/50x70/', '').split('?')[0].split('#')[0]}
                                    alt=""
                                />
                            </a>
                        </div>

                        <h1 key={anime.title} className="text-center text-gray-900 dark:text-white w-full mt-1 mx-auto text max-w-[210px]">
                            {anime.anime}
                        </h1>
                    </div>
                </>))}
            </div>
        </div>

        <div className="mx-5">
            {recommendations.length <= 0 ?
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6 inline">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="ml-1">No recommendations found.</span>
                </> : ''
            }
        </div>
    </>);
}
