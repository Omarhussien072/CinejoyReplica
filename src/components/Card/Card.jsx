import { imgBaseUrl } from "../../Services/ApiService/ApiService";
import magicPill from '../Navbar/Navbar';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from "motion/react";
import { useState } from 'react';

export default function Card({ id, title, img_path, release_date, vote, type }) {
    let [isHovered, setIsHovered] = useState(false);

    return (
        <NavLink onClick={magicPill} to={`/${type === 'movie'? 'movies' : 'series'}/${type}/${id}`} className={`flex flex-col items-center gap-2 hover:scale-105 transition-all duration-300`}>

            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='flex flex-col gap-2 relative w-48 h-72 lg:w-60 lg:h-96 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-lg transition-transform duration-300'>
                <img className={`w-full h-full object-cover`} src={`${imgBaseUrl}${img_path}`} alt={title} />
                <div className={`absolute inset-0 w-full h-full pointer-events-none`}>
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                key={'overlay'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className={`flex flex-col gap-2 absolute inset-0 justify-center items-center bg-black/60  pointer-events-auto`}
                            >
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.3, ease: 'linear' }} className="flex flex-col justify-center items-center gap-2">
                                    <div className='w-15 h-15 flex justify-center items-center bg-white rounded-full hover:scale-[1.02] transition-transform'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-black w-6 h-6 fill-current"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
                                    </div>
                                    <div className='flex flex-col px-4'>
                                        <p className='text-xl font-semibold text-white text-center drop-shadow-md'>{title}</p>
                                        <div className='flex justify-center items-center gap-2 mt-1'>
                                            <span className='font-semibold text-white/80 text-sm'>{release_date?.slice(0, 4)}</span>
                                            <div className='flex gap-1 justify-center items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 fill-amber-400 w-4 h-4"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                                <span className='text-white/80 font-semibold text-sm'>{vote?.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </NavLink>
    );
}