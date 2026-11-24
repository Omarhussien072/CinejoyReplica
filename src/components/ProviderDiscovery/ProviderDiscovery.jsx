import { useEffect, useState } from 'react';
import ProviderDiscoveryStyles from './ProviderDiscovery.module.css';
import { useParams } from 'react-router-dom';
import { getProviderMovies, getProviders, getProviderShows, imgBaseUrl } from '../../Services/ApiService/ApiService';
import Card from '../Card/Card';
export default function ProviderDiscovery() {
    const { id } = useParams();
    const [providerMovies, setProviderMovies] = useState([]);
    const [providerShows, setProviderShows] = useState([]);
    const [providers, setProviders] = useState([]);
    const [secondRender, setSecondRender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMoviesActive, setIsMoviesActive] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const loadAllData = async () => {
            const [moviesData, showsData, providersData] = await Promise.all([
                getProviderMovies(id),
                getProviderShows(id),
                getProviders(),
            ]);
            if (isMounted) {
                setProviderMovies(moviesData);
                setProviderShows(showsData);
                setProviders(providersData);
                if(moviesData && moviesData.length > 0){
                    setIsMoviesActive(true)
                }else{
                    setIsMoviesActive(false);
                }
                setIsLoading(false);
            }
        }
        loadAllData();
        return () => { isMounted = false; setSecondRender(true) }
    }, [id]);


    if (isLoading) {
        return <div className='min-h-screen w-full flex justify-center items-center'>
            <div className={`${ProviderDiscoveryStyles.loading}`}></div> {setTimeout(() => {
                return;
            }, 4000)};
        </div>
    }


    if ((!providerMovies && !providerShows) && secondRender) {
        return <div className='text-white text-4xl'> not found</div>;
    }

    if ((!providerMovies && !providerShows && !providers)) {
        return
    }
    let provider = providers.find((provider) => provider.provider_id === Number(id));


    const display = (e) => {
        let text = e.target.innerText.toLowerCase();
        let classList = Array(e.target.classList);

        if (text === 'movies' && !classList.includes('active')) {
            e.target.classList.add('active');
            document.getElementById('shows').classList.remove('active');
            setIsMoviesActive(true);
        }

        if (text === 'shows' && !classList.includes('active')) {
            e.target.classList.add('active');
            document.getElementById('movies').classList.remove('active');
            setIsMoviesActive(false);
        }
    }

    return (
        <>
        {console.log(isMoviesActive)}
            <div className='min-h-screen w-full relative overflow-x-hidden pb-20 lg:pb-16'>
                <div className={`absolute inset-0 z-0 w-full h-full pointer-events-none ${ProviderDiscoveryStyles.background}`}>
                </div>

                <div className='mx-auto relative z-10 pt-16 pb-20 lg:px-14 md:px-10'>
                    <div className='flex flex-col gap-10  justify-center max-w-[1600] h-full pt-16 lg:pt-20'>
                        {provider && <div className='w-full flex items-center gap-2 px-4'>
                            <div className="w-16 h-16 rounded-full">
                                <img className={`rounded-2xl`} src={`${imgBaseUrl}${provider.logo_path}`} alt={provider.provider_name} />
                            </div>
                            <h1 className='text-white text-5xl font-semibold'>{provider.provider_name}</h1>
                        </div>}
                        <div className='w-60 h-full text-white/40 backdrop:blur-3xl'>
                            <nav className='px-4 py-3 h-15 bg-white/60 grid grid-cols-2 gap-3 rounded-full'>
                                <button id='movies' onClick={display} className={`hover:text-white transition-all duration-300 cursor-pointer ${(providerMovies.length > 0 && providerShows.length > 0) || (providerMovies.length > 0 && !providerShows.length > 0) ? 'active' : ''} ${ProviderDiscoveryStyles.navItem}`}>Movies</button>
                                <button id='shows' onClick={display} className={`hover:text-white transition-all duration-300 cursor-pointer ${(!providerMovies.length > 0 && providerShows.length > 0) ? 'active' : ''} ${ProviderDiscoveryStyles.navItem}`}>Shows</button>
                            </nav>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 px-4">
                            {isMoviesActive ? providerMovies.map((movie) => {
                                return <Card key={movie.id} id={movie.id} title={movie.title} img_path={movie.backdrop_path} release_date={movie.release_date} vote={movie.vote_average} type='movie' />
                            }) :
                                providerShows.map((show) => {
                                    return <Card key={show.id} id={show.id} title={show.name} img_path={show.backdrop_path} release_date={show.first_air_date} vote={show.vote_average} type='tv' />
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
