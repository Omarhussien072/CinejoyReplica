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

    useEffect(() => {
        let isMounted = true;
        const loadAllData = async () => {
            const [moviesData, showsData, providersData] = await Promise.all([
                getProviderMovies(id),
                getProviderShows(id),
                getProviders(),
            ]);
            if(isMounted){
                setProviderMovies(moviesData);
                setProviderShows(showsData);
                setProviders(providersData); 
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
    
    return (
        <>
            <div className='min-h-screen w-full relative overflow-x-hidden pb-20 lg:pb-16'>
                <div className={`absolute inset-0 z-0 w-full h-full pointer-events-none ${ProviderDiscoveryStyles.background}`}>
                </div>
                <div className='mx-auto relative z-10 pt-16 pb-20 lg:px-14 md:px-10'>
                    <div className='flex flex-col gap-10  justify-center items-center max-w-[1600] h-full pt-16 lg:pt-20'>
                        {provider && <div className='w-full flex items-center gap-2 px-4'>
                            <div className="w-16 h-16 rounded-full">
                                <img className={`rounded-2xl`} src={`${imgBaseUrl}${provider.logo_path}`} alt={provider.provider_name} />
                            </div>
                            <h1 className='text-white text-5xl font-semibold'>{provider.provider_name}</h1>
                        </div>}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 px-4">
                            {providerMovies && providerMovies.map((movie) => {
                                return <Card key={movie.id} id={movie.id} title={movie.title} img_path={movie.backdrop_path} release_date={movie.release_date} vote={movie.vote_average} type='movie' />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
