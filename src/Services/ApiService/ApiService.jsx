import axios from "axios";
export const imgBaseUrl = 'https://image.tmdb.org/t/p/w1280';

export const getMovies = async (page = 1) => {
    let moviesCache = localStorage.getItem('movies');

    if (moviesCache && page === 1) {
        return JSON.parse(moviesCache);
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&page=${page}&include_video=true&language=en-US`)
        .then(res => res.data.results)
        .catch(err => console.error(err));


    if (res && res.length > 0 && page === 1) {
        localStorage.setItem('movies', JSON.stringify(res));
        return res;
    }
    return res
}

export const getShows = async (page = 1) => {
    let showsCache = localStorage.getItem('shows');

    if (showsCache && page === 1) {
        return JSON.parse(showsCache);
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&page=${page}&include_video=true&language=en-US`)
        .then(res => res.data.results)
        .catch(err => console.error(err));


    if (res && res.length > 0 && page === 1) {
        localStorage.setItem('shows', JSON.stringify(res));
        return res;
    }
    return res
}

export const getTopRatedMovies = async (page = 1) => {
    let moviesCache = localStorage.getItem('topMovies');

    if (moviesCache && page === 1) {
        return JSON.parse(moviesCache);
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&page=${page}&include_video=true&language=en-US`)
        .then(res => res.data.results)
        .catch(err => console.error(err));

    if (res && res.length > 0 && page === 1) {
        localStorage.setItem('topMovies', JSON.stringify(res));
        return res;
    }
    return res;
}

export const getTopRatedShows = async (page = 1) => {
    let showsCache = localStorage.getItem('topShows');

    if (showsCache && page === 1) {
        return JSON.parse(showsCache);
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&page=${page}&include_video=true&language=en-US`)
        .then(res => res.data.results)
        .catch(err => console.error(err));

    if (res && res.length > 0 && page === 1) {
        localStorage.setItem('topShows', JSON.stringify(res));
        return res;
    }
    return res;
}

export const getTrendingMovies = async (page = 1) => {
    let moviesCache = localStorage.getItem('trendingMovies');

    if (moviesCache && page) {
        return JSON.parse(moviesCache);
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&page=${page}&include_video=true&language=en-US`)
        .then(res => res.data.results)
        .catch(err => console.error(err));

    if (res && res.length > 0) {
        localStorage.setItem('trendingMovies', JSON.stringify(res));
        return res;
    }
    return res;

}

export const getTrendingShows = async (page = 1) => {
    let showsCache = localStorage.getItem('trendingShows');

    if (showsCache) {
        return JSON.parse(showsCache);
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}trending/tv/day?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&page=${page}&include_video=true&language=en-US`)
        .then(res => res.data.results)
        .catch(err => console.error(err));

    if (res && res.length > 0) {
        localStorage.setItem('trendingShows', JSON.stringify(res));
        return res;
    }
    return res;
}

export const getProviders = async (region = 'eg') => {
    let providerCache = localStorage.getItem('providers');

    if (providerCache) {
        return JSON.parse(providerCache);
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}watch/providers/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&watch_region=${region}`)
        .then(res => res.data.results)
        .catch(err => console.error(err));

    if (res && res.length > 0) {
        localStorage.setItem('providers', JSON.stringify(res))
        return res;
    }
}

export const getMovieTrailer = async (movie_id) => {
    let res = await axios(`${import.meta.env.VITE_API_URL}movie/${movie_id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
        .then(res => res.data.results.filter((trailer) => trailer.type === 'Trailer'))
        .catch(err => console.error(err));

    if (res && res.length > 0) {
        return res;
    }
}
export const getShowTrailer = async (show_id) => {
    let res = await axios(`${import.meta.env.VITE_API_URL}tv/${show_id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
        .then(res => res.data.results.filter((trailer) => trailer.type === 'Trailer'))
        .catch(err => console.error(err));

    if (res && res.length > 0) {
        return res;
    }
}

export const getMovieLogo = async (movie_id) => {
    let res = await axios(`${import.meta.env.VITE_API_URL}movie/${movie_id}/images?api_key=${import.meta.env.VITE_API_KEY}&include_image_language=en`)
        .then(res => res.data.logos)
        .catch(err => console.error(err));
    if (res && res.length > 0) {
        return `${imgBaseUrl}${res[0].file_path}`;
    }
}
export const getShowLogo = async (show_id) => {
    let res = await axios(`${import.meta.env.VITE_API_URL}tv/${show_id}/images?api_key=${import.meta.env.VITE_API_KEY}&include_image_language=en`)
        .then(res => res.data.logos)
        .catch(err => console.error(err));
    if (res && res.length > 0) {
        return res;
    }
}

export const getAllGenres = async () => {
    let allGenres = localStorage.getItem('allGenres');

    if (allGenres) {
        return JSON.parse(allGenres);
    }


    let moviesRes = await axios(`${import.meta.env.VITE_API_URL}genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
        .then(res => res.data.genres)
        .catch(err => console.error(err));

    let showsRes = await axios(`${import.meta.env.VITE_API_URL}genre/tv/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
        .then(res => res.data.genres)
        .catch(err => console.error(err));
    if ((moviesRes && moviesRes.length > 0) && (showsRes && showsRes.length > 0)) {
        allGenres = [...moviesRes, ...showsRes];
        localStorage.setItem('allGenres', JSON.stringify(allGenres));
        return allGenres;
    }
}

export const getHeroMovies = async () => {
    let heroCache = localStorage.getItem('heroMovies');

    if (heroCache) {
        return JSON.parse(heroCache);
    }
    try {
        let trendingMovies = await getTrendingMovies();
        let top7Movies = trendingMovies.slice(0, 7);
        const moviesWithTrailer = await Promise.all(
            top7Movies.map(async (movie) => {
                const trailerKey = await getMovieTrailer(movie.id);
                const logo_path = await getMovieLogo(movie.id);
                const allGenres = await getAllGenres();
                const genre = allGenres.filter((genre) => genre.id === movie.genre_ids[0]);
                return { ...movie, trailerKey, logo_path, genre }
            })
        );

        const heroData = moviesWithTrailer.filter((movie) => movie.trailerKey !== '');

        if (heroData && heroData.length > 0) {
            localStorage.setItem('heroMovies', JSON.stringify(heroData));
            return heroData;
        }
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

export const getDetails = async (id, type) => {

    const detailsType = type === 'series' || type === 'tv' ? 'tv' : 'movie';
    const uniqueKey = `${detailsType}_${id}`;

    let detailsCache = JSON.parse(localStorage.getItem('detailsCache')) || {};

    if (detailsCache[uniqueKey]) {
        return detailsCache[uniqueKey];
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}${detailsType}/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos,credits,similar`)
        .then(res => res.data)
        .catch(err => console.error(err));

    let logo = type === 'movie' ? await getMovieLogo(id) : await getShowLogo(id);
    const detailsWithLogo = { ...res, logo };


    const cacheKeys = Object.keys(detailsCache);
    if (cacheKeys.length >= 15) {
        delete detailsCache[cacheKeys[0]];
    }

    detailsCache[uniqueKey] = detailsWithLogo;
    localStorage.setItem('detailsCache', JSON.stringify(detailsCache));
    return detailsWithLogo;

}


export const getRecommendations = async (id, type) => {
    let recommendationType = type === 'series' || type === 'tv' ? 'tv' : 'movie';
    let uniqueKey = `${recommendationType}_${id}`;

    let recommendationsCache = JSON.parse(localStorage.getItem('recommendationsCache')) || {};

    if (recommendationsCache[uniqueKey]) {
        return recommendationsCache[uniqueKey];
    }

    let res = await axios(`${import.meta.env.VITE_API_URL}${recommendationType}/${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.data.results)
        .catch(err => console.log(err))

    const cacheKeys = Object.keys(recommendationsCache);
    if (cacheKeys.length >= 15) {
        delete recommendationsCache[cacheKeys[0]];
    }

    recommendationsCache[uniqueKey] = res;
    localStorage.setItem('recommendationsCache', JSON.stringify(recommendationsCache));

    return res;
}