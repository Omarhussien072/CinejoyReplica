import DetailsStyles from './Details.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails, getRecommendations, imgBaseUrl } from '../../Services/ApiService/ApiService';
import { AnimatePresence, motion } from 'framer-motion';
import YouTube from 'react-youtube';
import CarouselComponent from '../CarouselComponent/CarouselComponent';

export default function Details() {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    let [player, setPlayer] = useState(null);
    let [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const loadDetails = async () => {
            const data = await getDetails(id, type);
            if (isMounted && data) {
                setDetails(data);
                setIsLoading(false);
            }
        };

        const loadRecommendations = async () => {
            const data = await getRecommendations(id, type);
            if (isMounted && data);
            setRecommendations(data);
            setIsLoading(false)
        }

        loadDetails();
        loadRecommendations();

        return () => { isMounted = false; };
    }, [id, type]);

    if (isLoading) {
        return <div className='min-h-screen w-full flex justify-center items-center'>
            <div className={`${DetailsStyles.loading}`}></div> {setTimeout(() => {
                return;
            }, 4000)}
        </div>
    }

    if (!details) {
        return <div className='min-h-screen w-full flex justify-center items-center'>
            <div className="min-h-screen flex items-center justify-center text-white">Item not found.</div>
        </div>
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
        if (player && !isFullScreen) {
            player.unMute();
            player.playVideo();
            triggerNativeFullScreen(player.getIframe());
        } else {
            setIsFullScreen(true);
        }
    }

    console.log(details);
    const detailsTitle = type === 'movie' ? details.title : details.name;
    const detailsDate = type === 'movie' ? details.release_date.slice(0, 4) : details.first_air_date.slice(0, 4);
    const validVideos = details.videos?.results?.filter((v) => v.type === 'Trailer' || v.type === 'Teaser');
    const fallbackVideo = details.videos?.results?.[0];
    const activeVideoKey = validVideos?.length > 0 ? validVideos[0].key : fallbackVideo?.key;   
    const activeLogo = Array.isArray(details.logo)? details.logo[0]?.path_name : details.logo;
    return (
        <div className={`relative min-h-screen w-full overflow-x-hidden bg-[#050505] pb-20 lg:pb-16`}>

            <div className={`fixed inset-0 w-full h-full z-0 pointer-events-none`}>
                {details && <img className={`w-full h-full object-cover opacity-50 scale-105`} src={`${imgBaseUrl}${details.backdrop_path}`} alt={detailsTitle} />}
                <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-[#050505] backdrop-blur-3xl'></div>
            </div>

            <div className='absolute top-0 left-0 h-[85vh] w-full z-0 overflow-hidden'>
                {videoError !== true ? (
                    <YouTube videoId={activeVideoKey}
                        onReady={(e) => setPlayer(e.target)}
                        onStateChange={() => { setIsFullScreen(false) }}
                        onError={() => setVideoError(true)}
                        opts={{
                            height: "100%",
                            width: "100%",
                            playerVars: {
                                mute: 1,
                                autoplay: 1,
                                controls: 0,
                                modestbranding: 0,
                                rel: 0,
                                loop: 1,
                                playlist: activeVideoKey,
                                disablekb: 1,
                            }
                        }}
                        className='absolute inset-0 w-full h-full scale-[1.8] object-cover pointer-events-none select-none z-0'
                        iframeClassName='w-full h-full'
                    />
                ) : (
                    <img className={`absolute z-10 w-full h-full object-cover`} src={`${imgBaseUrl}${details.backdrop_path}`} alt={detailsTitle} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className='relative z-10 w-full pt-[45vh] lg:pt-[50vh]'>

                <div className='px-6 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 w-full max-w-3xl'>
                    <div className='relative cursor-pointer'>
                        {activeLogo ? (
                            <img
                                className={`max-h-28 lg:max-h-40 object-contain origin-center lg:origin-left drop-shadow-2xl`}
                                src={`${imgBaseUrl}${activeLogo}`}
                                alt={detailsTitle}
                            />
                        ) : (
                            <h1 className="text-5xl lg:text-6xl font-black text-white drop-shadow-2xl tracking-wide">
                                {detailsTitle}
                            </h1>
                        )}
                    </div>

                    <div className='flex gap-2 items-center select-none cursor-default'>
                        <span className='text-white text-xl font-semibold'>{details.genres[0]?.name}</span>
                        {details.genres[1] && (
                            <>
                                <span className="text-white/50 select-none text-[8px] lg:text-[10px]">•</span>
                                <span className='text-white text-xl font-semibold'>{details.genres[1].name}</span>
                            </>
                        )}
                    </div>

                    <div className='flex justify-center items-end gap-2'>
                        <button onClick={fullScreen} className={`relative rounded-full flex items-center justify-center transition-all cursor-pointer bg-white font-semibold tracking-wide disabled:opacity-50 active:scale-95 disabled:cursor-not-allowed select-none h-13 min-w-32.5 hover:scale-105 shadow-xl shadow-black/10 px-6 text-lg text-black`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 fill-current"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
                            Play
                        </button>
                        <button className={`relative rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer bg-[#ffffff1a] hover:bg-[#ffffff2d] backdrop-blur-md font-semibold tracking-wide disabled:opacity-50 active:scale-95 disabled:cursor-not-allowed select-none h-12 w-12 border border-white/10 hover:border-white/20 shadow-xl shadow-black/10`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-white"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        </button>
                        <button className={`relative rounded-full flex items-center justify-center transition-all cursor-pointer bg-[#ffffff1a] hover:bg-[#ffffff2d] backdrop-blur-md font-semibold tracking-wide disabled:opacity-50 active:scale-95 disabled:cursor-not-allowed select-none h-12 w-12 border border-white/10 hover:border-white/20 shadow-xl shadow-black/10`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                        </button>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <div className='flex gap-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                            <span className='text-white font-semibold'>{detailsDate}</span>
                        </div>
                        <span className="text-white/50 select-none text-[8px] lg:text-[10px]">•</span>
                        <div className='flex gap-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-amber-400 fill-amber-400"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                            <span className='text-white font-semibold'>{details.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>

                    <div className='text-base lg:text-lg cursor-default text-white/80 max-w-2xl drop-shadow-md font-medium hidden lg:block'>
                        <p>{details.overview}</p>
                    </div>
                </div>

                <div className='mt-16 lg:mt-24 px-6 lg:px-16'>
                    {recommendations && (
                        <CarouselComponent cardsData={recommendations} type={type} title='You Might Also Like' />
                    )}
                </div>

            </div>
        </div>
    );
}