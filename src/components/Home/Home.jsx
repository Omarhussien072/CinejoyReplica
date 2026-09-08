import HomeStyles from './Home.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { getProviders, getTopRatedMovies, getTopRatedShows, getTrendingMovies, getTrendingShows, getAllGenres, getHeroMovies } from '../../Services/ApiService/ApiService';
import { AnimatePresence, motion } from "motion/react"
import { NavLink } from 'react-router-dom';
import YouTube from 'react-youtube';
import CarouselComponent from '../CarouselComponent/CarouselComponent';
import magicPill from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Home() {
    let [providers, setProviders] = useState([]);
    let [topRatedShows, setTopRatedShows] = useState([]);
    let [topRatedMovies, setTopRatedMovies] = useState([]);
    let [trendingMovies, setTrendingMovies] = useState([]);
    let [trendingShows, setTrendingShows] = useState([]);
    let [heroMovies, setHeroMovies] = useState([]);

    let [currentIndex, setCurrentIndex] = useState(0);
    let [isPaused, setIsPaused] = useState(false);
    let [isMuted, setIsMuted] = useState(true);
    let [isFullScreen, setIsFullScreen] = useState(false);
    let [player, setPlayer] = useState(null);
    let imgBaseUrl = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        const loadProviders = async () => {
            const data = await getProviders();
            setProviders(data);
        };

        const loadTopRatedMovies = async () => {
            const data = await getTopRatedMovies();
            setTopRatedMovies(data)
        };

        const loadTopRatedShows = async () => {
            const data = await getTopRatedShows();
            setTopRatedShows(data)
        };

        const loadTrendingMovies = async () => {
            const data = await getTrendingMovies();
            setTrendingMovies(data)
        };

        const loadTrendingShows = async () => {
            const data = await getTrendingShows();
            setTrendingShows(data)
        };

        const loadHeroMovies = async () => {
            const data = await getHeroMovies();
            setHeroMovies(data);
        }

        loadProviders();
        loadTopRatedMovies();
        loadTopRatedShows();
        loadTrendingMovies()
        loadTrendingShows();
        loadHeroMovies();

    }, [])

    useEffect(() => {
        if (isPaused || heroMovies.length === 0) return;

        let timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === heroMovies.length - 1 ? 0 : prev + 1))
        }, 6000);

        return () => clearInterval(timer);
    }, [heroMovies.length, currentIndex, isPaused])

    let activeMovie = heroMovies[currentIndex];

    const onReady = (e) => {
        setPlayer(e.target);
        if (isFullScreen) {
            triggerNativeFullScreen(e.target.getIframe());
            e.target.unMute();
            e.target.playVideo();
            setIsMuted(false);
            setIsFullScreen(true);
        } else {
            e.target.mute();
            setIsMuted(true);
        }
    }

    const toggleMute = (e) => {
        e.stopPropagation();
        if (player && isMuted) {
            player.unMute();
        } else {
            player.mute();
        }
        setIsMuted(!isMuted);
    }

    const triggerNativeFullScreen = (iframe) => {
        if (!iframe) return;
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    }

    const fullScreen = (e) => {
        e.stopPropagation();
        setIsPaused(true);
        if (player) {
            player.unMute();
            setIsMuted(false);
            player.playVideo();
            triggerNativeFullScreen(player.getIframe());
        } else {
            setIsFullScreen(true);
        }
    }
    return (
        <>
            <div className={`relative min-h-screen w-full overflow-x-hidden bg-[#050505] pb-20 lg:pb-16  ${HomeStyles.heroBase}`}>
                <div className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${HomeStyles.heroSecondary}`}>
                    <AnimatePresence mode='wait'>
                        {activeMovie && <motion.img key={activeMovie.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} duration={{ duration: 1, ease: 'linear' }} className={`w-full h-full object-cover opacity-50 scale-105 transition-all`} src={`${imgBaseUrl}${activeMovie.backdrop_path}`} alt={activeMovie.title} />}
                    </AnimatePresence>
                    <div className='absolute inset-0 bg-linear-to-b from-black/20 via-transparent/80  backdrop-blur-3xl'></div>
                </div>
                <div className={`relative h-[85vh] w-full cursor-pointer`} role='button' onClick={() => setIsPaused(true)}>
                    {isPaused && activeMovie.trailerKey ? <button onClick={toggleMute} className='absolute bottom-48 right-16 text-white bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all z-30 p-3 rounded-full cursor-pointer'>
                        {isMuted ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-volume-x w-6 h-6"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-volume-2 w-6 h-6"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><path d="M16 9a5 5 0 0 1 0 6"></path><path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path></svg>
                        }
                    </button> : <div></div>}
                    <div className={`absolute inset-0 top-0 left-0 right-0 overflow-hidden ${HomeStyles.heroThird}`}>
                        {isPaused && activeMovie.trailerKey ?
                            <>
                                <YouTube
                                    videoId={activeMovie.trailerKey[0].key}
                                    opts={{
                                        height: '100%',
                                        width: '100%',
                                        playerVars: {
                                            mute: 1,
                                            autoplay: 1,
                                            controls: 1,
                                            modestbranding: 1,
                                            rel: 0,
                                            loop: 1,
                                            playlist: activeMovie.trailerKey[0].key,
                                            disablekb: 0,
                                        }
                                    }}
                                    onReady={onReady}
                                    className='absolute inset-0 z-30 w-full h-full scale-[1.8] object-cover pointer-events-none select-none'
                                    iframeClassName='w-full h-full'
                                />
                            </>
                            : <AnimatePresence>
                                {activeMovie && (
                                    <motion.img
                                        key={activeMovie.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className='absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none overflow-hidden'
                                        src={`${imgBaseUrl}${activeMovie.backdrop_path}`}
                                        alt={activeMovie.title}
                                    />
                                )}
                            </AnimatePresence>}
                        <div className={`absolute inset-0 ${HomeStyles.heroToRightBackdrop} pointer-events-none`}></div>
                        <div className={`absolute inset-0 ${HomeStyles.heroToTopBackdrop} pointer-events-none`}></div>
                    </div>
                    <div className='hidden md:flex  gap-2 absolute bottom-32 right-16 z-50 justify-center items-center'>
                        {heroMovies.map((_, index) => {
                            const isActive = currentIndex === index;
                            return <button onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(index);
                                setIsPaused(false);
                            }} key={index} className={`relative flex justify-start items-center transition-all duration-300 shadow-lg ${currentIndex === index ? `w-8 bg-white/40` : 'w-2 bg-white/40 hover:bg-white/60'} h-2 rounded-full cursor-pointer`}>
                                {isActive && <span key={currentIndex} className={`block h-full rounded-full bg-white ${HomeStyles.dotAnimation}`} style={{ animationPlayState: isPaused ? 'paused' : 'running' }}></span>}
                            </button>
                        })}
                    </div>
                    <AnimatePresence mode='wait'>
                        {activeMovie && <motion.div key={activeMovie.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className='absolute inset-0 flex items-end pb-20 px-6 lg:pb-24 lg:pl-16 z-20'>
                            <div className='w-full max-w-2xl gap-4 lg:gap-6 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0'>
                                <div className='flex flex-col gap-4 items-center lg:items-start w-full '>
                                    <div className='relative cursor-pointer'>
                                        <img className={`max-h-28 lg:max-h-48 object-contain origin-center lg:origin-left drop-shadow-2xl `} src={activeMovie.logo_path} alt={activeMovie.title} />
                                    </div>
                                    <div className='flex gap-2 items-center select-none cursor-default'>
                                        <div className='flex gap-2 items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-white fill-white"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                            <span className='text-white font-semibold'>{activeMovie.vote_average.toFixed(1)}/10</span>
                                        </div>
                                        <span className="text-white/50 select-none text-[8px] lg:text-[10px]">•</span>
                                        <div className='flex gap-2 items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                                            <span className='text-white font-semibold'>{activeMovie.release_date.slice(0, 4)}</span>
                                        </div>
                                        <span className="text-white/50 select-none text-[8px] lg:text-[10px]">•</span>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-white font-semibold'>{activeMovie.genre[0].name}</span>
                                        </div>
                                    </div>
                                    <div className='text-base lg:text-lg cursor-default text-white line-clamp-3 max-w-xl drop-shadow-md font-medium hidden lg:block text-center lg:text-left '>
                                        <p>{activeMovie.overview}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={fullScreen} className={`relative rounded-full flex items-center justify-center transition-all cursor-pointer bg-white font-semibold tracking-wide disabled:opacity-50 active:scale-95 disabled:cursor-not-allowed select-none h-13 min-w-32.5 hover:scale-105 shadow-xl shadow-black/10 px-6 text-lg`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-play w-5 h-5 mr-2 fill-current"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
                                            Play
                                        </button>

                                        <div className="inline-flex items-center h-13 shrink-0 rounded-full bg-white/10 backdrop-blur-[20px] backdrop-saturate-150 border border-white/10 shadow-lg shadow-black/5">
                                            <div className="relative h-full">
                                                <button className="inline-flex h-full w-full" aria-label="Add to list" aria-expanded="false">
                                                    <div className="flex items-center justify-center h-full px-5 rounded-l-full transition-colors hover:bg-white/10 active:bg-white/20 outline-none cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-plus w-6 h-6 text-white transition-transform duration-300"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="w-px h-6 bg-white/25 shrink-0" />
                                            <button className="flex items-center justify-center cursor-pointer h-full px-5 rounded-r-full transition-colors hover:bg-white/10 active:bg-white/20 outline-none" aria-label="More Info">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white transition-transform duration-300"><circle cx={12} cy={12} r={10} /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>}
                    </AnimatePresence>
                </div>
                <div className='relative z-10 pb-24 pt-4 lg:pt-12 min-h-125'>
                    <div className='space-y-8 lg:space-y-12 px-12 lg:px-16'>
                        <div className='relative hidden lg:block'>
                            <h2 className='text-white text-xl font-semibold'>Browse by Provider</h2>
                            <Swiper modules={[Navigation, FreeMode]} navigation={true} freeMode={true} spaceBetween={16} slidesPerView={'auto'} className='w-full'>
                                {
                                    providers && providers.map((provider) => (
                                        <SwiperSlide key={provider.id} className="w-19! py-5 lg:w-23!">
                                            <NavLink onClick={magicPill} to={`/provider/${provider.provider_id}`} className={`flex flex-col items-center gap-2 hover:scale-[1.05] hover:ring-white`}>
                                                <div className='w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-lg transition-transform duration-300'>
                                                    <img src={`${imgBaseUrl = 'https://image.tmdb.org/t/p/w780'}${provider.logo_path}`} alt={provider.provider_name} />
                                                </div>
                                                <p className='text-white text-sm text-center'>{provider.provider_name}</p>
                                            </NavLink>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                        <CarouselComponent cardsData={trendingMovies} type='movie' title='Trending Movies' />
                        <CarouselComponent cardsData={trendingShows} type='series' title='Trending Series' />
                        <CarouselComponent cardsData={topRatedMovies} type='movie' title='Top Rated Movies' />
                        <CarouselComponent cardsData={topRatedShows} type='series' title='Top Rated Series' />
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}