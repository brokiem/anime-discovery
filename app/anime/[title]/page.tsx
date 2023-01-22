import {getInfoFromName, getRecommendationsList} from "mal-scraper";
import Image from 'next/image';
import styles from './anime.module.css';

async function getAnimeDetails(title: string) {
    return await getInfoFromName(title, true);
}

function getRatingColor(score: number) {
    if (score >= 7) {
        return {stroke: "#00CC66", fill: "#E4F9EE", text: "#008800"};
    } else if (score >= 5) {
        return {stroke: "#FFAA33", fill: "#FFF6E9", text: "#C33300"};
    } else if (score >= 1) {
        return {stroke: "#FF3333", fill: "#FFE9E9", text: "#D63131"};
    } else {
        return {stroke: "#999999", fill: "#FFFFFF", text: "#999999"};
    }
}

export default async function Anime({params}: any) {
    const animeDetails = await getAnimeDetails(params.title.replaceAll("-", " ").replaceAll("+", " "));
    const ratingColor = getRatingColor(parseInt(animeDetails.score as string));

    // @ts-ignore
    return (
        <>
            <div className="flex content-center justify-center">
                <div className="mt-10 w-full max-w-5xl text-white">
                     <div className="mx-5">
                        <div className="space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
                            <Image
                                src={animeDetails.picture || ''}
                                width="255"
                                height="0"
                                sizes="100vw"
                                quality={100}
                                alt="Anime cover"
                                className="hover:cursor-pointer flex items-center justify-center mx-auto h-80 bg-gray-300 rounded-md dark:bg-grey"
                            />

                            <div className="w-full">
                                <span className="mr-3 font-bold text-lg text-gray-900 dark:text-white" data-tooltip="Click to copy the page URL">
                                    {animeDetails.title}

                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        { animeDetails.type }
                                    </span>
                                </span>

                                <div className="mt-1">
                                    <div className="flex flex-row flex-wrap gap-y-2">
                                        {
                                            /** @ts-ignore */
                                            animeDetails.genres?.filter((genre: any) => genre).filter(e => e !== 'Award Winning').map(genre => (
                                                <div className="font-light w-fit border border-gray-400 rounded text-gray-900 text-xs mr-2 px-2 py-0.5 dark:text-gray-200" key={genre}>
                                                    {genre}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <p className="mt-2 text-gray-900 dark:text-white md:max-h-[17.125rem] md:pr-2 overflow-x-hidden" dangerouslySetInnerHTML={{ __html: animeDetails.synopsis?.replaceAll('[Written by MAL Rewrite]', '').replace(/\n+$/, '').replaceAll('\n', '<br>') || ''}}></p>
                            </div>
                        </div>

                        <hr className="rounded my-5" />

                         <div className="md:flex md:space-x-5 md:items-center md:content-center">
                             <div className="grid place-items-center mb-7 md:mb-0">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="h-20 w-20">
                                     <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                           fill={ratingColor.fill}>
                                     </path>
                                     <path className={styles.circle} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                           fill={ratingColor.fill}
                                           stroke={ratingColor.stroke}
                                           strokeWidth="2"
                                           strokeDasharray={parseInt(animeDetails.score) * 10 + `, 100`}
                                     />
                                     <text x="18" y="22.5" fill={ratingColor.text} className={styles.percentage}>{animeDetails.score}</text>
                                 </svg>
                                 <div className="pt-2"></div>
                                 <p className="text-center text-gray-900 dark:text-white">Score</p>
                             </div>

                             <div className="vertical-line h-20 hidden md:block"></div>

                             <div className="w-full md:w-[50%]">
                                 <span className="text-gray-900 dark:text-white">Ranked <span className="float-right">{animeDetails.ranked}</span></span><br />
                                 <hr className="rounded h-3 mt-1" />
                                 <span className="text-gray-900 dark:text-white">Popularity <span className="float-right">{animeDetails.popularity}</span></span><br />
                                 <hr className="rounded h-3 mt-1" />
                                 <span className="text-gray-900 dark:text-white">Members <span className="float-right">{animeDetails.members}</span></span><br />
                                 <hr className="rounded h-3 mt-1" />
                             </div>

                             <div className="vertical-line h-20 hidden md:block"></div>

                             <div className="w-full md:w-[50%]">
                                 <span className="text-gray-900 dark:text-white">Status <span className="float-right">{animeDetails.status}</span></span><br />
                                 <hr className="rounded h-3 mt-1" />
                                 <span className="text-gray-900 dark:text-white">Aired <span className="float-right">{animeDetails.aired}</span></span><br />
                                 <hr className="rounded h-3 mt-1" />
                                 <span className="text-gray-900 dark:text-white">Rating <span className="float-right">{animeDetails.rating}</span></span><br />
                                 <hr className="rounded h-3 mt-1" />
                             </div>
                         </div>

                         <hr className="rounded my-5" />

                         <p className="mb-1 text-gray-900 dark:text-white">Characters & Voice Actors</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                            {
                                animeDetails.characters?.map((character: any) => (
                                    <Character
                                        key={character.name}
                                        character={character}
                                        isStaff={false}
                                    />
                                ))
                            }
                         </div>

                        <p className="mt-8 mb-1 text-gray-900 dark:text-white">Staff</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                            {
                                animeDetails.staff?.map((character: any) => (
                                    <Character
                                        key={character.name}
                                        character={character}
                                        isStaff={true}
                                    />
                                ))
                            }
                        </div>

                        <p className="mt-8 mb-1 text-gray-900 dark:text-white">Trailer</p>
                        <div>
                            {

                            }
                        </div>

                        <p className="mt-8 mb-1 text-gray-900 dark:text-white">Recommendations</p>
                    </div>

                    <Recommendations recommendations={await getRecommendationsList(animeDetails.title)}/>
                </div>
            </div>

            <div className="mb-10"></div>
        </>
    )
}

function Character({character, isStaff}: {character: any, isStaff: boolean}) {
    return (
        <>
            <div className="flex items-center bg-gray-100 border border-black/10 rounded-md shadow-sm flex-row dark:border-gray-300/20 dark:bg-grey">
                <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    quality={95}
                    className="object-cover h-[62px] w-12 rounded-l-md"
                    src={character.picture.replace('https://cdn.myanimelist.net/images/questionmark_23.jpg', 'https://cdn.myanimelist.net/r/42x62/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c')}
                    alt=""
                />
                <div className="flex-1 flex-col justify-between pl-2 pr-2">
                    <a href={character.link} target="_blank" className="font-normal leading-none text-[0.95rem] hover:underline text-gray-700 dark:text-gray-400">
                        { character.name }
                    </a>
                    <p className="font-normal text-xs mt-1 text-gray-700 dark:text-gray-400">{character.role}</p>
                </div>

                { !isStaff && character.seiyuu.name.length > 0 ?
                    <div className="flex-1 flex-col justify-between pl-6 pr-2">
                        <p className="font-normal leading-none hover:cursor-pointer text-[0.95rem] hover:underline text-gray-700 dark:text-gray-400 text-end">
                            { character.seiyuu.name }
                        </p>
                        <p className="font-normal text-xs mt-2 text-gray-700 dark:text-gray-400 text-end">Japanese</p>
                    </div> : ''
                }

                { !isStaff && character.seiyuu.name.length > 0 ?
                    <Image
                        width="0"
                        height="0"
                        sizes="100vw"
                        quality={85}
                        className="object-cover h-[62px] w-12 rounded-r-md"
                        src={character.seiyuu.picture || 'https://cdn.myanimelist.net/r/42x62/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c'}
                        alt=""
                    /> : ''
                }
            </div>
        </>
    );
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
