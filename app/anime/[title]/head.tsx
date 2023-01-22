async function getAnimeDetails(title: string) {
  let res = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${title}&page[limit]=1&page[offset]=0`, {
      next: { revalidate: 604800 }
  });
  res = await res.json();

  /** @ts-ignore */
  return res.data[0];
}

export default async function Head({params}: any) {
    const animeDetails = await getAnimeDetails(params.title);

    const englishTitle = animeDetails.attributes.titles.en !== undefined ? ` (${animeDetails.attributes.titles.en})` : '';
    const title = animeDetails.attributes.titles.en_jp + englishTitle + ' - Anime Discovery';

    return (
        <>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description"
                  content={animeDetails.attributes.synopsis || 'Discover your favorite anime with brokiem\'s Anime Discovery'}/>
            <meta name="keywords"
                  content={animeDetails.attributes.titles.en + ', anime, manga, discovery, brokiem, anime discovery, anime discovery brokiem, myanimelist'}/>

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#181818"/>

            <link rel="preconnect" href="https://cdn.myanimelist.net" crossOrigin="anonymous"/>

            <meta name="google-site-verification" content="avMYpzcNq1BU9InVUzT3RoBfxWCO68LgKJrq7ZWqqbE"/>
        </>
    )
}
